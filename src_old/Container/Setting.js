import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, BackHandler, AsyncStorage, Text, View, ScrollView, Image } from 'react-native';
import styles from '../../assets/style/style2.js';
import { Container, Tab, Tabs, ScrollableTab, ListItem, List, Header, Left, Right, Body, Button, Radio, Title } from 'native-base';
import { Icon, Overlay, Slider, CheckBox } from 'react-native-elements';
import API from '../Api/Api';
import Common from '../Container/Common';
import Call from '../Components/Call';

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            distance: 200,
            distanceMiles: 1,
            Radius: "ft",
        }
        this.common = new Common();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    async componentDidMount() {
        var profile = JSON.parse(await AsyncStorage.getItem('profile'));
        console.log("settings profile: ", profile)
        profile.RadiusUnit == "ft" && this.setState({ distance: profile.Radius })
        profile.RadiusUnit == "miles" && this.setState({ distanceMiles: profile.Radius })
        this.setState({
            Radius: profile.RadiusUnit
        })
    }

    async success() {
        var profile = JSON.parse(await AsyncStorage.getItem('profile'));
        var distance = this.state.Radius == "ft" ? this.state.distance : this.state.distanceMiles;
        profile.Radius = distance;
        profile.RadiusUnit = this.state.Radius;
        await AsyncStorage.setItem("profile", JSON.stringify(profile));
        this.common.showToast("Saved Successfully.")
    }

    toogleGender = (Radius) => {
        this.setState({
            Radius: Radius,
        })
        console.log('Radius', Radius)
    }

    Setting = async () => {
        var profile = JSON.parse(await AsyncStorage.getItem('profile'));
        var authToken = profile.Authentication;

        await this.getRequestData().then(data => {
            var header = { "authentication": authToken };
            console.log("request : ", data);
            var response = new API('ChangeSetting', data, header).getResponse();
            response.then(result => {
                console.log("response: ", result);
                if (result.StatusCode == 200) {
                    this.success();

                }
                else {
                    this.common.showToast("Failed to update Settings.")
                }
            })
        });
        this.setState({ loading: false })

    }

    async getRequestData() {
        var profile = JSON.parse(await AsyncStorage.getItem('profile'))
        var distance = this.state.Radius == "ft" ? this.state.distance : this.state.distanceMiles;
        return {
            "UserId": profile.UserId,
            "Radius": distance,
            "RadiusUnit": this.state.Radius
        }
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('Dashboard');

    }
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "#1b244d", elevation: 0, shadowOpacity: 1 }}>
                    <Left>
                        <Button transparent onPress={() => this.handleBackButtonClick()}>
                            <Icon type="font-awesome" name='chevron-left' color='#fff' size={19} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Settings</Title>
                    </Body>
                    <Right>
                        <Call />
                    </Right>
                </Header>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop:20, marginBottom:100}}>
                        <CheckBox
                            size={1}
                            center
                            title='FEET'
                            isChecked={this.state.Radius === 'ft'}
                            onPress={() => this.toogleGender('ft')}
                            containerStyle={{ width: 120, borderColor: "#333", borderWidth: 1, backgroundColor: this.state.Radius === 'ft' ? '#1b244d' : 'white' }}
                            textStyle={{ fontSize: 13, color: this.state.Radius === 'ft' ? 'white' : '#000' }}
                        />
                        <CheckBox
                            size={1}
                            center
                            title='MILES'
                            isChecked={this.state.Radius === 'miles'}
                            onPress={() => this.toogleGender('miles')}
                            containerStyle={{ width: 120, borderColor: "#333", borderWidth: 1, backgroundColor: this.state.Radius === 'miles' ? '#1b244d' : 'white' }}
                            textStyle={{ fontSize: 13, color: this.state.Radius === 'miles' ? 'white' : '#000' }}
                        />
                    </View>
                <View style={{justifyContent:'center'}}>
                    <View style={{justifyContent:'center', alignContent:'center' }}>
                        {this.state.Radius == "ft" ?
                            <View style={{ padding: 12}}>
                                <View style={{ flexDirection: 'row', marginBottom: 25, marginTop: 17 }}>
                                    <Text style={{ fontSize: 16 }}>Select Radius </Text>
                                    {this.state.distance == "0" ? <Text style={{ color: '#28558E', fontSize: 16 }}>{this.state.distance} foot</Text> : <Text style={{ color: '#28558E', fontSize: 16 }}>{this.state.distance} feet</Text>}
                                    {/* {this.state.Radius == "ft" ? <Text style={{ color: '#28558E', fontSize: 16 }}>{this.state.distance} feet</Text> : <Text style={{ color: '#28558E', fontSize: 16 }}>{this.state.distance} miles</Text>} */}
                                </View>
                                <Slider
                                    value={this.state.distance}
                                    onValueChange={value => this.setState({ distance: value })}
                                    thumbTintColor="#28558E"
                                    minimumValue={0}
                                    maximumValue={1000}
                                    step={100}
                                    //minimumTrackTintColor={this.getSelectedColor(this.state.distance)}
                                />
                                <View style={[styles.row]}>
                                    {this.state.distance == "0"?<Text style={[styles.registerOtherComponentsText, styles.twoRow]}>0 foot</Text>: <Text style={[styles.registerOtherComponentsText, styles.twoRow]}>0 feet</Text>}
                                    <Text style={[styles.registerOtherComponentsText, styles.twoRow, { textAlign: 'right' }]}>1000 feet</Text>
                                </View>
                            </View>
                            :
                            <View style={{ padding: 12 }}>
                                <View style={{ flexDirection: 'row', marginBottom: 25, marginTop: 17 }}>
                                    <Text style={{ fontSize: 16 }}>Select Radius </Text>
                                    {this.state.Radius == "miles" ? <Text style={{ color: '#28558E', fontSize: 16 }}>{this.state.distanceMiles} mile{this.state.distanceMiles > 1 && 's'}</Text> : <Text style={{ color: '#28558E', fontSize: 16 }}>{this.state.distance} ft</Text>}
                                </View>
                                <Slider
                                    value={this.state.distanceMiles}
                                    onValueChange={value => this.setState({ distanceMiles: value })}
                                    thumbTintColor="#28558E"
                                    minimumValue={0}
                                    maximumValue={30}
                                    step={1}
                                //minimumTrackTintColor={this.getSelectedColor(this.state.distance)}
                                />
                                <View style={[styles.row]}>
                                    <Text style={[styles.registerOtherComponentsText, styles.twoRow]}>0 mile</Text>
                                    <Text style={[styles.registerOtherComponentsText, styles.twoRow, { textAlign: 'right' }]}>30 miles</Text>
                                </View>
                            </View>
                        }

                        <View style={[styles.center, { marginTop: "10%" }]}>
                            <Button block style={{ backgroundColor: 'black', borderRadius: 50, width: '45%', alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }} onPress={() => this.Setting()}>
                                <Text style={{ fontSize: 14, color: '#fff' }}>Save</Text>
                            </Button>
                        </View>
                    </View>

                </View>
            </Container>
        );
    }
}
