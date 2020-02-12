import React, { Component } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import Geolocation from '@react-native-community/geolocation';
// import DeviceSettings from 'react-native-device-settings';
import GPSState from 'react-native-gps-state';
import Common from '../Container/Common'
import {
    AsyncStorage,
} from 'react-native';
export default class Background extends Component {
    constructor(props) {
        super(props)
        this.common = new Common();
    }

    async componentDidMount() {
        BackgroundTimer.runBackgroundTimer(() => {
            AsyncStorage.getItem("UserId").then( UserId => {
                if(UserId) {
                    if(GPSState.isAuthorized()) {
                        console.log("running background",UserId)
                        this.getLocation();
                    }
                }
                
            });            
        },
        15 * 60 * 1000);
    }

    getLocation() {
        Geolocation.getCurrentPosition(
            position => {
                this.common.updateLocation(position);
            },
            error => {  
                console.log("background gps error: ",error)
            },
        );
    }

    componentWillUnmount(){
        // GPSState.removeListener()
        // BackgroundTimer.stopBackgroundTimer();
        // delete this.common;
    }

    render() {
        return null;
    }
}
