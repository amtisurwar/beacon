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
    AsyncStorage,
    Dimensions,
    SafeAreaView
} from 'react-native';
//import Common from '../common/common';
import { Avatar, Badge } from 'react-native-elements';
import UserInfo from '../Components/UserInfo';
import PeopleContext from '../Context/PeopleContext';
import { auth } from 'react-native-firebase';

const { height } = Dimensions.get('window');

export default class ListView extends Component {

    static contextType = PeopleContext;

    constructor(props) {
        super(props);
        this.state = {
           refreshing: false,
        }
    }

    onRegionChange(region) {
        this.setState({ region });
    }

   

    render() {
        return (
            <PeopleContext.Consumer>
            { ({list, onRefresh}) => (
                
                <SafeAreaView style={styles.container}>
                    <FlatList
                        refreshing={this.state.refreshing}
                        onRefresh={() => onRefresh()}
                        data={list}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                            <View style={{ backgroundColor:'#FFF', marginVertical: 6, marginHorizontal:15, }}>
                                <UserInfo user={item} />
                            </View>
                        }
                        ListEmptyComponent={<View style={{backgroundColor:'#0b6be6', padding:15, borderRadius:5, margin:20}}><Text style={{color:'#FFF',textAlign:'center', fontSize:16}}>No People found near you.</Text></View>}
                        keyExtractor={item => item.UserId.toString() }
                    />
                
                </SafeAreaView>
                
            )}
            </PeopleContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // borderWidth:2,
        // paddingBottom:200,
        // marginBottom:100,
        height: height - 170,
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
        , borderBottomColor: '#3FC1F3', 
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
        borderRadius: 40,
        width: 70,
        height: 70,
        marginTop: '5%',
        marginLeft: '5%',
    },
});
