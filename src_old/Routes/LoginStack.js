import React, { Component } from 'react';
import {
  createStackNavigator,
} from 'react-navigation-stack';
import { View } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Login from '../Container/Login';
import Register from '../Container/Register';
import ForgotPassword from '../Container/ForgotPassword';
import ForgetPasswordSet from '../Container/ForgetPasswordSet';
import ForgetOtp from '../Container/ForgetOtp';

const LoginStack = createStackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  ForgotPassword: { screen: ForgotPassword },
  ForgetOtp: { screen: ForgetOtp },
  ForgetPasswordSet: { screen: ForgetPasswordSet },
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
  { headerLayoutPreset: 'center' }
  , {
    initialRouteName: 'Login'
  });

module.exports = LoginStack;