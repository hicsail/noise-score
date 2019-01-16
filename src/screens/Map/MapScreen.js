import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


export default class MapScreen extends React.Component {
  render() {
    return (

        <MapView style={{ left:0, right: 0, top:0, bottom: 0, position: 'absolute' }}
          //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          // style={styles.map}
          provider={Platform.OS === 'ios' ? null : 'osmdroid'}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        </MapView>



  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

