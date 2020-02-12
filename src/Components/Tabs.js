import React, { Component } from 'react';
import { CheckBox, Avatar, Input, Icon, Text, } from 'react-native-elements';
import { ActivityIndicator, RefreshControl, ScrollView, Dimensions, View  } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Mapview from '../Container/Mapview';
import Listview from '../Container/Listview';
import { Tab, Content, Tabs, TabHeading, Container, Switch, ScrollableTab, PermissionsAndroid, Platform, List, Header, Left, Right, Body, Button, Title } from 'native-base';
import PeopleContext from '../Context/PeopleContext';

const {width, height} = Dimensions.get('window')

const Loader = () => {
  return (
     <View style={{height:height-130,justifyContent:"center",alignItems:'center'}}>
      <ActivityIndicator size="large" animating />
      <Text style={{color:'#28558E', marginVertical:15}}>We are searching people near you</Text>
      <Text style={{color:'#28558E'}}>Please wait...</Text>
    </View>
  )
}


export default class TabScreen extends Component {

    static contextType = PeopleContext;

    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            loading: false,
            refreshing: false
        }
    }
    
    onRefresh = () => {
        this.context.onRefresh()
        // console.log("this.context.getData();",this.context)
    }

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        //refresh control used for the Pull to Refresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }>
                <Content>
                    <Tabs onChangeTab={({ i }) => this.setState({ currentTab: i })} tabBarUnderlineStyle={{ backgroundColor: '#fff' }}>
                        <Tab heading={<TabHeading style={{ backgroundColor: this.state.currentTab == 0 ? '#ffffff' : '#1b244d' }}><Icon type='font-awesome' name="globe" size={17} color={this.state.currentTab == 0 ? '#333' : '#fff'} /><Text style={{ marginLeft: 5, color: this.state.currentTab == 0 ? '#333' : '#fff' }}>Map View</Text></TabHeading>}>
                            {this.props.loading ? <Loader /> : <Mapview />}
                        </Tab>
                        <Tab heading={<TabHeading style={{ backgroundColor: this.state.currentTab == 1 ? '#ffffff' : '#1b244d' }}><Icon type='font-awesome' name="list" size={17} color={this.state.currentTab == 1 ? '#333' : '#fff'} /><Text style={{ marginLeft: 5, color: this.state.currentTab == 1 ? '#333' : '#fff' }}>List View</Text></TabHeading>}>
                            {this.props.loading ? <Loader /> : <Listview />}
                        </Tab>
                    </Tabs>
                </Content>
            </ScrollView>
        );
    }
}
