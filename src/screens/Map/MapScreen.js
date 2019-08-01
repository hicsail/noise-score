import React from 'react';
import {Platform, StyleSheet, Image, View, TouchableHighlight} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Circle} from 'react-native-maps';
import {Marker, Callout, Overlay, LocalTile} from 'react-native-maps';
import axios from "axios";
import {Text, List} from 'react-native-elements';
import SearchBar from 'react-native-searchbar'
import AsyncStorage from '@react-native-community/async-storage';
import * as constants from '../../components/constants';
import Geolocation from 'react-native-geolocation-service';
import {FloatingAction} from "react-native-floating-action";
import ToggleSwitch from 'toggle-switch-react-native'

import {Alert} from "react-native";

const currentLocationImage = require('./mapMarker3.png');
import {getCoordinates} from "../../components/constants";
import {IP_ADDRESS, brightGreen} from "../../components/constants";
import WebView from "react-native-webview";
import CustomButton from "../../Base/CustomButton";
import {width} from "../../components/constants";
import Icon from "react-native-vector-icons/FontAwesome";


export default class MapScreen extends React.Component {
    constructor(props) {

        super(props);


        this.default = {
            latitude: 42.361145,
            longitude: -71.057083,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };

        this.state = {
            // actions: actions,
            markers: [],
            heatmapData: [],
            region: null,
            toggled: false,
            toggle: 'dbs',
            points: [],
            authHeader: "",
            pathTemplate: './../../../assets/greenBox.png',
            query: "",
            searchBarShown: false,
        };
    }

