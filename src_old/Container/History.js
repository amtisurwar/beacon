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
    AsyncStorage,
    SafeAreaView,
    SectionList
} from 'react-native';
import styles from '../../assets/style/style2.js';
import DatePicker from 'react-native-datepicker'
import {
    Container, Header, Textarea, Content, Button, Card, CardItem, Form, Item, Root, Left, Right, Body, Title
} from 'native-base';
//import Geolocation from '@react-native-community/geolocation';
import { CheckBox, Avatar, Icon, Overlay, SearchBar, Input, Slider } from 'react-native-elements';
import Common from './Common/index';
import UserInfo from '../Components/UserInfo';
import list from '../Components/UserData';
import HistoryFilter from '../Components/HistoryFilter'


const DataList = [
    {
        title: '01-07-2020',
        data: list,
    },
    {
        title: '01-06-2020',
        data: list,
    },
    {
        title: '01-05-2020',
        data: list,
    },
    {
        title: '01-02-2020',
        data: list,
    },
];


class History extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            loading: false,
            DataList: DataList,
            FreshDataList: DataList,
            refreshing: false,
        }
        this.common = new Common();
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        this.setState({ DataList: DataList })
    }

    dateFilter = (fromDate, toDate) => {
        this.closeModal()
        let FreshDataList = [...this.state.FreshDataList]
        var filterList = FreshDataList.filter( item => {
            return item.title >= fromDate && item.title <= toDate
        })
        console.log("DataList dateFilter: ",filterList)
        this.setState({DataList:filterList})

    }

    searchFilterFunction = (term) => {
        let FreshDataList = [...this.state.FreshDataList]
        console.log("FreshDataList: ", FreshDataList)
        if (term === '') {
            this.setState({ DataList: FreshDataList })
        } else {
            var term = term.toUpperCase()
            var filterList = FreshDataList.map(item => {
                const t1 = item.data.filter(item2 => {
                    // const itemData = `${item.name.toUpperCase()}${item.first.toUpperCase()}${item.second.toUpperCase()}${item.third.toUpperCase()}${item.fourth.toUpperCase()}`;
                    return item2.Fname.toUpperCase().includes(term) || item2.Lname.toUpperCase().includes(term);
                })
                if (t1) {
                    return { title: item.title, data: t1 }
                }
            })
            console.log("DataList: ",filterList)
            this.setState({ DataList: filterList })
        }

    };


    save() {
        this.setState({ isVisible: true });
    }
    note() {
        this.setState({ isVisible: true });
    }
    back() {
        this.setState({ isVisible: false });
    }


    closeModal = () => {
        this.setState({ isVisible: false })
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
                <View style={{}}>
                    <Textarea rowSpan={5} bordered style={{ backgroundColor: '#f3f3f3', borderColor: '#e8e8e8', height: 80 }} />
                </View>
            </View>
            <View style={[styles.center, { flexlDirection: 'row', justifyContent: 'space-evenly' }]}>
                <Button style={[styles.loginButton, { backgroundColor: '#fff', color: '#333', borderWidth: 1, borderColor: '#333' }]} onPress={() => this.searchFilter()}>
                    <Text style={[styles.textCenter, { color: '#333' }]}>Show Result</Text>
                </Button>
            </View>
        </Overlay>
    }


    renderItem = ({ item }) => {
        return (
            <TouchableHighlight style={{ backgroundColor: '#FFF', marginVertical: 6, marginHorizontal: 15 }}>
                <UserInfo user={item} hideGreyBox={true} history={true} hideDistance={true} />
            </TouchableHighlight>
        );
    }

    getTitle(title, data) {
        if (title == this.common.getCurrentDate() && data.length > 0) {
            return "Today " + title.replace(/-/gi, '/');
        }
        else if (title == this.common.getCurrentDate(1) && data.length > 0) {
            return "Yesterday " + title.replace(/-/gi, '/');
        }
        else {
            if (data.length > 0) {
                return title.replace(/-/gi, '/');
            }
            else {
                return null;
            }

        }
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
                            {/* <Icon type="font-awesome" name='search' color="#FFF" size={20} /> */}
                        </Button>
                        <Button transparent>
                            <Icon type="font-awesome" name='sliders' color="#FFF" onPress={() => this.save()} size={20} />
                        </Button>
                        <Button transparent>
                            <Icon type="font-awesome" name='phone' color="#FFF" size={20} />
                        </Button>
                    </Right>
                </Header>
                <HistoryFilter isVisible={this.state.isVisible} dateFilter={this.dateFilter} closeModal={this.closeModal} />
                <View>{this.addNotes()}</View>
                <View style={{ backgroundColor: "#f5f5f0" }}>
                    <View style={{ marginVertical: 10 }}>
                        <Input placeholder='Search..'
                            inputStyle={{ fontSize: 14 }}
                            onChangeText={text => this.searchFilterFunction(text)}
                            containerStyle={{ width: '100%' }}
                            inputContainerStyle={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 2, paddingHorizontal: 10, paddingVertical: 4 }}
                            rightIcon={
                                <Icon
                                    name="search"
                                    color='gray'
                                />
                            }
                        />
                    </View>
                    <SafeAreaView style={style.container}>
                        <SectionList
                            sections={this.state.DataList}
                            stickySectionHeadersEnabled={false}
                            refreshing={this.state.refreshing}
                            onRefresh={this.getData}
                            keyExtractor={(item, index) => item + index}
                            renderItem={this.renderItem}
                            renderSectionHeader={({ section: { title, data } }) => (
                                <Text style={style.header}>
                                    {this.getTitle(title, data)}
                                </Text>
                            )}
                            ListEmptyComponent={<View style={{backgroundColor:'#0b6be6', padding:15, borderRadius:5, margin:10}}><Text style={{color:'#FFF',textAlign:'center', fontSize:16}}>No User Found.</Text></View>}
                        />
                    </SafeAreaView>
                </View>
            </Container>
        );
    }
}


const style = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 220,
    },
    header: {
        color: '#b8b894',
        fontSize: 14,
        margin: 15,
    },
});

export default History;