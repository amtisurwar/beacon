import React, { Component } from 'react';
import { Container,  Header, Left, Right, Body, Button, Title } from 'native-base';
import Mapview from './Mapview';
import { View, Text, BackHandler, AsyncStorage, } from 'react-native';
import Listview from './Listview';
import { Icon, Overlay, Slider, CheckBox } from 'react-native-elements';
import styles from '../../assets/style/style2.js';
import Tabs from "../Components/Tabs"
import Geolocation from '@react-native-community/geolocation';
import MapFilter from '../Components/MapFilter';
import PeopleContext from '../Context/PeopleContext';
import list from '../Components/UserData';
import GPSState from 'react-native-gps-state';
import Common from './Common';
import DeviceSettings from 'react-native-device-settings';
import signalr from 'react-native-signalr';
import API from '../Api/Api';


export default class Home extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      distance: 18,
      isVisible: false,
      data: [],
      latitude: 34.052235,
      longitude: -118.243683,
      gpsModel: false,
      GPSMessage: '',
      gpsErrorCode: 0,
    }
    this.common = new Common();
    this.connection = null;
  }

  setRemoteData = (data) => {
    console.log("setRemoteData called: ",data)
    this.setState({data:data, loading:false})
  }

  closeModal = () => {
    this.setState({ isVisible: false })
  }

  blueClick = async (user) => {
    var profile = JSON.parse(await AsyncStorage.getItem('profile'));
		var authToken = profile.Authentication
		var header = { "authentication": authToken };
    var request = {"FromUserId":profile.UserId,"ToUserId":user.UserId,"Status":1}
    console.log("request: ",request)
    var response = new API('MarkStatus',request, header).getResponse();
    console.log("response: ",response)
    response.then(res => {
      if(res.StatusCode == 200) {
        this.common.showToast("Interest sent successfully to "+user.Fname + " " + user.Lname)
        this.markUser(user,1)
      }
      else if(res.response.data && res.response.data.StatusCode == 409) {
        this.common.showToast("You already sent interest to "+user.Fname + " " +user.Lname)
        // this.common.showToast("Interest sent successfully to "+user.Fname + " " + user.Lname)
      }
      else {
        this.common.showToast("Interest not sent, please try again later.")
      }
      
    }).catch(error => {
      this.common.showToast("Unable to Send Interest, please try again later.")
      console.log("error: ",error)
    })
  }

  greyClick = (user) => {
    console.log("greyClick trigger")
  }

  blackClick = async (user) => {
    var profile = JSON.parse(await AsyncStorage.getItem('profile'));
		var authToken = profile.Authentication
		var header = { "authentication": authToken };
    var request = {"FromUserId":profile.UserId,"ToUserId":user.UserId,"Status":2}
    console.log("request: ",request)
    var response = new API('MarkStatus',request, header).getResponse();
    console.log("response: ",response)
    response.then(res => {
      if(res.StatusCode == 200) {
        this.common.showToast("Flick successfully to "+user.Fname + " " + user.Lname)
        this.markUser(user,2)
      }
      else if(res.response.data && res.response.data.StatusCode == 409) {
        this.common.showToast("You already Flick to "+user.Fname + " " +user.Lname)
        // this.common.showToast("Interest sent successfully to "+user.Fname + " " + user.Lname)
      }
      else {
        this.common.showToast("Unable to Flick, please try again later.")
      }
      
    }).catch(error => {
      this.common.showToast("Unable to Flick, please try again later.")
      console.log("error: ",error)
    })
  }

  markUser(user, status) {
    var existingData = [...this.state.data];
    if(status == 1) {
      
      existingData.map((list,key) => {
        if(list.UserId == user.UserId) {
          existingData[key].Interested = status
        }
      })
      console.log("existingData newlist: ",existingData)
      this.setState({ data: existingData })  
    }
    else if(status == 2) {
      var newList = existingData.filter(list => {
        return list.UserId != user.UserId
      })
      this.setState({ data: newList })  
    }
  }

  onRefresh = () => {
    this.getConnection()
  }

  getConnection = async (filterRequest = []) => {
    this.setState({loading: true})
    if(!this.connection) {
      var profile = JSON.parse(await AsyncStorage.getItem('profile'))
      const connection = signalr.hubConnection('http://beacon.demoappstore.com/');
      this.connection = connection;
      connection.logging = true;
      console.log("connection: ",connection);
      const proxy = connection.createHubProxy('beaconhub');
      //receives broadcast messages from a hub function, called "helloApp" //clientnearplaceusers
      proxy.on('clientnearplaceusers', (argOne, argTwo, argThree, argFour) => {
      console.log('message-from-server', argOne, argTwo, argThree, argFour);
          if(argOne.StatusCode == 200) 
          {
            this.setRemoteData(argOne.Data)
          }
          //Here I could response by calling something else on the server...
      });
      // atempt connection, and handle errors
      connection.start().done(() => 
      {
          console.log('Now connected, connection ID=' + connection.id, profile);
          
          // proxy.invoke('OnConnected')
          // .done(() => {
          //     console.log('dOnConnected call');
          // }).fail((error) => {
          //     console.log('OnConnected error',error)
          // });

          proxy.invoke('ServerNearPlaceUsers', {"UserId": profile.UserId, Gender: '', Age: ''})//ServerNearPlaceUsers values of Current user: {"UserId":"112","Gender":"Male","Age":"25"}
          .done((directResponse) => {
              console.log('direct-response-from-server', directResponse);
          }).fail(() => {
              console.warn('Something went wrong when calling server, it might not be up and running?')
          });
  
      }).fail((error) => {
          console.log('atempt connection Failed',error);
      });

      connection.connectionSlow(() => {
        console.log('We are currently experiencing difficulties with the connection.')
      });

      connection.error((error) => {
          const errorMessage = error.message;
          let detailedError = '';
          if (error.source && error.source._response) {
            detailedError = error.source._response;
          }
          if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
            console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
          }
          console.debug('SignalR error: ' + errorMessage, detailedError)
      });
    }
    else {
      this.existingConnection(this.connection, filterRequest)
    }
    //This is the server under /example/server published on azure.
    //connection-handling   
}

