import React from 'react';
import {
    Platform,
    PermissionsAndroid,
    ScrollView,
    StyleSheet,
    View,  Dimensions, TouchableOpacity
} from 'react-native';
import RNSoundLevelModule from 'react-native-sound-level';
import Table from '../../components/Table';
import ListItem from '../../components/ListItem';
import DecibelChart from '../../components/DecibelChart';
import ClearSubmitButtons from '../../components/ClearSubmitButtons';
import StartMicrophone from '../../components/StartMicrophone';
import StopMicrophone from '../../components/StopMicrophone';
import ReferenceDecibels from '../../components/ReferenceDecibels';
import AsyncStorage from '@react-native-community/async-storage';
import Text from "react-native-elements/src/text/Text";
import { Header } from 'react-navigation';
import IconFA from "react-native-vector-icons/FontAwesome";


const { width, height } = Dimensions.get('window');
const buttonHeight = height/15;
console.log("buttonHeight is ", buttonHeight);
export default class MeasureScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            decibels: [],
            started: false,
            stopped: false,
            initial: true
        };
    }

    //
    // static navigationOptions = {
    //     title: 'Measure Sounds',
    //     headerStyle: {
    //         backgroundColor: "#31BD4B"
    //     },
    //     headerTintColor: 'white'
    // };

    async requestAudioPermissionAndroid() {
        if (Platform.OS === 'ios') {
            return true;
        }
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                'title': 'Noise Score App Audio Permission',
                'message': 'Noise Score App needs access to your microphone ' +
                    'to record decibel levels.'
            }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }


    swapView = () => {
        this.setState({ initial: false });
    };

    startMeasurement = () => {

        this.requestAudioPermissionAndroid()
            .then((didGetPermission) => {
                if (didGetPermission) {
                    RNSoundLevelModule.start();
                    RNSoundLevelModule.onNewFrame = (d) => {
                        let num = (parseInt(d.value));
                        console.log("the value is : ", d.value);
                        console.log("the raw data is: ", d.rawData);

                        let dec;
                        if (d.value < -160) {
                            dec = 0;
                        }
                        else {
                            dec = this.state.decibels.concat(((parseInt(d.value) + 160) * (90/160)));
                        }

                        this.setState({
                            decibels: dec,
                            started: true,
                            stopped: false,
                            initial: false,
                        });
                    }
                }
            });
    };


    stopMeasurement = () => {
        this.setState({
            started: false,
            stopped: true
        });
        RNSoundLevelModule.stop();
    };

    clearData = () => {
        this.setState({
            decibels: [],
            started: false,
            stopped: false,
            initial: true
        });
    };

    median(values) {
        // Helper function to calculate median
        // Taken from -> https://stackoverflow.com/questions/45309447/calculating-median-javascript
        if (values.length === 0) return 0;

        values.sort(function (a, b) {
            return a - b;
        });

        var half = Math.floor(values.length / 2);

        if (values.length % 2)
            return values[half];

        return (values[half - 1] + values[half]) / 2.0;
    }

    submit = () => {
        // We need to gather the data
        var data = [Math.min(...this.state.decibels).toFixed(2),
            Math.max(...this.state.decibels).toFixed(2),
            this.aveDecibel().toFixed(2),
            this.median(this.state.decibels).toFixed(2)];
        var form = {
            'rawData': data
        };
        AsyncStorage.setItem("formData", JSON.stringify(form));
        this.props.navigation.navigate('Measure1');
    };

    aveDecibel = () => {
        let total = 0;
        for (let i = 0; i < this.state.decibels.length; i++) {
            total += this.state.decibels[i];
        }
        return total / this.state.decibels.length;
    };

    render() {
        const decibelsOutput = this.state.decibels.map((decibel, i) => (
            <ListItem key={i} decibel={decibel}/>
        ));


        return (
            <View style={{ height: '100%', width: '100%' }}>


                {this.state.initial ?
                    <ScrollView contentContainerStyle={styles.scrollWrapper}>
                        <View style={styles.wrapper}>
                            <View style={{
                                flex: 1, backgroundColor: 'white', justifyContent: 'center',
                                alignItems: 'stretch',
                            }}>


                                <Text
                                    style={{
                                        fontSize: width / 15,
                                        textAlign: 'center',
                                        textShadowRadius: 5,
                                        fontWeight: 'bold',
                                        textShadowColor: '#31BD4B',
                                    }}>
                                    Press the button to begin your sound measurement
                                </Text>
                            </View>
                            <View style={{
                                flex: 2, backgroundColor: 'white', justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <StartMicrophone startMeasurement={this.startMeasurement}/>
                            </View>
                            <View style={{
                                flex: 1,
                                backgroundColor: 'white',
                                justifyContent: 'flex-start',
                                alignItems: 'center',

                                // marginHorizontal: '25%'
                                // paddingHorizontal: width / 3
                            }}>
                                <Text style={{}}>
                                    <Text adjustFontSizeToFit
                                          style={{
                                              fontSize: 30,
                                              textShadowRadius: 2,
                                              textShadowColor: '#0f3916',
                                              color: '#144c1e',
                                          }}
                                    >
                                        1. Measure {'\n'}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 30,
                                            textShadowRadius: 2,
                                            textShadowColor: '#0f3916',
                                            color: '#144c1e',
                                        }}>
                                        2. Comment {'\n'}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 30,
                                            textShadowRadius: 2,
                                            textShadowColor: '#0f3916',
                                            color: '#144c1e',
                                        }}
                                    >
                                        3. Submit
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                    :

                    <ScrollView contentContainerStyle={styles.scrollWrapper}>
                        <View style={styles.wrapper}>


                            <View>
                                <Text style={{
                                    fontSize: width / 10,
                                    textAlign: 'center'
                                }}> {this.state.started ? "Recording..." : "Stopped"}</Text>
                            </View>
                            <View>
                                <DecibelChart decibels={this.state.decibels}/>
                            </View>
                            {/*{this.state.decibels.length > 0 ? */}
                            <View style={styles.tablePadding}>
                                <Table
                                    title={'Decibels Measured'}
                                    data={[
                                        ['min', Math.min(...this.state.decibels).toFixed(2)],
                                        ['max', Math.max(...this.state.decibels).toFixed(2)],
                                        ['ave', this.aveDecibel().toFixed(2)]]}/>

                                {/*<ReferenceDecibels/>*/}

                            </View>
                            {/*: null}*/}


                            {/*{this.state.started || this.state.stopped ?*/}
                            {/*<ClearSubmitButtons*/}
                            {/*disabled={!this.state.stopped}*/}
                            {/*clear={this.clearData}*/}
                            {/*submit={this.submit}*/}
                            {/*/> : null}*/}


                            {/*Buttons !*/}
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'stretch',
                                    maxHeight: 80,
                                }}>
                                <TouchableOpacity
                                    style={[styles.button, this.state.started ? styles.disabledButton : styles.clearButton]}
                                    disabled={this.state.started}
                                    onPress={() => this.clearData()}
                                >

                                    <IconFA
                                        name={'trash'}
                                        // size={width / 15}
                                        color="white"
                                        style={{
                                            flex: 1,
                                            alignSelf: 'center',
                                            textAlign: 'left',
                                            fontSize: width / 15
                                        }}
                                    />

                                    <Text style={{
                                        fontSize: width / 16,
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                        color: 'white'
                                    }}>Clear</Text>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    style={
                                        this.state.started ?
                                            [styles.button, styles.measureButton, { flexDirection: 'column' }]
                                            :
                                            [styles.button, styles.measureButton, styles.disabledButton, { flexDirection: 'column' }]
                                    }
                                    onPress={() => {
                                        this.state.started ? this.stopMeasurement() : this.startMeasurement()
                                    }}
                                    disabled={!this.state.started}
                                >
                                    {/*<StartMicrophone/>*/}
                                    <IconFA
                                        name={this.state.started ? 'square' : 'square'}
                                        size={width / 15}
                                        style={{
                                            flex: 1,
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            paddingTop: 5,
                                        }}
                                    />
                                    <Text style={{
                                        fontSize: width / 15,
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                        justifyContent: 'flex-end',
                                        color: 'white'
                                    }}>{this.state.started ? 'Stop' : 'Stop'}</Text>

                                </TouchableOpacity>


                                <TouchableOpacity
                                    style={[styles.button, this.state.started ? styles.disabledButton : styles.submitButton]}
                                    disabled={this.state.started}
                                    onPress={() => this.submit()}
                                >

                                    <Text style={{
                                        fontSize: width / 15,
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                        color: 'white'
                                    }}>Next</Text>

                                    <IconFA
                                        name={'arrow-right'}
                                        size={width / 15}
                                        color="white"
                                        style={{ flex: 1, alignSelf: 'center', textAlign: 'right' }}
                                    />

                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                }

            </View>
        );
    }
}

// example decibel source: http://chchearing.org/noise/common-environmental-noise-levels

const styles = StyleSheet.create({
    tablePadding: {
        paddingBottom: 45
    },

    scrollWrapper: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },

    wrapper: {
        flexGrow: 1,
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        padding: 30,

    },

    button: {
        flex: 1,
        //minHeight: 40,
        minHeight: buttonHeight,
        flexDirection: 'row',
        // justifyContent: 'center',

        alignSelf: 'stretch',
        // borderWidth: 2,
        borderRadius: 10,

        // borderColor: '#31BD4B',

        margin: 5,
        padding: 10,
    },

    submitButton: {
        backgroundColor: '#31BD4B',
        borderColor: '#31BD4B'
    },

    clearButton: {
        backgroundColor: '#4E5255',
        borderColor: '#4E5255'
    },

    disabledButton: {
        backgroundColor: '#B7BBBD',
        borderColor: '#B7BBBD'
    },

    measureButton: {
        // flex: 1,
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        // height: width / 2,
        // width: width / 2,  //The Width must be the same as the height
        // borderRadius: width / 2, //Then Make the Border Radius twice the size of width or Height
        borderWidth: 0,
        backgroundColor: 'orange'

    },
});


