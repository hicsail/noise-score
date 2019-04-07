import React from 'react';
import {AsyncStorage, Picker, StyleSheet, View, ScrollView, Platform} from 'react-native';
import axios from "axios";
import { ListItem , Button, Text, Header} from 'react-native-elements';
import PTRView from 'react-native-pull-to-refresh';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE }from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import {SelectMultipleGroupButton} from "react-native-selectmultiple-button";


export default class AccountScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            userID: -1,
            userData: null,
            infoData: null,
            describe: null,
            feel: null,
            location: null,
            loud: null,
            rawData: null,
            sources: null,
            words: null,
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        };

    }


    componentDidMount() {

        // Add listener to notice when we need to reload data
        this.subs = [
            this.props.navigation.addListener('willFocus', () => this.updateData())
        ];


        // Get the information for the moreInfo screen
        AsyncStorage.getItem('moreInfo').then(function (ret) {
            if (ret) {
                var response = JSON.parse(ret);
                this.setState({
                    username: response['username'],
                    describe: response['describe'],
                    feel: response['feel'],
                    location: response['location'],
                    loud: response['loud'],
                    rawData: response['rawData'],
                    sources: response['sources'],
                    words: response['words'],
                    region: {
                        latitude: response['location']['lat'],
                        longitude: response['location']['lang'],
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                });
            }
        }.bind(this));
    }


    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (exception) {
            return false;
        }
    }


    updateData() {

        AsyncStorage.getItem('moreInfo').then(function (ret) {
            if (ret) {
                var response = JSON.parse(ret);
                this.setState({
                    username: response['username'],
                    describe: response['describe'],
                    feel: response['feel'],
                    location: response['location'],
                    loud: response['loud'],
                    rawData: response['rawData'],
                    sources: response['sources'],
                    words: response['words']
                });
            }
        }.bind(this));
    }


    accountScreen() {
        const {navigate} = this.props.navigation;
        navigate("Account1");
    }





    render() {

        const loud = this.state.loud;
        const describe = this.state.describe;
        const feel = this.state.feel;
        const sources = this.state.sources;
        var words = this.state.words;
        if(words && words.length <= 1 ){
            words = "No comments"
        }
        var average;
        var max;
        var min;
        if(this.state.rawData){
            average  = this.state.rawData['average'];
            max  = this.state.rawData['max'];
            min = this.state.rawData['min'];
        }
        var loudGroup = [{value : loud}];
        const latlng = {
            latitude:  this.state.region['latitude'],
            longitude:  this.state.region['longitude']
        };
        // const lang = location['lang'];
        // const lat = location['lat'];

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

                <Marker
                    key={1}
                    coordinate={latlng}
                    title={"Recoding"}
                    tracksViewChanges={false}
                />



                <View style={styles.bottomHalf}>
                    {/*<ScrollView >*/}
                        <Text style={styles.text}>How loud were the sounds?</Text>
                        <Text style={styles.text}>{loud}</Text>
                        <Text style={styles.text}>Which words best describe the sound?</Text>
                        <Text style={styles.text}>{describe}</Text>
                        <Text style={styles.text}>How did the sounds make you feel?</Text>
                        <Text style={styles.text}>{feel}</Text>
                        <Text style={styles.text}>Major sources of noise?</Text>
                        <Text style={styles.text}>{sources}</Text>
                        <Text style={styles.text}>Comments</Text>
                        <Text style={styles.text}>{words}</Text>
                        <Text style={styles.text}>Raw Data:</Text>
                        <Text style={styles.text}>Average : {average}</Text>
                        <Text style={styles.text}>Min:{min}/Max:{max}</Text>


                    {/*</ScrollView>*/}
                </View>
            </MapView>


        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    backButton : {
        backgroundColor : '#cccc31'
    },
    bottomHalf : {
        backgroundColor: '#323232',
        height: '30%',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    text: {
        fontSize: 20,
        color: "white",
    }

});