async existingConnection(connection, filterRequest) {
      var profile = JSON.parse(await AsyncStorage.getItem('profile'))
      console.log('existing connection connected, connection ID=' + connection.id);
      connection.logging = true;
      const proxy = connection.createHubProxy('beaconhub');
      //receives broadcast messages from a hub function, called "helloApp" //clientnearplaceusers
      proxy.on('clientnearplaceusers', (argOne, argTwo, argThree, argFour) => {
      console.log('message-from-server', argOne, argTwo, argThree, argFour);
        if(argOne.StatusCode == 200) 
        {
          this.setRemoteData(argOne.Data)
        }
          //Here I could response by calling something else on the server...
      });
      var Gender = filterRequest.Gender ? filterRequest.Gender : '';
      var Age = filterRequest.Age ? filterRequest.Age: '';
      var request = {"UserId": profile.UserId, Gender: Gender, Age: Age};
      console.log("filterRequest: ",request)
      proxy.invoke('ServerNearPlaceUsers', request)//ServerNearPlaceUsers values of Current user: {"UserId":"112","Gender":"Male","Age":"25"}
          .done((directResponse) => {
              console.log('direct-response-from-server', directResponse);
          }).fail(() => {
              console.warn('Something went wrong when calling server, it might not be up and running?')
      });

      connection.connectionSlow(() => {
        console.log('We are currently experiencing difficulties with the connection.')
      });

      connection.error((error) => {
          const errorMessage = error.message;
          let detailedError = '';
          if (error.source && error.source._response) {
            detailedError = error.source._response;
          }
          if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
            console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
          }
          console.debug('SignalR error: ' + errorMessage, detailedError)
      });
}


  getLocation = async () => {
    var interval = setInterval(() => {
      Geolocation.getCurrentPosition(
          position => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              })
              var response = this.common.updateLocation(position);
              response.then(res => {
                console.log("res then: ",position,response)
              }).catch(error => {
                console.log("res: ",res)
              })
              this.setState({gpsErrorCode: -1})
              clearInterval(interval)
          },
          error => {  
            this.showGPSError(error)
          },
      );
    }, 5000)
    if (this.state.gpsErrorCode == -1) {
      console.log("clearInterval")
      clearInterval(interval)
    }
  }

  showGPSError = (error) => {
    console.log('showGPSError:', error)

    if (error.code == 1) {
      this.setState({
        gpsModel: true,
        GPSMessage: 'You need to Allow the App to access the Location Service to find the people near by you.',
        gpsErrorCode: error.code,
      })
    }
    else if (error.code == 2) {
      this.setState({
        gpsModel: true,
        GPSMessage: 'You need to Enable Location Service to find the people near by you.',
        gpsErrorCode: error.code,
      })
    }
    else {
      this.setState({ gpsErrorCode: -1 })
    }
  }

  async componentDidMount() {
    this.getLocation()
    this.getConnection()
  }
  componentWillUnmount() {
    // navigator.geolocation.clearWatch(this.getLongLat);
  }

  filterUser = (filterRequest) => {
    this.setState({isVisible: false})
    this.getConnection(filterRequest);
    // var existingData = [...this.state.data]
    // var newRequest = [];
    // newRequest['Gender'] = filterRequest.Gender
    // newRequest['Age'] = filterRequest.Age
    // var newList = [];
    // existingData.filter(item => {
    //     if(item.Age <= filterRequest.Age || (filterRequest.Gender && filterRequest.Gender.toUpperCase() == item.Gender.toUpperCase())) {
    //       newList.push(item)
    //     }
    // })
    // this.setState({data: newList})
  }

  showFilter() {
    this.setState({ isVisible: true });
  }
  
  componentWillUnmount() {
    
  }

  locateToSettings() {
    this.state.gpsErrorCode == 1 ? DeviceSettings.app() : DeviceSettings.open();  
    // GPSState.requestAuthorization(GPSState.AUTHORIZED_WHENINUSE)
  }
  
  render() {
    return (
      <PeopleContext.Provider value={{
        list: this.state.data,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        blueClick: this.blueClick,
        greyClick: this.greyClick,
        blackClick: this.blackClick,
        onRefresh: this.onRefresh,
      }}>
      <View>
        <Header style={{ backgroundColor: "#1b244d" }}>
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
              <Icon type="font-awesome" name='sliders' color="#FFF"
                onPress={() => this.showFilter()} size={20} />
            </Button>
            <Button transparent>
              <Icon type="font-awesome" name='phone' color="#FFF" size={20} />
            </Button>
          </Right>
        </Header>
        <Overlay isVisible={this.state.gpsModel} height="auto" overlayStyle={{justifyContent:'center', alignItems:'center'}}>
            <Icon
              type="font-awesome"
              name="times"
              size={14}
              containerStyle={{ position: 'absolute', right: 6, top: 3 }}
              onPress={() => this.setState({ gpsModel: false })}
            />
            <View>
              <Text style={styles.enabledgps}>{this.state.GPSMessage}</Text>
              <Button block style={{ backgroundColor: 'black', marginVertical: 20, borderRadius: 50 }}
                onPress={() => this.locateToSettings()}>
                <Text style={{ fontSize: 14, color: '#fff' }}>
                  {this.state.gpsErrorCode == 1 ? "App Setting" : "Enable"}
                </Text>
              </Button>
            </View>
        </Overlay>
        <MapFilter filterUser={this.filterUser} isVisible={this.state.isVisible} closeModal={this.closeModal} />
        <Tabs loading={this.state.loading} />
      </View>
      </PeopleContext.Provider>
    );
  }
}