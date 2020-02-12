import React, {Component} from 'react';
import {Platform, StyleSheet, View, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, BackHandler} from 'react-native';
import styles from '../../assets/style/style2.js';
import { Container, Header, Content, Button, Card, CardItem,
	 Text, Body, Form, Item, Left, Right, Title  } from 'native-base';
import { CheckBox, Avatar, Icon, Input, Overlay } from 'react-native-elements';
import API from '../Api/Api';
import Loader from '../Components/Loader';
import Common from './Common';

export default class ChangePassword extends Component {
	constructor(props) {
        super(props)
        this.state = {
            oldPassword: '',
            npassword: '',
            confirmPassword: '',
            isVisible: false,
            loading: false,
            errors: [],
            submit: false,
        }
        this.common = new Common();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    async changePassword() {
            if(!this.state.oldPassword){
                this.common.showToast('Please Enter your Old Password')
            }
            else if(!this.state.npassword) {
                this.common.showToast('Please enter your new password');
            }
            else if (this.state.npassword.length < 8) {
                this.common.showToast('Password should be more than 8 digit');
            }
            else if(!this.state.confirmPassword) {
                this.common.showToast('Please enter your confirm password');
            }
            else if(this.state.npassword != this.state.confirmPassword) {
                this.common.showToast('Both password should be same');
            }
            else{
                var profile = JSON.parse(await AsyncStorage.getItem('profile'));
                //console.log('profile authentication:', profile)
                var authToken = profile.Authentication
                this.getRequestData().then(data => {
                var header = { "authentication": authToken };
                var response = new API('ChangePassword',data, header).getResponse();
                console.log("requst: ",data,"header: ",header,"response: ",response);
                response.then( result => {
                    if(result.StatusCode == 200) {
                        this.setState({ isVisible: true });
                        //this.common.showToast('Password Change Successfully.');
                        // setTimeout(() => {
                        //     this.props.navigation.navigate('Dashboard')
                        // },2000)
                    }
                    else {
                        this.common.showToast("Invalid Password");
                    }
                }).catch( (error) => {
                    this.common.showToast("Invalid Password");
                })
            })
        }
    }

    async getRequestData() {
        var profile = JSON.parse(await AsyncStorage.getItem('profile'));
        console.log("profile:", profile)
        var id = profile.Authentication;
        return {
            "id": id,
            "OldPassword": this.state.oldPassword,
            "NewPassword": this.state.npassword,
            "ConfirmPassword": this.state.confirmPassword
        }
    }

    // async success() {
	// 	this.props.navigation.navigate('BottomNavigator')
    // }
    async getData() {
        await AsyncStorage.removeItem('UserId');
        await AsyncStorage.removeItem('RoleId');
        await AsyncStorage.removeItem('profile');
        this.props.navigation.navigate('Auth');
        this.setState({ isVisible: false });
    }
    
      handleBackButtonClick() {
        this.props.navigation.navigate('Dashboard');
        
    }
    render() {
        if(this.state.loading) {
            return <Loader />
        }
        
        return (
           <Container>
               <Header style={{ backgroundColor: "#1b244d", elevation: 0, shadowOpacity: 1 }}>
               <View>
                        <Button transparent onPress={() => this.handleBackButtonClick()}>
                            <Icon type="font-awesome" name='chevron-left' color='#fff' size={19} />
                        </Button>
                    </View>
                    <View style={{marginLeft:'25%', marginTop:'3%'}}>
                        <Title style={{ color: '#fff', fontSize: 16 }}>Change Password</Title>
                    </View>
                    <Right>
                        <Button transparent onPress={() => this.changePassword()}>
                        <Icon type="font-awesome" name='check' color="#FFF" />
                        </Button>
                    </Right>
                </Header>
                <Overlay overlayStyle={[styles.otpModel, {height:280 }]} isVisible={this.state.isVisible}>
                    <View>
                    <Icon
                       type="font-awesome" name='check-circle' color="#0b6be6" size={80}
                    />
                    <Text style={[{marginLeft:5, fontSize: 16, textAlign:'center', marginTop:20, marginBottom:10}]}>Your Password has been changed</Text>
                    </View>
                    <View style={[styles.center,{ flexDirection:'row', marginTop:10, justifyContent:'space-evenly'}]}>
                            <Button style={[styles.loginButton, {backgroundColor:'black', color:'#333'}]} onPress={() => this.getData()}>
                                <Text style={[styles.textCenter, {color:'#fff'}]}>Ok</Text>
                            </Button>
                            </View>
                </Overlay>
            <KeyboardAvoidingView behavior="padding" enabled style={{flex:1,justifyContent:'center'}}>
                <Item style={[styles.formItem, styles.mb]}>
                    <Input secureTextEntry={true} value={this.state.oldPassword} onChangeText={(text) => this.setState({'oldPassword': text})}  placeholder="Enter Old Password" inputStyle={[styles.font15]}  />
                </Item>
                <Item style={[styles.formItem, styles.mb]}>
                    <Input secureTextEntry={true} value={this.state.npassword} onChangeText={(text) => this.setState({'npassword': text})}  placeholder="Enter New Password" inputStyle={[styles.font15]}  />
                </Item>
                <Item style={[styles.formItem, styles.mb]}>
                    <Input secureTextEntry={true} value={this.state.confirmPassword} onChangeText={(text) => this.setState({'confirmPassword': text})}  placeholder="Confirm Password" inputStyle={[styles.font15]}  />
                </Item>
            </KeyboardAvoidingView>
            </Container>
        );
    }
}