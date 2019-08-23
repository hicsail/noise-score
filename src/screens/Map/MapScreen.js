import React from 'react';
import {Platform, StyleSheet, View, Alert, Image, TouchableOpacity} from 'react-native';
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


// Default region (Center of Boston) for the map to center if the user does not give location access
const defaultLoc = {
    latitude: 42.361145,
    longitude: -71.057083,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

const defaultFilters = {}

export default class MapScreen extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            markers: [],
            heatmapData: [],
            filters: {
                noiseType: 'db',
                location: 'Everything',
            },
            region: null,
            toggled: false,
            toggle: 'dbs',
            points: [],
            authHeader: "",
            query: "",
            searchBarShown: false,
            defaultLoc: defaultLoc
        };
    }

    componentDidMount() {
        let thisRef = this;
        // Update the location of the maps focus
        const map = this.mapView;

        this.getUserLocation();

        // --------- Add listeners to update the markers (in the situation that a user takes new measurements) ---------
        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.getUserLocation();
                this.updateMarkers();
                this.sendHeatmapData();
            }),

            // this.props.navigation.addListener('willFocus', () => this.searchBar.show())
        ];


        // --------- Update markers' data in the state object ----------
        this.updateMarkers();


        // this.sendHeatmapData();
    }

    getUserLocation() {
        let thisRef = this;
        // ------ Get permission to use location and get user's coordinates ------
        if (Platform.OS === "ios") {
            Geolocation.requestAuthorization();
        }

        if (this.state.region === null) {
            getCoordinates().then(position => {
                // const coordinates = position.coords.latitude+','+position.coords.longitude;
                thisRef.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    },
                }, () =>
                    // ------ Initialize the heatmap view
                    this.initHeatmap())

            }).catch(error => {
                Alert.alert('', 'Please allow NoiseScore to access your location.');
                console.log("Error when fetching location ")
            });
        }
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

    // --------------- Methods relating to rendering the mapview with user's measurements ---------------

    // --------- Retrieve user's data from async storage and update the state object ---------
    getUserData = async (thisRef) => {
        return await AsyncStorage.getItem('userData').then(function (ret) {
            let response = JSON.parse(ret);

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

            thisRef.setState({userData: userData});
            return userData;
        }).catch((error) =>
            console.log("Could not retrieve user's data from async storage", error));
    };


    // --------- Updates state's marker's object with new data ---------
    updateMarkers() {
        let self = this;
        let newMarkers = [];
        let thisRef = this;

        // --------- Get user's data to display as markers ---------

        // Get/Update user's data
        this.getUserData(this).done();
        let userData = this.state.userData;

        // Retrieve the data from the database
        axios.get('http://' + IP_ADDRESS + '/api/userMeasurements', userData)
            .then(function (ret) {
                let dateFormat = require('dateformat');

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
                }
                self.setState({
                    markers: newMarkers,
                })
            })
            .catch(function (error) {
                if (error.response.status === 500) {
                    alert("Could not retrieve your data from the database");
                    AsyncStorage.removeItem("userData").then(function (ret) {
                        if (ret) {
                            axios.delete('http://' + IP_ADDRESS + '/api/logout', this.state.userData)
                                .then(function (response) {
                                    thisRef.props.navigation("SignedOut");
                                })
                                .catch(function (error) {
                                    console.log("bad error");
                                    alert("Something went wrong!");
                                });

                        }
                        else {
                            this.props.navigation("SignedOut");
                        }
                    });
                }

            });
        // });
    }


    // --- Uses state's markers data to create Marker components that will be displayed in the map ---
    generateMarkers(measurements) {
        // The iterator used to generate what is displayed for the data.
        // It will create Marker objects (as a Callout) and append them to the render


        return measurements.map((measurement) => {
            var id = measurement['id'].toString();
            var latlng = measurement['latlng'];
            var majorSources;

            if (measurement['majorSources'].length > 3) {
                majorSources = "Major Sources: " + measurement['majorSources'][0] + "," + measurement['majorSources'][1] + "," + measurement['majorSources'][2]
            }
            else {
                majorSources = "Major Sources: " + measurement['majorSources'];
            }

            var decibels = "Decibels: " + measurement['title'].toString();
            var date = measurement['date'];

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


    // --------------- Methods relating to rendering the heatmap ---------------

    initHeatmap() {
        let data = JSON.stringify({operation: 'init'});
        // alert(data);
        if (!isAndroid)
            setTimeout(()=> {
                this.refs.webview.postMessage(data)}, 200);
        else {
            this.refs.webview.postMessage(data);
        }
    }

    // --- Retrieves all users' measurements data to render the heatmap. Updated the state object with the data ---
    getHeatmapData = async () => {
        let thisRef = this;

        // --- Get user's data so we can make the api call using an active session ---
        this.getUserData(this).done();
        let userData = this.state.userData;

        await axios.get('http://' + IP_ADDRESS + '/api/allMeasurements', userData)
            .then(
                (measurements) => {
                    let data = measurements.data.length ? measurements.data : [];
                    thisRef.setState({heatmapData: data}, () => console.log("Got 'em all"))
                }
            )
            .catch(
                error => {
                    alert("Could not get the data for the heatmap");
                    console.log("Error when fetching the heatmap data", error);
                }
            );

    };

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
        let thisRef = this;
        return await AsyncStorage.getItem('filters').done(function (data) {
            thisRef.setState({filters: data})
        });
    };


    sendHeatmapData() {
        let thisRef = this;
        this.getHeatmapData().done(() => {
            let originalData = this.state.heatmapData;
            AsyncStorage.getItem('filters').then(function (filters) {
                console.log(filters);
                console.log(originalData);
                filters = JSON.parse(filters);

                let filteredData = thisRef.filterData(filters, originalData);
                console.log("filtered data is ", filteredData);


                let jsonData = JSON.stringify({data: filteredData, region: thisRef.state.region, operation: 'show'});
                // console.log("this state 2 is :", temp);
                thisRef.refs.webview.postMessage(jsonData);
                console.log("Sent new data")

            }).catch(error => console.log("could not retrieve the filters", error));

        });

    }

    filterData(filters, originalData) {
        console.log("the filters are ", filters);
        let filteredData = originalData;

        // --- Keep only the requested weight ---
        if (filters.noiseType === 'dbs') {
            for (let i = 0; i < filteredData.length; i++) {
                filteredData[i].weight = filteredData[i]['dbWeight'];
                delete filteredData[i].dbWeight;
                delete filteredData[i].feelWeight;
            }
        }
        else {
            for (let i = 0; i < filteredData.length; i++) {
                filteredData[i].weight = this.evalFeelWeight(filteredData[i]['feelWeight']);
                delete filteredData[i].feelWeight;
                delete filteredData[i].dbWeight;
            }
        }

        // --- Filter according to the location ---
        if (filters['location'].toLowerCase() === 'indoors'){
            return filteredData.filter(measurement => measurement.location.indexOf('ndoors') > -1);
        } else if (filters['location'].toLowerCase() === 'outdoors'){
            return filteredData.filter(measurement => measurement.location.indexOf('utdoors') > -1);
        } else if (filters['location'].toLowerCase().indexOf('work') > -1){
            return filteredData.filter(measurement => measurement.location.indexOf('ork') > -1);
        } else {
            return filteredData
        }

    }


    updateHeatmap() {
        let filters = this.getFilters();


        let data = JSON.stringify({operation: 'update', data: this.state.heatmapData, region: this.state.region})
        this.refs.webview.postMessage(data);
    }


    passValues() {

        // this.passValues2();

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
            console.log("Error retrieving filters");
        }
    }

    updateFilters() {
        let thisRef = this;
        this.retrieveItem('filters').then().then(function (filters) {
            // console.log(filters);
            thisRef.refs.webview.postMessage(filters);
        })
    }


    render() {

        const measureMapAction =
            [
                {
                    text: "Heatmap",
                    icon: <Icon
                        name={'map'}
                        size={0.05 * width}
                        color="white"
                    />,
                    name: "toggler",
                    position: 2,
                    color: '#31BD4B'
                }
            ];

        const heatMapActions = [
            {
                text: "Measurements",
                icon: <Icon
                    name={'map-marker'}
                    size={0.05 * width}
                    color="white"
                />,
                name: "toggler",
                position: 2,
                color: '#31BD4B'
            },

            {
                text: 'Filters',
                icon: <Icon name={'filter'}
                            size={0.05 * width}
                            color='white'
                />,
                name: 'filters',
                position: 1,
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

                {this.state.toggled ?
                    <View style={{
                        position: 'absolute',
                        bottom: 35,
                        left: 10,
                        zIndex: 1000,
                        width: undefined,
                        height: undefined
                    }}>
                        <Image
                        style={{width:30, height:150, resizeMode:'stretch'}}
                            source={require('../../../assets/heatmap-scale.png')}/>
                    </View>
                    :
                    null
                }


                <View style={[{flex: 1}, this.state.toggled ? {display: 'none'} : {}]}>
                    {/*<Text style={styles.example}>Floating Action example</Text>*/}

                    <MapView
                        ref={ref => {
                            this.mapView = ref;
                        }}

                        style={styles.mapView}
                        provider={PROVIDER_GOOGLE}

                        // style={styles.map}

                        initialRegion={this.state.region === null ? this.state.defaultLoc : this.state.region}
                        moveOnMarkerPress={true}
                        showsUserLocation={true}
                        showsCompass={true}
                        showsPointsOfInterest={true}
                        showsMyLocationButton={true}
                        // onPress={() => this.searchBarHandler()}
                        onRegionChangeComplete={(data) => {
                            // console.log("nrew region is ", data);
                            this.setState({region: data})
                        }}
                    >

                        {this.state.toggled ? null : this.generateMarkers(this.state.markers)}

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
                    {isAndroid ?
                        <WebView ref="webview"
                            // onLoadEnd={() => this.passValues()}
                                 source={{uri: 'file:///android_asset/heatmap.html'}}/>
                        :
                        <WebView ref="webview"
                            // onLoadEnd={() => this.passValues()}
                                 automaticallyAdjustContentInsets={false}
                                 originWhitelist={['*']}
                                 allowFileAccess={true}
                                 javaScriptEnabled={true}
                                 domStorageEnabled={true}
                                 startInLoadingState={true}

                                 source={{uri: 'heatmap.bundle/heatmap.html'}}/>
                    }
                </View>


                {this.state.toggled ?
                    <FloatingAction
                        ref={(ref) => {
                            this.floatingAction = ref;
                        }}
                        distanceToEdge={20}
                        color={brightGreen}
                        actions={this.state.toggled ? heatMapActions : measureMapAction}
                        onPressItem={(name) => {
                            if (name === 'toggler') {
                                if (!this.state.toggled)
                                    this.sendHeatmapData();
                                this.setState({toggled: !this.state.toggled})
                            }
                            else if (name === 'filters') {
                                console.log("in filters", name);
                                this.props.navigation.navigate('HeatmapFilters')
                            }
                            console.log("the data we got is ", name);
                            console.log(name === 'feel')
                        }}

                        onPressMain={() => {
                            console.log("pressed main")
                        }}

                        style={{top: 30}}
                        overlayColor={'transparent'}
                        // floatingIcon={require('../../../assets/mic-white.png')}
                    />
                    :
                    <TouchableOpacity
                        onPress={() => {
                            this.sendHeatmapData();
                            this.setState({toggled: !this.state.toggled})
                        }}
                        style={[{
                            justifyContent: 'center',
                            width: 55,
                            height: 55,
                            borderRadius: 55,
                            backgroundColor: brightGreen,
                            position: 'absolute',
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.8,
                            shadowRadius: 1,
                            elevation: 10,

                        },
                            isAndroid ? {
                                bottom: 20,
                                right: 20,
                            } : {bottom: 80, right: 10}]}
                    >
                        {/*<View style={{flex:1, width:55, height:55, backgroundColor:'red'}}>*/}
                        {/*    <Icon*/}
                        {/*        name={'map'}*/}
                        {/*        size={0.05 * width}*/}
                        {/*        color="white"*/}
                        {/*    />*/}
                        <Image style={{
                            width: 30,
                            height: 60,

                            resizeMode: 'contain',
                            // flex: 1,
                            borderRadius: 15,
                            alignSelf: 'center',
                            // justifySelf:'center'
                        }}
                               source={require('./../../../assets/mic-white.png')}
                        />
                        {/*</View>*/}
                    </TouchableOpacity>
                }
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

