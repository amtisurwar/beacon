import React, { Component } from 'react';
import { Platform, StyleSheet, View, ScrollView, BackHandler, KeyboardAvoidingView, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from '../../assets/style/style2.js';
import {
    Container, Header, Content, Button, Card, CardItem,
    Text, Body, Root, Form, Item, Left, Right, Title
} from 'native-base';
import { CheckBox, Avatar, Icon, Input, Overlay } from 'react-native-elements';
// import Errors from '../Components/Errors';
import API from '../Api/Api';
// import Loader from '../Components/Loader';
import Common from './Common/index';

export default class ForgotPassword extends Component {
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


    forgot() {
        //this.props.navigation.navigate('ForgetOtp')
        if(!this.state.email){
    		this.common.showToast('Please Enter your Email')
    	}
    	else if(this.state.email && !this.common.validateEmail(this.state.email)) {
            this.common.showToast('Please enter your valid Email');
        }
        else{
            console.log("this.state.email: ",this.state.email)
            var response = new API('ForgotPassword').getApiResponse('?Reciepent='+this.state.email);
            console.log("forgot ",response);
            response.then( result => {
                console.log("forgot result ",result);
                if(result.data.StatusCode == 200) {
                    const { navigate } = this.props.navigation.navigate('ForgetOtp', {email: this.state.email})
                }
                else {
                    this.common.showToast('No account exist.');
                }
            }).catch( error => {
                this.common.showToast('No account exist');
            })
        }
    }
    

    render() {
        if (this.state.loading) {
            return <Loader />
        }
        return (
            <Root>
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
            <View style={styles.forgotPasswordContainer}>
                <Text style={{ justifyContent: 'center', marginTop:20, alignSelf: 'center', alignItems: 'center', alignContent: 'center', color: 'gray' }}>
                    If you forgot your password then please
                    </Text>
                <Text style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', color: 'gray', marginTop:12 }}>
                    enter your registered email id so that
                </Text>
                <Text style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', color: 'gray', marginTop:12 }}>
                    you can receive an OTP
                </Text>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center' }}>
                    <Item style={styles.formItem}>
                        <Input keyboardType="email-address" value={this.state.email} onChangeText={(text) => this.setState({ 'email': text })} placeholder="Email" inputStyle={[styles.font15]} />
                    </Item>
                    {/* <Errors errors={this.state.errors} /> */}
                    <View style={[styles.center, { marginTop: 10 }]}>
                        <Button style={styles.loginButton} onPress={() => this.forgot()}>
                            <Text style={styles.textCenter}>Submit</Text>
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            </View>
            </Container>
            </Root>
        );
    }
}