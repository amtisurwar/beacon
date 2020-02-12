import React, { Component } from "react";
import { Image, ImageBackground, ScrollView, ListView, TouchableHighlight, TouchableOpacity } from "react-native";
import styles from '../../assets/style/style.js';
import {
    Container, Title, Content, Button, Text, Left, Body, Right, Card, CardItem, Header, Picker,
    List, Item, Input, ListItem, Spinner, View, Label, H3, Form, CheckBox, Row, Col, Grid, Badge, CardList, Footer,
} from "native-base";
import { Icon } from 'react-native-elements';
import Common from './Common/index';
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.common = new Common();
    }


    render() {
        return (
            <Container>
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
            <Button transparent>
              <Icon type="font-awesome" name='phone' color="#FFF" size={20} />
            </Button>
          </Right>
        </Header>
            <View style={[styles.container, {paddingLeft: 15, paddingRight: 15}]}>
                <View style={{paddingTop:20}}>
                    <Text style={{color:'#b8b894'}}>Today</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent:'space-between', paddingTop:20, paddingLeft: 10, paddingRight: 10, borderBottomWidth:1, borderBottomColor:'#ebebe0' }}>
                    <View style={{  }}>
                        <Text>Shane</Text>
                    </View>
                    <View style={{justifyContent:'flex-end', alignContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end' }}>
                        <Icon type="font-awesome" name='circle' color="#0040ff" size={15} />
                        <Text style={{paddingTop:5, color:'#b8b894'}}>9:30 AM</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop:20, justifyContent:'space-between', paddingLeft: 10, paddingRight: 10 }}>
                    <View style={{  }}>
                        <Text>Kristin</Text>
                    </View>
                    <View style={{justifyContent:'flex-end', alignContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'  }}>
                        <Icon type="font-awesome" name='circle' color="#0040ff" size={15}/>
                        <Text style={{paddingTop:5, color:'#b8b894'}}>9:30 AM</Text>
                    </View>
                </View>
                <View style={{paddingTop:20,}}>
                    <Text style={{color:'#b8b894'}}>11/18/2019</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent:'space-between', paddingTop:20, paddingLeft: 10, paddingRight: 10, borderBottomWidth:1, borderBottomColor:'#ebebe0' }}>
                    <View style={{  }}>
                        <Text>Shane</Text>
                    </View>
                    <View style={{justifyContent:'flex-end', alignContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'  }}>
                        <Icon type="font-awesome" name='circle' color="black" size={15}/>
                        <Text style={{paddingTop:5, color:'#b8b894'}}>9:30 AM</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop:20, justifyContent:'space-between', paddingLeft: 10, paddingRight: 10 }}>
                    <View style={{  }}>
                        <Text>Kristin</Text>
                    </View>
                    <View style={{ justifyContent:'flex-end', alignContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end' }}>
                        <Icon type="font-awesome" name='circle' color="gray" size={15}/>
                        <Text style={{paddingTop:5, color:'#b8b894'}}>9:30 AM</Text>
                    </View>
                </View>
            </View>
            </Container>
        );
    }
}