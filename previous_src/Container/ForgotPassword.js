import React, { Component } from 'react';
import { Platform, StyleSheet, View, ScrollView, BackHandler, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from '../../assets/style/style2.js';
import {
    Container, Header, Content, Button, Card, CardItem,
    Text, Body, Form, Item, Left, Right, Title
} from 'native-base';
import { CheckBox, Avatar, Icon, Input, Overlay } from 'react-native-elements';
// import Errors from '../Components/Errors';
// import API from '../Api/Api';
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

    // componentDidMount() {
    //     var role = this.props.navigation.getParam('role');
    //     this.setState({role: role});
    // }

    // validate() {
    //     var messages = [];
    //     this.setState({submit:true});
    //     messages.push(!this.state.email  && 'Email required');
    //     if(this.state.email && !this.common.validateEmail(this.state.email)) {
    // 		messages.push('Invalid Email');
    //     }
    //     var errorShow = [];
    //     messages = messages.filter( (msg) => {
    // 		if(msg) {
    // 			return msg;
    // 		}
    // 	})
    // 	for(var i=0; i<messages.length; i++) {
    // 		var required = messages[i].indexOf('required');
    // 		if(required > 0) {

    // 		}
    // 		else {
    // 			errorShow.push(messages[i]);
    // 		}
    // 	}
    // 	this.setState({ errors: errorShow});

    // 	if(messages.length > 0) {
    // 		return false;
    // 	}
    // 	else {
    // 		return true;
    // 	}

    // }
    // displayErrors(error,flag = 0) {
    //     var errors = [];
    //     errors.push(error);
    //     if(flag) {
    //         this.setState({otpError: errors})	
    //     }
    //     else {
    //         this.setState({errors: errors})	
    //     }
    // }

    // validateOtp() {
    //     this.setState({otpSubmit: true})
    //     if(!this.state.otp) {
    //         return null;
    //     }
    //     var data = {"username": this.state.email,"password": this.state.otp,"roleid": this.state.role};
    //     console.log("validateOtp request data: ",data);
    //     var response = new API('Login',data).getResponse();
    //     console.log("validateOtp response data: ",response);
    //     response.then( result => {
    //         console.log("login result: ",result);
    //         if(result.statuscode == 200 && result.result.userid) {
    //             this.setState({isVisible: false})
    //             var user = result.result;
    //             this.props.navigation.navigate('ChangePassword', {user:user,otp:this.state.otp});
    //         }
    //         else {
    //             this.displayErrors("Wrong OTP",1);
    //         }
    //     }).catch((error) => {
    //         this.displayErrors("Error in OTP verification",1);
    //     })

    // }

    // // forgot() {
    // //     if(this.validate()) {
    // //         var response = new API('ForgotPassword',{}).getApiResponse('?EmailId='+this.state.email+"&RoleId="+this.state.role);
    // //         console.log("forgot response: ",response);
    // //         response.then( result => {
    // //             if(result.status == 200) {
    // //                 console.log("forgot response: ",result.data.result);
    // //                 this.setState({otpResponse: result.data.result,isVisible: true});
    // //             }
    // //             else {
    // //                 this.displayErrors('Not account exist.');
    // //             }
    // //         }).catch( error => {
    // //             this.displayErrors('No account exist');
    // //         })
    // //     }
    // // }

    // forgot() {
    //     if(!this.state.email){
    // 		this.common.showToast('Please Enter your Email')
    //         this.email.focus()
    // 	}
    // 	else if(this.state.email && !this.common.validateEmail(this.state.email)) {
    //         this.common.showToast('Please enter your valid Email');
    //         this.email.focus()
    //     }
    //     else{
    //         var response = new API('ForgotPassword',{}).getApiResponse('?EmailId='+this.state.email+"&RoleId="+this.state.role);
    //         console.log("forgot response: ",response);
    //         response.then( result => {
    //             if(result.status == 200) {
    //                 console.log("forgot response: ",result.data.result);
    //                 this.setState({otpResponse: result.data.result,isVisible: true});
    //             }
    //             else {
    //                 this.displayErrors('Not account exist.');
    //             }
    //         }).catch( error => {
    //             this.displayErrors('No account exist');
    //         })
    //     }
    // }

    // resendOTP() {
    //     alert("dd");
    // }
    

    render() {
        if (this.state.loading) {
            return <Loader />
        }
        var email = !this.state.email && this.state.submit ? true : false;
        var otp = !this.state.otp && this.state.otpSubmit ? true : false;
        return (
            <Container>
                <Header style={{ backgroundColor: "#1b244d", elevation: 0, shadowOpacity: 1 }}>
                    <View>
                        <Button transparent onPress={() => this.handleBackButtonClick()}>
                            <Icon type="font-awesome" name='chevron-left' color='#fff' />
                        </Button>
                    </View>
                    <Body>
                    <Title style={{ color: '#fff', fontSize:16 }}>Forgot Password</Title>
                    </Body>
                </Header>
            <View style={styles.forgotPasswordContainer}>
                <Overlay overlayStyle={styles.otpModel} isVisible={this.state.isVisible}>
                    <Text style={styles.otpmsg}>OTP has been sent to your registered email and phone number.</Text>
                    <Input secureTextEntry={true} keyboardType="number-pad" inputContainerStyle={otp && styles.inputError} rightIcon={otp && this.common.getIcon()} errorMessage={otp && 'Enter OTP'} value={this.state.otp} onChangeText={(text) => this.setState({ 'otp': text })} placeholder="OTP" inputStyle={[styles.font15]} />
                    {/* <Errors errors={this.state.otpError} /> */}
                    <View style={styles.orWrapper}>
                        <Button style={styles.modelButton} onPress={() => this.validateOtp()}><Text>OK</Text></Button>
                        <Button style={styles.modelButton} onPress={() => this.setState({ isVisible: false })}><Text> Cancel </Text></Button>
                    </View>
                </Overlay>
                {/* <View style={{ width: '95%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', }}>
                    <Text style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', color: 'gray' }}>
                        If you forgot your password then please enter your registered
                                    email id so that you can
                                    receive an OTP
                </Text>
                </View> */}
                <Text style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', color: 'gray' }}>
                    If you forgot your password then please
                    </Text>
                <Text style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', color: 'gray', }}>
                    enter your registered email id so that
                </Text>
                <Text style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', color: 'gray', }}>
                    you can receive an OTP
                </Text>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Item style={styles.formItem}>
                        <Input ref={email => { this.email = email }} keyboardType="email-address" inputContainerStyle={email && styles.inputError} rightIcon={email && this.common.getIcon()} errorMessage={email && 'Email Required'} value={this.state.email} onChangeText={(text) => this.setState({ 'email': text })} placeholder="Email" inputStyle={[styles.font15]} />
                    </Item>
                    {/* <Errors errors={this.state.errors} /> */}
                    <View style={[styles.center, { marginTop: 10 }]}>
                        <Button style={styles.loginButton} onPress={() => this.props.navigation.navigate('ForgetOtp')}>
                            <Text style={styles.textCenter}>Submit</Text>
                        </Button>
                    </View>
                </View>
            </View>
            </Container>
        );
    }
}