    componentDidMount() {

        // Update the location of the maps focus
        const map = this.mapView;

        // TODO - is this necessary for IOS?
        if (Platform.OS === "ios") {
            Geolocation.requestAuthorization();
        }

        // this.requestCameraPermission().done();

        getCoordinates().then(position => {
            // const coordinates = position.coords.latitude+','+position.coords.longitude;
            if (this.state.region === null) {
                console.log('true')
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    },
                })
            }
        }).catch(error => {
            Alert.alert('', 'Please allow NoiseScore to access your location.')
        });

        // THIS WORKS FOR ANDROID - uncomment out marker in render
        // navigator.geolocation.getCurrentPosition((position) => {
        //         let lat = (position.coords.latitude);
        //         let long = (position.coords.longitude);
        //
        //         let initialRegion = {
        //             latitude: lat,
        //             longitude: long,
        //             latitudeDelta: 0.0922,
        //             longitudeDelta: 0.05,
        //         };
        //         map.animateToRegion(initialRegion, 2000);
        //         this.setState({ region: initialRegion });
        //     },
        //           (error) => {
        //         alert('Error getting location')
        //     },
        //     {
        //         enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
        //     }
        // );


        // Add listeners to update the markers (in the situation that a user takes a new measurements)
        this.subs = [
            this.props.navigation.addListener('willFocus', () => this.updateMarkers()),
            // this.props.navigation.addListener('willFocus', () => this.searchBar.show())
        ];

        this.updateMarkers();
        // this.getHeatMapPoints();

        this.passValues2().done();

        // if (this.state.region === null) {
        //     this.setState({region: this.default})
        // }
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

    evalFeelWeight(feelWeight) {
        switch (feelWeight.toLowerCase()) {
            case 'very quiet':
                return 1;
            case 'quiet':
                return 3;
            case 'moderately loud':
                return 5;
            case 'loud':
                return 7;
            case 'very loud':
                return 9;
        }
        return 1;
    }

    updateMarkers() {
        // Update the marker. Make the call to the backend to get the markers as an array data
        // Save the array as a local variable

        var self = this;
        var newMarkers = [];
        let heatData = [];
        let thisRef = this;
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


                axios.get('http://' + IP_ADDRESS + '/api/userMeasurements', {
                    headers: header,
                    params: params
                }).then(function (ret) {
                    var dateFormat = require('dateformat');
                    for (var i = 0; i < ret['data'].length; i++) {
                        // console.log("Return data is : \n\n ", ret['data']);

                        newMarkers = newMarkers.concat([
                            {
                                latlng: {
                                    latitude: ret['data'][i]['location']['lat'],
                                    longitude: ret['data'][i]['location']['lang']
                                },
                                title: ret['data'][i]['rawData']['average'],
                                date: dateFormat(ret['data'][i]['date'], "yyyy-mmm-d h:MM TT"),
                                id: ret['data'][i]['_id'],
                                majorSources: ret['data'][i]['sources'],
                                avg: ret['data'][i]['rawData']['average']
                            }
                        ]);

                        heatData = heatData.concat([
                            {
                                lat: ret['data'][i]['location']['lat'],
                                lang: ret['data'][i]['location']['lang'],
                                feelWeight: thisRef.evalFeelWeight(ret['data'][i]['loud']),
                                dbWeight: ret['data'][i]['rawData']['average']
                            }
                        ]);
                    }
                    self.setState({
                        markers: newMarkers,
                        heatmapData: heatData
                    })
                }).catch(function (error) {
                    if (error.response.status == 500) {
                        AsyncStorage.removeItem("userData").then(function (ret) {
                            if (ret) {
                                axios.delete('http://' + IP_ADDRESS + '/api/logout', {headers: header})
                                    .then(function (response) {
                                        this.props.navigation("SignedOut");
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                        alert("Something went wrong!");
                                    });

                            }
                            else {
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
                }
                else {
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
        if (this.state.query !== "") {
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


                    axios.get('http://' + IP_ADDRESS + '/api/search', {
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
        // this.searchBar.show();
    }

    passValues2 = async () => {
        try {
            let userData = await AsyncStorage.getItem('userData');
            if (userData) {
                userData = JSON.parse(userData);
                let authHeader = userData['authHeader'];
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                };
                console.log(header)
            }
        }
        catch {

        }

    };

    passValues() {

        // AsyncStorage.getItem('userData').then(function (ret) {
        //     if (ret) {
        //         var response = JSON.parse(ret);
        //         var authHeader = response['authHeader'];
        //         const header = {
        //             'Content-Type': 'application/json',
        //             'Authorization': authHeader
        //         };
        //
        //         axios.get('http://' + constants.IP_ADDRESS + '/api/allMeasurements', {
        //             headers: header,
        //             params: {}
        //         }).then(function (ret) {
        //             self.setState({
        //                 points: ret['data']
        //             });
        //
        //             // this.generateData(self);
        //         }).catch(function (error) {
        //             alert(error);
        //         });
        //     }
        // });
        this.setState({toggled: !this.state.toggled});

        let temp = JSON.stringify({data: this.state.heatmapData, region: this.state.region, toggle: ''});
        console.log("this state 2 is :", temp);
        this.refs.webview.postMessage(temp);
    }

    toggleValues() {
        console.log('in here' + this.state.toggle);
        if (this.state.toggle === 'feel')
            this.setState({toggle: 'dbs'}, this.refs.webview.postMessage(JSON.stringify({toggle: 'dbs'})));
        else
            this.setState({toggle: 'feel'}, this.refs.webview.postMessage(JSON.stringify({toggle: 'feel'})));

    }

    checkToggleCaller(caller) {
        console.log("hello caller with state ", caller, this.state.toggle);
        if (caller !== this.state.toggle)
            this.toggleValues();
    }


    render() {
        var iterator = this.generateMarkers(this.state.markers);

        const actions2 =
            [{
                text: this.state.toggled ? "Measurements" : "Heatmap",
                icon: <Icon
                    name={this.state.toggled? 'map-marker' : 'map'}
                    size={0.05 * width}
                    color="white"
                />,
                name: "toggler",
                position: 5,
                color: '#31BD4B'
            }];

        const label = this.state.toggle === 'feel' ? "Perception" : "Noise level";
        const typeActions = [
            // {
            //     text: this.state.toggle === 'feel' ? "Perception" : "Noise level",
            //     name: 'type',
            //     position: 1,
            //     icon: <Icon
            //         name={this.state.toggle === 'feel' ? 'comments' : 'volume-up'}
            //         size={0.05 * width}
            //         color="white"
            //     />,
            //     color: this.state.toggled ? '#31BD4B' : 'gray'
            // },
            // {
            //     name: 'type2',
            //     position: 2,
            //     render: props =>
            //         <View {...props} style={{flexDirection: 'row'}} key={5}>
            //             <ToggleSwitch
            //                 isOn={this.state.toggle === 'feel'}
            //                 onColor='#31BD4B'
            //                 offColor='#31BD4B'
            //                 label="DBs"
            //                 labelStyle={{
            //                     color: '#444444',
            //                     backgroundColor: 'white',
            //                     paddingVertical: 2,
            //                     paddingHorizontal: 4,
            //                     borderRadius: 3
            //                 }}
            //                 size='medium'
            //                 onToggle={(isOn) => this.toggleValues()}
            //             />
            //             <Text style={{
            //                 color: '#444444',
            //                 backgroundColor: 'white',
            //                 paddingVertical: 2,
            //                 paddingHorizontal: 4,
            //                 borderRadius: 3, marginLeft: 5, alignSelf: 'center'
            //             }}>Perception</Text>
            //         </View>
            // },
            {
                text: 'Sound level',
                icon: <Icon
                    name={'line-chart'}
                    size={0.05 * width}
                    color="white"
                />,
                name: "dbs",
                position: 3,
                color: this.state.toggle !== 'feel' ? '#31BD4B' : 'gray'
            },

            {
                text: 'Noise perception',
                icon: <Icon
                    name={'comments'}
                    size={0.05 * width}
                    color="white"
                />,
                name: "feel",
                position: 4,
                color: this.state.toggle === 'feel' ? '#31BD4B' : 'gray'
            }];


        return (

            <View style={styles.container}>
                {/*<View style={{position: 'absolute', bottom: 10, left: 10, zIndex: 1000}}>*/}
                {/*    <CustomButton text={'Toggle heatmap'} onPress={() => this.passValues()}/>*/}

                {/*</View>*/}
                {/*<View style={[{*/}
                {/*    position: 'absolute',*/}
                {/*    bottom: 10,*/}
                {/*    right: 10,*/}
                {/*    zIndex: 1000*/}
                {/*}, this.state.toggled ? {} : {zIndex: -1000}]}>*/}
                {/*    <CustomButton text={this.state.toggle === 'feel' ? "Noise Perception" : "Sound Level"}*/}
                {/*                  onPress={() => this.toggleValues()}/>*/}
                {/*</View>*/}

                <View style={[{flex: 1}, this.state.toggled ? {display: 'none'} : {}]}>
                    {/*<Text style={styles.example}>Floating Action example</Text>*/}

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
                        showsMyLocationButton={true}
                        // onPress={() => this.searchBarHandler()}
                        // onRegionChangeComplete={(data) => {
                        //     this.setState({region: data})
                        // }}
                    >
                        {iterator}

                        {/*Marker to show users location in Android*/}
                        {/*Comment out when using on IOS */}
                        {/*<Marker*/}
                        {/*key={-1}*/}
                        {/*coordinate={{*/}
                        {/*latitude: this.state.region['latitude'],*/}
                        {/*longitude: this.state.region['longitude']*/}
                        {/*}}*/}
                        {/*tracksViewChanges={false}*/}
                        {/*image={currentLocationImage}*/}
                        {/*/>*/}
                    </MapView>

                </View>
                {/*------------- Search bar funcionality - will incure costs to our PI if used -------------*/}
                {/*<SearchBar*/}
                {/*ref={(ref) => this.searchBar = ref}*/}
                {/*handleSearch={(input) => this.search(input)}*/}
                {/*showOnLoad*/}
                {/*onSubmitEditing={() => this.searchDriver()}*/}
                {/*/>*/}

                <View style={[{flex: 1,}, this.state.toggled ? {} : {display: 'none'}]}>
                    <WebView ref="webview"
                        // onLoadEnd={() => this.passValues()}
                             source={{uri: 'file:///android_asset/heatmap.html'}}/>
                </View>
                <FloatingAction
                    ref={(ref) => {
                        this.floatingAction = ref;
                    }}
                    color={brightGreen}
                    actions={!this.state.toggled ? actions2 : typeActions.concat(actions2)}
                    onPressItem={(name) => {
                        if (name === 'toggler') {
                            this.passValues();
                        }
                        else if (name === 'type ' || 'type2') {
                            this.toggleValues();
                        }
                        else if (name === 'feel' || name === 'dbs') {
                            console.log("in here 5");
                            this.checkToggleCaller(name)
                        }
                        console.log("the data we got is ", name);
                        console.log(name === 'feel')
                    }}
                    overlayColor={'transparent'}
                    // floatingIcon={require('../../../assets/mic-white.png')}
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
        // left: 0,
        // right: 0,
        // top: 0,
        // bottom: 0,
        // position: 'absolute',
        height: '100%',
        width: '100%',
        // zIndex:-1,
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
