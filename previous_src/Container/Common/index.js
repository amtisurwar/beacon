import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Image, AsyncStorage} from 'react-native';
// import styles from '../../../assets/styles/style.js';
import { CheckBox, Avatar, Icon, Input } from 'react-native-elements';
//import API from '../../Api/Api';
import Toast from 'react-native-simple-toast'


export default class Common {
	constructor() {
	}

	validateEmail(email) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
		{
			return true;
		}
		return false;
	}

	validatePhone(phone)
	{
		var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
		return phone.match(phoneno) ? true : false;
	}

	validateZipCode(zipcode){
		var zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
		return zipCodePattern.test(zipcode);
	}

	getIcon() {
		return <Icon name='times-circle-o' color='red' type='font-awesome' />
	}
	leftIcon() {
		return <Icon name='times-circle-o' color='calendar-week' type='font-awesome' />
	}

	showToast(msg) {
		return (
			Toast.show(msg)
		)
	}
	

	
	
}