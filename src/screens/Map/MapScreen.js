import React from 'react';
import { Platform, StyleSheet, Image, View, TouchableHighlight} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker, Callout, Overlay, LocalTile} from 'react-native-maps';
import axios from "axios";
import {Text, List} from 'react-native-elements';
import SearchBar from 'react-native-searchbar'
import AsyncStorage from '@react-native-community/async-storage';

const currentLocationImage = require('./mapMarker3.png');


export default class MapScreen extends React.Component {
    constructor(props) {

        super(props);


        this.state = {
            markers: [],
            region: {
                latitude:  42.361145,
                longitude: -71.057083,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            points: [],
            authHeader: "",
            pathTemplate: './../../../assets/greenBox.png',
            query: "",
            searchBarShown: true,
        };
    }

    componentDidMount() {
        // Update the location of the maps focus
        const map = this.mapView;

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
        //         map.animateToRegion(initialRegion, 2000);
        //         this.setState({ region: initialRegion});
        //     },
        //     (error) => {alert('Error getting location')
        //     },
        //     {
        //         enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
        //     }
        // );

        // THIS WORKS FOR ANDROID - uncomment out marker in render
        navigator.geolocation.getCurrentPosition((position) => {
                let lat = (position.coords.latitude);
                let long = (position.coords.longitude);

                let initialRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.05,
                };
                map.animateToRegion(initialRegion, 2000);
                this.setState({region: initialRegion});
            },
            (error) => {
                alert('Error getting location')
            },
            {
                enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
            }
        );


        // Add listeners to update the markers (in the situation that a user takes a new measurements)
        this.subs = [
            this.props.navigation.addListener('willFocus', () => this.updateMarkers()),
            this.props.navigation.addListener('willFocus', () => this.searchBar.show())
        ];

        this.updateMarkers();
        // this.getHeatMapPoints();

    }

