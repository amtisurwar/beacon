import React, { Component } from 'react';
import {
    View,
    KeyboardAvoidingView,
    TextInput,
    Text,
    Picker,
    FlatList,
    StatusBar,
    StyleSheet,
    ActivityIndicator,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import styles from '../../assets/style/style2.js';
import DatePicker from 'react-native-datepicker'
import {
    Container, Header, Textarea, Content, Button, Card, CardItem, Form, Item, Root, Left, Right, Body, Title
} from 'native-base';
//import Geolocation from '@react-native-community/geolocation';
import { CheckBox, Avatar, Icon, Overlay, SearchBar, Input, Slider } from 'react-native-elements';
import Common from './Common/index';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            loading: false,
            timing: [{ start_time: '00:00', end_time: '00:00' }],
            DataList: [
                {
                    "name": "Denim Banzan",
                    "first": "1 : Happy",
                    "second": "2 : Soccer Player",
                    "third": "3 : Vodka",
                    "fourth": "Status",
                    "distance": "5 meters away",
                    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                },
                {
                    "name": "Denim Banzan",
                    "first": "1 : Happy",
                    "second": "2 : Soccer Player",
                    "third": "3 : Vodka",
                    "fourth": "Status",
                    "distance": "10 meters away",
                    "image": "https://en.wikipedia.org/wiki/File:Pierre-Person.jpg"
                },

            ],
            DataLists: [
                {
                    "name": "Denim Banzan",
                    "first": "1 : Happy",
                    "second": "2 : Soccer Player",
                    "third": "3 : Vodka",
                    "fourth": "Status",
                    "distance": "5 meters away",
                    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                },

            ],
        }
        this.common = new Common();
    }

    save() {
        this.setState({ isVisible: true });
    }
    note() {
        this.setState({ isVisible: true });
    }
    back() {
        this.setState({ isVisible: false });
    }

    setTiming(stateValue, field) {
        // console.log("stateValue: ",stateValue,"field: ",field);
        if (field == "start_time") {
            this.state.timing.start_time = stateValue;
        }
        if (field == "end_time") {
            this.state.timing.end_time = stateValue;
        }
        this.forceUpdate()
        // console.log(this.state.timing);
    }

    FilterPopup() {
        var startTime = this.state.timing.start_time;
        var endTime = this.state.timing.end_time;
        return (
            <Overlay overlayStyle={[styles.otpModel, { height: '30%' }]} isVisible={this.state.isVisible}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: "50%", flexDirection: 'row' }}>
                        <Icon type="font-awesome" name='sliders' color="#333" size={20} />
                        <Text style={{ marginLeft: 10 }}>Filter</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'flex-end', alignSelf: 'flex-end', alignItems: 'flex-end', alignContent: 'flex-end' }}>
                        <Icon type="font-awesome" name='times-circle' color="#333" onPress={() => this.back()} />
                    </View>
                </View>
                <View style={{ paddingTop: "5%" }}>
                    <Text>Time</Text>
                    <View style={[styles.sectionRow, { paddingTop: "5%" }]}>
                        <View style={styles.threeRow}>
                            <DatePicker
                                style={[styles.datePicker]}
                                mode="time"
                                is24Hour={false}
                                date={startTime}
                                placeholder="From"
                                //format='HH:mm'
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(start_time) => { this.setTiming(start_time, 'start_time') }}
                                iconComponent={
                                    <Icon
                                        size={18}
                                        name='clock-o'
                                        type='font-awesome'
                                        containerStyle={styles.dateIcon}
                                    />
                                }
                                customStyles={{
                                    dateText: styles.dateText,
                                    dateInput: styles.dateInput,
                                    placeholderText: {
                                        fontSize: 15,
                                        color: '#333'
                                    },
                                }}
                            />
                        </View>
                        <View style={styles.threeRow}>
                            <DatePicker
                                style={[styles.datePicker]}
                                mode="time"
                                is24Hour={false}
                                date={endTime}
                                placeholder="To"
                                //format='HH:mm'
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(end_time) => { this.setTiming(end_time, 'end_time') }}
                                iconComponent={
                                    <Icon
                                        size={18}
                                        name='clock-o'
                                        type='font-awesome'
                                        containerStyle={styles.dateIcon}
                                    />
                                }
                                customStyles={{
                                    dateText: styles.dateText,
                                    dateInput: styles.dateInput,
                                    placeholderText: {
                                        fontSize: 15,
                                        color: '#333'
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={[styles.center, { flexlDirection: 'row', justifyContent: 'space-evenly' }]}>
                    <Button style={[styles.loginButton, { backgroundColor: '#fff', color: '#333', borderWidth: 1, borderColor: '#333' }]} onPress={() => this.unsave()}>
                        <Text style={[styles.textCenter, { color: '#333' }]}>Show Result</Text>
                    </Button>
                </View>
            </Overlay>
        )
    }


    addNotes() {
        <Overlay overlayStyle={[styles.otpModel, { height: '30%' }]} isVisible={this.state.isVisible}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: "50%", flexDirection: 'row' }}>
                    <Icon type="font-awesome" name='sliders' color="#333" size={20} />
                    <Text style={{ marginLeft: 10 }}>Add some notes</Text>
                </View>
                <View style={{ width: "50%", justifyContent: 'flex-end', alignSelf: 'flex-end', alignItems: 'flex-end', alignContent: 'flex-end' }}>
                </View>
            </View>
            <View>
                <View style={{ }}>
                    <Textarea rowSpan={5} bordered  style={{ backgroundColor: '#f3f3f3', borderColor: '#e8e8e8', height: 80 }} />
                </View>
            </View>
            <View style={[styles.center, { flexlDirection: 'row', justifyContent: 'space-evenly' }]}>
                <Button style={[styles.loginButton, { backgroundColor: '#fff', color: '#333', borderWidth: 1, borderColor: '#333' }]} onPress={() => this.unsave()}>
                    <Text style={[styles.textCenter, { color: '#333' }]}>Show Result</Text>
                </Button>
            </View>
        </Overlay>
    }


    renderItem = ({ item }) => {
        return (
            <TouchableHighlight style={{ marginLeft: '0%', marginRight: '0%', width: '100%', }}>
                <View style={{ flexDirection: 'row', marginTop: 4, borderRadius: 5, marginRight: '5%', marginLeft: "5%", backgroundColor: '#ffffff', }}>
                    <Image source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} style={styles.pic} />
                    <View style={{ flexDirection: 'column', width: '60%', marginTop: 10, marginLeft: '5%' }}>
                        <Text style={{
                            color: 'black', width: '100%'
                            , fontSize: 13, marginLeft: 1, marginRight: 10, fontWeight: 'bold'
                        }}>{item.name}</Text>

                        <Text style={{
                            color: 'black', width: '100%'
                            , fontSize: 13, marginLeft: 1, marginRight: 10, marginTop:3
                        }}>{item.fourth}</Text>

                        <Text style={{
                            color: 'black', width: '80%'
                            , fontSize: 13, marginLeft: 1, marginRight: 10, marginTop:3
                        }}>{item.first}</Text>

                        <Text style={{
                            color: 'black', width: '100%'
                            , fontSize: 13, marginLeft: 1, marginRight: 10, marginTop:3
                        }}>{item.second}</Text>

                        <Text style={{
                            color: 'black', width: '100%'
                            , fontSize: 13, marginLeft: 1, marginRight: 10, marginTop:3
                        }}>{item.third}</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%', marginTop: 10, marginLeft: '0%' }}>
                        <Text style={{
                            color: 'white', width: '15%', marginTop: '8%', height: 12
                            , fontSize: 12, marginLeft: 1, marginRight: 10, backgroundColor: '#1163E6', textAlign: 'center', textAlignVertical: 'center', alignContent: 'center'
                        }}></Text>
                        <Text style={{
                            color: 'white', width: '15%', marginTop: '3%', height: 15
                            , fontSize: 12, marginLeft: 1, marginRight: 10, backgroundColor: 'black', textAlign: 'center', textAlignVertical: 'center', alignContent: 'center'
                        }}></Text>
                    </View>
                </View>

            </TouchableHighlight>
        );
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
                        <Title style={{ color: '#fff' }}>History</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon type="font-awesome" name='search' color="#FFF" size={20} />
                        </Button>
                        <Button transparent>
                            <Icon type="font-awesome" name='sliders' color="#FFF" onPress={() => this.save()} size={20} />
                        </Button>
                        <Button transparent>
                            <Icon type="font-awesome" name='phone' color="#FFF" size={20} />
                        </Button>
                    </Right>
                </Header>
                <View>{this.FilterPopup()}</View>
                <View>{this.addNotes()}</View>
                <View style={{ backgroundColor: "#f5f5f0" }}>
                <View style={{flexDirection: 'row', alignItems: 'center', borderColor: '#dcdcdc', padding: 6, paddingRight:0, justifyContent: 'space-between',}}>
                <Input placeholder='Search'
                    value={this.state.value}
                    inputStyle={{fontSize:12}}
                    //onChangeText={text => this.searchFilterFunction(text)}
                    containerStyle={{width:'100%'}}
                    inputContainerStyle={{borderWidth:1, borderColor:'#ccc',borderRadius:2, paddingHorizontal:6,marginVertical:2}}
                    rightIcon={
                        <Icon
                            size={20}
                            name="search"
                        />
                    }
                />
        </View>
                    <View style={{ paddingLeft: "5%", marginTop: 20 }}>
                        <Text style={{ color: '#b8b894' }}>Today 11/22/2019</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', marginLeft: '0%', marginTop: 20 }}>
                        <FlatList
                            data={this.state.DataList}
                            showsVerticalScrollIndicator={false}
                            extraData={this.state}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.email}
                        />
                    </View>
                    <View style={{ paddingLeft: "5%", marginTop: 20 }}>
                        <Text style={{ color: '#b8b894' }}>Yesterday 11/21/2019</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', height:'100%', marginLeft: '0%', marginTop: 20 }}>
                        <FlatList
                            data={this.state.DataLists}
                            showsVerticalScrollIndicator={false}
                            extraData={this.state}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.email}
                        />
                    </View>
                </View>
            </Container>
        );
    }
}
export default Search;