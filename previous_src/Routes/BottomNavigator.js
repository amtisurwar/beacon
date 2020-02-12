//This is an example code for Bottom Navigation//
import React from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
//import all the basic component we have used
import { CheckBox, Avatar, Input, Icon  } from 'react-native-elements';
//import Ionicons to show the icon for bottom options
 
//For React Navigation 3+
//import {
//  createStackNavigator,
//  createBottomTabNavigator,
//  createAppContainer,
//} from 'react-navigation';
//For React Navigation 4+
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
 
import Profile from '../Container/Profile';
import Home from '../Container/Home';
import Notification from '../Container/Notification';
import History from '../Container/History';

export default createBottomTabNavigator(
  {
    Profile: {screen: Profile},
    Home: { screen: Home },
    Notification: { screen: Notification },
    History: { screen: History },
  },
  {
    initialRoutename: 'Profile',
    defaultNavigationOptions: ({ navigation }) => ({
        
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Profile') {
          iconName = 'user-o';
        }
        else if (routeName === 'Home') {
          iconName = 'search';
        }
        else if (routeName === 'Notification') {
          iconName = 'bell';
        }
        else if (routeName === 'History') {
          iconName = 'history';
        }
        return <Icon type='font-awesome' name={iconName}  size={20} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#fff',
      activeBackgroundColor:'#28558E',
      inactiveTintColor: '#fff',
      style: {
        backgroundColor: '#1b244d',
      },
      labelStyle: {
        fontSize: 12,
        marginBottom:3
      },
      // tabStyle: {
      //   justifyContent:'space-around'
      // }
    },
  }
);