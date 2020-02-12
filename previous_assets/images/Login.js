import React, { Component } from "react";
import { Image, ImageBackground, ScrollView, ListView, TouchableHighlight, TouchableOpacity } from "react-native";
import styles from './style';
import {
  Container, Title, Content, Button, Text, Left, Body, Right, Card, CardItem, Header, Picker,
  List, Item, Input, ListItem, Spinner, View, Label, H3, Form, CheckBox, Row, Col, Grid, Badge, CardList, Footer
} from "native-base";

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Row style={styles.logoBack}>
            <Image style={styles.iconImage} source={require('../../assets/02.jpg')}>
            </Image>
          </Row>
          <View>
            <View style={styles.inputView}>
              <Item style={{ borderBottomColor: '#333' }}>
                <Input style={styles.inputfield}
                  placeholder='Email'
                  //onChangeText={(val) => login.setState({ userName: val })}
                  autoCapitalize='none'
                  maxLength={100}
                  borderColor='#333'
                  selectionColor={'#333'}
                  placeholderTextColor='#333'
                />
              </Item>
              <Item style={{ borderBottomColor: '#333', marginTop: 10 }}>
                <Input style={styles.inputfield}
                  //onChangeText={(val) => login.setState({ password: val })}
                  selectionColor={'#333'}
                  placeholder='Password'
                  maxLength={14}
                  secureTextEntry
                  autoCapitalize='none'
                  placeholderTextColor='#333'
                />
              </Item>
              <View>
                <View style={[styles.rememberAndForgotWrapper]}>
                  <View style={styles.row}>
                    <CheckBox checkedColor="#28558E" color="#808080" style={styles.loginCheckbox} />
                    <Text style={[styles.greyColor, styles.font15]}>Remember Me</Text>
                  </View>
                  <View>
                    <TouchableOpacity >
                      <Text style={[styles.greyColor, styles.font14]}>Forgot Password?</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 30 }}>
                <Button block style={{ backgroundColor: '#333', borderRadius: 50 }}
                >
                  <Text style={{ fontSize: 14 }}>LOGIN</Text>
                </Button>
                <Row style={styles.orLabel}>
                  <Label style={{ color: '#333' }}>Or Sign In With:</Label>
                </Row>
                <Row style={styles.socialRow}>
                  <Left>
                    <Button block style={styles.fb}>
                      <Image style={styles.icon} source={require("../../assets/facebook.jpeg")} />
                      {/* <Icon name='logo-facebook' size={18} /> */}
                    </Button>
                  </Left>
                  <Right>
                    <Button block style={styles.google}>
                      <Image style={styles.icons} source={require("../../assets/Google-Plus-Icon.png")} />
                      {/* <Icon name='logo-facebook' size={18} /> */}
                    </Button>
                  </Right>
                </Row>
              </View>
            </View>
          </View>
          <View style={{ flex: 2, backgroundColor: '#28558E', marginTop: 20 }}>
            <Row style={styles.bottomRow}>
              <Text style={styles.newUser}>New User than!</Text>
              <TouchableOpacity style={styles.signUptext}><Text style={{ color: '#fff', alignSelf: 'center', alignContent: 'center', justifyContent: 'center' }}>Sign Up</Text></TouchableOpacity>
            </Row>
          </View>
        </Content>
      </Container >
    );
  }
}