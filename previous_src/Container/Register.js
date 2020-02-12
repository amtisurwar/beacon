import React, { Component } from 'react';
import { StyleSheet, Switch, View, ScrollView, Image, TouchableOpacity, AsyncStorage, PermissionsAndroid, Platform, BackHandler } from 'react-native';
import styles from '../../assets/style/style2.js';
import {
    Container, Header, Content, Button, Card, CardItem,
    Text, Body, Form, Item, Root, Left, Right, Title,
} from 'native-base';
import GPSState from 'react-native-gps-state';
//import Geolocation from '@react-native-community/geolocation';
import { CheckBox, Avatar, Input, Icon, Overlay } from 'react-native-elements';
//import ImagePicker from 'react-native-image-picker';
//import Errors from '../Components/Errors';
// import API from '../Api/Api';
//import Loader from '../Components/Loader';
// import GoogleSearch from '../Components/GoogleSearch';
import Common from './Common/index';
//import Geolocation from '@react-native-community/geolocation';

const options = {
    title: 'Select Picture',
    mediaType: 'photo',
    cameraType: 'back',
    storageOptions: {
        skipBackup: true,
    },
};

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarSource: '',
            profilePic: '',
            errors: [],
            fname: '',
            lname: '',
            title: '',
            email: '',
            phone: '',
            Age: '',
            Status: '',
            Male: '',
            Female: '',
            Other: '',
            address: '',
            password: '',
            isVisible: false,
            confirmPassword: '',
            loading: false,
            submit: false,
            switchValue: false,
            currentLongitude: 'unknown',//Initial Longitude
            currentLatitude: 'unknown',//Initial Latitude
        }
        this.common = new Common();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount(){
        GPSState.addListener((status)=>{
            switch(status){
                case GPSState.NOT_DETERMINED:
                    alert('Please, allow the location, for us to do amazing things for you!')
                break;
     
                case GPSState.RESTRICTED:
                    GPSState.openLocationSettings()
                break;
     
                case GPSState.DENIED:
                    alert('You are not allow your location to use.')
                break;
     
                case GPSState.AUTHORIZED_ALWAYS:
                    //TODO do something amazing with you app
                    this.setState({ isVisible: true });
                break;
     
                case GPSState.AUTHORIZED_WHENINUSE:
                    //TODO do something amazing with you app
                    this.setState({ isVisible: true });
                break;
            }
        })
        GPSState.requestAuthorization(GPSState.AUTHORIZED_WHENINUSE)
        //this.callLocation()
    }
     
    componentWillUnmount(){
        GPSState.removeListener()
    }

    // callLocation(){
    //     if (Platform.OS === 'ios') {
    //         //this.setState({ isVisible: true });
    //         Geolocation.getCurrentPosition(
    //             (position) => {
    //                 const currentLongitude = JSON.stringify(position.coords.longitude);
    //                 const currentLatitude = JSON.stringify(position.coords.latitude);
    //                 this.setState({ currentLongitude: currentLongitude });
    //                 this.setState({ currentLatitude: currentLatitude });
    //             },
    //             (error) => alert(error.message),
    //             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //         );
    //         this.watchID = Geolocation.watchPosition((position) => {
    //             console.log(position);
    //             const currentLongitude = JSON.stringify(position.coords.longitude);
    //             const currentLatitude = JSON.stringify(position.coords.latitude);
    //             this.setState({ currentLongitude: currentLongitude });
    //             this.setState({ currentLatitude: currentLatitude });
    //         });
    //     }
    // }


    // getlocation() {
    //     this.setState({ isVisible: true });
    // }

    toggleSwitch = (value) => {
        //onValueChange of the switch this function will be called
        this.setState({ switchValue: value })
        //state changes according to switch
        //which will result in re-render the text
    }
    enable() {
        this.setState({ isVisible: false });
    }

    onRegister = async () => {
        //this.props.navigation.navigate('Home')
        if (!this.state.avatarSource) {
            this.common.showToast('Please Select your Profile Picture');

        }
        else if (!this.state.fname) {
            this.common.showToast('Please enter your First Name');
            this.fname.focus()
        }
        else if (!this.state.lname) {
            this.common.showToast('Please enter your Last Name');
            this.lname.focus()
        }
        else if (!this.state.email) {
            this.common.showToast('Please enter your Email ID');
            this.email.focus()
        }
        else if (this.state.email && !this.common.validateEmail(this.state.email)) {
            this.common.showToast('Please enter valid Email ID');
            this.email.focus()
        }
        else if (!this.state.phone) {
            this.common.showToast('Please enter your Phone Number');
            this.phone.focus()
        }
        else if (this.state.phone && !this.common.validatePhone(this.state.phone)) {
            this.common.showToast('Please enter valid Phone Number');
            this.phone.focus()
        }
        else if (!this.state.password) {
            this.common.showToast('Please enter your Password');
            this.password.focus()
        }
        else if (!this.state.confirmPassword) {
            this.common.showToast('Please enter your Confirm Password');
            this.confirmPassword.focus()
        }
        else if (!this.state.Age) {
            this.common.showToast('Please enter your Age');
            this.Age.focus()
        }
        else if (!this.state.Status) {
            this.common.showToast('Please enter your status');
            this.Status.focus()
        }
        else if (!this.state.address) {
            this.common.showToast('Please enter your Address');
            this.address.focus()
        }
        else {
            this.props.navigation.navigate('Home')
        }
        return false;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }


    render() {
        if (this.state.loading) {
            return <Loader />
        }


        return (
            <Root>
                <ScrollView
                    ref='_scrollView'
                >
                    <Header style={styles.header}>
                        <Left>
                            <Button transparent onPress={() => this.handleBackButtonClick()}>
                                <Icon type="font-awesome" name='chevron-left' color='#fff' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: '#fff' }}>Sign Up</Title>
                        </Body>
                        <Right>

                        </Right>
                    </Header>
                    <Overlay overlayStyle={[styles.otpModel, { height: '30%' }]} isVisible={this.state.isVisible}>
                        <View>
                            <Text style={styles.enabledgps}>You need to enabled your GPS location in order to use the application</Text>
                        </View>
                        <View style={[styles.center, { flexDirection: 'row', justifyContent: 'space-evenly' }]}>
                            <Text style={{ marginTop: 22 }}>Disabled</Text>
                            <Switch
                                style={{ marginTop: 30 }}
                                onValueChange={this.toggleSwitch}
                                value={this.state.switchValue} />
                            <Text style={{ color: 'green', marginTop: 22 }} onPress={() => this.enable()}>Enabled</Text>
                        </View>
                    </Overlay>
                    <View style={styles.container}>
                        <View style={styles.registerImageContainer}>
                            <Avatar
                                size={90}
                                //onPress={() => this.UploadPicture()}
                                overlayContainerStyle={{ backgroundColor: '#FFF' }}
                                rounded
                                icon={{ name: 'plus', type: 'font-awesome', color: '#0b6be6', size: 20 }}
                                containerStyle={{ borderColor: 'gray', borderWidth: 2 }}
                                source={this.state.avatarSource}
                                imageProps={{ resizeMode: 'cover' }}
                            />
                        </View>
                        <View>
                            <Form>
                                {/* <Errors errors={this.state.errors} /> */}
                                <View style={styles.sectionRow}>
                                    <View style={styles.threeRow}>
                                        <Input ref={fname => { this.fname = fname }} value={this.state.fname} onChangeText={(text) => this.setState({ 'fname': text })} placeholder="First Name" inputStyle={[styles.font15]} />
                                    </View>
                                    <View style={styles.threeRow}>
                                        <Input ref={lname => { this.lname = lname }} value={this.state.lname} onChangeText={(text) => this.setState({ 'lname': text })} placeholder="Last Name" inputStyle={[styles.font15]} />
                                    </View>
                                </View>
                                <Input ref={email => { this.email = email }} keyboardType="email-address" value={this.state.email} onChangeText={(text) => this.setState({ 'email': text })} placeholder="Email" inputStyle={[styles.font15]} />
                                <Input ref={phone => { this.phone = phone }} keyboardType="numeric" value={this.state.phone} onChangeText={(text) => this.setState({ 'phone': text })} placeholder="Phone No" inputStyle={[styles.font15]} />
                                <Input ref={password => { this.password = password }} secureTextEntry={true} value={this.state.password} onChangeText={(text) => this.setState({ 'password': text })} placeholder="Password" inputStyle={[styles.font15]} />
                                <Input ref={confirmPassword => { this.confirmPassword = confirmPassword }} secureTextEntry={true} value={this.state.confirmPassword} onChangeText={(text) => this.setState({ 'confirmPassword': text })} placeholder="Confirm Password" inputStyle={[styles.font15]} />
                                <Input ref={Age => { this.Age = Age }} value={this.state.Age} onChangeText={(text) => this.setState({ 'Age': text })} placeholder="Age" inputStyle={[styles.font15]} />
                                <Input ref={Status => { this.Status = Status }} value={this.state.Status} onChangeText={(text) => this.setState({ 'Status': text })} placeholder="Enter Status" inputStyle={[styles.font15]} />
                                <View style={{ marginTop: 10, marginLeft: 10, color: 'gray' }}>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>Select Gender</Text>
                                </View>
                                <View style={styles.sectionRow}>
                                    <View style={{}}>
                                        <CheckBox
                                            size={1}
                                            center
                                            title='Male'
                                            iconRight
                                            iconType='material'
                                            checked={this.state.checked}
                                            containerStyle={{ borderColor: "#333", borderWidth: 1 }}
                                            textStyle={{ fontSize: 13 }}
                                        />
                                    </View>
                                    <View>
                                        <CheckBox
                                            size={1}
                                            center
                                            title='Female'
                                            iconRight
                                            iconType='material'
                                            checked={this.state.checked}
                                            containerStyle={{ borderColor: "#333", borderWidth: 1 }}
                                            textStyle={{ fontSize: 13 }}
                                        />
                                    </View>
                                    <View>
                                        <CheckBox
                                            size={1}
                                            center
                                            title='Other'
                                            iconRight
                                            iconType='material'
                                            checked={this.state.checked}
                                            containerStyle={{ borderColor: "#333", borderWidth: 1 }}
                                            textStyle={{ fontSize: 13 }}
                                        />
                                    </View>
                                </View>
                                <View style={{ marginTop: 10, marginLeft: 10, color: 'gray' }}>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>Enter Drinks/Appetizer</Text>
                                </View>
                                <View style={styles.sectionRow}>
                                    <View style={styles.threeRow}>
                                        <Input onChangeText={(text) => this.setState({ '': text })} placeholder="1" inputStyle={[styles.font15]} />
                                    </View>
                                    <View style={styles.threeRow}>
                                        <Input onChangeText={(text) => this.setState({ '': text })} placeholder="2" inputStyle={[styles.font15]} />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, color: 'gray' }}>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>Active Live</Text>
                                    <View style={{ marginLeft: 15 }}>
                                        <Icon
                                            name='circle'
                                            type='font-awesome'
                                            color='#0b6be6'
                                            size={16}
                                            onPress={() => console.log('hello')} />
                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Icon
                                            name='circle'
                                            type='font-awesome'
                                            color='black'
                                            size={16}
                                            onPress={() => console.log('hello')} />
                                    </View>
                                </View>
                                <View style={[styles.center, { marginTop: 20, marginBottom: 20 }]}>
                                    <Button block style={{ backgroundColor: 'black', borderRadius: 50, width: '70%', alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}
                                        onPress={() => this.onRegister()}>
                                        <Text style={{ fontSize: 14 }}>Sign Up</Text>
                                    </Button>
                                </View>
                            </Form>
                        </View>
                    </View>
                </ScrollView>
            </Root>
        );
    }
}