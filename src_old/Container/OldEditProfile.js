import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, BackHandler, AsyncStorage, PermissionsAndroid, Platform } from 'react-native';
import styles from '../../assets/style/style2.js';
import {
    Container, Header, Content, Button, Card, CardItem,
    Text, Body, Form, Item, Root, Left, Right, Title
} from 'native-base';
//import Geolocation from '@react-native-community/geolocation';
import { CheckBox, Avatar, Input, Icon } from 'react-native-elements';
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

export default class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarSource: '',
            ProfilePic: '',
            Fname: '',
            Lname: '',
            EmailId: '',
            profile: [],
            MobileNumber: '',
            type: 'sign_up',
            Password: '',
            confirmPassword: '',
            Age: '',
            Status: '',
            Gender: this.props.Gender || "",
            LiveStatus: '',
            active: '1',
            passive: '0',
            ProviderKey: '',
            ProviderName: '',
            DrinksAppetizer: '',
            isVisible: false,
            showgps: false,
            loading: false,
            errors: [],
            submit: false,
        }
        this.common = new Common();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount(){
        this.setProfile()
    }

    componentDidUpdate(prevProps, prevState) {
		if(this.props.navigation.getParam('profile') !== prevProps.navigation.getParam('profile')) {
			this.setProfile()
		}
	}

    async setProfile() {
        var profile = JSON.parse(await AsyncStorage.getItem("profile"));
        this.setState({
            Fname: profile.Fname,
            Lname: profile.Lname,
            EmailId: profile.EmailId,
            MobileNumber: profile.MobileNumber,
            Password: profile.Password,
            Age: profile.Age,
            Status: profile.Status,
            Gender: profile.Gender,
            LiveStatus: profile.FnaLiveStatusme,
            DrinksAppetizer: profile.Fname,
			avatarSource: {uri:profile.ProfilePic}
        })
    }

    async success(profile) {
    	console.log("profile: ", profile);
    	await AsyncStorage.setItem("roleid", profile.RoleId);
    	await AsyncStorage.setItem("userid", profile.userid);
    	await AsyncStorage.setItem("authToken", profile.AuthToken);
    	await AsyncStorage.setItem("profile", JSON.stringify(profile));
    	this.props.navigation.navigate('RealEstateHome')
    	this.setState({ loading: false });
    }

    onRegister = async () => {
        if (!this.state.avatarSource) {
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
        else if (!this.state.EmailId) {
            this.common.showToast('Please enter your Email ID');
            this.EmailId.focus()
        }
        else if (this.state.email && !this.common.validateEmail(this.state.email)) {
            this.common.showToast('Please enter valid Email ID');
            this.email.focus()
        }
        else if (!this.state.MobileNumber) {
            this.common.showToast('Please enter your Phone Number');
            this.MobileNumber.focus()
        }
        else if (this.state.MobileNumber && !this.common.validatePhone(this.state.MobileNumber)) {
            this.common.showToast('Please enter valid Phone Number');
            this.MobileNumber.focus()
        }
        else if (!this.state.Password) {
            this.common.showToast('Please enter your Password');
            this.Password.focus()
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
        else {
            this.setState({ loading: true });
			await this.getRequestData().then(data => {
				var response = new API('AgentProfile', data).getResponse();
				response.then(result => {
					console.log("profile result: ", result)
					if (result.StatusCode == 200) {
						this.success(result.Data);
					}
					else {
						var errors = [];
						errors.push(result.message);
						this.setState({ errors: errors })
					}
				})
			});
			this.setState({ loading: false });
		}
		return false;
    }

    async getRequestData() {

    	return {
            "ProfilePic": this.state.profilePic,
            "Fname": this.state.Fname,
            "Lname": this.state.Lname,
            "EmailId": this.state.EmailId,
            "MobileNumber": this.state.MobileNumber,
            "Password": this.state.Password,
            "Status": this.state.Status,
            "Age": this.state.Age,
            "Gender": this.state.Gender,
            "DeviceId": "xxxxxx",
            "FCMToken": "xxxxxxxxxxx",
            "ProviderKey":this.state.ProviderKey,
            "LiveStatus":this.state.LiveStatus,
			"DrinksAppetizer":this.state.DrinksAppetizer,
            "ProviderName":this.state.ProviderName,
    	}
    }

    UploadPicture() {
		ImagePicker.showImagePicker(options, (response) => {


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

	async successProfileImg(result, pic) {
		var profile = JSON.parse(await AsyncStorage.getItem("profile"));
		var profileUrl = result[0].mediaSource;
		this.setState({
			profilePic: profileUrl
		});
		const source = { uri: profileUrl };
		this.setState({
			avatarSource: source,
		});
		profile.ProfilePic = profileUrl;
		await AsyncStorage.setItem("profile", JSON.stringify(profile));
	}

	async uploadPicApi(response) {
		this.setState({ loading: true });
		var body = new FormData();
		var pic = response;
		var UserId = await AsyncStorage.getItem("UserId");
		body.append('file', { uri: response.uri, name: response.fileName, filename: response.fileName, type: response.type });
		body.append('recordid', UserId);
		var response = await new API('UploadPic', body).getResponse();
		this.setState({ loading: false });
		try {
			if (response.statuscode == 200 && response.Data) {
				this.successProfileImg(response.Data, pic);
			}
			else {
				throw 'API Error in Upload Photo API';
			}
		} catch (error) {
			this.setState({ loading: false });

		}
	}

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
    
      handleBackButtonClick() {
          this.props.navigation.goBack(null);
          return true;
      }


    render() {
        if (this.state.loading) {
            return <Loader />
        }
        // var fname = !this.state.fname && this.state.submit ? true : false;
        // var lname = !this.state.lname && this.state.submit ? true : false;
        // var email = !this.state.email && this.state.submit ? true : false;
        // var phone = !this.state.phone && this.state.submit ? true : false;
        // var Age = !this.state.Age && this.state.submit ? true : false;
        // var Status = !this.state.Status && this.state.submit ? true : false;
        // var Male = !this.state.Male && this.state.submit ? true : false;
        // var Female = !this.state.Female && this.state.submit ? true : false;
        // var Transgender = !this.state.Transgender && this.state.submit ? true : false;
        // var password = !this.state.password && this.state.submit ? true : false;
        // var confirmPassword = !this.state.confirmPassword && this.state.submit ? true : false;


        return (
            <Root>
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
                        <Button transparent>
                        <Icon type="font-awesome" name='check' color="#FFF" />
                        </Button>
                    </Right>
                </Header>
                <ScrollView
                    ref='_scrollView'
                >
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
                            />
                        </View>
                        <View>
                            <Form>
                                {/* <Errors errors={this.state.errors} /> */}
                                <View style={styles.sectionRow}>
                                <View style={styles.threeRow}>
                                        <Input ref={Fname => { this.Fname = Fname }} value={this.state.Fname} onChangeText={(text) => this.setState({ 'Fname': text })} placeholder="First Name" inputStyle={[styles.font15]} />
                                    </View>
                                    <View style={styles.threeRow}>
                                        <Input ref={Lname => { this.Lname = Lname }} value={this.state.Lname} onChangeText={(text) => this.setState({ 'Lname': text })} placeholder="Last Name" inputStyle={[styles.font15]} />
                                    </View>
                                </View>
                                <Input ref={Email => { this.Email = Email }} keyboardType="email-address" value={this.state.Email} onChangeText={(text) => this.setState({ 'Email': text })} placeholder="Email" inputStyle={[styles.font15]} />
                                <Input ref={MobileNumber => { this.MobileNumber = MobileNumber }} keyboardType="numeric" value={this.state.MobileNumber} onChangeText={(text) => this.setState({ 'MobileNumber': text })} placeholder="Phone No" inputStyle={[styles.font15]} />
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
                                            containerStyle={{ borderColor: "#333", borderWidth: 1 }}
                                            textStyle={{ fontSize: 13 }}
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
                                            containerStyle={{ borderColor: "#333", borderWidth: 1 }}
                                            textStyle={{ fontSize: 13 }}
                                        />
                                    </View>
                                    <View>
                                        <CheckBox
                                            size={1}
                                            center
                                            title='Transgender'
                                            iconRight
                                            iconType='material'
                                            checked={this.state.checked}
                                            containerStyle={{ borderColor: "#333", borderWidth: 1 }}
                                            textStyle={{ fontSize: 13 }}
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
                                            size={16} />
                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Icon
                                            name='circle'
                                            type='font-awesome'
                                            color='black'
                                            size={16} />
                                    </View>
                                </View>
                                <Input ref={Status => { this.Status = Status }} value={this.state.Status} onChangeText={(text) => this.setState({ 'Status': text })} placeholder="Enter Status" inputStyle={[styles.font15]} />
                                <View style={{ marginTop: 10, marginLeft: 10, color: 'gray' }}>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>Enter Drinks/Appetizer</Text>
                                </View>
                                <View style={styles.sectionRow}>
                                    <View style={styles.threeRow}>
                                        <Input value={this.state.DrinksAppetizer} onChangeText={(text) => this.setState({ 'DrinksAppetizer': text })} placeholder="1" inputStyle={[styles.font15]} />
                                    </View>
                                    <View style={styles.threeRow}>
                                        <Input onChangeText={(text) => this.setState({ 'DrinksAppetizer': text })} placeholder="2" inputStyle={[styles.font15]} />
                                    </View>
                                </View>
                            </Form>
                        </View>
                    </View>
                </ScrollView>
            </Root>
        );
    }
}