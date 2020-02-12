import React, { Component } from "react";
import { Image, ImageBackground, ScrollView, ListView, TouchableHighlight, TouchableOpacity } from "react-native";
import styles from '../../assets/style/style.js';
import {
  Container, Title, Content, Button, Text, Left, Body, Right, Card, CardItem, Header, Picker,
  List, Item, Input, ListItem, Spinner, View, Label, H3, Form, CheckBox, Row, Col, Grid, Badge, CardList, Footer
} from "native-base";
import Common from './Common/index';
import Social from '../Components/Social';
// import appleAuth, {
//   AppleButton,
//   AppleAuthRequestOperation,
//   AppleAuthRequestScope,
//   AppleAuthCredentialState,
// } from '@invertase/react-native-apple-authentication';


export default class Login extends Social {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      remember: false
    }
    this.common = new Common();
  }

  // componentDidMount() {
  //   console.log("support: ",appleAuth.isSupported)
  // }

  // async onAppleButtonPress() {
  //   // performs login request
  //   const appleAuthRequestResponse = await appleAuth.performRequest({
  //     requestedOperation: AppleAuthRequestOperation.LOGIN,
  //     requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
  //   });
  
  //   // get current authentication state for user
  //   const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
  
  //   // use credentialState response to ensure the user is authenticated
  //   if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
  //     // user is authenticated
  //   }
  // }

  Login = async () => {
    this.props.navigation.navigate('BottomNavigator')
    if (!this.state.username) {
      this.common.showToast('Please Enter your Username')
      this.email.focus()
    }
    else if (this.state.username && !this.common.validateEmail(this.state.username)) {
      this.common.showToast('Please enter your valid Username');
      this.email.focus()
    }
    else if (!this.state.password) {
      this.common.showToast('Please Enter your Password')
      this.password.focus()
    }
    else {
      this.props.navigation.navigate('BottomNavigator')
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Row style={styles.logoBack}>
            <Image style={styles.iconImage} source={require('../../assets/images/1024.png')}>
            </Image>
          </Row>
          <View>
            <View style={styles.inputView}>
              <Item style={{ borderBottomColor: '#333' }}>
                <Input style={styles.inputfield}
                  placeholder='Email'
                  //onChangeText={(val) => login.setState({ userName: val })}
                  autoCapitalize='none'
                  maxLength={100}
                  borderColor='#333'
                  selectionColor={'#333'}
                  placeholderTextColor='#333'
                />
              </Item>
              <Item style={{ borderBottomColor: '#333', marginTop: 10 }}>
                <Input style={styles.inputfield}
                  //onChangeText={(val) => login.setState({ password: val })}
                  selectionColor={'#333'}
                  placeholder='Password'
                  maxLength={14}
                  secureTextEntry
                  autoCapitalize='none'
                  placeholderTextColor='#333'
                />
              </Item>
              <View>
                <View style={[styles.rememberAndForgotWrapper]}>
                  <View style={styles.row}>
                  <CheckBox checkedColor="#28558E" size={16} containerStyle={styles.loginContainerStyle} color="#808080" style={styles.loginCheckbox} />
                    <Text style={[styles.greyColor, styles.font15]}>Remember Me</Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')} >
                      <Text style={[styles.greyColor, styles.font14]}>Forgot Password?</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View>
            </View>

              <View style={{ marginTop: 30 }}>
                <Button block style={{ backgroundColor: 'black', borderRadius: 50, width: '50%', alignContent: 'center', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}
                  onPress={() => this.Login()}>
                  <Text style={{ fontSize: 14 }}>Login</Text>
                </Button>
                <Row style={styles.orLabel}>
                  <Label style={{ color: '#333' }}>Or Sign In With:</Label>
                </Row>
              </View>
            </View>
          </View>
        </Content>
        <View style={[styles.bottomView, {backgroundColor:'#1b244d'}]}>
          <Row style={styles.socialRow}>
            <Left>
              <Button block style={styles.fb} onPress={() => this.facebookLogin()}>
                <Image style={styles.icon} source={require("../../assets/images/facebook.jpeg")} />
                {/* <Icon name='logo-facebook' size={18} /> */}
              </Button>
            </Left>
            <Right>
              <Button block style={styles.google} onPress={() => this.googleLogin()}>
                <Image style={styles.icons} source={require("../../assets/images/Google-Plus-Icon.png")} />
                {/* <Icon name='logo-facebook' size={18} /> */}
              </Button>
            </Right>
          </Row>
          <Row>
            <Text style={styles.newUser}>New User than!</Text>
            <TouchableOpacity style={styles.signUptext}><Text style={{ color: '#fff', alignSelf: 'center', alignContent: 'center', justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('Register')} >Sign Up</Text></TouchableOpacity>
          </Row>
        </View>
      </Container >
    );
  }
}