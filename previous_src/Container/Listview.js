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
    Button,
    AsyncStorage
} from 'react-native';
//import Common from '../common/common';
import { Avatar } from 'react-native-elements';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupJobScreen: true,
            password: '',
            loading: false,
            drawerOpen: false,
            selectedValue: undefined,
            selectedItems: [],
            user_id: '',
            companyResponse: [],
            companyList: [],
            showMapView: 1,
            showListView: 0,
            selected: [],
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
                {
                    "name": "Denim Banzan",
                    "first": "1 : Happy",
                    "second": "2 : Soccer Player",
                    "third": "3 : Vodka",
                    "fourth": "Status",
                    "distance": "15 meters away",
                    "image": "https://en.wikipedia.org/wiki/File:Pierre-Person.jpg"
                }


            ],
        }
    }


    onRegionChange(region) {
        this.setState({ region });
    }

    componentDidMount() {

    }


    render() {
        return (
            <View
                style={[styles.container, {backgroundColor: "#f5f5f0" }]}
            >
                <StatusBar
                    hidden={true}
                />
                <View style={{ flexDirection: 'row', width: '100%', height: '100%', marginLeft: '0%' }}>
                    <FlatList
                        data={this.state.DataList}
                        showsVerticalScrollIndicator={false}
                        extraData={this.state}

                        renderItem={({ item, index }) =>
                            <TouchableHighlight style={{ marginLeft: '0%', marginRight: '0%', width: '100%', }}>
                                <View style={{ flexDirection: 'row', marginTop: 4, borderRadius: 5, marginRight: '5%', marginLeft: "5%", backgroundColor: '#ffffff'  }}>
                                    <Image source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} style={styles.pic} />
                                    <Text style={{fontSize:13, position:'absolute', marginTop:"27%", marginLeft:"6%"}}>56ft away</Text>
                                    <View style={{ flexDirection: 'column', width: '60%', marginTop: '5%', marginBottom:'5%', marginLeft: '5%', }}>
                                        <Text style={{
                                            color: 'black', width: '100%'
                                            , fontSize: 13, marginLeft: 1, marginRight: 10, fontWeight: 'bold', 
                                        }}>{item.name}</Text>

                                        <Text style={{
                                            color: 'black', width: '100%'
                                            , fontSize: 13, marginLeft: 1, marginRight: 10, marginTop:5
                                        }}>{item.fourth}</Text>

                                        <Text style={{
                                            color: 'black', width: '80%'
                                            , fontSize: 13, marginLeft: 1, marginRight: 10, marginTop:5
                                        }}>{item.first}</Text>

                                        <Text style={{
                                            color: 'black', width: '100%'
                                            , fontSize: 13, marginLeft: 1, marginRight: 10, marginTop:5
                                        }}>{item.second}</Text>

                                        <Text style={{
                                            color: 'black', width: '100%'
                                            , fontSize: 13, marginLeft: 1, marginRight: 10, marginTop:5
                                        }}>{item.third}</Text>
                                        <View style={styles.line}></View>
                                    </View>
                                    <View style={{ flexDirection: 'column', width: '50%', marginTop: 10, marginLeft: '0%' }}>
                                        <Text style={{
                                            color: 'white', width: '15%', marginTop: '8%', height: 20
                                            , fontSize: 12, marginLeft: 1, marginRight: 10, backgroundColor: '#1163E6', textAlign: 'center', textAlignVertical: 'center', alignContent: 'center', marginTop:15
                                        }}></Text>
                                        <Text style={{
                                            color: 'black', width: '15%', marginTop: '3%', height: 20
                                            , fontSize: 12, marginLeft: 1, marginRight: 10, backgroundColor: '#D7D7D7', textAlign: 'center', textAlignVertical: 'center', alignContent: 'center', marginTop:15
                                        }}></Text>
                                        <Text style={{
                                            color: 'white', width: '15%', marginTop: '3%', height: 20
                                            , fontSize: 12, marginLeft: 1, marginRight: 10, backgroundColor: 'black', textAlign: 'center', textAlignVertical: 'center', alignContent: 'center', marginTop:15
                                        }}></Text>
                                    </View>
                                </View>

                            </TouchableHighlight>
                        }
                        keyExtractor={item => item.email}
                    />


                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    map: {
        flex: 1,
        height: '100%'
    },
    textInputStyle: {
        marginLeft: '-10%',
        paddingLeft: '15%',
        fontSize: 15,
        width: '100%', color: '#3FC1F3'
        , borderBottomColor: '#3FC1F3', // Add this to specify bottom border color
        borderBottomWidth: 2,
        padding: 5
    },
    activeBoxStyle: {
        width: '100%', height: 40, color: 'white', backgroundColor: '#1163E6', paddingTop: 2, textAlign: 'center', textAlignVertical: 'center', alignSelf: 'center', alignContent: 'center', fontSize: 22
    },
    inActiveBoxStyle: {
        width: '100%', height: 40, color: 'white', backgroundColor: '#111111', paddingTop: 2, textAlign: 'center', textAlignVertical: 'center', alignSelf: 'center', alignContent: 'center', fontSize: 22
    },
    pic: {
        borderRadius: 30,
        width: 70,
        height: 70,
        marginTop: '4%',
        marginLeft: '5%',
    },
});
export default Home;