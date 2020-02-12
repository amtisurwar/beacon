import { Platform, StyleSheet, View, ScrollView, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from '../../assets/style/style2.js';
import React, { Component } from 'react';
import {
    Container, Header, Content, Button, Card, CardItem,
    Text, Body, Form, Item
} from 'native-base';
import { CheckBox, Avatar, Icon, Input, Overlay } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            isVisible: false,
        }
    }
    componentDidMount() {
        // this.getData();
    }

    signout() {
        this.setState({ isVisible: true });
    }
    cancel() {
        this.setState({ isVisible: false });
    }

    async getData() {
        await AsyncStorage.removeItem('UserId');
        await AsyncStorage.removeItem('RoleId');
        await AsyncStorage.removeItem('profile');
        // var rememberUsername = await AsyncStorage.getItem("rememberUsername");
        // var rememberPassword = await AsyncStorage.getItem("rememberPassword");
        // var remember = await AsyncStorage.getItem("remember");
        this.props.navigation.navigate('Auth');
        this.setState({ isVisible: false });
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.signout()} style={{ marginTop: 10, marginBottom: 10, alignContent: 'center', alignItems: 'center', backgroundColor: '#1b244d', height: "22%", marginBottom: "10%" }}>
                    <View style={{flexDirection:'row', marginLeft:'20%'}}> 
                    <View style={{position:'absolute', marginTop: "6%"}}>
                    <Icon type="font-awesome" name='power-off' color="#FFF" size={20} />
                    </View>
                    <Text style={{ borderBottomColor: 'gray', alignContent:'center', justifyContent:'center', borderBottomWidth: 1, width: '50%', marginTop: "6%", color: '#fff', marginLeft:'9%' }}>Logout</Text>
                    </View>
                </TouchableOpacity>
                <Overlay overlayStyle={[styles.otpModel, { height: 175 }]} isVisible={this.state.isVisible}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon
                            type="font-awesome" name='power-off' color="#333"
                        />
                        <Text style={[styles.otpmsg, { color: '#333', marginLeft:15, marginTop:3 }]}>Are you sure you want to logout?</Text>
                    </View>
                    <View style={[styles.center, { marginTop: 10, flexDirection: 'row', justifyContent: 'space-evenly' }]}>
                        <Button style={[styles.loginButton, { backgroundColor: '#fff', borderColor: '#333', borderWidth: 2, color: '#333' }]} onPress={() => this.getData()}>
                            <Text style={[styles.textCenter, { color: '#333' }]}>Yes</Text>
                        </Button>
                        <Button style={[styles.loginButton, { backgroundColor: 'red' }]} onPress={() => this.cancel()}>
                            <Text style={styles.textCenter}>No</Text>
                        </Button>
                    </View>
                </Overlay>
            </View>
        );
    }
}
export default withNavigation(Logout);