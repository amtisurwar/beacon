import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, BackHandler, TouchableOpacity, AsyncStorage, PermissionsAndroid, Platform } from 'react-native';
import styles from '../../assets/style/style2.js';
import {
    Container, Header, Content, Button, Card, CardItem,
    Text, Form, Item, Root, Left, Right, Body, Title
} from 'native-base';
//import Geolocation from '@react-native-community/geolocation';
import { CheckBox, Avatar, Input, Icon } from 'react-native-elements';
import Logout from '../Components/Logout';
//import ImagePicker from 'react-native-image-picker';
//import Errors from '../Components/Errors';
// import API from '../Api/Api';
// import Loader from '../Components/Loader';
// import GoogleSearch from '../Components/GoogleSearch';
import Common from './Common/index';
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
            avatarSource: '',
            profilePic: '',
            errors: [],
            fname: '',
            lname: '',
            title: '',
            email: '',
            phone: '',
            Age: '',
            Status: '',
            Male: '',
            Female: '',
            Other: '',
            address: '',
            password: '',
            confirmPassword: '',
            loading: false,
            submit: false,
            currentLongitude: '',//Initial Longitude
            currentLatitude: '',//Initial Latitude
        }
        this.common = new Common();
    }

    // static navigationOptions = {
    //         headerTitle: 'Profile',
    //         headerStyle: {
    //           backgroundColor:'#1b244d',
    //         },
    //         headerRight: (
    //           <View style={{flexDirection: "row", justifyContent: "space-evenly", width: 120}}>
    //             <Icon type="font-awesome" name= 'power-off' color="#FFF" />
    //             <Icon type="font-awesome" name= 'cog' color="#FFF" />
    //             <Icon type="font-awesome" name= 'phone' color="#FFF" />
    //           </View>
    //         ),
    //         headerTintColor: '#fff',
    //       };


    // componentDidMount() {
    //     var that = this;
    //     //Checking for the permission just after component loaded
    //     if (Platform.OS === 'ios') {
    //         this.callLocation(that);
    //     } else {
    //         async function requestLocationPermission() {
    //             try {
    //                 const granted = await PermissionsAndroid.request(
    //                     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    //                     'title': 'Location Access Required',
    //                     'message': 'This App needs to Access your location'
    //                 }
    //                 )
    //                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                     //To Check, If Permission is granted
    //                     that.callLocation(that);
    //                 } else {
    //                     alert("Permission Denied");
    //                 }
    //             } catch (err) {
    //                 alert("err", err);
    //                 console.warn(err)
    //             }
    //         }
    //         requestLocationPermission();
    //     }
    // }
    // callLocation(that) {
    //     //alert("callLocation Called");
    //     Geolocation.getCurrentPosition(
    //         //Will give you the current location
    //         (position) => {
    //             const currentLongitude = JSON.stringify(position.coords.longitude);
    //             //getting the Longitude from the location json
    //             const currentLatitude = JSON.stringify(position.coords.latitude);
    //             //getting the Latitude from the location json
    //             that.setState({ currentLongitude: currentLongitude });
    //             //Setting state Longitude to re re-render the Longitude Text
    //             that.setState({ currentLatitude: currentLatitude });
    //             //Setting state Latitude to re re-render the Longitude Text
    //         },
    //         (error) => alert(error.message),
    //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //     );
    //     that.watchID = Geolocation.watchPosition((position) => {
    //         //Will give you the location on location change
    //         console.log(position);
    //         const currentLongitude = JSON.stringify(position.coords.longitude);
    //         //getting the Longitude from the location json
    //         const currentLatitude = JSON.stringify(position.coords.latitude);
    //         //getting the Latitude from the location json
    //         that.setState({ currentLongitude: currentLongitude });
    //         //Setting state Longitude to re re-render the Longitude Text
    //         that.setState({ currentLatitude: currentLatitude });
    //         //Setting state Latitude to re re-render the Longitude Text
    //     });
    // }
    // componentWillUnmount = () => {
    //     Geolocation.clearWatch(this.watchID);
    // }


    // validate = () => {
    // 	var messages = [];
    // 	this.setState({submit:true});
    // 	messages.push(!this.state.avatarSource  && 'Select Profile Pic');
    // 	messages.push(!this.state.fname  && 'First Name required');
    // 	messages.push(!this.state.lname  && 'Last Name required');
    // 	messages.push(!this.state.title  && 'Title required');
    // 	messages.push(!this.state.email  && 'Email required');
    // 	messages.push(!this.state.phone  && 'Phone no required');
    // 	messages.push(!this.state.Age  && 'Agency Name required');
    // 	messages.push(!this.state.assistantName  && 'Assistant Name required');
    // 	messages.push(!this.state.assistantEmail  && 'Assistant Email required');
    // 	messages.push(!this.state.address  && 'Address required');
    // 	messages.push(!this.state.password  && 'Password required');
    // 	messages.push(!this.state.confirmPassword  && 'Confirmation Password required');
    // 	if(this.state.password && this.state.confirmPassword) {
    // 		if(this.state.password != this.state.confirmPassword) {
    // 			messages.push("Both password should be same");
    // 		}
    // 	}
    // 	if(this.state.email && !this.common.validateEmail(this.state.email)) {
    // 		messages.push('Invalid Email');
    // 	}
    // 	if(this.state.assistantEmail && !this.common.validateEmail(this.state.assistantEmail)) {
    // 		messages.push('Invalid Assistant Email');
    // 	}
    // 	var errorShow = [];

    // 	messages = messages.filter( (msg) => {
    // 		if(msg) {
    // 			return msg;
    // 		}
    // 	})
    // 	for(var i=0; i<messages.length; i++) {
    // 		var required = messages[i].indexOf('required');
    // 		if(required > 0) {

    // 		}
    // 		else {
    // 			errorShow.push(messages[i]);
    // 		}
    // 	}

    // 	this.setState({ errors: errorShow});

    // 	if(messages.length > 0) {
    // 		return false;
    // 	}
    // 	else {
    // 		return true;
    // 	}
    // }

    // async success(profile) {
    // 	console.log("profile: ", profile);
    // 	await AsyncStorage.setItem("roleid", profile.RoleId);
    // 	await AsyncStorage.setItem("userid", profile.userid);
    // 	await AsyncStorage.setItem("authToken", profile.AuthToken);
    // 	await AsyncStorage.setItem("profile", JSON.stringify(profile));
    // 	this.props.navigation.navigate('RealEstateHome')
    // 	this.setState({ loading: false });
    // }

    onRegister = async () => {
        //this.props.navigation.navigate('Home')
        if (!this.state.avatarSource) {
            this.common.showToast('Please Select your Profile Picture');

        }
        else if (!this.state.fname) {
            this.common.showToast('Please enter your First Name');
            this.fname.focus()
        }
        else if (!this.state.lname) {
            this.common.showToast('Please enter your Last Name');
            this.lname.focus()
        }
        else if (!this.state.email) {
            this.common.showToast('Please enter your Email ID');
            this.email.focus()
        }
        else if (this.state.email && !this.common.validateEmail(this.state.email)) {
            this.common.showToast('Please enter valid Email ID');
            this.email.focus()
        }
        else if (!this.state.phone) {
            this.common.showToast('Please enter your Phone Number');
            this.phone.focus()
        }
        else if (this.state.phone && !this.common.validatePhone(this.state.phone)) {
            this.common.showToast('Please enter valid Phone Number');
            this.phone.focus()
        }
        else if (!this.state.password) {
            this.common.showToast('Please enter your Password');
            this.password.focus()
        }
        else if (!this.state.confirmPassword) {
            this.common.showToast('Please enter your Confirm Password');
            this.confirmPassword.focus()
        }
        else if (!this.state.Age) {
            this.common.showToast('Please enter your Age');
            this.Age.focus()
        }
        else if (!this.state.Status) {
            this.common.showToast('Please enter your status');
            this.Status.focus()
        }
        else if (!this.state.address) {
            this.common.showToast('Please enter your Address');
            this.address.focus()
        }
        else {
            this.props.navigation.navigate('Home')
        }
        return false;
    }

    // async getRequestData() {
    // 	const deviceId = await AsyncStorage.getItem("deviceId");
    // 	const fcmToken = await AsyncStorage.getItem("fcmToken");

    // 	return {
    // 		"roleid": this.state.role,
    // 		"fname": this.state.fname,
    // 		"lname": this.state.lname,
    // 		"emailid": this.state.email,
    // 		"mobileno": this.state.phone,
    // 		"password": this.state.password,
    // 		"profilepic": this.state.profilePic,
    // 		"loginprovider": "",
    // 		"providerkey": "",
    // 		"address": this.state.address,
    // 		"country": "USA",
    // 		"state": this.state.state,
    // 		"city": this.state.city,
    // 		"zipcode": this.state.zipcode,
    // 		"deviceid": deviceId,
    // 		"fcmregid": fcmToken,
    // 		"title": this.state.title,
    // 		"Age": this.state.Age,
    // 		"assistancename": this.state.assistantName,
    // 		"assistanceemail": this.state.assistantEmail,
    // 	}
    // }

    // UploadPicture() {
    // 	ImagePicker.showImagePicker(options, (response) => {
    // 		console.log('Response = ', response);

    // 		if (response.didCancel) {
    // 			console.log('User cancelled image picker');
    // 		} else if (response.error) {
    // 			console.log('ImagePicker Error: ', response.error);
    // 		} else if (response.customButton) {
    // 			console.log('User tapped custom button: ', response.customButton);
    // 		} else {
    // 			this.uploadPicApi(response);
    // 		}
    // 	});
    // }

    // async uploadPicApi(response) {
    // 	this.setState({ loading: true });
    // 	var body = new FormData();
    // 	var pic = response;
    // 	body.append('file', { uri: response.uri, name: response.fileName, filename: response.fileName, type: response.type });
    // 	var response = await new API('UploadPic', body).getResponse();
    // 	console.log("file response: ", response);
    // 	this.setState({ loading: false });
    // 	try {
    // 		if (response.statuscode == 200 && response.result) {
    // 			this.setState({
    // 				profilePic: response.result[0].mediaName
    // 			});
    // 			const source = { uri: pic.uri };
    // 			this.setState({
    // 				avatarSource: source,
    // 			});
    // 		}
    // 		else {
    // 			throw 'API Error in Upload Photo API';
    // 		}
    // 	} catch (error) {
    // 		this.setState({ loading: false });
    // 		console.log('error: ', error);
    // 	}
    // }




    render() {
        if (this.state.loading) {
            return <Loader />
        }
       

        return (
            <Root>
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
                            <Icon type="font-awesome" name='phone' color="#FFF" size={20}  />
                        </Button>
                    </Right>
                </Header>
                <ScrollView
                    ref='_scrollView'
                >
                    <View style={styles.container}>
                        <View style={styles.registerImageContainer}>
                            <Avatar
                                showEditButton
                                editButton={{
                                    name: 'mode-edit', 
                                    type: 'material', 
                                    color: '#fff',
                                }}
                                size={100}
                                overlayContainerStyle={{ backgroundColor: '#FFF' }}
                                rounded
                                title="Profile    Photo"
                                titleStyle={{ color: '#333', fontSize: 15, }}
                                containerStyle={{ borderColor: '#d6d6c2', borderWidth: 2 }}
                                source={this.state.avatarSource}
                                imageProps={{ resizeMode: 'cover' }}
                                onEditPress={() => this.props.navigation.navigate('EditProfile')}
                            />
                        </View>
                        <View>
                            <Form>
                                {/* <Errors errors={this.state.errors} /> */}
                                <View style={styles.sectionRow}>
                                    <View style={styles.threeRow}>
                                        <Input ref={fname => { this.fname = fname }} value={this.state.fname} onChangeText={(text) => this.setState({ 'fname': text })} placeholder="First Name" inputStyle={[styles.font15]} />
                                    </View>
                                    <View style={styles.threeRow}>
                                        <Input ref={lname => { this.lname = lname }} value={this.state.lname} onChangeText={(text) => this.setState({ 'lname': text })} placeholder="Last Name" inputStyle={[styles.font15]} />
                                    </View>
                                </View>
                                <Input ref={email => { this.email = email }} keyboardType="email-address" value={this.state.email} onChangeText={(text) => this.setState({ 'email': text })} placeholder="Email" inputStyle={[styles.font15]} />
                                <Input ref={phone => { this.phone = phone }} keyboardType="numeric" value={this.state.phone} onChangeText={(text) => this.setState({ 'phone': text })} placeholder="Phone No" inputStyle={[styles.font15]} />
                                <Input ref={Age => { this.Age = Age }} value={this.state.Age} onChangeText={(text) => this.setState({ 'Age': text })} placeholder="Age" inputStyle={[styles.font15]} />
                                <View style={{ marginTop: 10, marginLeft: 10, color: 'gray' }}>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>Select Gender</Text>
                                </View>
                                <View style={styles.sectionRow}>
                                    <View style={{}}>
                                    <CheckBox
                                        size={1}
                                        center
                                        title='Male'
                                        iconRight
                                        iconType='material'
                                        checked={this.state.checked}
                                        containerStyle={{borderColor:"#333", borderWidth:1}}
                                        textStyle={{fontSize:13}}
                                    />
                                    </View>
                                    <View>
                                    <CheckBox
                                        size={1}
                                        center
                                        title='Female'
                                        iconRight
                                        iconType='material'
                                        checked={this.state.checked}
                                        containerStyle={{borderColor:"#333", borderWidth:1}}
                                        textStyle={{fontSize:13}}
                                    />
                                    </View>
                                    <View>
                                    <CheckBox
                                        size={1}
                                        center
                                        title='Other'
                                        iconRight
                                        iconType='material'
                                        checked={this.state.checked}
                                        containerStyle={{borderColor:"#333", borderWidth:1}}
                                        textStyle={{fontSize:13}}
                                    />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10, color: 'gray' }}>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>Active Live</Text>
                                    <View style={{ marginLeft: 15 }}>
                                        <Icon
                                            name='circle'
                                            type='font-awesome'
                                            color='#0b6be6'
                                            size={16}
                                            onPress={() => console.log('hello')} />
                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Icon
                                            name='circle'
                                            type='font-awesome'
                                            color='black'
                                            size={16}
                                            onPress={() => console.log('hello')} />
                                    </View>
                                </View>
                                <Input ref={Status => { this.Status = Status }} value={this.state.Status} onChangeText={(text) => this.setState({ 'Status': text })} placeholder="Enter Status" inputStyle={[styles.font15]} />
                                <View style={{ marginTop: 10, marginLeft: 10, color: 'gray' }}>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>Enter Drinks/Appetizer</Text>
                                </View>
                                <View style={styles.sectionRow}>
                                    <View style={styles.threeRow}>
                                        <Input value={this.state.fname} onChangeText={(text) => this.setState({ '': text })} placeholder="1" inputStyle={[styles.font15]} />
                                    </View>
                                    <View style={styles.threeRow}>
                                        <Input  onChangeText={(text) => this.setState({ '': text })} placeholder="2" inputStyle={[styles.font15]} />
                                    </View>
                                </View>
                                <View style={[{ marginTop: 20, marginBottom: 20, marginLeft: 10 }]}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePassword')}>
                                        <Text style={{ borderBottomColor: 'gray', borderBottomWidth: 1, width: '50%' }}>Change Password</Text>
                                    </TouchableOpacity>
                                </View>
                            </Form>
                        </View>
                    </View>
                </ScrollView>
            </Root>
        );
    }
}