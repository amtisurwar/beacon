import React, { Component } from 'react';
import { Platform, StyleSheet, View, ScrollView, Image, KeyboardAvoidingView, BackHandler, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from '../../assets/style/style2.js';
import {
    Container, Header, Content, Button, Card, CardItem,
    Text, Body, Form, Item, Left, Right, Title
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

    ForgotResendOtp() {
        var data = { "mobileno": this.state.MobileNumber, "type": this.state.type };
        console.log("resent request data: ", data);
        var response = new API('ForgotResendOtp', data).getResponse();
        console.log("resend otp response: ", response);
        response.then(result => {
            console.log("resentotp response ", result.Data);
            if (result.StatusCode == 200) {
                this.validateOtp();
            }
            else {
                this.common.showToast("Please Enter OTP");
            }
        }).catch((error) => {
            this.common.showToast("Invalid Response, please try again later");
        })
    }

    async forgotOtp() {
        if(!this.state.otp) {
            this.common.showToast("Please enter OTP");
            return false;
        }
        var email = this.props.navigation.getParam('email');
        console.log('dfhedysgh',email)
        var data = { "mobileno": email, "otp": this.state.otp };
        console.log("validateOtp request data: ", data);
        var response = new API('validateOtp', data).getResponse();
        console.log("validateOtp response data: ", response);
        response.then(result => {
            console.log("forgot otp result: ", result);
            if (result.StatusCode == 200) {
                console.log('asdfsdaf', result.Data)
                this.props.navigation.navigate('ForgetPasswordSet', { otp: this.state.otp, id: result.Data })
            }
            else {
                this.common.showToast("Wrong OTP");
            }
        }).catch((error) => {
            this.common.showToast("Error in OTP verification");
        })
    }

    forgot() {
        var email = this.props.navigation.getParam('email');
        var response = new API('ForgotPassword').getApiResponse('?Reciepent='+email);
            console.log("forgot ",response);
            response.then( result => {
                console.log("forgot result ",result);
                if(result.data.StatusCode == 200) {
                    this.common.showToast("OTP Sent")
                }
                else {
                    this.common.showToast('No account exist.');
                }
            }).catch( error => {
                this.common.showToast('No account exist');
            })
        }
    
    render() {
        if (this.state.loading) {
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
                        <Title style={{ color: '#fff', fontSize: 16 }}>Forgot Password</Title>
                    </Body>
                </Header>
                <View style={styles.forgotPasswordContainer}>
                    <View style={{ width: '95%', marginTop:20, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', }}>
                        <Text style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', color: 'gray' }}>
                            Enter the OTP that you have received
                    </Text>
                        <Text style={{ justifyContent: 'center', marginTop:12, alignSelf: 'center', alignItems: 'center', alignContent: 'center', color: 'gray', }}>
                            in your registered Email.
                    </Text>
                        <Text style={{ justifyContent: 'center', marginTop:15, alignSelf: 'center', alignItems: 'center', alignContent: 'center', color: 'gray', paddingTop: 20 }}>
                            If you have not received a OTP then
                    </Text>
                    <TouchableOpacity onPress={() => this.forgot()}>
                        <Text style={{ marginTop: 10 }}>CLICK HERE.</Text>
                    </TouchableOpacity>
                    </View>
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center' }}>
                        <Item style={styles.formItem}>
                            <Input secureTextEntry keyboardType="numeric" value={this.state.otp} onChangeText={(text) => this.setState({ 'otp': text })} placeholder="Enter OTP.." inputStyle={[styles.font15]} />
                        </Item>
                        {/* <Errors errors={this.state.errors} /> */}
                        <View style={[styles.center, { marginTop: 10, flexDirection: 'row', justifyContent: 'space-evenly' }]}>
                            <Button style={styles.loginButton} onPress={() => this.forgotOtp()}>
                                <Text style={styles.textCenter}>Submit</Text>
                            </Button>
                            <Button style={[styles.loginButton, { backgroundColor: 'red' }]} onPress={() => this.props.navigation.navigate('ForgotPassword')} >
                                <Text style={styles.textCenter}>Cancel</Text>
                            </Button>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Container>
        );
    }
}