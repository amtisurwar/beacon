import React, { Component } from 'react';
import { Platform, StyleSheet, Text, PermissionsAndroid, Alert, View, ScrollView, ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import GPSState from 'react-native-gps-state';


export default class GPSHandler extends Component {
    constructor(props) {
        super(props)
       
    }
    componentDidMount() {
        this.getPermission()      
    }

    getPermission(){
		GPSState.addListener((status)=>{
			switch(status){
				case GPSState.NOT_DETERMINED:
					console.log("NOT_DETERMINED")
					GPSState.requestAuthorization(GPSState.AUTHORIZED_WHENINUSE)
					// alert('Please, allow the location, for us to do amazing things for you!')
				break;
	 
				case GPSState.RESTRICTED:
                        console.log("RESTRICTED")
					GPSState.openLocationSettings()
				break;
	 
				case GPSState.DENIED:
                        console.log("DENIED")
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

    
    componentWillUnmount(){
		// GPSState.removeListener()
	}
	

    

    render() {
        return null;
    }
}
