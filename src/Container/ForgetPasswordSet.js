import React, {Component} from 'react';
import {Platform, StyleSheet, View, ScrollView, KeyboardAvoidingView, BackHandler, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import styles from '../../assets/style/style2.js';
import { Container, Header, Content, Button, Card, CardItem,
	 Text, Body, Form, Item, Title, Left, Right } from 'native-base';
import { CheckBox, Avatar, Icon, Input, Overlay } from 'react-native-elements';
// import Errors from '../Components/Errors';
import API from '../Api/Api';
import Loader from '../Components/Loader';
// import URI from '../Api/URI';
import Common from './Common/index';

export default class ChangePassword extends Component {
	constructor(props) {
        super(props)
        this.state = {
            Password: '',
            confirmPassword: '',
            loading: false,
            errors: [],
            submit: false,
        }
        this.common = new Common();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
    
      handleBackButtonClick() {
          this.props.navigation.goBack(null);
          return true;
      }


      async forgotOtp() {
        if (!this.state.Password) {
            this.common.showToast('Please enter your Password');
        }
        if (this.state.Password.length < 8) {
            this.common.showToast('Password should be more than 8 digit');
        }
        else if (!this.state.confirmPassword) {
            this.common.showToast('Please enter your Confirm Password');
        }
        else if (this.state.Password != this.state.confirmPassword) {
            this.common.showToast('Both Password should be same');
        }
        else{
            var authToken = this.props.navigation.getParam('id');
            console.log('auth', authToken)
             this.getRequestData().then(data => {
                console.log("request : ", data);
                var header = { "authentication": authToken };
                var response = new API('ChangePassword', data, header).getResponse();
                console.log("requst: ",data,"header: ",header,"response: ",response);
                response.then(result => {
                    console.log('result', result)
                    if (result.StatusCode == 200) {
                        this.common.showToast('Your Password has been changed');
                        setTimeout(() => {
                            this.props.navigation.navigate('Login')
                        },2000)
                    }
                    else {
                        this.common.showToast('Error');
                    }
                })
            });
        }
        return false;
    }

    async getRequestData() {
        var id = this.props.navigation.getParam('id');
        var otp = this.props.navigation.getParam('otp');
        return {
            "Id": id,
            "OldPassword": otp,
            "NewPassword": this.state.Password,
            "ConfirmPassword": this.state.confirmPassword
        }
    }

    render() {
        if(this.state.loading) {
            return <Loader />
        }
        
        return (
           <Container>
                <Header style={{ backgroundColor: "#1b244d", elevation: 0, shadowOpacity: 1 }}>
                    <View>
                        <Button transparent onPress={() => this.handleBackButtonClick()}>
                            <Icon type="font-awesome" name='chevron-left' color='#fff' size={19} />
                        </Button>
                    </View>
                    <Body>
                    <Title style={{ color: '#fff', fontSize:16 }}>Forgot Password</Title>
                    </Body>
                </Header>
            <KeyboardAvoidingView behavior="padding" enabled style={{flex:1,justifyContent:'center'}}>
                <Item style={[styles.formItem, styles.mb]}>
                    <Input secureTextEntry={true} value={this.state.Password} onChangeText={(text) => this.setState({'Password': text})}  placeholder="Enter New Password" inputStyle={[styles.font15]}  />
                </Item>
                <Item style={[styles.formItem, styles.mb]}>
                    <Input secureTextEntry={true} value={this.state.confirmPassword} onChangeText={(text) => this.setState({'confirmPassword': text})}  placeholder="Confirm New Password" inputStyle={[styles.font15]}  />
                </Item>
                <View style={[styles.center,{marginTop:10, flexDirection:'row', justifyContent:'space-evenly'}]}>
                    <Button style={styles.loginButton} onPress={()=> this.forgotOtp()}>
                        <Text style={styles.textCenter}>Submit</Text>
                    </Button>
                    <Button onPress={() => this.props.navigation.goBack()} style={[styles.loginButton, {backgroundColor:'red'}]}>
                        <Text style={styles.textCenter}>Cancel</Text>
                    </Button>
                </View>
            </KeyboardAvoidingView>
            </Container>
        );
    }
}