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
            },
            date: null
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
                    },
                    date : response['date']
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
                    words: response['words'],
                    date : response['date']
                });
            }
        }.bind(this));
    }


    accountScreen() {
        const {navigate} = this.props.navigation;
        navigate("Account1");
    }





    render() {
        var dateFormat = require('dateformat');
        const loud = this.state.loud;
        const date = dateFormat(this.state.date, "dddd, mmmm dS")
        const describe = this.state.describe;
        const feel = this.state.feel;
        const sourcesArray = this.state.sources;
        var sources = "";
        if(sourcesArray){
            for(var i = 0; i <sourcesArray.length; i++ ){
                sources += sourcesArray[i] + ", ";
            }
            sources = sources.substring(0, sources.length-2);
        }
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
        if(sourcesArray){
        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: date, style: { color: '#fff' } }}
                    containerStyle={styles.header}
                    leftComponent={<Button  icon={
                        <Icon
                            name="arrow-left"
                            size={15}
                            color="#323232"
                        />
                    }onPress = {() => this.accountScreen()}
                                            buttonStyle={styles.headerButton}/>}

                />


            <MapView
                style={{ ...StyleSheet.absoluteFillObject }}
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
                    title={date}
                    tracksViewChanges={false}
                />

            </MapView>


                <View style={styles.bottomHalf}>
                    <ScrollView>

                        <Text style={styles.textHeader}>How loud were the sounds?</Text>
                        <Text style={styles.text}>{loud}</Text>
                        <Text style={styles.textHeader}>Which words best describe the sound?</Text>
                        <Text style={styles.text}>{describe}</Text>
                        <Text style={styles.textHeader}>How did the sounds make you feel?</Text>
                        <Text style={styles.text}>{feel}</Text>
                        <Text style={styles.textHeader}>Major sources of noise?</Text>
                        <Text style={styles.text}>{sources}</Text>
                        <Text style={styles.textHeader}>Comments</Text>
                        <Text style={styles.text}>{words}</Text>
                        <Text style={styles.textHeader}>Raw Data:</Text>
                        <Text style={styles.text}>Average : {average}db</Text>
                        <Text style={styles.text}>Min:{min}db - Max:{max}db</Text>




                    </ScrollView>
                </View>

                {/*<View style={styles.buttonPosition}>*/}
                    {/*<Button  icon={*/}
                        {/*<Icon*/}
                            {/*name="user-circle"*/}
                            {/*size={15}*/}
                            {/*color="#323232"*/}
                        {/*/>*/}
                    {/*}onPress = {() => this.accountScreen()}*/}
                             {/*buttonStyle={styles.button}/>*/}
                {/*</View>*/}



            </View>


        )
        } else {
            return null;
        }
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
        justifyContent: 'space-evenly',
        flex : 1

    },
    textHeader: {
        fontSize: 20,
        fontWeight : 'bold',
        color: "white",
        textAlign: 'center'
    },
    text: {
        fontSize: 20,
        color: "white",
        textAlign: 'center'
    },
    buttonPosition : {
        // flexDirection: 'row',
        // marginVertical: 20,
        position: 'absolute',//use absolute position to show button on top of the map
        top: '50%', //for center align
        alignSelf: 'flex-end' //for align to right
        // position: 'absolute',
        // justifyContent: 'flex-start',
        // zIndex : 999,
    },
    button : {
        backgroundColor : '#cccc31',
        width : '30%'
    },
    header : {
        backgroundColor:  '#323232',
        zIndex: 999
    },
    headerButton : {
        backgroundColor : '#cccc31'
    },

});


const brightGreen = "#31BD4B";
const lightGreen = '#31BD4B';
const darkGray = "#383838";

const questionButtonsStyle = {
    borderColor: 'white',
    backgroundColor: "transparent",
    textColor: 'white',
    borderTintColor: lightGreen,
    backgroundTintColor: lightGreen,
    textTintColor: "white"
};

const questionButtonSize ={
    borderRadius: 10,
    height: 40,
    borderColor: 'white',
    backgroundColor: "transparent",
    textColor: 'white',
    borderTintColor: lightGreen,
    backgroundTintColor: lightGreen,
    textTintColor: "white"
};

