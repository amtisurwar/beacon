import React, {Component} from 'react';
import {Platform, StyleSheet, View, ScrollView, Image, TouchableOpacity, AsyncStorage, BackHandler} from 'react-native';
import styles from '../../assets/style/style2.js';
import { Container, Header, Content, Button, Card, CardItem,
	 Text, Body, Form, Item, Left, Right, Title  } from 'native-base';
import { CheckBox, Avatar, Icon, Input, Overlay } from 'react-native-elements';
// import Errors from '../Components/Errors';
// import API from '../Api/Api';
// import Loader from '../Components/Loader';
// import URI from '../Api/URI';
import Common from './Common';

export default class ChangePassword extends Component {
	constructor(props) {
        super(props)
        this.state = {
            oldpassword: '',
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

    save(){
        console.log('ljdasjd')
    }

    // displayErrors(error) {
    //     var errors = [];
    //     errors.push(error);
    //     this.setState({errors: errors})	
    // }

    // validate() {
    //     var messages = [];
    //     this.setState({submit:true});
    //     messages.push(!this.state.password  && 'Password required');
	// 	messages.push(!this.state.confirmPassword  && 'Confirmation Password required');
	// 	if(this.state.password && this.state.confirmPassword) {
	// 		if(this.state.password != this.state.confirmPassword) {
	// 			messages.push("Both password should be same");
	// 		}
	// 	}
        
    //     var errorShow = [];
    //     messages = messages.filter( (msg) => {
	// 		if(msg) {
	// 			return msg;
	// 		}
	// 	})
	// 	for(var i=0; i<messages.length; i++) {
	// 		var required = messages[i].indexOf('required');
	// 		if(required > 0) {
				
	// 		}
	// 		else {
	// 			errorShow.push(messages[i]);
	// 		}
	// 	}
	// 	this.setState({ errors: errorShow});
	// 	if(messages.length > 0) {
	// 		return false;
	// 	}
	// 	else {
	// 		return true;
	// 	}
    // }

    // changePassword() {
    //     var user = this.props.navigation.getParam('user');
    //     var otp = this.props.navigation.getParam('otp');
    //     if(this.validate()) {
    //         var data = {userid: user.userid, oldpassword: otp, newpassword: this.state.password, confirmpassword: this.state.confirmPassword};
    //         var response = new API('ChangePassword',data).getResponse();
    //         response.then( result => {
    //             if(result.statuscode == 200) {
    //                 this.success(user);
    //             }
    //             else {
    //                 this.displayErrors(result.message);
    //             }
    //         }).catch( (error) => {
    //             this.displayErrors(error);
    //         })
    //     }
    // }

    // async success(profile) {
	// 	await AsyncStorage.setItem("roleid",profile.RoleId);
	// 	await AsyncStorage.setItem("userid",profile.userid);
	// 	await AsyncStorage.setItem("authToken",profile.AuthToken);
	// 	await AsyncStorage.setItem("profile", JSON.stringify(profile));
	// 	if(profile.RoleId == 2) {
	// 		this.props.navigation.navigate('RealEstateHome')
	// 	}
	// 	else if(profile.RoleId == 3) {
	// 		this.props.navigation.navigate('CompanyHome')
	// 	}
	// 	else if(profile.RoleId == 4) {
	// 		this.props.navigation.navigate('InspectorHome')
	// 	}
    // }
    save() {
        this.setState({isVisible: true});
    }
    unsave() {
        this.setState({isVisible: false});
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
    
      handleBackButtonClick() {
          this.props.navigation.goBack(null);
          return true;
      }
    render() {
        if(this.state.loading) {
            return <Loader />
        }
        var oldpassword = !this.state.oldpassword && this.state.submit ? true : false;
        var npassword = !this.state.npassword && this.state.submit ? true : false;
        var confirmPassword = !this.state.confirmPassword && this.state.submit ? true : false;
        
        return (
           <Container>
               <Header style={{ backgroundColor: "#1b244d", elevation: 0, shadowOpacity: 1 }}>
               <View>
                        <Button transparent onPress={() => this.handleBackButtonClick()}>
                            <Icon type="font-awesome" name='chevron-left' color='#fff' />
                        </Button>
                    </View>
                    <View style={{marginLeft:'25%', marginTop:'3%'}}>
                        <Title style={{ color: '#fff', fontSize: 16 }}>Change Password</Title>
                    </View>
                    <Right>
                        <Button transparent onPress={() => this.save()}>
                        <Icon type="font-awesome" name='check' color="#FFF" />
                        </Button>
                    </Right>
                </Header>
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
            <View style={{flex:1,justifyContent:'center'}}>
                {/* <Errors errors={this.state.errors} /> */}
                <Item style={styles.formItem}>
                    <Input secureTextEntry={true} inputContainerStyle={oldpassword && styles.inputError} rightIcon={oldpassword && this.common.getIcon()} errorMessage={oldpassword && 'Enter Old Password'} value={this.state.oldpassword} onChangeText={(text) => this.setState({'oldpassword': text})}  placeholder="Enter Old Password" inputStyle={[styles.font15]}  />
                </Item>
                <Item style={styles.formItem}>
                    <Input secureTextEntry={true} inputContainerStyle={npassword && styles.inputError} rightIcon={npassword && this.common.getIcon()} errorMessage={npassword && 'npassword Required'} value={this.state.npassword} onChangeText={(text) => this.setState({'npassword': text})}  placeholder="Enter New Password" inputStyle={[styles.font15]}  />
                </Item>
                <Item style={styles.formItem}>
                    <Input secureTextEntry={true} inputContainerStyle={confirmPassword && styles.inputError} rightIcon={confirmPassword && this.common.getIcon()} errorMessage={confirmPassword && 'Confirm Password Required'} value={this.state.confirmPassword} onChangeText={(text) => this.setState({'confirmPassword': text})}  placeholder="Confirm Password" inputStyle={[styles.font15]}  />
                </Item>
            </View>
            </Container>
        );
    }
}