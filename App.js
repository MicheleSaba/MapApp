import React, { Component } from 'react';
import Expo from 'expo';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
var mapStyle=require('./assets/mapStyle.json');

export default class App extends Component {
  state = {
    location: null,
  };

  _getLocationAsync = async () => {
    let { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    if (status !== 'granted') {
      console.error('not granted!');
      return;
    }

    let location = await Expo.Location.getCurrentPositionAsync({});
    let newBoMarket = (await Expo.Location.geocodeAsync('1100 3rd St SE'))[0];
    let hyVee = (await Expo.Location.geocodeAsync('20 Wilson Ave SW'))[0];
    let theDaisy = (await Expo.Location.geocodeAsync('208 12th Ave SE'))[0];
    console.log(newBoMarket);
    console.log(hyVee);
    console.log(theDaisy);

    this.setState({
      location,
      places: {
        newBoMarket,
        hyVee,
        theDaisy,
      },
    });
    console.log(location);
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  render() {
    if (!this.state.location) {
      return <View />;
    } else
      return (
        <Expo.MapView
          style={{ flex: 1 }}
          provider={Expo.MapView.PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.922 / 5,
            longitudeDelta: 0.0421 / 5,
          }}
          >
          <Expo.MapView.Marker
            coordinate={this.state.location.coords}
            title="You Are Here"
            pinColor="#0099ff"
          />
          <Expo.MapView.Marker
            coordinate={this.state.places.newBoMarket}
            title="New Bo Market"
            pinColor="#ff8c1a"
            image={require('./assets/images/NewBoMarketLogo.png')}
            description="Vendor Day March 25th to March 27th! Click to see more"
          />
          <Expo.MapView.Marker
            coordinate={this.state.places.theDaisy}
            title="The Daisy"
            pinColor="#79ff4d"
            image={require('./assets/images/TheDaisy.png')}
            description="20% off Blue Tags"
            description="20% off Blue Tags"
          />
          <Expo.MapView.Marker
            coordinate={this.state.places.hyVee}
            title="Hy-Vee"
            description="20% off Viva Paper Towels"
            image={require('./assets/images/hy_vee.png')}
            pinColor="red"
          />
        </Expo.MapView>
      );
  }
}
