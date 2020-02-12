import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, BackHandler, Text, View, ScrollView, Image } from 'react-native';
import styles from '../../assets/style/style2.js';
import { Container, Tab, Tabs, ScrollableTab, List, Header, Left, Right, Body, Button, Title } from 'native-base';
import { Icon, Overlay, Slider, CheckBox } from 'react-native-elements';

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            distance: 1,
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
    
      handleBackButtonClick() {
          this.props.navigation.goBack(null);
          return true;
      }
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "#1b244d", elevation: 0, shadowOpacity: 1 }}>
                    <Left>
                        <Button transparent onPress={() => this.handleBackButtonClick()}>
                        <Icon type="font-awesome" name='chevron-left' color='#fff' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Setting</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon type="font-awesome" name='phone' color="#FFF" />
                        </Button>
                    </Right>
                </Header>
                <View style={[styles.forgotPasswordContainer, {justifyContent:'center', alignContent:'center', alignContent:'center'}]}>
                    <View style={{flexDirection:'row', marginBottom:25}}>
                    <Text>Select Radius</Text>
                    <Text style={{color:'#28558E'}}>90ft</Text>
                    </View>
                    <Slider
                        value={this.state.distance}
                        onValueChange={value => this.setState({ distance: value })}
                        thumbTintColor="#28558E"
                        minimumValue={1}
                        maximumValue={90}
                        step={1}
                    //minimumTrackTintColor={this.getSelectedColor(this.state.distance)}
                    />
                    <View style={[styles.row]}>
                        <Text style={[styles.registerOtherComponentsText, styles.twoRow]}>{this.state.distance}</Text>
                        <Text style={[styles.registerOtherComponentsText, styles.twoRow, { textAlign: 'right' }]}>90</Text>
                    </View>
                    <View style={[styles.center, { marginTop:"20%" }]}>
                                    <Button block style={{ backgroundColor: 'black', borderRadius: 50, width: '45%', alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 14, color:'#fff' }}>Save</Text>
                                    </Button>
                                </View>
                </View>
            </Container>
        );
    }
}
