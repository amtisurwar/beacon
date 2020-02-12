import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import styles from '../../assets/style/style.js';

export default class Splash extends Component {
	constructor(props) {
	   super(props);
	}
  	render() {
    	return (
        <View style={styles.splash}>
        	<Image style={styles.imageThumbnail} resizeMode="contain" source = {require('../../assets/images/Splash.jpg')} />
          </View>
    	);
  	}
}