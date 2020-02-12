import React, { Component } from 'react';
import {
  createStackNavigator,
} from 'react-navigation-stack';

import ChangePassword from '../Container/ChangePassword';
import Introduction from '../Container/Introduction';
import EditProfile from '../Container/EditProfile';
import Setting from '../Container/Setting';
import Logout from '../Components/Logout';
import BottomNavigator from './BottomNavigator';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

const HomeStack = createSwitchNavigator({
  Dashboard:BottomNavigator,
  Introduction: Introduction,
  Logout:Logout,
  EditProfile:EditProfile,
  Setting:Setting,
  ChangePassword:ChangePassword,
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
  { headerLayoutPreset: 'center' }
  , {
    initialRouteName: 'Dashboard'
  });

module.exports = HomeStack;