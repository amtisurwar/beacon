import React, { Component } from 'react';
import { Platform, Image, StyleSheet, Text, Alert, View, ScrollView, StatusBar, AsyncStorage, TouchableOpacity } from 'react-native';
import {Avatar} from 'react-native-elements';
import PeopleContext from '../Context/PeopleContext';

export default class UserInfo extends Component {
	constructor(props) {
		super(props)
	}
	static contextType = PeopleContext;

	componentDidMount(){
	}

	render() {
		return(
		<View style={styles.userWrapper}>
			<View style={{alignItems:'center'}}>
				{this.props.user.ProfilePic ? <Avatar 
					source={{ uri: this.props.user.ProfilePic }}
					rounded
					size="large"
					containerStyle={{marginBottom:10}}
				/> : <Avatar 
					rounded
					icon={{name: 'user', type: 'font-awesome'}}
					size="large"
					containerStyle={{marginBottom:10}}
				/>}
				
				{!this.props.hideDistance && <Text style={styles.otherText}>{this.props.user.Distance}</Text>}
			</View>
			<View style={styles.midWrapper}>
				<Text style={styles.name}>{this.props.user.Fname} {this.props.user.Lname}</Text>
				<Text style={styles.otherText}>{this.props.user.Status}</Text>
				<Text style={styles.otherText}>{this.props.user.DrinksAppetizer}</Text>
				<Text style={styles.otherText}>{this.props.user.DrinksAppetizer_1}</Text>
			</View>
			
			{this.props.user.Interested == 0 && <View style={{justifyContent:'center'}}>
				<TouchableOpacity onPress={() => this.context.blueClick(this.props.user)}>
					<View style={[styles.blue, styles.box]}></View>
				</TouchableOpacity>
				{!this.props.hideGreyBox && <TouchableOpacity onPress={() => this.context.greyClick(this.props.user)} style={[styles.grey, styles.box]}></TouchableOpacity>}
				<TouchableOpacity onPress={() => this.context.blackClick(this.props.user)}>
					<View style={[styles.black, styles.box]}></View>
				</TouchableOpacity>
			</View>}
			
			{this.props.user.Interested == 1 && <View style={{justifyContent:'flex-end', bottom:10}}>
				<Text style={{color:'#1163E6', fontWeight:'bold'}}>Interested</Text>
			</View>}
			
		</View>
		)
	}
}

const styles = StyleSheet.create({
   userWrapper: {
		flexDirection:'row',
		marginVertical:5,
		// borderWidth:1,
		paddingHorizontal:10,
	},
	name: {
		fontSize: 15,
		color: "#333",
		fontWeight:'bold'
	},
	otherText: {
		color: "#333",
		marginVertical:5,
	},
	midWrapper: {
		flex:1,
		marginHorizontal:10,
	},
	blue: {
		backgroundColor: '#1163E6'
	},
	grey: {
		backgroundColor: '#D7D7D7',
	},
	black: {
		backgroundColor: 'black',
	},
	box: {
		width: 30, height: 30,
		marginVertical:8,
		borderRadius:3
	}
});
