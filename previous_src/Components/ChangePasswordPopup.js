import {Platform, StyleSheet, View, ScrollView, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import styles from '../../assets/style/style2.js';
import React, {Component} from 'react';
import { Container, Header, Content, Button, Card, CardItem,
	 Text, Body, Form, Item } from 'native-base';
import { CheckBox, Avatar, Icon, Input, Overlay } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            otp: '',
            errors: '',
            role: 0,
            loading: false,
            submit: false,
            isVisible: false,
            otp: '',
            otpSubmit: false,
            otpResponse: [],
            otpError: [],
        }
    }
    componentDidMount() {
        // this.getData();
    }

    save() {
        this.setState({isVisible: true});
    }
    unsave() {
        this.setState({isVisible: false});
    }

    render() {
        return (
            <View>
                <Icon
                type="font-awesome" name='check' color="#FFF"
                onPress={() => this.save()}
            />
            <Overlay overlayStyle={[styles.otpModel, {height:'30%'}]} isVisible={this.state.isVisible}>
            <View>
            <Icon
                type="font-awesome" name='check-circle' color="green" size={45}
            />
            <Text style={[{marginLeft:5, fontSize: 20, textAlign:'center', marginTop:10, marginBottom:10}]}>Your Password has been saved</Text>
            </View>
            <View style={[styles.center,{ flexDirection:'row', justifyContent:'space-evenly'}]}>
                    <Button style={[styles.loginButton, {backgroundColor:'black', color:'#333'}]} onPress={() => this.unsave()}>
                        <Text style={[styles.textCenter, {color:'#fff'}]}>Ok</Text>
                    </Button>
                    </View>
        </Overlay>
        </View>
        );
    }
}
export default withNavigation(Logout);