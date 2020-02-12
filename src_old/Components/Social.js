import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, ActivityIndicator, NativeModules, StatusBar, AsyncStorage} from 'react-native';
import { LoginManager,LoginButton,AccessToken,GraphRequest,GraphRequestManager } from 'react-native-fbsdk';
import Loader from './Loader';
import API from '../Api/Api';
import Common from '../Container/Common';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

export default class Social extends Component {
	constructor(props) {
	   super(props);
	   this.state = {
			loading: false,
			errors: [],
			loading2: false,
	   }
	   this.common = new Common();

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
		this.setState({loading2:true})
		var request = {"EmailId": user.email}
		// var request = {"EmailId": "sdfhs@gmail.com"}
		var response = new API('validateUser',request).getResponse();
		response.then(result => {
			console.log("result 2 : ",result)
			if (result.StatusCode == 200 && result.Data.UserId) {
				this.setState({loading2:false})
				console.log("if block")
				this.socialSuccess(result.Data)	
			}
			else {
				console.log("else block")
				this.setState({loading2:false})
				this.socialFailure(user,provider);
			}
		}).catch(error => {
			console.log("error : ",error)
			this.setState({loading2:false})
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
		this.setState({loading2: false})	
	}

	async socialSuccess(profile) {
		console.log("profile : ",profile)
		await AsyncStorage.setItem("UserId", profile.UserId.toString());
    
		await AsyncStorage.setItem("profile", JSON.stringify(profile));
		

		this.props.navigation.navigate('App')
		
		this.setState({ loading: false });
	}

	
	facebookLogin() {
		// this.setState({loading: true});
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
				this.throwSocialError("Failed to login with facebook");
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
							this.throwSocialError("Failed to login with facebook");
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
		// this.setState({loading: true});
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

	render() {
		if(this.state.loading2) {
			return <Loader />
		}
	}

}