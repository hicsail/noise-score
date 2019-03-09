import React from 'react';
import {AsyncStorage, Platform, StyleSheet, Text, View} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import axios from "axios";


export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            points: this.getHeatMapPoints()
        };

    }



    componentDidMount() {

        this.subs = [
            this.props.navigation.addListener('willFocus', () => this.updateMarkers())
        ];

        // Set inital region
        navigator.geolocation.requestAuthorization();
        navigator.geolocation.getCurrentPosition(
            (position) => {

                var lat = (position.coords.latitude);
                var long = (position.coords.longitude);
                var initialRegion ={
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.05,
                };

                this.setState({ region: initialRegion });
            },

            (error) => {alert('Error getting location')
            },
            {
                enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
            }
        )

        this.updateMarkers();
    }
    getHeatMapPoints(){
        var self = this;
        axios.post('http://localhost:9000/api/allMeasurements', ).then(function (ret){
            console.log(ret);
            self.setState({
                markers: ret
            })
            // this.generateData(self);
        }).catch(function (error){
            alert(error);
        });
    }
    updateMarkers(){
        var self = this;
        var newMarkers = [];
        // Get the information for the Account Screen
        AsyncStorage.getItem('userData').then(function (ret) {
            if (ret) {
                var response = JSON.parse(ret);
                    var username =  response['user']['username'];
                    var userID = response['user']['_id'];

                    // Now we need to get all their measurement information
                    var params = {
                        userID : userID,
                        username : username
                    };

                    axios.post('http://localhost:9000/api/userMeasurements', params).then(function (ret){
                        for(var i = 0; i < ret['data'].length; i++){
                            newMarkers = newMarkers.concat([
                                {
                                    latlng: {
                                        latitude: ret['data'][i]['location']['lat'],
                                        longitude: ret['data'][i]['location']['lang']
                                    },
                                    title: ret['data'][i]['rawData']['average'],
                                    description: "Description1",
                                    id: ret['data'][i]['_id']
                                }
                            ]);
                        }
                        self.setState({
                            markers: newMarkers
                        })
                        // this.generateData(self);
                    }).catch(function (error){
                        alert(error);
                    });
            }
        }.bind(this));



    }

    generateMarkers(data){
        // The iterator used to generate what is displayed for the data.
        if(data != null){
            return data.map((data) => {
                var id = data['id'].toString();
                var latlng = data['latlng'];
                var title = data['title'].toString();
                var description = "test";
                return (
                   <Marker
                                    key={id}
                                    coordinate={latlng}
                                    title={title}
                                    description={description}
                                />
                )
            });

        }
    }
  render() {
      var iterator = this.generateMarkers(this.state.markers);
    return (

        <MapView
            style={{ left:0, right: 0, top:0, bottom: 0, position: 'absolute' }}
                //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                // style={styles.map}
                provider={Platform.OS === 'ios' ? null : 'osmdroid'}
            region={this.state.region}
            moveOnMarkerPress = {false}
            showsUserLocation={true}
            showsCompass={true}
            showsPointsOfInterest = {true}
        >
            <MapView.Heatmap points={this.state.points} />
            {iterator}
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

