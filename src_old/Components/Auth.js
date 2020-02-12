import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Linking, PermissionsAndroid, Alert, View, ScrollView, ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';
import Splash from '../Container/Splash';
import Notification from './Notification';
import GPSHandler from './GPSHandler';
import Background from './Background';
import { withNavigation } from 'react-navigation';
import LocationTracking from './LocationTracking';


class Auth extends Component {
	constructor(props) {
		super(props)
		this.state = {
			credentials: {},
		}
	}
	componentDidMount() {
		this._bootstrapAsync();
	}


	async getRememberCredentials() {
		var rememberUsername = await AsyncStorage.getItem("rememberUsername");
		var rememberPassword = await AsyncStorage.getItem("rememberPassword");
		if (rememberUsername && rememberPassword) {
			var data = { rememberUsername: rememberUsername, rememberPassword: rememberPassword }
			this.setState({ credentials: data })
		}
	}

	_bootstrapAsync = async () => {
		var UserId = await AsyncStorage.getItem("UserId");
		setTimeout(() => {
			if (UserId) {
				this.props.navigation.navigate('Home');
			}
			else {
				this.props.navigation.navigate('Auth');
			}
		}, 4000)
	};

	render() {
		return (
			<View>
				<Splash />
				<Notification />
				<GPSHandler />
				{/* <LocationTracking /> */}
				<Background />
			</View>
		)
	}
}

export default withNavigation(Auth);