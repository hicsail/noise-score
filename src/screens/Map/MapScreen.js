import React from 'react';
import {AsyncStorage, Platform, StyleSheet, Image, View, TouchableHighlight} from 'react-native';
import MapView, { PROVIDER_GOOGLE }from 'react-native-maps';
import { Marker, Callout, Overlay, LocalTile } from 'react-native-maps';
import axios from "axios";
import {  Text, List } from 'react-native-elements';
import SearchBar from 'react-native-searchbar'




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
            authHeader : "",
            pathTemplate : './../../../assets/greenBox.png',
            query : "",
        };

    }



    componentDidMount() {

        this.subs = [
            this.props.navigation.addListener('willFocus', () => this.updateMarkers()),
            this.props.navigation.addListener('willFocus', () => this.searchBar.show())
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

    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch(exception) {
            return false;
        }
    }


    updateMarkers(){
        // Update the location of the maps focus


        // THIS WORKS FOR IOS
        // navigator.geolocation.requestAuthorization();
        // navigator.geolocation.getCurrentPosition(
        //     (position) => {
        //
        //         var lat = (position.coords.latitude);
        //         var long = (position.coords.longitude);
        //         var initialRegion ={
        //             latitude: lat,
        //             longitude: long,
        //             latitudeDelta: 0.0922,
        //             longitudeDelta: 0.05,
        //         };
        //
        //
        //         this.setState({ region: initialRegion});
        //     },
        //
        //     (error) => {alert('Error getting location')
        //     },
        //     {
        //         enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
        //     }
        // );
        // THIS WORKS FOR ANDROID


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
                                    date: dateFormat(ret['data'][i]['date'], "yyyy-mmm-d h:MM TT"),
                                    id: ret['data'][i]['_id'],
                                    majorSources : ret['data'][i]['sources']
                                }
                            ]);
                        }
                        self.setState({
                            markers: newMarkers
                        })
                    }).catch(function (error){
                        if(error.response.status==500){
                            AsyncStorage.removeItem("userData").then(function (ret){
                                if(ret){
                                    // navigate("SignedOut");
                                    axios.delete('http://localhost:9000/api/logout', {headers:header})
                                        .then(function (response) {
                                            this.props.navigation("SignedOut");
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                            alert("Something went wrong!");
                                        });

                                } else {
                                    this.props.navigation("SignedOut");
                                }
                            });
                        }

                    });
            }
        }.bind(this));



    }


    generateMarkers(data){
        // The iterator used to generate what is displayed for the data.
        // It will create Marker objects (as a Callout) and append them to the render
        if(data != null){
            return data.map((data) => {
                var id = data['id'].toString();
                var latlng = data['latlng'];
                var majorSources;
                if(data['majorSources'].length > 3){
                    majorSources =  "Major Sources: " + data['majorSources'][0] + "," + data['majorSources'][1] + "," + data['majorSources'][2]
                } else {
                    majorSources =  "Major Sources: " + data['majorSources'];
                }
                var decibels = "Decibels: " + data['title'].toString();
                var date = data['date'];
                return (
                   <Marker
                       key={id}
                       coordinate={latlng}
                       tracksViewChanges={false}
                   >
                       <MapView.Callout>
                           <Text style={styles.calloutHeader}>{date}</Text>
                           <Text style={styles.calloutContent}>{decibels}{"\n"}{majorSources}</Text>
                       </MapView.Callout>
                   </Marker>


                )
            });

        }
    }

    search(results) {
        // Function to update the query state as a user types
        this.setState({
            query : results
        })
    }

    searchDriver(){
        if(this.state.query != "") {
            AsyncStorage.getItem('userData').then(function (ret) {
                if (ret) {
                    var response = JSON.parse(ret);
                    var username = response['user']['username'];
                    var userID = response['user']['_id'];

                    // Now we need to get all their measurement information
                    var params = {
                        userID: userID,
                        username: username
                    };
                    var authHeader = response['authHeader'];
                    const header = {
                        'Content-Type': 'application/json',
                        'Authorization': authHeader
                    };

                    axios.get('http://localhost:9000/api/search', {
                        headers: header,
                        params: params
                    }).then(function (ret) {
                        // Handle the results of the search
                    }).catch(function(error){
                        alert("Error Searching");
                        console.log(error);

                    });
                }
            });
        }
    }

    searchBarHandler (){
        // TODO: Make a button to call this function
        // This function show show and hide the search bar as the user taps the screen
        this.searchBar.hide()
    }



  render() {
      var iterator = this.generateMarkers(this.state.markers);



    return (

        <View style={styles.container}>
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


            </MapView>

            <SearchBar
                ref={(ref) => this.searchBar = ref}
                handleSearch={(input) => this.search(input)}
                showOnLoad
                onSubmitEditing={() => this.searchDriver()}
            />

        </View>




  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
    calloutHeader : {
        textAlign: 'center',
        fontSize: 20
    },
    calloutContent : {
        textAlign: 'center'
    },
    inputContainerStyle : {

    },
    containerStyle : {
        top: '20%',
        left : "7%",
        width : '85%',
        opacity : 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderTopWidth: 0, borderBottomWidth: 0,

    }
});

