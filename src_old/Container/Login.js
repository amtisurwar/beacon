import React, { Component } from "react";
import { Image, ImageBackground, ScrollView, ListView, TouchableHighlight, TouchableOpacity, AsyncStorage } from "react-native";
import styles from '../../assets/style/style.js';
import {
  Container, Title, Content, Button, Text, Left, Body, Right, Card, CardItem, Header, Picker,
  List, Item, Input, ListItem, Spinner, View, Label, H3, Form, CheckBox, Row, Col, Grid, Badge, CardList, Footer
} from "native-base";
import Common from './Common/index';
import API from '../Api/Api';
import Loader from '../Components/Loader';
// import Social from '../Components/Social';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { LoginManager,LoginButton,AccessToken,GraphRequest,GraphRequestManager } from 'react-native-fbsdk';
import GPSHandler from '../Components/GPSHandler';
import GPSState from 'react-native-gps-state';

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errors: [],
			remember: false,
			loading: false,
    }
    this.common = new Common();
  }
  

  componentDidMount() {
		this.setRemember();
		this.getGPS()
  }

  getGPS() {
	// console.log("GPSState.isAuthorized(): ",GPSState,GPSState.isAuthorized())
	// if(!GPSState.isAuthorized()) {
		
	// 	GPSState.requestAuthorization(GPSState.AUTHORIZED_ALWAYS)
	// }
	GPSState.getStatus().then((status)=>{
		console.log("GPS status: ",status)
		
	})
	// console.log("this.common.getGPSPermissionStatus(): ",this.common.getGPSPermissionStatus());
  }

  socialUserRegister = (user, provider) => {
		
		var parseUser = '';
		if(provider == 'google') {
			parseUser = this.parseGoogleData(user);
		}
		else if(provider == 'facebook') {
			parseUser = this.parseFacebookData(user);
			this.validateUserExist(parseUser, provider);
		}
		else if(provider == 'twitter') {
			parseUser = this.parseTwitterData(user);
		}
		if(parseUser != '') {
			console.log("parseUser: ",parseUser)
			this.validateUserExist(parseUser, provider);
		}
		else {
			this.throwSocialError('Unable to parse the social detal');
		}	
	}

	validateUserExist(user, provider) {
		this.setState({loading:true})
		var request = {"EmailId": user.email}
		// var request = {"EmailId": "sdfhs@gmail.com"}
		var response = new API('validateUser',request).getResponse();
		response.then(result => {
			console.log("result 2 : ",result)
			if (result.StatusCode == 200 && result.Data.UserId) {
				this.setState({loading:false})
				this.socialSuccess(result.Data)	
			}
			else {
				console.log("else block")
				this.setState({loading:false})
				this.socialFailure(user,provider);
			}
		}).catch(error => {
			console.log("error : ",error)
			this.setState({loading:false})
			this.socialFailure(user,provider);
		})
		
	}

	socialFailure(user, provider) {
		this.props.navigation.navigate('Register',{"user":user})
	}

	throwSocialError(error) {
		var errors = [];
		errors.push(error);
		this.common.showToast(error)
		
		// this.setState({errors: errors})	
		this.setState({loading: false})	
		return false;
	}

	async socialSuccess(profile) {
		
		await AsyncStorage.setItem("UserId", profile.UserId.toString());
    
		await AsyncStorage.setItem("profile", JSON.stringify(profile));
		

		this.props.navigation.navigate('App')
		
		this.setState({ loading: false });
	}
	
	
	facebookLogin() {
		// LoginManager.logOut();
		this.setState({loading: true});
		var th = this;
		console.log("changes: ");
		AccessToken.getCurrentAccessToken().then((data) => {
			console.log("accessToken: ",data);
		})
		
		// return false;
		LoginManager.logInWithPermissions(['public_profile','email']).then(
			function(result) {
				console.log("facebook result: ",result)
			  if (result.isCancelled) {
				th.throwSocialError("Failed to login with facebook");
			  } else {
				  AccessToken.getCurrentAccessToken().then((data) => {
					const { accessToken } = data
					fetch('https://graph.facebook.com/v2.5/me?fields=id,first_name,last_name,picture,email,name&access_token=' + accessToken)
					.then((response) => response.json())
					.then((user) => {
						console.log("facebook result user: ",user)
						if(user.name) {
							th.socialUserRegister(user, "facebook");
						}
						else {
							th.throwSocialError("Failed to login with facebook");
						}
						
					})
				})//end accessToken block
			  }
			},
			function(error) {
				console.log("facebook error: ",error);
				this.throwSocialError("Failed to login with facebook");
			}
		);
		
	}

	parseGoogleData(user) {
		return {
			first_name: user.givenName,
			last_name: user.familyName,
			email: user.email,
			photo: user.photo,
			name: user.name,
			id: user.id,
		}
	}

	parseFacebookData(user) {
		return {
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			photo: user.picture.data.url,
			name: user.name,
			id: user.id,
		}
	}

	parseTwitterData(user) {
		return {
			first_name: user.name,
			last_name: '',
			email: user.email,
			photo: '',
			name: user.name,
			id: user.userID,
		}
	}

	twitterLogin() {
		// this.setState({loading: true});
		const Constants = {
			TWITTER_COMSUMER_KEY: "p4Pngm3RCuWsvJCRpvrMuOc4f",
			TWITTER_CONSUMER_SECRET: "IPoHFa5MjtyQbMfTfjk5l24oh2boOnOfYKJTF2fk5Shc939p1G"
		}
		RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
		RNTwitterSignIn.logIn()
		  .then(loginData => {	
			 	if(loginData.userName) {
					this.socialUserRegister(loginData,'twitter')
				}
				else {
					this.throwSocialError("Unable to fetch twitter social data");
				}
			})
		  .catch(error => {
			  this.throwSocialError("Failed to login with twitter");
		  }
		)
	}

	googleLogin = async () => {
		this.setState({loading: true});
		console.log("in")
		GoogleSignin.configure({
			webClientId: '854518678725-u6vn6laod9gd7cn3os2khu0eaojonbsj.apps.googleusercontent.com',
		});
		try {
			// await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
			const userInfo = await GoogleSignin.signIn();
			console.log("google user: ",userInfo);
			if(userInfo.user) {
        this.socialUserRegister(userInfo.user,'google');
			}
			else {
				this.throwSocialError(result.message)
			}
				
		} catch (error) {
			console.log("google error: ",error);
			this.throwSocialError("Failed to login with google");
		}
	}

  async setRemember() {
    var username = await AsyncStorage.getItem('rememberUsername');
    var password = await AsyncStorage.getItem('rememberPassword');
    var remember = await AsyncStorage.getItem('remember');
    
    if(remember) {
      this.setState({
        username: username,
        password: password, 
        remember: remember ? true : false
      })  
    }
    // if(this.props.navigation.getParam('credentials')) {
    //   var credentials = this.props.navigation.getParam('credentials');
    //   if (credentials.rememberUsername && credentials.rememberPassword) {
    //     this.setState({
    //       username: credentials.rememberUsername,
    //       password: credentials.rememberPassword,
    //       remember: credentials.remember
    //     })
    //   }
    // }
  }
  
  async success(profile) {

    await AsyncStorage.setItem("UserId", profile.UserId.toString());
    
    await AsyncStorage.setItem("profile", JSON.stringify(profile));
    
    
    if (this.state.remember) {
      await AsyncStorage.setItem("rememberUsername", this.state.username);
      await AsyncStorage.setItem("rememberPassword", this.state.password);
      await AsyncStorage.setItem("remember", this.state.remember ? "true" : "false");
    }
    else {
      await AsyncStorage.removeItem('rememberUsername')
      await AsyncStorage.removeItem('rememberPassword')
      await AsyncStorage.removeItem('remember')
    }
    
    this.props.navigation.navigate('Home')
    
    this.setState({ loading: false });
    
    }
    

  Login = async () => {
    if (!this.state.username) {
      this.common.showToast('Please Enter your Email')
      this.email.focus()
    }
    else if (this.state.username && !this.common.validateEmail(this.state.username)) {
      this.common.showToast('Please enter valid Email');
      this.email.focus()
    }
    else if (!this.state.password) {
      this.common.showToast('Please Enter your Password')
    }
    else {
			await this.getRequestData().then(data => {
				console.log("login request: ", data);
				var response = new API('Login', data).getResponse();
				console.log("response ", response);
				response.then(result => {
          console.log("login result: ", result);
					if (result.StatusCode == 200 && result.Data.UserId) {
						this.success(result.Data);
          }
          else {
            this.common.showToast(result.Message)
						this.setState({ loading: false });
					}
				}).catch(err => {
          this.common.showToast("User not found")
          this.setState({ loading: false });
        })
			});
		}
  }

  async getRequestData() {

		return {
			"username": this.state.username,
			"password": this.state.password,
			"roleid":"",
			"Deviceid":"",
			"RegId":""
		}
	}

  render() {
    if (this.state.loading) {
      return <Loader />
  }
    return (
      <Container style={styles.container}>
		  {/* <GPSHandler /> */}
        <Content>
          <Row style={styles.logoBack}>
            <Image style={styles.iconImage} source={require('../../assets/images/1024.png')}>
            </Image>
          </Row>
          <View>
            <View style={styles.inputView}>
              <Item style={{ borderBottomColor: '#333' }}>
                <Input style={styles.inputfield}
                  placeholder='Email'
                  onChangeText={(val) => this.setState({ username: val })}
                  value={this.state.username}
                  autoCapitalize='none'
                  maxLength={100}
                  borderColor='#333'
                  selectionColor={'#333'}
                  placeholderTextColor='#333'
                />
              </Item>
              <Item style={{ borderBottomColor: '#333', marginTop: 10 }}>
                <Input style={styles.inputfield}
                  onChangeText={(val) => this.setState({ password: val })}
                  value={this.state.password}
                  selectionColor={'#333'}
                  placeholder='Password'
                  maxLength={14}
                  secureTextEntry
                  autoCapitalize='none'
                  placeholderTextColor='#333'
                />
              </Item>
              <View>
                <View style={[styles.rememberAndForgotWrapper]}>
                  <View style={styles.row}>
                  <CheckBox checked={this.state.remember} onPress={() => this.setState({ remember: !this.state.remember })} checkedColor="#28558E" size={16} containerStyle={styles.loginContainerStyle} color="#808080" style={styles.loginCheckbox} />
                    <Text style={[styles.greyColor, styles.font15]}>Remember Me</Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')} >
                      <Text style={[styles.greyColor, styles.font14]}>Forgot Password?</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 30 }}>
                <Button block style={{ backgroundColor: 'black', borderRadius: 50, width: '50%', alignContent: 'center', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}
                  onPress={() => this.Login()}>
                  <Text style={{ fontSize: 14 }}>Login</Text>
                </Button>
                <Row style={styles.orLabel}>
                  <Label style={{ color: '#333' }}>Or Sign in with:</Label>
                </Row>
              </View>
            </View>
          </View>
        </Content>
        <View style={[styles.bottomView, {backgroundColor:'#1b244d'}]}>
          <Row style={styles.socialRow}>
            <Left>
              <Button block style={styles.fb} onPress={() => this.facebookLogin()}>
                <Image style={styles.icon} source={require("../../assets/images/facebook.jpeg")} />
                {/* <Icon name='logo-facebook' size={18} /> */}
              </Button>
            </Left>
            <Right>
              <Button block style={styles.google} onPress={() => this.googleLogin()}>
                <Image style={styles.icons} source={require("../../assets/images/Google-Plus-Icon.png")} />
                {/* <Icon name='logo-facebook' size={18} /> */}
              </Button>
            </Right>
          </Row>
          <Row>
            <Text style={styles.newUser}>New User? than</Text>
            <TouchableOpacity style={styles.signUptext}><Text style={{ color: '#fff', alignSelf: 'center', alignContent: 'center', justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('Register')} >Sign Up</Text></TouchableOpacity>
          </Row>
        </View>
      </Container >
    );
  }
}