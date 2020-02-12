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
import ChangePassword from '../Container/ChangePassword';
import EditProfile from '../Container/EditProfile';
import Setting from '../Container/Setting';
import Logout from '../Components/Logout';
import BottomNavigator from './BottomNavigator';

const LoginStack = createStackNavigator({
  BottomNavigator: { screen: BottomNavigator },
  Login: { screen: Login },
  Register: { screen: Register },
  ForgotPassword: { screen: ForgotPassword },
  ForgetOtp: { screen: ForgetOtp },
  ForgetPasswordSet: { screen: ForgetPasswordSet },
  ChangePassword: { screen: ChangePassword },
  Logout: { screen: Logout },
  EditProfile: { screen: EditProfile },
  Setting: { screen: Setting },
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