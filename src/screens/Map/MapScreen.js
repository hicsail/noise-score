import React from 'react';
import {AsyncStorage, Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import { SearchBar } from 'react-native-elements';
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
            points: [],
            authHeader : ""
        };

    }



    componentDidMount() {

        this.subs = [
            this.props.navigation.addListener('willFocus', () => this.updateMarkers())
        ];

        this.updateMarkers();
        this.getHeatMapPoints();
    }


    getHeatMapPoints(){
        var self = this;

        AsyncStorage.getItem('userData').then(function (ret) {
            if(ret){
                var response = JSON.parse(ret);
                var authHeader = response['authHeader'];
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization' : authHeader
                };
                axios.get('http://localhost:9000/api/allMeasurements', {headers:header, params:{}}).then(function (ret){
                    self.setState({
                        points:  ret['data']
                    })
                    // this.generateData(self);
                }).catch(function (error){
                    alert(error);
                });
            }
        });


    }
    updateMarkers(){
        // Update the location of the maps focus
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


                this.setState({ region: initialRegion});
            },

            (error) => {alert('Error getting location')
            },
            {
                enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
            }
        );


        // Update the markers
        var self = this;
        var newMarkers = [];
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
                var authHeader = response['authHeader'];
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization' : authHeader
                };

                    axios.get('http://localhost:9000/api/userMeasurements', {headers:header, params:params}).then(function (ret){
                        var dateFormat = require('dateformat');
                        for(var i = 0; i < ret['data'].length; i++){
                            newMarkers = newMarkers.concat([
                                {
                                    latlng: {
                                        latitude: ret['data'][i]['location']['lat'],
                                        longitude: ret['data'][i]['location']['lang']
                                    },
                                    title: ret['data'][i]['rawData']['average'],
                                    date: dateFormat(ret['data'][i]['date'], "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                                    id: ret['data'][i]['_id'],
                                    majorSources : ret['data'][i]['sources']
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
                var majorSources = data['majorSources'];
                var content = "Decibels: " + data['title'].toString() + " | " + "Major Sources: " + majorSources;
                var date = data['date'];
                return (
                   <Marker
                                    key={id}
                                    coordinate={latlng}
                                    title={date}
                                    description={content}
                                    tracksViewChanges={false}
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
                // provider={"google"} // remove if not using Google Maps
                // style={styles.map}
                provider={Platform.OS === 'ios' ? null : 'osmdroid'}
            region={this.state.region}
            moveOnMarkerPress = {true}
            showsUserLocation={true}
            showsCompass={true}
            showsPointsOfInterest = {true}
        >
            {iterator}
            <MapView.Circle
                center={{
                    latitude: 37.76,
                    longitude: -122.406417,
                }}
                radius={200}
                strokeWidth={10}
                fillColor={"#f29924"}
                strokeColor={"#f29924"}
            />


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

