import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, ActivityIndicator, StatusBar, AsyncStorage} from 'react-native';
import Splash from '../Container/Splash';
import { withNavigation } from 'react-navigation';


class Auth extends Component {
	constructor(props) {
	   super(props);
	}
	componentDidMount() {
	   this._bootstrapAsync();
	}

	_bootstrapAsync = async () => {
		var role = await AsyncStorage.getItem("roleid");
		setTimeout( () => {
			if(role) {
				this.props.navigation.navigate('Login');
			}
			else {
				this.props.navigation.navigate('Login');
			}
		},2000)
	};

  	render() {
    	return(
    		<View>
    			<Splash />
    		</View>
    	)
  	}
}

export default withNavigation(Auth);