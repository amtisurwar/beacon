import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Alert, View, ScrollView, StatusBar, AsyncStorage} from 'react-native';
import signalr from 'react-native-signalr';
import PeopleContext from '../Context/PeopleContext';

export default class Title extends Component {

    static contextType = PeopleContext;
    
	constructor(props) {
	   	super(props)	   	
    }
    
    componentDidMount() {
        this.getConnection()
    }

    setRemoteData(data) {
        console.log("StatusCode called",data,this.context)
        this.context.fetchRemote(data);
    }

    getConnection = async () => {
        var profile = JSON.parse(await AsyncStorage.getItem('profile'))
        //This is the server under /example/server published on azure.
        const connection = signalr.hubConnection('http://beacon.demoappstore.com/');
        connection.logging = true;
        console.log("connection: ",connection);
        const proxy = connection.createHubProxy('beaconhub');
        //receives broadcast messages from a hub function, called "helloApp" //clientnearplaceusers
        proxy.on('clientnearplaceusers', (argOne, argTwo, argThree, argFour) => {
        console.log('message-from-server', argOne, argTwo, argThree, argFour);
            if(argOne.StatusCode == 200) 
            {
                
                this.setRemoteData(argOne.Data)
                
            }
            //Here I could response by calling something else on the server...
        });

        
        // atempt connection, and handle errors
        connection.start().done(() => {
            console.log('Now connected, connection ID=' + connection.id, profile);
            
            proxy.invoke('ServerNearPlaceUsers', {"UserId": profile.UserId, Gender: '', Age: ''})//ServerNearPlaceUsers values of Current user: {"UserId":"112","Gender":"Male","Age":"25"}
            .done((directResponse) => {
                console.log('direct-response-from-server', directResponse);
            }).fail(() => {
                console.warn('Something went wrong when calling server, it might not be up and running?')
            });
    
        }).fail(() => {
            console.log('atempt connection Failed');
        });

        //connection-handling
        connection.connectionSlow(() => {
            console.log('We are currently experiencing difficulties with the connection.')
        });

        connection.error((error) => {
            const errorMessage = error.message;
            let detailedError = '';
            if (error.source && error.source._response) {
              detailedError = error.source._response;
            }
            if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
              console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
            }
            console.debug('SignalR error: ' + errorMessage, detailedError)
        });


    }

  	render() {
    	return null;
  	}
}
