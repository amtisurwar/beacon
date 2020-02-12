/*This is an Example of React Native Map*/
import React from 'react';
import { StyleSheet, Dimensions, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const list = [{
  title: 'Tom Hollannd',
  coordinates: {
    latitude: 28.6304,
    longitude: 77.2177
  },
  image: require('../../assets/images/map1.png')
},
{
  title: 'Denny Bonzan',
  coordinates: {
    latitude: 28.6426587,
    longitude: 77.1970285
  },
  image: require('../../assets/images/map2.png')
},
{
  title: 'Michael Fasebender',
  coordinates: {
    latitude: 28.5979,
    longitude: 77.2362
  },
  image: require('../../assets/images/map3.png')
},
{
  title: 'Daniel Craig',
  coordinates: {
    latitude: 28.6142,
    longitude: 77.2040
  },
  image: require('../../assets/images/map4.png')
}]



export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: list
    }
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
    this.setState({ region });
  }
  render() {
     return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 28.6139,
            longitude: 77.2090,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          //initialRegion={this.getInitialRegion()}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.coordinates}
              title={marker.title}
            >
              <View >
              <Image
                source={marker.image}
                style={styles.inNoutIcon}
              />
              </View>
              <MapView.Callout tooltip style={styles.customView}>
                <TouchableOpacity style={styles.card} onPress={() => this.markerClick()}>
                  <Image style={styles.image} source={require('../../assets/images/map3.png')} />
                  <Text style={{fontSize:14, position:'absolute', marginTop:"35%", marginLeft:"4%"}}>56ft away</Text>
                  <View style={styles.cardContent}>
                    <Text style={[styles.name, {fontWeight:'bold'}]}>Daniel Craig</Text>
                    <Text style={styles.name}>Status</Text>
                    <Text style={styles.name}>1. Last night in town</Text>
                    <Text style={styles.name}>2. Cranbery, vodka</Text>
                    <Text style={styles.name}>3. Sorcer Player</Text>
                  </View>
                  <View style={{ flexDirection: 'column', marginLeft: '0%', width:"50%", height:'100%', backgroundColor: "#fff", marginVertical: -10, marginHorizontal: 10, height:'120%', padding: 10}}>
                    <Text style={{
                      color: 'white', width: '70%', marginTop: '3%', height: 15
                      , fontSize: 12, marginLeft: 10, backgroundColor: '#1163E6', textAlign: 'center', textAlignVertical: 'center', alignContent: 'center'
                    }}></Text>
                    <Text style={{
                      color: 'black', width: '70%', marginTop: '8%', height: 15
                      , fontSize: 12, marginLeft: 10, backgroundColor: '#D7D7D7', textAlign: 'center', textAlignVertical: 'center', alignContent: 'center'
                    }}></Text>
                    <Text style={{
                      color: 'white', width: '70%', marginTop: '8%', height: 15
                      , fontSize: 12, marginLeft: 10, backgroundColor: 'black', textAlign: 'center', textAlignVertical: 'center', alignContent: 'center'
                    }}></Text>
                  </View>
                </TouchableOpacity>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    width: 50,
    height: 58,
    marginBottom: 35,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    width:150
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 45,
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    flexBasis: '70%',
    padding: 10,
    flexDirection: 'row'
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