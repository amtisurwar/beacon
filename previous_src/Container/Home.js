import React, { Component } from 'react';
import { Container, Tab, ScrollableTab, List, Header, Left, Right, Body, Button, Title } from 'native-base';
import Mapview from './Mapview';
import { View, Text, BackHandler } from 'react-native';
import Listview from './Listview';
import { Icon, Overlay, Slider, CheckBox } from 'react-native-elements';
import styles from '../../assets/style/style2.js';
import Tabs from "../Components/Tabs"

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      submit: false,
      distance: 18,
      isVisible: false,
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }



  save() {
    this.setState({ isVisible: true });
  }
  back() {
    this.setState({ isVisible: false });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  filter() {
    return (
      <Overlay overlayStyle={[styles.otpModel, { height: '60%' }]} isVisible={this.state.isVisible}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: "50%", flexDirection: 'row' }}>
            <Icon type="font-awesome" name='sliders' color="#333" size={20} />
            <Text style={{ marginLeft: 10 }}>Filter</Text>
          </View>
          <View style={{ width: "50%", justifyContent: 'flex-end', alignSelf: 'flex-end', alignItems: 'flex-end', alignContent: 'flex-end' }}>
            <Button transparent onPress={() => this.back()} >
              <Icon type="font-awesome" name='times-circle' color="#333" />
            </Button>
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 20,}}>
          <Text style={{}}>Gender</Text>
          <View style={[styles.sectionRow, { marginTop: 10 }]}>
            <View style={{}}>
              <CheckBox
                size={1}
                center
                title='Male'
                iconRight
                iconType='material'
                checked={this.state.checked}
                containerStyle={{ borderColor: "#ebebe0", borderWidth: 1, padding: 2, marginRight: 3 }}
                textStyle={{ fontSize: 12 }}
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
                containerStyle={{ borderColor: "#ebebe0", borderWidth: 1, padding: 2, marginRight: 3 }}
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
                containerStyle={{ borderColor: "#ebebe0", borderWidth: 1, padding: 2, marginRight: 3 }}
                textStyle={{ fontSize: 12 }}
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 30 }}>
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
              <Text style={[styles.registerOtherComponentsText, styles.twoRow]}>{this.state.distance}</Text>
              <Text style={[styles.registerOtherComponentsText, styles.twoRow, { textAlign: 'right' }]}>80</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 50 }}>
          <Text style={{}}>Filter Via</Text>
          <View style={[styles.sectionRow, { marginTop: 10 }]}>
            <View style={{}}>
              <CheckBox
                size={1}
                center
                title='Bar'
                iconRight
                iconType='material'
                checked={this.state.checked}
                containerStyle={{ borderColor: "#ebebe0", borderWidth: 1, padding: 2, marginRight: 3 }}
                textStyle={{ fontSize: 12 }}
              />
            </View>
            <View>
              <CheckBox
                size={1}
                center
                title='Restaurant'
                iconRight
                iconType='material'
                checked={this.state.checked}
                containerStyle={{ borderColor: "#ebebe0", borderWidth: 1, padding: 2, marginRight: 3 }}
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
                containerStyle={{ borderColor: "#ebebe0", borderWidth: 1, padding: 2, marginRight: 3 }}
                textStyle={{ fontSize: 12 }}
              />
            </View>
          </View>
        </View>
        <View style={[styles.center, { flexDirection: 'row', justifyContent: 'space-evenly' }]}>
          <Button style={[styles.loginButton, { backgroundColor: '#fff', color: '#333', borderWidth: 1, borderColor: '#333' }]} onPress={() => this.back()}>
            <Text style={[styles.textCenter, { color: '#333' }]}>Search Result</Text>
          </Button>
        </View>
      </Overlay>
    )
  }


  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#1b244d", elevation: 0, shadowOpacity: 1 }}>
          <Left>
            {/* <Button transparent onPress={() => this.handleBackButtonClick()}>
              <Icon type="font-awesome" name='chevron-left' color='#fff' />
            </Button> */}
          </Left>
          <Body>
            <Title style={{ color: '#fff' }}>Home</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon type="font-awesome" name='search' color="#FFF" size={20} />
            </Button>
            <Button transparent>
              <Icon type="font-awesome" name='sliders' color="#FFF"
                onPress={() => this.save()} size={20} />
            </Button>
            <Button transparent>
              <Icon type="font-awesome" name='phone' color="#FFF" size={20} />
            </Button>
          </Right>
        </Header>
        <Tabs />
        <View>{this.filter()}</View>
      </Container>
    );
  }
}