import React from 'react';
import {Platform, StyleSheet, View, Alert, Image} from 'react-native';
import {Text} from 'react-native-elements';
import WebView from "react-native-webview";
import {FloatingAction} from "react-native-floating-action";
import Icon from "react-native-vector-icons/FontAwesome";
import SearchBar from 'react-native-searchbar'
import {NavigationEvents} from 'react-navigation';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';

import {IP_ADDRESS, brightGreen, getCoordinates, width, isAndroid} from "../../components/constants";
import CustomButton from "../../Base/CustomButton";

const currentLocationImage = require('./mapMarker3.png');

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

        // Add listeners to update the markers (in the situation that a user takes a new measurements)
        this.subs = [
            this.props.navigation.addListener('willFocus', () => this.updateMarkers()),
            // this.props.navigation.addListener('willFocus', () => this.searchBar.show())
        ];

        this.updateMarkers();
        // this.getHeatMapPoints();

        // this.passValues2().done();

        console.log("mapscreen mounted");
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
                return 10;
            case 'quiet':
                return 30;
            case 'moderately loud':
                return 50;
            case 'loud':
                return 70;
            case 'very loud':
                return 90;
        }
        return 1;
    }


    getFilters = async () => {
        return await AsyncStorage.getItem('filters').then(function (filters) {
            return filters;
        })
    };

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

                // Now we need to get all their measurement information

                let userData = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': response['authHeader']
                    },
                    params: {
                        userID: response['user']['_id'],
                        username: response['user']['username']
                    }
                };


                axios.get('http://' + IP_ADDRESS + '/api/userMeasurements', userData).then(function (ret) {
                    let dateFormat = require('dateformat');
                    console.log(ret['data'].length);

                    for (let i = 0; i < ret['data'].length; i++) {

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
                                dbWeight: Math.round(ret['data'][i]['rawData']['average']),
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
                                axios.delete('http://' + IP_ADDRESS + '/api/logout', userData)
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
                        // image={require('../../../assets/mic-pin-black.png')}
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

    passValues2() {
        let thisRef = this;
        // console.log("ina pass values 2");
        AsyncStorage.getItem('userData').then(function (ret) {
            if (ret) {
                let response = JSON.parse(ret);

                // Now we need to get all their measurement information

                let header = {
                    'Content-Type': 'application/json',
                    'Authorization': response['authHeader']
                };
                let params = {
                    userID: response['user']['_id'],
                    username: response['user']['username']
                };

                let heatData = [];

                axios.get('http://' + IP_ADDRESS + '/api/allMeasurements', {
                    headers: header,
                    params: params
                }).then(function (measurements) {
                    // console.log("axios request is done in passvalues 2");
                    thisRef.setState({heatmapData: measurements}, () => console.log(thisRef.state))
                });
            }
        }.bind(this));
    }

    passValues() {

        this.passValues2();

        // console.log("after passvalues 2 the state is ", this.state);

        this.setState({toggled: !this.state.toggled});


        let temp = JSON.stringify({data: this.state.heatmapData, region: this.state.region, toggle: ''});
        // console.log("this state 2 is :", temp);
        this.refs.webview.postMessage(temp);
    }

    toggleValues() {
        // this.passValues2();

        // console.log('in here' + this.state.toggle);
        if (this.state.toggle === 'feel')
            this.setState({toggle: 'dbs'}, this.refs.webview.postMessage(JSON.stringify({toggle: 'dbs'})));
        else
            this.setState({toggle: 'feel'}, this.refs.webview.postMessage(JSON.stringify({toggle: 'feel'})));

    }

    checkToggleCaller(caller) {
        // console.log("hello caller with state ", caller, this.state.toggle);
        if (caller !== this.state.toggle)
            this.toggleValues();
    }

    async retrieveItem(key) {
        try {
            return await AsyncStorage.getItem(key);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    updateFilters() {
        let thisRef = this;
        this.retrieveItem('filters').then().then(function (filters) {
            console.log(filters);
            thisRef.refs.webview.postMessage(filters);
        })
    }


    render() {
        var iterator = this.generateMarkers(this.state.markers);

        const actions2 =
            [{
                text: this.state.toggled ? "Measurements" : "Heatmap",
                icon: <Icon
                    name={this.state.toggled ? 'map-marker' : 'map'}
                    size={0.05 * width}
                    color="white"
                />,
                name: "toggler",
                position: 5,
                color: '#31BD4B'
            }];

        const label = this.state.toggle === 'feel' ? "Perception" : "Noise level";
        const typeActions = [
            {
                text: 'Sound level',
                icon: <Icon
                    name={'line-chart'}
                    size={0.05 * width}
                    color="white"
                />,
                name: "dbs",
                position: 3,
                color: this.state.toggle === 'feel' ? 'gray' : '#31BD4B'
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
            },
            {
                text: 'Filters',
                icon: <Icon name={'filter'}
                            size={0.05 * width}
                            color='white'
                />,
                name: 'filters',
                position: 5,
                color: '#31BD4B'
            }];

        let thisRef = this;
        return (

            <View style={styles.container}>

                <NavigationEvents
                    onDidFocus={
                        () => {
                            this.updateFilters();
                        }
                    }/>

                <View style={{
                    position: 'absolute',
                    bottom: 35,
                    left: 10,
                    zIndex: 1000,
                    width: undefined,
                    height: undefined
                }}>
                    <Image source={require('../../../assets/txaimlqj.png')}/>
                </View>
                <View style={[{flex: 1}, this.state.toggled ? {display: 'none'} : {}]}>
                    {/*<Text style={styles.example}>Floating Action example</Text>*/}

                    <MapView
                        ref={ref => {
                            this.mapView = ref;
                        }}

                        style={styles.mapView}
                        provider={PROVIDER_GOOGLE}

                        // style={styles.map}

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
                            console.log("in toggler", name);
                            this.passValues();
                        }
                        else if (name === 'type ' || name === 'type2') {
                            console.log("in type", name);
                            this.toggleValues();
                        }
                        else if (name === 'feel' || name === 'dbs') {
                            console.log("in feel", name);
                            this.checkToggleCaller(name)
                        }
                        else if (name === 'filters') {
                            console.log("in filters", name);
                            this.props.navigation.navigate('HeatmapFilters')
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

