import React, { Component } from 'react';
import { StyleSheet, Switch, View, ScrollView, Image, TouchableOpacity, AsyncStorage, PermissionsAndroid, Platform, BackHandler } from 'react-native';
import styles from '../../assets/style/style2.js';
import {
    Container, Header, Content, Button, Card, CardItem,
    Text, Body, Form, Item, Root, Left, Right, Title,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Logout from '../Components/Logout';
import GPSState from 'react-native-gps-state';
import { CheckBox, Avatar, Input, Icon, Overlay } from 'react-native-elements';
import API from '../Api/Api';
import Loader from '../Components/Loader';
import Common from './Common/index';
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';
//import Geolocation from '@react-native-community/geolocation';

const options = {
    title: 'Select Picture',
    mediaType: 'photo',
    cameraType: 'back',
    storageOptions: {
        skipBackup: true,
    },
};

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarSource: "",
            ProfilePic: "",
            Fname: "",
            Lname: "",
            EmailId: "",
            profile: [],
            MobileNumber: "",
            type: 'sign_up',
            Password: "",
            confirmPassword: "",
            Age: "",
            Status: "",
            Gender: this.props.Gender || "",
            LiveStatus: 1,
            active: '1',
            passive: '0',
            ProviderKey: "",
            ProviderName: "",
            DrinksAppetizer: "",
            DrinksAppetizer_1:"",
            isVisible: false,
            showgps: false,
            loading: false,
            errors: [],
            submit: false,
            errors: [],
            switchValue: false,
            availability: false,
            otp: '',
            otpSubmit: false,
            otpResponse: [],
            currentLongitude: 'unknown',//Initial Longitude
            currentLatitude: 'unknown',//Initial Latitude
        }
        this.common = new Common();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        this.getUser()
        // this.callLocation()

    }

    async getUser() {
        var profile = JSON.parse(await AsyncStorage.getItem('profile'))
        console.log("profile: ",profile)
        this.setState({
            Fname: profile.FName,
            Lname: profile.LName,
            MobileNumber: profile.MobileNo,
            Age: profile.Age,
            EmailId: profile.EmailId,
            Gender: profile.Gender,
            LiveStatus: profile.LiveStatus,
            Status: profile.Status,
            DrinksAppetizer: profile.DrinksAppetizer,
            DrinksAppetizer_1: profile.DrinksAppetizer_1,
        })
    }

    callLocation(){
        GPSState.addListener((status) => {
            switch (status) {
                case GPSState.NOT_DETERMINED:
                    alert('Please, allow the location, for us to do amazing things for you!')
                    break;

                case GPSState.RESTRICTED:
                    GPSState.openLocationSettings()
                    break;

                case GPSState.DENIED:
                    alert('You are not allow your location to use.')
                    this.setState({ isVisible: true });
                    break;

                case GPSState.AUTHORIZED_ALWAYS:
                    //TODO do something amazing with you app
                    this.setState({ isVisible: true });
                    break;

                case GPSState.AUTHORIZED_WHENINUSE:
                    //TODO do something amazing with you app
                    this.setState({ isVisible: true });
                    break;
            }
        })
        GPSState.requestAuthorization(GPSState.AUTHORIZED_WHENINUSE)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }


    toogleGender = (Gender) => {
        this.setState({
            Gender: Gender,
        })
        console.log('Gender', Gender)
    }
    toggleSwitch = (value) => {
        this.setState({ switchValue: value })
    }

    async success(profile) {
        var profile = this.state.profile
        await AsyncStorage.setItem("UserId", profile.UserId.toString());
        await AsyncStorage.setItem("profile", JSON.stringify(profile));
        this.props.navigation.navigate('BottomNavigator')
        this.setState({ loading: false });
    }

    validateOtp() {
        
        var data = { "mobileno": this.state.MobileNumber, "otp": this.state.otp };
        console.log("validateOtp request data: ", data);
        var response = new API('validateOtp', data).getResponse();
        this.setState({ loading: true});
        console.log("validateOtp response data: ", response);
        response.then(result => {
            console.log("otp response ", result.Data);
            if (result.StatusCode == 200) {
                this.setState({ isVisible: false });
                this.success();
            }
            else {
                this.setState({ loading: false});
                this.common.showToast("Incorrect OTP");
            }
        }).catch((error) => {
            this.setState({ loading: false});
            this.common.showToast("Invalid Response, please try again later");
        })
    }
        

    onRegister = async () => {
        if (!this.state.ProfilePic) {
            this.common.showToast('Please Select your Profile Picture');
        }
        else if (!this.state.Fname) {
            this.common.showToast('Please enter your First Name');
            this.Fname.focus()
        }
        else if (!this.state.Lname) {
            this.common.showToast('Please enter your Last Name');
            this.Lname.focus()
        }
        else if (!this.state.MobileNumber) {
            this.common.showToast('Please enter your Phone Number');
            this.MobileNumber.focus()
        }
        else if (this.state.MobileNumber && !this.common.validatePhone(this.state.MobileNumber)) {
            this.common.showToast('Please enter valid Phone Number');
            this.MobileNumber.focus()
        }
        else if (!this.state.EmailId) {
            this.common.showToast('Please enter your Email ID');
            this.EmailId.focus()
        }
        else if (this.state.email && !this.common.validateEmail(this.state.email)) {
            this.common.showToast('Please enter valid Email ID');
            this.email.focus()
        }
        else if (!this.state.Password) {
            this.common.showToast('Please enter your Password');
            this.Password.focus()
        }
        else if (!this.state.confirmPassword) {
            this.common.showToast('Please enter Confirm Password');
            this.confirmPassword.focus()
        }
        else if (this.state.Password !== this.state.confirmPassword) {
            this.common.showToast('Both Password should be same');
            this.confirmPassword.focus()
        }
        else if (!this.state.Age) {
            this.common.showToast('Please enter your Age');
            this.Age.focus()
        }
        else if (!this.state.Gender) {
            this.common.showToast('Please select Gender');
            this.confirmPassword.focus()
        }
        else if (!this.state.Status) {
            this.common.showToast('Please enter your status');
            this.Status.focus()
        }
        else {
            this.setState({ loading: true });
            await this.getRequestData().then(data => {
                var response = new API('Register', data).getResponse();
                response.then(result => {
                    console.log("response: ",result)
                    if (result.StatusCode == 200 && result.Data.UserId) {
                        console.log("forgot response: ",result.data);
                        this.setState({ loading: false });
                        this.setState({ profile: result.Data });
                        // this.validateOtp();
                        this.setState({ isVisible: true });

                    }
                    else {
                        this.common.showToast(result.Message)
                        this.setState({ loading: false });
                    }
                })
            });
        }
        return false;
    }

    async getRequestData() {
        var deviceId = await DeviceInfo.getUniqueId();
        var fcmToken = await firebase.messaging().getToken();
        
        return {
            "Fname": this.state.Fname,
            "Lname": this.state.Lname,
            "EmailId": this.state.EmailId,
            "MobileNumber": this.state.MobileNumber,
            "Password": this.state.Password,
            "Status": this.state.Status,
            "Age": this.state.Age,
            "Gender": this.state.Gender,
            "DeviceId": deviceId,
            "FCMToken": fcmToken,
            "ProviderKey":this.state.ProviderKey,
            "LiveStatus":this.state.LiveStatus,
			"DrinksAppetizer":this.state.DrinksAppetizer,
            "ProviderName":this.state.ProviderName,
            "ProfilePic": this.state.ProfilePic,
        }
    }

    UploadPicture() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.uploadPicApi(response);
            }
        });
    }

    async uploadPicApi(response) {
        this.setState({ loading: true });
        var body = new FormData();
        var pic = response;
        body.append('file', { uri: response.uri, name: response.fileName, filename: response.fileName, type: response.type });
        var response = await new API('UploadPic', body).getResponse();
        console.log("file response: ", response);
        
        try {
            if (response.StatusCode == 200) {
                this.setState({ loading: false });
                this.setState({
                    ProfilePic: response.Data
                });
                const source = { uri: pic.uri };
                this.setState({
                    avatarSource: source,
                });
            }
            else {
                throw 'API Error in Upload Photo API';
            }
        } catch (error) {
            this.setState({ loading: false });
            console.log('error: ', error);
        }
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }


    render() {
        if (this.state.loading) {
            return <Loader />
        }
        var otp = !this.state.otp && this.state.otpSubmit ? true : false;
        return (
            <Root>
                <ScrollView
                    ref='_scrollView'
                >
                    <Header style={{ backgroundColor: "#1b244d", elevation: 0, shadowOpacity: 1 }}>
                    <Left>
                        <Button transparent>
                            {/* <Icon type="font-awesome" name='chevron-left' color='#fff' /> */}
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Profile</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Logout />
                        </Button>
                        <Button transparent>
                            <Icon type="font-awesome" name='cog' color="#FFF" onPress={() => this.props.navigation.navigate('Setting')} size={20} />
                        </Button>
                        <Button transparent>
                            <Icon type="font-awesome" name='phone' color="#FFF" size={20} />
                        </Button>
                    </Right>
                </Header>

                    <Overlay overlayStyle={[styles.otpModel, { height: '30%' }]} isVisible={this.state.showgps}>
                        <View>
                        <Text style={styles.enabledgps}>You need to enabled your GPS location in order to use the application</Text>
                        </View>
                        <View style={[styles.center, { flexDirection: 'row', justifyContent: 'space-evenly' }]}>
                        <Text style={{ marginTop: 22 }}>Disabled</Text>
                        <Switch
                        style={{ marginTop: 30 }}
                        onValueChange={this.toggleSwitch}
                        value={this.state.switchValue} />
                        <Text style={{ color: 'green', marginTop: 22 }} onPress={() => this.setState({ isVisible: false })}>Enabled</Text>
                        </View>
                    </Overlay>

                    <Overlay overlayStyle={[styles.otpModel, {height:400}]} isVisible={this.state.isVisible}>
                        <Text style={styles.otpmsg}>Please enter the OTP that you have received in your registered Mobile No and Email</Text>
                        <View style={{marginTop:100}}>
                        <Input secureTextEntry={true} keyboardType="number-pad" value={this.state.otp} onChangeText={(text) => this.setState({'otp': text})} placeholder="Enter OTP" inputStyle={[styles.font15]} />
                        </View>
                        <View style={[styles.center, { marginTop: 80, marginBottom: 20 }]}>
                            <Button block style={{ backgroundColor: 'black', borderRadius: 50, width: 150, alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}
                                onPress={() => this.validateOtp()}>
                                <Text style={{ fontSize: 14 }}>Submit</Text>
                            </Button>
                        </View>
                    </Overlay>

                    <View style={styles.container}>
                        <View style={styles.registerImageContainer}>
                            <Avatar
                                size={90}
                                onPress={() => this.UploadPicture()}
                                overlayContainerStyle={{ backgroundColor: '#FFF' }}
                                rounded
                                icon={{ name: 'plus', type: 'font-awesome', color: 'gray', size: 20 }}
                                containerStyle={{ borderColor: 'gray', borderWidth: 2 }}
                                source={this.state.avatarSource}
                                imageProps={{ resizeMode: 'cover' }}
                            />
                        </View>
                        <View>
                            <Form>
                                <View style={[styles.sectionRow, styles.mb]}>
                                    <View style={styles.threeRow}>
                                        <Input ref={Fname => { this.Fname = Fname }} value={this.state.Fname} onChangeText={(text) => this.setState({ 'Fname': text })} placeholder="First Name" inputStyle={[styles.font15]} />
                                    </View>
                                    <View style={styles.threeRow}>
                                        <Input ref={Lname => { this.Lname = Lname }} value={this.state.Lname} onChangeText={(text) => this.setState({ 'Lname': text })} placeholder="Last Name" inputStyle={[styles.font15]} />
                                    </View>
                                </View>
                                <View style={styles.mb}>
                                <Input ref={email => { this.email = email }} keyboardType="email-address" value={this.state.EmailId} onChangeText={(text) => this.setState({ 'EmailId': text })} placeholder="Email" inputStyle={[styles.font15]} />
                                </View>
                                <View style={styles.mb}>
                                <Input ref={MobileNumber => { this.MobileNumber = MobileNumber }} keyboardType="numeric" value={this.state.MobileNumber} onChangeText={(text) => this.setState({ 'MobileNumber': text })} placeholder="Phone Number" inputStyle={[styles.font15]} />
                                </View>
                                <View style={styles.mb}>
                                <Input ref={Age => { this.Age = Age }} value={this.state.Age} onChangeText={(text) => this.setState({ 'Age': text })} placeholder="Age" inputStyle={[styles.font15]} />
                                </View>
                                <View style={{ marginTop: 10, marginLeft: 10,marginBottom:10, color: 'gray' }}>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>Select Gender</Text>
                                </View>
                                <View style={[styles.sectionRow, styles.mb]}>
                                    <View style={styles.threeRow}>
                                        <CheckBox
                                            size={1}
                                            center
                                            title='Male'
                                            isChecked={this.state.Gender === 'Male'}
                                            onPress={() => this.toogleGender('Male')}
                                            containerStyle={{ borderColor: "#333", borderWidth: 1, backgroundColor:this.state.Gender === 'Male' ? '#1b244d': 'white'}}
                                            textStyle={{ fontSize: 13, color:this.state.Gender === 'Male' ? 'white' : '#000' }}
                                        />
                                    </View>
                                    <View style={styles.threeRow}>
                                        <CheckBox
                                            size={1}
                                            center
                                            title='Female'
                                            isChecked={this.state.Gender === 'Female'}
                                            onPress={() => this.toogleGender('Female')}
                                            containerStyle={{ borderColor: "#333", borderWidth: 1, backgroundColor:this.state.Gender === 'Female' ? '#1b244d': 'white'}}
                                            textStyle={{ fontSize: 13, color:this.state.Gender === 'Female' ? 'white' : '#000' }}
                                        />
                                    </View>
                                    <View style={styles.threeRow}>
                                        <CheckBox
                                            size={1}
                                            center
                                            title='Other'
                                            isChecked={this.state.Gender === 'Transgender'}
                                            onPress={() => this.toogleGender('Transgender')}
                                            containerStyle={{ borderColor: "#333", borderWidth: 1, backgroundColor:this.state.Gender === 'Transgender' ? '#1b244d': 'white'}}
                                            textStyle={{ fontSize: 13, color:this.state.Gender === 'Transgender' ? 'white' : '#000' }}
                                        />
                                    </View>
                                </View>
                                <View style={[{ flexDirection: 'row',  marginLeft: 10, color: 'gray' }, styles.mb]}>
                                    <Text style={{ fontSize: 14, color: 'gray', marginTop:10 }}>Active Live</Text>
                                    <View style={{ marginLeft: 30 }}>
                                        <Icon
                                            name='circle'
                                            type='font-awesome'
                                            color='#0b6be6'
                                            size={16}
                                            containerStyle={{borderColor:'#ccc', borderWidth:this.state.LiveStatus == 1 ? 1 : 0, padding:10, borderRadius:200}}
                                            onPress={() => this.setState({LiveStatus: 1})} />
                                    </View>
                                    <View style={{ marginLeft: 30 }}>
                                        <Icon
                                            name='circle'
                                            type='font-awesome'
                                            color='black'
                                            size={16}
                                            containerStyle={{borderColor:'#ccc', borderWidth:this.state.LiveStatus == 0 ? 1 : 0, padding:10, borderRadius:200}}
                                            onPress={() => this.setState({LiveStatus: 0})} />
                                    </View>
                                </View>
                                <View style={styles.mb}>
                                    <Input ref={Status => { this.Status = Status }} value={this.state.Status} onChangeText={(text) => this.setState({ 'Status': text })} placeholder="Enter Status" inputStyle={[styles.font15]} />
                                </View>
                                <View style={{ marginTop: 10, marginLeft: 10, color: 'gray' }}>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>Enter Drinks/Appetizer</Text>
                                </View>
                                <View style={[styles.sectionRow, styles.mb]}>
                                    <View style={[styles.threeRow, styles.mb]}>
                                        <Input value={this.state.DrinksAppetizer} onChangeText={(text) => this.setState({ 'drinks': text })} placeholder="1" inputStyle={[styles.font15]} />
                                    </View>
                                    <View style={[styles.threeRow, styles.mb]}>
                                        <Input value={this.state.DrinksAppetizer_1} onChangeText={(text) => this.setState({ 'appetizer': text })} placeholder="2" inputStyle={[styles.font15]} />
                                    </View>
                                </View>
                                
                                <View style={[styles.row, styles.registerOtherComponents,styles.mb]}>
                                        <Text style={[styles.registerOtherComponentsText,styles.twoRow]}>Courtesy Of</Text>
                                        <View style={[styles.twoRow,{alignItems:'flex-end',justifyContent:'flex-end'}]}>
                                            <Switch 
                                                value={this.state.availability} 
                                                style={{marginRight:10}}
                                                onValueChange={ (value) => this.setState({availability: value})}
                                                
                                            />
                                        </View>
                                </View>
                               
                                <TouchableOpacity style={{ marginTop: 20, alignContent: 'center', alignItems: 'center', backgroundColor: '#ccccb3', height: "9%", }} onPress={() => this.props.navigation.navigate('ChangePassword')}>
                                    <View>
                                        <Text style={{ borderBottomColor: 'gray', borderBottomWidth: 1, width: '50%', marginTop: "5%", color: '#fff' }}>Change Password</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginTop: 10, marginBottom: 20, alignContent: 'center', alignItems: 'center', backgroundColor: 'blue', height: "9%", marginBottom: "10%" }}>
                                    <View>
                                        <Text style={{ borderBottomColor: 'gray', borderBottomWidth: 1, width: '50%', marginTop: "5%", color: '#fff' }}>Logout</Text>
                                    </View>
                                </TouchableOpacity>
                            </Form>
                        </View>
                    </View>
                </ScrollView>
            </Root>
        );
    }
}