import React, { Component } from 'react';
import { StyleSheet, Switch, View, ScrollView, Image, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, PermissionsAndroid, Platform, BackHandler } from 'react-native';
import styles from '../../assets/style/style2.js';
import {
    Container, Header, Content, Button, Card, CardItem,
    Text, Body, Form, Item, Root, Left, Right, Title,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { CheckBox, Avatar, Input, Icon, Overlay } from 'react-native-elements';
import API from '../Api/Api';
import Loader from '../Components/Loader';
import Common from './Common/index';
import Logout from '../Components/Logout'

const options = {
    title: 'Select Picture',
    mediaType: 'photo',
    cameraType: 'back',
    storageOptions: {
        skipBackup: true,
    },
};

export default class Register extends Component {
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
            submit: false,
            errors: [],
            switchValue: false,
            availability: false,
            otp: '',
            otpSubmit: false,
            otpResponse: [],
            currentLongitude: 'unknown',//Initial Longitude
            currentLatitude: 'unknown',//Initial Latitude
            profileResponse: []
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
        if(profile.ProfilePic) {
            const source = { uri: profile.ProfilePic };
            this.setState({ avatarSource: source});
        }
        
        this.setState({
            ProfilePic: profile.ProfilePic,
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
            availability: profile.Courtesy ? true : false
        })
        //console.log('Gender', Gender)
    }
    toggleSwitch = (value) => {
        this.setState({ switchValue: value })
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
        console.log("profile received: ",profile)
        if(profile.length == 0) {
            profile = this.state.profileResponse;
            profile.MobileNo = this.state.MobileNumber
        }
        console.log("profile success: ",profile)
        await AsyncStorage.setItem("UserId", profile.UserId.toString());
        await AsyncStorage.setItem("profile", JSON.stringify(profile));
        this.common.showToast("Profile Update Successfully.")
        this.setState({ loading: false, isVisible: false });
        
        setTimeout( () => {
            this.props.navigation.navigate('Profile',{'profile':profile})
        },2000)
    }

    EditProfile = async () => {
        if (!this.state.ProfilePic) {
            this.common.showToast('Please Select your Profile Picture');
        }
        else if (!this.state.Fname) {
            this.common.showToast('Please enter your First Name');
        }
        else if (!this.state.Lname) {
            this.common.showToast('Please enter your Last Name');
        }
        // else if (!this.state.EmailId) {
        //     this.common.showToast('Please enter your Email ID');
        // }
        // else if (this.state.EmailId && !this.common.validateEmail(this.state.EmailId)) {
        //     this.common.showToast('Please enter valid Email ID');
        // }
        else if (!this.state.MobileNumber) {
            this.common.showToast('Please enter your Phone Number');
        }
        else if (this.state.MobileNumber && !this.common.validatePhone(this.state.MobileNumber)) {
            this.common.showToast('Please enter valid Phone Number');
        }
        else if (!this.state.Age) {
            this.common.showToast('Please enter your Age');
        }
        else if (!this.state.Gender) {
            this.common.showToast('Please select Gender');
        }
        else {
            var profile = JSON.parse(await AsyncStorage.getItem('profile'));
            var authToken = profile.Authentication
            await this.getRequestData().then(data => {
                console.log('request', data)
                var header = { "authentication": authToken };
                var response = new API('changeprofile', data, header).getResponse();
                console.log('response', response, 'data', data, 'header', header)
                response.then(result => {
                    console.log("response API: ",result)
                    if (result.StatusCode == 200 && result.Data.UserId) {
                        this.success(result.Data);
                    }
                    else if(result.StatusCode == 202) {
                        this.setState({isVisible: true, profileResponse: result.Data})
                    }
                    else {
                        this.common.showToast(result.Message)
                        this.setState({ loading: false });
                    }
                })
            });
        }
        // return false;
    }

    async getRequestData() {
        var profile = JSON.parse(await AsyncStorage.getItem('profile'));
        console.log("profile3  :", profile)
        var UserId = profile.UserId;
        return {
            "UserId": UserId,
            "Fname": this.state.Fname,
            "Lname": this.state.Lname,
            "Gender": this.state.Gender,
            "Age": this.state.Age,
            "Status": this.state.Status,
            "LiveStatus":this.state.LiveStatus,
            "DrinksAppetizer":this.state.DrinksAppetizer,
            "DrinksAppetizer_1":this.state.DrinksAppetizer_1,
            "Courtesy": this.state.availability ? 1 : 0,
            "MobileNumber": this.state.MobileNumber,
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
        var profile = JSON.parse(await AsyncStorage.getItem('profile'));
        if(!pic.fileName) {
            pic.fileName = new Date().getTime()+".jpg"
        }
        body.append('file', { uri: pic.uri, name: pic.fileName, filename: pic.fileName, type: pic.type });
        body.append('Id',profile.Authentication)
        var response = await new API('UploadPic', body).getResponse();
        
        
        try {
            if (response.StatusCode == 200) {
                this.getUpdatePic(response);
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

    async getUpdatePic(response) {
        var profile = JSON.parse(await AsyncStorage.getItem('profile'));
        profile.ProfilePic = response.Data;
        AsyncStorage.setItem("profile",JSON.stringify(profile));
        console.log("pppp: ",profile,response)
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('Dashboard');
    }

    validateOtp() {
        if(!this.state.otp) {
            this.common.showToast("Please enter OTP");
            return false;
        }
        var data = { "mobileno": this.state.EmailId, "otp": this.state.otp };
        console.log("validateOtp request data: ", data);
        var response = new API('validateOtp', data).getResponse();
        this.setState({ loading: true});
        console.log("validateOtp response data: ", response);
        response.then(result => {
            console.log("otp response ", result.Data);
            if (result.StatusCode == 200) {
                this.setState({ isVisible: false });
                this.success([]);
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


    render() {
        if (this.state.loading) {
            return <Loader />
        }
        return (
            <Root>
                <KeyboardAvoidingView behavior="padding" enabled>
                <ScrollView
                    ref='_scrollView'
                >
                   <Header style={{ backgroundColor: "#1b244d", elevation: 0, shadowOpacity: 1 }}>
                    <Left>
                        <Button transparent onPress={() => this.handleBackButtonClick()}>
                            <Icon type="font-awesome" name='chevron-left' color='#fff' size={19} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Edit Profile</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.EditProfile()}>
                        <Icon type="font-awesome" name='check' color="#FFF" />
                        </Button>
                    </Right>
                </Header>
                    <Overlay 
                    onBackdropPress={() => this.setState({isVisible: false})}
                    overlayStyle={[styles.otpModel, {height:400}]} 
                    isVisible={this.state.isVisible}>
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
                                size={100}
                                onPress={() => this.UploadPicture()}
                                overlayContainerStyle={{ backgroundColor: '#FFF' }}
                                rounded
                                title="Profile    Photo"
                                titleStyle={{ color: '#333', fontSize: 15, }}
                                containerStyle={{ borderColor: '#d6d6c2', borderWidth: 2 }}
                                source={this.state.avatarSource}
                                imageProps={{ resizeMode: 'cover' }}
                                showEditButton
                                onEditPress={() => this.UploadPicture()}
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
                                <Input disabled ref={email => { this.email = email }} keyboardType="email-address" value={this.state.EmailId} onChangeText={(text) => this.setState({ 'EmailId': text })} placeholder="Email" inputStyle={[styles.font15]} />
                                </View>
                                <View style={styles.mb}>
                                <Input ref={MobileNumber => { this.MobileNumber = MobileNumber }} keyboardType="numeric" value={this.state.MobileNumber} onChangeText={(text) => this.setState({ 'MobileNumber': text })} placeholder="Phone Number" inputStyle={[styles.font15]} />
                                </View>
                                <View style={styles.mb}>
                                <Input ref={Age => { this.Age = Age }} keyboardType="numeric" value={this.state.Age} onChangeText={(text) => this.setState({ 'Age': text })} placeholder="Age" inputStyle={[styles.font15]} />
                                </View>
                                <View style={{ marginTop: 10, marginLeft: 10,marginBottom:10, color: 'gray' }}>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>Select Gender:</Text>
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
                                            isChecked={this.state.Gender === 'Other'}
                                            onPress={() => this.toogleGender('Other')}
                                            containerStyle={{ borderColor: "#333", borderWidth: 1, backgroundColor:this.state.Gender === 'Other' ? '#1b244d': 'white'}}
                                            textStyle={{ fontSize: 13, color:this.state.Gender === 'Other' ? 'white' : '#000' }}
                                        />
                                    </View>
                                </View>
                                <View style={[{ flexDirection: 'row',  marginLeft: 10, color: 'gray' }, styles.mb]}>
                                    <Text style={{ fontSize: 14, color: 'gray', marginTop:10 }}>Active/Live:</Text>
                                    <TouchableOpacity onPress={() => this.setState({LiveStatus: 0})} style={{ marginLeft: 20 }}>
                                        <Icon
                                            name='circle'
                                            type='font-awesome'
                                            color='black'
                                            size={16}
                                            containerStyle={{borderColor:'#ccc', borderWidth:this.state.LiveStatus == 0 ? 1 : 0, padding:10, borderRadius:200}}
                                             />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({LiveStatus: 1})} style={{ marginLeft: 30 }}>
                                        <Icon
                                            name='circle'
                                            type='font-awesome'
                                            color='#0b6be6'
                                            size={16}
                                            containerStyle={{borderColor:'#ccc', borderWidth:this.state.LiveStatus == 1 ? 1 : 0, padding:10, borderRadius:200}}
                                            />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.mb}>
                                    <Input ref={Status => { this.Status = Status }} maxLength={50} value={this.state.Status} onChangeText={(text) => this.setState({ 'Status': text })} placeholder="Enter Status" inputStyle={[styles.font15]} />
                                </View>
                                <View style={{ marginTop: 10, marginLeft: 10, color: 'gray' }}>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>Enter Drinks/Appetizer:</Text>
                                </View>
                                <View style={[styles.sectionRow, styles.mb]}>
                                    <View style={[styles.threeRow, styles.mb]}>
                                        <Input value={this.state.DrinksAppetizer} onChangeText={(text) => this.setState({ 'DrinksAppetizer': text })} placeholder="1" inputStyle={[styles.font15]} />
                                    </View>
                                    <View style={[styles.threeRow, styles.mb]}>
                                        <Input value={this.state.DrinksAppetizer_1} onChangeText={(text) => this.setState({ 'DrinksAppetizer_1': text })} placeholder="2" inputStyle={[styles.font15]} />
                                    </View>
                                </View>
                                
                                <View style={[styles.row, styles.registerOtherComponents,styles.mb]}>
                                        <Text style={[styles.registerOtherComponentsText,styles.twoRow]}>Courtesy Of</Text>
                                        <View style={[styles.twoRow,{alignItems:'flex-end',justifyContent:'flex-end'}]}>
                                            <Switch 
                                                trackColor={{true: '#0b6be6', false: ''}}
                                                value={this.state.availability} 
                                                style={{marginRight:10}}
                                                onValueChange={ (value) => this.setState({availability: value})}
                                                
                                            />
                                        </View>
                                </View>
                            </Form>
                        </View>
                    </View>
                </ScrollView>
                </KeyboardAvoidingView>
            </Root>
        );
    }
}
