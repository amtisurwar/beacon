//This is an example of React Native Tab
import React from 'react';
//import react in our code.
 
//For React Navigation 3+
//import {
//  createStackNavigator,
//  createMaterialTopTabNavigator,
//  createAppContainer,
//} from 'react-navigation';
import { CheckBox, Avatar, Input, Icon  } from 'react-native-elements';
//For React Navigation 4+
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Mapview from '../Container/Mapview';
import Listview from '../Container/Listview';
//Making TabNavigator which will be called in App StackNavigator
//we can directly export the TabNavigator also but header will not be visible
//as header comes only when we put anything into StackNavigator and then export
 
const TabScreen = createMaterialTopTabNavigator(
  {
    Mapview: { 
        screen: Mapview,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
            <Icon type='font-awesome' name="globe" size={20} color={tintColor} />
            )
          },
          title:"Map View",
     },
    Listview: { 
        screen: Listview ,
        navigationOptions: {
            title:"List View",
            tabBarIcon: ({ tintColor }) => (
            <Icon type='font-awesome' name="list" size={20} color={tintColor} />
            )
          },
    },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      iconStyle: {
          position:'absolute',
          width:20, 
          marginLeft:-60,
          marginTop:4
      },
      activeTintColor: '#333',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#1b244d',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        height: '100%',
        backgroundColor: '#fff',
      },
    },
  }
);
 
//making a StackNavigator to export as default
const Tabs = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
        header: null
    },
  },
});
export default createAppContainer(Tabs);