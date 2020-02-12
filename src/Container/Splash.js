import React, {Component} from 'react';
import {Platform, StatusBar, Alert, StyleSheet, Text, View, ScrollView, Image, ImageBackground} from 'react-native';
import styles from '../../assets/style/style.js';
export default class Splash extends Component {
	constructor(props) {
	   super(props);
	}

	
  	render() {
    	return (
			<ImageBackground source={require('../../assets/images/Splash.gif')} style={{width: '100%', height: '100%'}}>
				<Text style={{color:'#FFF', position:'absolute', bottom:50, left:'45%'}}>V 1.0.5</Text>
			</ImageBackground>
    	);
  	}
}