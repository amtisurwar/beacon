import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Alert, View, ScrollView, StatusBar, AsyncStorage} from 'react-native';
import {
    Button
} from "native-base";
import { Icon } from 'react-native-elements';

export default class Call extends Component {
	constructor(props) {
	   	super(props)	   	
	}

  	render() {
    	return(
			<Button transparent>
				<Icon type="font-awesome" name='phone' color="#FFF" size={20} />
			</Button>
		)
  	}
}
