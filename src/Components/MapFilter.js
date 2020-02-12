import React, { Component } from 'react';
import { Container, Tab, Switch, ScrollableTab, PermissionsAndroid, Platform, List, Header, Left, Right, Body, Button, Title } from 'native-base';
import { View, Text, FlatList } from 'react-native';
import { Icon, Overlay, Slider, CheckBox } from 'react-native-elements';
import styles from '../../assets/style/style2.js';

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Gender: '',
            Age:18,
            Amenities: ['Bar','Restaurants','Other'],
            AmenitiesSelected: [],
        }
    }

    toogleGender = (Gender) => {
        this.setState({
            Gender: Gender,
        })
        console.log('Gender', Gender)
    }

    isAmenitiesExist(item) {
        return this.state.AmenitiesSelected.indexOf(item)
    }

    SelectAmenities(item) {
        var index = this.isAmenitiesExist(item);
        var amenities = [...this.state.AmenitiesSelected]
        console.log("index: ", index)
        if (index >= 0) {
            amenities.splice(index, 1)
        }
        else {
            amenities.push(item)
        }
        this.setState({
            AmenitiesSelected: amenities
        })
        console.log("amenities: ", amenities)
    }

    render() {
        return (
            <Overlay overlayStyle={[{ width:'97%' }]} height="auto" isVisible={this.props.isVisible}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: "50%", flexDirection: 'row' }}>
                        <Icon type="font-awesome" name='sliders' color="#333" size={20} />
                        <Text style={{ marginLeft: 10 }}>Filter</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'flex-end', position: 'relative', bottom: 13, alignSelf: 'flex-end', alignItems: 'flex-end', alignContent: 'flex-end' }}>
                        <Button transparent onPress={() => this.props.closeModal()} >
                            <Icon type="font-awesome" name='times' color="#ccc" />
                        </Button>
                    </View>
                </View>
                <View style={{ marginTop: 20, }}>
                    <Text>Gender</Text>
                    <View style={[styles.row, {marginTop:10}]}>
                        <View>
                            <CheckBox
                                size={1}
                                center
                                title='Male'
                                isChecked={this.state.Gender === 'Male'}
                                onPress={() => this.toogleGender('Male')}
                                containerStyle={{ borderColor: "#333", borderWidth: 1, backgroundColor: this.state.Gender === 'Male' ? '#1b244d' : 'white' }}
                                textStyle={{ fontSize: 13, color: this.state.Gender === 'Male' ? 'white' : '#000' }}
                            />
                        </View>
                        <View>
                            <CheckBox
                                size={1}
                                center
                                title='Female'
                                isChecked={this.state.Gender === 'Female'}
                                onPress={() => this.toogleGender('Female')}
                                containerStyle={{ borderColor: "#333", borderWidth: 1, backgroundColor: this.state.Gender === 'Female' ? '#1b244d' : 'white' }}
                                textStyle={{ fontSize: 13, color: this.state.Gender === 'Female' ? 'white' : '#000' }}
                            />
                        </View>
                        <View>
                            <CheckBox
                                size={1}
                                center
                                title='Other'
                                isChecked={this.state.Gender === 'Other'}
                                onPress={() => this.toogleGender('Other')}
                                containerStyle={{ borderColor: "#333", borderWidth: 1, backgroundColor: this.state.Gender === 'Other' ? '#1b244d' : 'white' }}
                                textStyle={{ fontSize: 13, color: this.state.Gender === 'Other' ? 'white' : '#000' }}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={{}}>Select Age {this.state.Age}</Text>
                    <View style={[styles.registerOtherComponents]}>
                        <Slider
                            value={this.state.Age}
                            thumbTintColor="#28558E"
                            minimumValue={18}
                            maximumValue={80}
                            step={1}
                            onValueChange={(age) => this.setState({ Age: age })}
                        />
                        <View style={[styles.row]}>
                            <Text style={[styles.registerOtherComponentsText, styles.twoRow]}>18</Text>
                            <Text style={[styles.registerOtherComponentsText, styles.twoRow, { textAlign: 'right' }]}>80</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 20, }}>
                    <Text style={{ marginBottom: 10 }}>Filter Via</Text>
                    <FlatList
                        data={this.state.Amenities}
                        keyExtractor={(item, index) => `${index}`}
                        contentContainerStyle={{
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        }}
                        renderItem={({ item }) =>
                            <View>
                                <CheckBox
                                    size={1}
                                    center
                                    title={item}
                                    onPress={() => this.SelectAmenities(item)}
                                    textStyle={{ fontSize: 12, color: this.isAmenitiesExist(item) >= 0 ? 'white' : '#1b244d' }}
                                    containerStyle={{ borderColor: "#333", borderWidth: 1, backgroundColor: this.isAmenitiesExist(item) >= 0 ? '#1b244d' : 'white' }}
                                />
                            </View>
                        }
                    />
                </View>
                <View style={[styles.center, { marginTop: 20, }]}>
                    <Button style={[styles.loginButton, { width: 180, justifyContent: 'center', backgroundColor: '#fff', color: '#333', borderWidth: 1, borderColor: '#333' }]} onPress={() => this.props.filterUser(this.state)}>
                        <Text style={[styles.textCenter, { color: '#333' }]}>Show Result</Text>
                    </Button>
                </View>
            </Overlay>
        )
    }
}

