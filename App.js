import React, {Component} from 'react';
import {Platform, StyleSheet, AppState, View, Text, ScrollView, Image, TouchableOpacity, AsyncStorage} from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthLoadingScreen from './src/Components/Auth';
import AuthStack from './src/Routes/LoginStack';
import AppStack from './src/Routes/HomeStack';

const Route = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

export default Route;
console.disableYellowBox = true;