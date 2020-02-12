import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Image, AsyncStorage} from 'react-native';
// import styles from '../../../assets/styles/style.js';
import { CheckBox, Avatar, Icon, Input } from 'react-native-elements';
import API from '../../Api/Api';
import Toast from 'react-native-simple-toast'
import GPSState from 'react-native-gps-state';


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

	getCurrentDate(yesterday) {
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		if(yesterday) {
			dd = String(today.getDate() - 1).padStart(2, '0');
		}
		
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy;
		return today
	}

	getGPSPermission(){
		console.log("getGPSPermission invoked")
		GPSState.addListener((status)=>{
			switch(status){
				case GPSState.NOT_DETERMINED:
					GPSState.requestAuthorization(GPSState.AUTHORIZED_WHENINUSE)
					console.log("NOT_DETERMINED")
					// alert('Please, allow the location, for us to do amazing things for you!')
				break;
	 
				case GPSState.RESTRICTED:
					GPSState.openLocationSettings()
					console.log("RESTRICTED")
				break;
	 
				case GPSState.DENIED:
					console.log("DENIED")
                    return false
				break;
	 
				case GPSState.AUTHORIZED_ALWAYS:
                        console.log("AUTHORIZED_ALWAYS")
					//TODO do something amazing with you app
				break;
	 
				case GPSState.AUTHORIZED_WHENINUSE:
                        console.log("AUTHORIZED_WHENINUSE")
					//TODO do something amazing with you app
				break;
				default:
					console.log("default state: ",GPSState)
			}
		})
		GPSState.requestAuthorization(GPSState.AUTHORIZED_WHENINUSE)
	}
	
	async updateLocation(position) {
		var profile = JSON.parse(await AsyncStorage.getItem('profile'));
		var authToken = profile.Authentication
		var UserId = profile.UserId
		var header = { "authentication": authToken };
		var data = { 
			"UserId": UserId,
			"Latitude": position.coords.latitude,
			"Longitude": position.coords.longitude
		}
		return new API('LocationUpdate', data, header).getResponse();
		// console.log("data: ",data, "header: ",header,"response: ",response)
	}
	

	
	
}