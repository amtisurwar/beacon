import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, Text, View, ScrollView, Image, ImageBackground} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import GPSState from 'react-native-gps-state';
import Geolocation from '@react-native-community/geolocation';

export default class LocationTracking extends Component {
	constructor(props) {
	   super(props);
	}
    
    componentDidMount() {
      
        // BackgroundTimer.runBackgroundTimer(() => {
        //     if(GPSState.isAuthorized()) {
        //       console.log("LocationTracking status: ",GPSState.getStatus())
        //         this.findCoordinates()
        //     }
        //     console.log("background running");
        // },
        // 5000);  
    }

    findCoordinates = () => {
        Geolocation.getCurrentPosition(
          position => {
            console.log("position: ",position)
          },
          error => console.log("position error: ",error),
          { enableHighAccuracy: true }
        );      
    }
	
  	render() {
    	return null
  	}
}