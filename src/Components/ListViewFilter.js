import { Platform, StyleSheet, View, ScrollView, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from '../../assets/style/style2.js';
import React, { Component } from 'react';
import {
    Container, Header, Content, Button, Card, CardItem,
    Text, Body, Form, Item, ListItem, Radio, Left, Right
} from 'native-base';
import { CheckBox, Avatar, Icon, Input, Overlay, Slider } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class ListViewFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            submit: false,
            distance: 1,
            isVisible: false,
        }
    }
    componentDidMount() {
        // this.getData();
    }

    save() {
        this.setState({ isVisible: true });
    }
    unsave() {
        this.setState({ isVisible: false });
    }

    render() {
        return (
            <View>
                <Icon
                    type="font-awesome" name='sliders' color="#FFF"
                    onPress={() => this.save()}
                />
                <Overlay overlayStyle={[styles.otpModel, { height: '60%' }]} isVisible={this.state.isVisible}>
                    <View style={{ flexDirection: 'row'}}>
                        <View style={{ width: "50%",flexDirection: 'row' }}>
                            <Icon type="font-awesome" name='sliders' color="#333" size={20} />
                            <Text style={{ marginLeft: 10 }}>Filter</Text>
                        </View>
                        <View style={{ width: "50%", justifyContent: 'flex-end', alignSelf: 'flex-end', alignItems: 'flex-end', alignContent: 'flex-end' }}>
                            <Icon type="font-awesome" name='times-circle' color="#333" />
                        </View>
                    </View>
                    <View style={{ flex: 1, marginTop:20, borderBottomWidth:1, borderColor:'#ebebe0'  }}>
                        <Text style={{}}>Gender</Text>
                        <View style={[styles.sectionRow, { marginTop: 10 }]}>
                            <View style={[styles.threeRow, { borderColor: "#ebebe0", borderWidth: 2, width: '30%', padding: 3, marginRight: 3 }]}>
                                <Text style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>Male</Text>
                            </View>
                            <View style={[styles.threeRow, { borderColor: "#ebebe0", borderWidth: 2, width: '30%', padding: 3, marginRight: 3 }]}>
                                <Text style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>Female</Text>
                            </View>
                            <View style={[styles.threeRow, { borderColor: "#ebebe0", borderWidth: 2, width: '30%', padding: 3, marginRight: 3 }]}>
                                <Text style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>Other</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginTop:30 }}>
                        <Text style={{}}>Select Age</Text>
                        <View style={[styles.registerOtherComponents]}>
                            <Slider
                                value={this.state.distance}
                                onValueChange={value => this.setState({ distance: value })}
                                thumbTintColor="#28558E"
                                minimumValue={1}
                                maximumValue={50}
                                step={1}
                            //minimumTrackTintColor={this.getSelectedColor(this.state.distance)}
                            />
                            <View style={[styles.row]}>
                                <Text style={[styles.registerOtherComponentsText, styles.twoRow]}>18</Text>
                                <Text style={[styles.registerOtherComponentsText, styles.twoRow, { textAlign: 'right' }]}>80</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginTop: 50 }}>
                        <Text style={{}}>Filter Via</Text>
                        <View style={[styles.sectionRow, { marginTop: 10 }]}>
                            <View style={[styles.threeRow, { borderColor: "#ebebe0", borderWidth: 2, width: '30%', padding: 3, marginRight: 3 }]}>
                                <Text style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>Bar</Text>
                            </View>
                            <View style={[styles.threeRow, { borderColor: "#ebebe0", borderWidth: 2, width: '30%', padding: 3, marginRight: 3 }]}>
                                <Text style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>Restaurant</Text>
                            </View>
                            <View style={[styles.threeRow, { borderColor: "#ebebe0", borderWidth: 2, width: '30%', padding: 3, marginRight: 3 }]}>
                                <Text style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>Other</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.center, { flexDirection: 'row', justifyContent: 'space-evenly' }]}>
                        <Button style={[styles.loginButton, { backgroundColor: '#fff', color: '#333', borderWidth: 1, borderColor: '#333' }]} onPress={() => this.unsave()}>
                            <Text style={[styles.textCenter, { color: '#333' }]}>Search Result</Text>
                        </Button>
                    </View>
                </Overlay>
            </View>
        );
    }
}
export default withNavigation(ListViewFilter);