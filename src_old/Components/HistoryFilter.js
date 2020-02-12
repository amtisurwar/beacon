import React, { Component } from 'react';
import { Container, Tab, Switch, ScrollableTab, PermissionsAndroid, Platform, List, Header, Left, Right, Body, Button, Title } from 'native-base';
import { View, Text, FlatList } from 'react-native';
import { Icon, Overlay, Slider, CheckBox } from 'react-native-elements';
import styles from '../../assets/style/style2.js';
import DatePicker from 'react-native-datepicker'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            loading: false,
            value: '',
            fromDate: '',
            toDate: ''
        }
    }

    

   

    render() {
        
        return (
            <Overlay overlayStyle={[{ width:'90%', height:'40%' }]} isVisible={this.props.isVisible}>
                <View style={{ flexDirection: 'row', padding:5}}>
                    <View style={{ width: "50%", flexDirection: 'row' }}>
                        <Icon type="font-awesome" name='sliders' color="#333" size={20} />
                        <Text style={{ marginLeft: 10, marginTop:2 }}>Filter</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'flex-end', position: 'relative', bottom: 13, alignSelf: 'flex-end', alignItems: 'flex-end', alignContent: 'flex-end' }}>
                    <Button transparent onPress={() => this.props.closeModal()} >
                        <Icon type="font-awesome" name='times' color="#ccc" onPress={() => this.props.closeModal()} />
                    </Button>
                    </View>
                </View>
                <View style={{ paddingTop: 10, padding:5 }}>
                    <Text style={{marginBottom:15}}>Date</Text>
                    <View style={[styles.sectionRow]}>
                        <View style={[styles.threeRow]}>
                            <DatePicker
                                style={[styles.datePicker, {borderBottomColor:'#333', borderBottomWidth:1, width:'90%'}]}
                                mode="date"
                                maxDate={new Date()}
                                is24Hour={false}
                                date={this.state.fromDate}
                                placeholder="From"
                                format="MM-DD-YYYY"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(fromDate) => this.setState({fromDate:fromDate}) }
                                iconComponent={
                                    <Icon
                                        size={14}
                                        name='calendar'
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
                                style={[styles.datePicker, {borderBottomColor:'#333', borderBottomWidth:1, width:'90%'}]}
                                mode="date"
                                maxDate={new Date()}
                                is24Hour={false}
                                date={this.state.toDate}
                                placeholder="To"
                                format="MM-DD-YYYY"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(toDate) => this.setState({toDate:toDate})}
                                iconComponent={
                                    <Icon
                                        size={14}
                                        name='calendar'
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
                <View style={[styles.center, { flexlDirection: 'row', justifyContent: 'space-evenly', paddingTop:'8%' }]}>
                    <Button style={[styles.loginButton, { backgroundColor: '#fff', color: '#333', borderWidth: 1, borderColor: '#333' }]} onPress={() => this.props.dateFilter(this.state.fromDate, this.state.toDate)}>
                        <Text style={[styles.textCenter, { color: '#333' }]}>Show Result</Text>
                    </Button>
                </View>
            </Overlay>
        )
    }
}