    getHeatMapPoints() {
        // Function that can be used to make a call 'allMeasurement'
        // Could be used to help with the heatmap
        // Currently unused

        var self = this;

        AsyncStorage.getItem('userData').then(function (ret) {
            if (ret) {
                var response = JSON.parse(ret);
                var authHeader = response['authHeader'];
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                };
                axios.get('http://localhost:9000/api/allMeasurements', {
                // axios.get('http://10.0.2.2:9000/api/allMeasurements', {
                    headers: header,
                    params: {}
                }).then(function (ret) {
                    self.setState({
                        points: ret['data']
                    })
                    // this.generateData(self);
                }).catch(function (error) {
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
        catch (exception) {
            return false;
        }
    }

    updateMarkers() {
        // Update the marker. Make the call to the backend to get the markers as an array data
        // Save the array as a local variable

        var self = this;
        var newMarkers = [];
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

                axios.get('http://localhost:9000/api/userMeasurements', {
                // axios.get('http://10.0.2.2:9000/api/userMeasurements', {
                    headers: header,
                    params: params
                }).then(function (ret) {
                    var dateFormat = require('dateformat');
                    for (var i = 0; i < ret['data'].length; i++) {
                        newMarkers = newMarkers.concat([
                            {
                                latlng: {
                                    latitude: ret['data'][i]['location']['lat'],
                                    longitude: ret['data'][i]['location']['lang']
                                },
                                title: ret['data'][i]['rawData']['average'],
                                date: dateFormat(ret['data'][i]['date'], "yyyy-mmm-d h:MM TT"),
                                id: ret['data'][i]['_id'],
                                majorSources: ret['data'][i]['sources']
                            }
                        ]);
                    }
                    self.setState({
                        markers: newMarkers
                    })
                }).catch(function (error) {
                    if (error.response.status == 500) {
                        AsyncStorage.removeItem("userData").then(function (ret) {
                            if (ret) {
                                axios.delete('http://localhost:9000/api/logout', {headers: header})
                                // axios.delete('http://10.0.2.2:9000/api/logout', {headers: header})
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

    generateMarkers(data) {
        // The iterator used to generate what is displayed for the data.
        // It will create Marker objects (as a Callout) and append them to the render

        if (data != null) {
            return data.map((data) => {
                var id = data['id'].toString();
                var latlng = data['latlng'];
                var majorSources;
                if (data['majorSources'].length > 3) {
                    majorSources = "Major Sources: " + data['majorSources'][0] + "," + data['majorSources'][1] + "," + data['majorSources'][2]
                } else {
                    majorSources = "Major Sources: " + data['majorSources'];
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
            query: results
        })
    }

    searchDriver() {
        // Function that takes in the search bar query and makes a call to the backend to get
        // the coordinates of the result of the query

        const map = this.mapView;
        const query = this.state.query;
        if (this.state.query != "") {
            AsyncStorage.getItem('userData').then(function (ret) {
                if (ret) {
                    var response = JSON.parse(ret);
                    var username = response['user']['username'];
                    var userID = response['user']['_id'];
                    // Now we need to get all their measurement information
                    var params = {
                        userID: userID,
                        username: username,
                        query: query
                    };
                    var authHeader = response['authHeader'];
                    const header = {
                        'Content-Type': 'application/json',
                        'Authorization': authHeader
                    };


                    axios.get('http://localhost:9000/api/search', {
                    // axios.get('http://10.0.2.2:9000/api/search', {
                        headers: header,
                        params: params
                    }).then(function (ret) {
                        // Handle the results of the search
                        var lanLat = ret.data;
                        let r = {
                            latitude: ret.data['lat'],
                            longitude: ret.data['lng'],
                            latitudeDelta: 7.5,
                            longitudeDelta: 7.5,
                        };
                        map.animateToRegion(r, 2000);

                    }).catch(function (error) {
                        alert("Error Searching");
                        console.log(error);

                    });
                }
            });
        }
    }

    searchBarHandler() {
        // This function show show and hide the search bar as the user taps the screen
        // Currently configured to always try and show the search bar

        // Code if want to tap the screen to show/hide the search bar
        // if(this.state.searchBarShown){
        //     this.searchBar.hide();
        //     this.setState({
        //         searchBarShown : false
        //     });
        // } else {
        //     this.searchBar.show();
        //     this.setState({
        //         searchBarShown : true
        //     });
        // }
        this.searchBar.show();
    }

    render() {
        var iterator = this.generateMarkers(this.state.markers);


        return (

            <View style={styles.container}>
                <MapView
                    ref={ref => {
                        this.mapView = ref;
                    }}

                    style={styles.mapView}
                  //provider={"google"} // remove if not using Google Maps
                    provider={PROVIDER_GOOGLE}

                    // style={styles.map}
                    // provider={Platform.OS === 'ios' ? null : 'osmdroid'}
                    region={this.state.region}
                    moveOnMarkerPress={true}
                    showsUserLocation={true}
                    showsCompass={true}
                    showsPointsOfInterest={true}
                    onPress={() => this.searchBarHandler()}
                >
                    {iterator}

                    {/*Marker to show users location in Android*/}
                    {/*Comment out when using on IOS */}
                    <Marker
                        key={-1}
                        coordinate={{
                            latitude: this.state.region['latitude'],
                            longitude: this.state.region['longitude']
                        }}
                        tracksViewChanges={false}
                        image={currentLocationImage}
                    />

                </MapView>

                {/*------------- Search bar funcionality - will incure costs to our PI if used -------------*/}
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
    mapView: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
    },
    calloutHeader: {
        textAlign: 'center',
        fontSize: 20
    },
    calloutContent: {
        textAlign: 'center'
    },
    inputContainerStyle: {},
    containerStyle: {
        top: '20%',
        left: "7%",
        width: '85%',
        opacity: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderTopWidth: 0, borderBottomWidth: 0,

    }
});

