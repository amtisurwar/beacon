/*This is an Example of React Native Map*/
import React from 'react';
import { StyleSheet, Dimensions, Text, View, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import UserInfo from '../Components/UserInfo';
import { Item } from 'native-base';
import {Avatar} from 'react-native-elements';

var {height, width} = Dimensions.get('window');
const mapIcon = require('../../assets/images/mapicon.png');

import PeopleContext from '../Context/PeopleContext';

export default class MapViewPage extends React.Component {
  
  constructor(props) {
    super(props)
  }


  getInitialRegion() {
    return {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: this.state.latitudeDelta,
      longitudeDelta: this.state.longitudeDelta
    }
  }

  onRegionChange(region) {
    console.log("region: ",region)
    // this.setState({ region });
  }
  render() {
    return (
      <PeopleContext.Consumer>
        { ({list, latitude, longitude}) => (
          <View style={styles.container}>
          <MapView
            zoomEnabled={true}
            loadingEnabled={true}
            style={styles.map}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapView.Marker coordinate={{latitude: latitude,longitude: longitude}}></MapView.Marker>
            {list.map((marker, index) => (
              <MapView.Marker
                draggable
                coordinate={{latitude: parseFloat(marker.Latitude),longitude: parseFloat(marker.Longitude)}}
                title={marker.name}
                key={index}
              >
                <View>
                  <ImageBackground
                    source={mapIcon}
                    style={styles.inNoutIcon}>
                      {marker.ProfilePic ? <Image
                      source={{uri: marker.ProfilePic}}
                      style={styles.inNoutIcons}
                    /> : <Avatar 
                        rounded
                        style={styles.inNoutIcons}
                        icon={{name: 'user', type: 'font-awesome'}}
                        />}
                    
                  </ImageBackground>
                </View>
                <MapView.Callout tooltip style={styles.customView}>
                  <View style={styles.card}>
                    <UserInfo user={marker} />
                  </View>
                </MapView.Callout>
              </MapView.Marker>
            ))}
          </MapView>
        </View>    
        )}
      
      </PeopleContext.Consumer>
    );
  }
}



const styles = StyleSheet.create({
  container: {
   minHeight:600,
   height:'100%',
   flex:1,
  },
  app: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c2ffd2',
  },
  content: {
    padding: 16,
    backgroundColor: 'pink',
    borderRadius: 8,
  },
  arrow: {
    borderTopColor: 'pink',
  },
  background: {
    backgroundColor: 'rgba(0, 0, 255, 0.5)'
  },
  inNoutIcon: {
    width: 38,
    height: 52,
  },
  inNoutIcons: {
    borderRadius:30,
    width: 32,
    height: 32,
    marginLeft:3,
    marginTop:3
  },
  map: {
   width:'100%',
   height:'100%',
   
  },
  header: {
    backgroundColor: "#00CED1",
    height: 200
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
    flex: 1,
  },
  detailContent: {
    top: 80,
    height: 500,
    //width:Dimensions.get('screen').width - 90,
    marginHorizontal: 30,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: "#ffffff"
  },
  userList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 10,
    width: 150
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 45,
  },
  card: {
    backgroundColor: "#FFF",    
    width:width - 70,
  },

  name: {
    fontSize: 15,
    flex: 1,
    alignSelf: 'flex-start',
    color: "#333"
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: "#696969"
  },
  about: {
    marginHorizontal: 10
  },

  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});