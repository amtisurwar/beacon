import React, { Component } from "react";
import { Image, ImageBackground, StyleSheet, ScrollView, SafeAreaView, SectionList, TouchableHighlight, TouchableOpacity } from "react-native";
import styles from '../../assets/style/style.js';
import {
    Container, Title, Content, Button, Text, Left, Body, Right, Card, CardItem, Header, Picker,
    List, Item, Input, ListItem, Spinner, View, Label, H3, Form, CheckBox, Row, Col, Grid, Badge, CardList, Footer,
} from "native-base";
import { Icon } from 'react-native-elements';
import Common from './Common/index';
import list from '../Components/UserData';
import Call from '../Components/Call';

const DataList = [
    {
        title: '01-07-2020',
        data: list,
    },
    {
        title: '01-06-2020',
        data: list,
    },
    {
        title: '01-05-2020',
        data: list,
    },
    {
        title: '01-02-2020',
        data: list,
    },
];
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            DataList: [],
            refreshing: false
        }
        this.common = new Common();
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        this.setState({DataList:DataList})
    }

    getTitle(title, data) {
        if(title == this.common.getCurrentDate() && data.length > 0) {
            return "Today ";
        }
        else if(title == this.common.getCurrentDate(1) && data.length > 0) {
            return "Yesterday ";
        }
        else {
            if(data.length > 0) {
                return title.replace(/-/gi, '/');
            }
            else {
                return null;
            }
            
        }
    }

    renderItem = ({ item }) => {
        return (
            <View style={{flexDirection:'row',alignItems:'center', marginHorizontal:5, padding:10, marginTop:1, backgroundColor:'white', borderBottomColor:'#f2f0f0', borderBottomWidth:1}}>
                <View style={{flex:1}}>
                    <Text style={{fontSize:14}}>{item.Fname} {item.Lname}</Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end', marginTop:8}}>
                    <Icon
                        name='circle'
                        type='font-awesome'
                        //color={item.LiveStatus ? '#0b6be6' : 'black'}
                        color='#0b6be6'
                        size={14}
                        containerStyle={{borderColor:'#ccc'}}
                    />
                    <Text style={{color:'#b8b894', fontSize:12, marginTop:5}}>{item.Time}</Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:'#f5f3f2'}}>
                <Header style={{ backgroundColor: "#1b244d", elevation: 0, shadowOpacity: 1 }}>
                    <Left>
                        <Button transparent>
                            {/* <Icon type="font-awesome" name='chevron-left' color='#fff' /> */}
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Notification</Title>
                    </Body>
                    <Right>
                        <Call />
                    </Right>
                </Header>
                <View>
                    <SafeAreaView style={style.container}>
                        <SectionList
                            sections={this.state.DataList}
                            stickySectionHeadersEnabled={false}
                            keyExtractor={(item, index) => item + index}
                            renderItem={this.renderItem}
                            refreshing={this.state.refreshing}
                            onRefresh={this.getData}
                            renderSectionHeader={({ section: { title, data } }) => (
                                <Text style={style.header}>
                                    {this.getTitle(title, data)}
                                </Text>
                            )}
                        />
                    </SafeAreaView>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
      marginBottom:80,
    },
    header: {
        color: '#b3b3b3',
        fontSize:14,
        margin:15,
        backgroundColor:'#f5f3f2',
        width:'100%',
        marginHorizontal:0,
        padding:10,
    },
  });