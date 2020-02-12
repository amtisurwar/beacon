import {Platform, StyleSheet, View, ScrollView, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import styles from '../../assets/style/style2.js';
import React, {Component} from 'react';
import { Container, Header, Content, Button, Card, CardItem,
	 Text, Body, Form, Item } from 'native-base';
import { CheckBox, Avatar, Icon, Input, Overlay } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            otp: '',
            errors: '',
            role: 0,
            loading: false,
            submit: false,
            isVisible: false,
            otp: '',
            otpSubmit: false,
            otpResponse: [],
            otpError: [],
        }
    }
    componentDidMount() {
        // this.getData();
    }

    signout() {
        this.setState({isVisible: true});
    }
    cancel() {
        this.setState({isVisible: false});
    }

    async getData() {
        // var deviceId = await AsyncStorage.getItem("deviceId");
        // var fcmToken = await AsyncStorage.getItem("fcmToken");
        // console.log("deviceId: ",deviceId, "fcmToken", fcmToken);
        // var rememberUsername = await AsyncStorage.getItem("rememberUsername");
        // var rememberPassword = await AsyncStorage.getItem("rememberPassword");
        // await AsyncStorage.setItem("deviceId", deviceId);
        // AsyncStorage.clear();
        // await AsyncStorage.setItem("rememberUsername",rememberUsername);
        // await AsyncStorage.setItem("rememberPassword",rememberPassword);
        // console.log("rememberUsername: ",await AsyncStorage.getItem("rememberUsername"),"rememberPassword: ",await AsyncStorage.getItem("rememberPassword"));
        await AsyncStorage.removeItem('roleid');
        await AsyncStorage.removeItem('userid');
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('profile');
        var rememberUsername = await AsyncStorage.getItem("rememberUsername");
        var rememberPassword = await AsyncStorage.getItem("rememberPassword");
        this.props.navigation.navigate('Login');
        this.setState({isVisible: false});
    }

    render() {
        return (
            <View>
                <Icon
                type="font-awesome" name='power-off' color="#FFF" size={20} 
                onPress={() => this.signout()}
            />
            <Overlay overlayStyle={[styles.otpModel, {height:'30%'}]} isVisible={this.state.isVisible}>
            <View style={{flexDirection:'row'}}>
            <Icon
                type="font-awesome" name='power-off' color="#333"
            />
            <Text style={[styles.otpmsg, { color:'#333'}]}>Are you sure want to logout?</Text>
            </View>
            <View style={[styles.center,{marginTop:10, flexDirection:'row', justifyContent:'space-evenly'}]}>
                    <Button style={[styles.loginButton, {backgroundColor:'#fff', borderColor:'#333', borderWidth:2, color:'#333'}]} onPress={() => this.getData()}>
                        <Text style={[styles.textCenter, {color:'#333'}]}>Yes</Text>
                    </Button>
                    <Button style={[styles.loginButton, {backgroundColor:'red'}]} onPress={() => this.cancel()}>
                        <Text style={styles.textCenter}>No</Text>
                    </Button>
                </View>
        </Overlay>
        </View>
        );
    }
}
export default withNavigation(Logout);