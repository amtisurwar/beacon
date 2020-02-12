import React, { Component } from 'react';
import { StyleSheet, Switch, View, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity, AsyncStorage, PermissionsAndroid, Platform, BackHandler } from 'react-native';
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
            LiveStatus: 0,
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
            otpcall: [],
        }
        this.common = new Common();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        this.checkUser()

    }

    checkUser() {
        if(this.props.navigation.getParam('user')) {
            var user = this.props.navigation.getParam('user')
            console.log("user: ",user)
            this.setState({
                Fname: user.first_name,
                Lname: user.last_name,  
                EmailId: user.email,
                ProfilePic: user.photo,
            })
            if(user.photo) {
                const source = { uri: user.photo };
                this.setState({
                    avatarSource: source,
                });
            }
        }
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

    async success() {
        var profile = this.state.profile
        await AsyncStorage.setItem("UserId", profile.UserId.toString());
        await AsyncStorage.setItem("profile", JSON.stringify(profile));
        // this.props.navigation.navigate('Dashboard')
        this.props.navigation.navigate('Introduction')
        this.setState({ loading: false });
    }

    async resendOtp(){
        var data = { "mobileno": this.state.MobileNumber, "type": this.state.type };
        console.log("resent request data: ", data);
        var response = await new API('resendOtp', data).getResponse();
        console.log("resend otp response: ", response);
        response.then(result => {
            console.log("resentotp response ", result.Data);
            if (result.StatusCode == 200) {
                this.validateOtp();
            }
            else {
                this.common.showToast("Wrong OTP", 1);
            }
        }).catch((error) => {
            //this.common.showToast("Error in OTP verification", 1);
        })
    }

    validateOtp() {
        if(!this.state.otp) {
            this.common.showToast("Please enter OTP");
            return false;
        }
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
            this.email.focus()
        }
        else if (this.state.EmailId && !this.common.validateEmail(this.state.EmailId)) {
            this.common.showToast('Please enter valid Email ID');
            this.email.focus()
        }
        else if (!this.state.Password) {
            this.common.showToast('Please enter your Password');
            this.Password.focus()
        }
        else if (this.state.Password.length < 8) {
            this.common.showToast('Password should be more than 8 digit');
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
        else if (!this.state.Password !== !this.state.confirmPassword) {
            this.common.showToast('Please enter your Confirm Password');
            this.confirmPassword.focus()
        }
        else if (!this.state.Age) {
            this.common.showToast('Please enter your Age');
            this.Age.focus()
        }
        else if (this.state.Age && this.state.Age < 18) {
            this.common.showToast('Age should be greater than 18');
            this.Age.focus()
        }
        else if (this.state.Age && this.state.Age > 99) {
            this.common.showToast('Age should be less than 99');
            this.Age.focus()
        }
        else if (!this.state.Gender) {
            this.common.showToast('Please select Gender');
            this.confirmPassword.focus()
        }
        // else if (!this.state.Status) {
        //     this.common.showToast('Please enter your status');
        //     this.Status.focus()
        // }
        // else if (!this.state.LiveStatus) {
        //     this.common.showToast('Please select your Active/Live');
        //     this.Status.focus()
        // }
        else {
            this.setState({ loading: true });
            await this.getRequestData().then(data => {
                console.log("request : ", data);
                var response = new API('Register', data).getResponse();
                console.log("response : ", response,response.response);
                response.then(result => {
                    
                    if (result.StatusCode == 200 && result.Data.UserId) {
                        console.log("forgot response: ",result);
                        this.setState({ loading: false });
                        this.setState({ profile: result.Data });
                        // this.validateOtp();
                        this.setState({ isVisible: true });
                    }
                    else {
                        if(result.response.data && result.response.data.StatusCode != 200) {
                            this.common.showToast(result.response.data.Message)
                            this.setState({ loading: false });
                        }
                        else {
                            this.common.showToast(result.Message)
                            this.setState({ loading: false });
                        }
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
            "DrinksAppetizer_1":this.state.DrinksAppetizer_1,
            "Courtesy": this.state.availability ? 1 : 0,
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
        if(!pic.fileName) {
            pic.fileName = new Date().getTime()+".jpg"
        }
        body.append('file', { uri: pic.uri, name: pic.fileName, filename: pic.fileName, type: pic.type });
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

    LiveStatus() {
        this.setState({
            LiveStatus: this.state.active,
        })
        console.log('active', this.state.LiveStatus)
    }
    LivesStatus() {
        this.setState({
            LiveStatus: this.state.passive,
        })
        console.log('passive', this.state.LiveStatus)
    }


    render() {
        if (this.state.loading) {
            return <Loader />
        }
        var otp = !this.state.otp && this.state.otpSubmit ? true : false;
        return (
            <Root>
                <KeyboardAvoidingView behavior="padding" enabled>
                <ScrollView
                    ref='_scrollView'
                >
                    <Header style={styles.header}>
                        <Left>
                            <Button transparent onPress={() => this.handleBackButtonClick()}>
                                <Icon type="font-awesome" name='chevron-left' color='#fff' size={19} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: '#fff' }}>Sign Up</Title>
                        </Body>
                        <Right>

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
                                <Input ref={MobileNumber => { this.MobileNumber = MobileNumber }} keyboardType="numeric" value={this.state.MobileNumber} onChangeText={(text) => this.setState({ 'MobileNumber': text })} placeholder="Phone Number" inputStyle={[styles.font15]} />
                                </View>
                                <View style={styles.mb}>
                                <Input ref={email => { this.email = email }} keyboardType="email-address" value={this.state.EmailId} onChangeText={(text) => this.setState({ 'EmailId': text })} placeholder="Email" inputStyle={[styles.font15]} />
                                </View>
                                <View style={styles.mb}>
                                <Input ref={Password => { this.Password = Password }} secureTextEntry={true} value={this.state.Password} onChangeText={(text) => this.setState({ 'Password': text })} placeholder="Password" inputStyle={[styles.font15]} />
                                </View>
                                <View style={styles.mb}>
                                <Input ref={confirmPassword => { this.confirmPassword = confirmPassword }} secureTextEntry={true} value={this.state.confirmPassword} onChangeText={(text) => this.setState({ 'confirmPassword': text })} placeholder="Confirm Password" inputStyle={[styles.font15]} />
                                </View>
                                <View style={styles.mb}>
                                <Input ref={Age => { this.Age = Age }} maxLength={2} keyboardType="numeric" value={this.state.Age} onChangeText={(text) => this.setState({ 'Age': text })} placeholder="Age" inputStyle={[styles.font15]} />
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
                                <View style={styles.mb}>
                                    <Input ref={Status => { this.Status = Status }} value={this.state.Status} onChangeText={(text) => this.setState({ 'Status': text })} placeholder="Enter Status" inputStyle={[styles.font15]} maxLength={50} />
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
                                                value={this.state.availability} 
                                                style={{marginRight:10}}
                                                onValueChange={ (value) => this.setState({availability: value})}
                                                trackColor={{true: '#0b6be6', false: ''}}
                                            />
                                        </View>
                                </View>
                               
                                <View style={{ flexDirection: 'row',  marginLeft: 10, color: 'gray' }}>
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
                                    <TouchableOpacity onPress={() => this.setState({LiveStatus: 1})} style={{ marginLeft: 10 }}>
                                        <Icon
                                            name='circle'
                                            type='font-awesome'
                                            color='#0b6be6'
                                            size={16}
                                            containerStyle={{borderColor:'#ccc', borderWidth:this.state.LiveStatus == 1 ? 1 : 0, padding:10, borderRadius:200}}
                                             />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.center, { marginTop: 80, marginBottom: 20 }]}>
                                    <Button block style={{ backgroundColor: 'black', borderRadius: 50, width: '70%', alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}
                                        onPress={() => this.onRegister()}>
                                        <Text style={{ fontSize: 14 }}>Sign Up</Text>
                                    </Button>
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