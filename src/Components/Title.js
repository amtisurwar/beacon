import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Alert, View, ScrollView, StatusBar, AsyncStorage} from 'react-native';

export default class Title extends Component {
	constructor(props) {
	   	super(props)	   	
	}

  	render() {
    	return <StatusBar barStyle="light-content" />
  	}
}
