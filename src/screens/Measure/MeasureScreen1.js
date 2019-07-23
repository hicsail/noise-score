import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SelectMultipleGroupButton } from "react-native-selectmultiple-button";
import NavButtons2 from '../../components/NavButtons2';
import IconFA from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get('window');
export default class MeasureScreen1 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // intensity: '',
            place: '',
            loudness: '',
            oneWord: '',
            feeling: ''
        };
    }


    next() {
        // Move to the next screen (MeasureScreen2.js)
        const { navigate } = this.props.navigation;

        // Need to add information Loud, Describe, Feel, save to local storage before moviing
        if (this.state.loudness === '' || this.state.oneWord === '' || this.state.feeling === '' || this.state.place === '') {
            alert("Please answer every question.");
        } else {
            AsyncStorage.getItem('formData', null).then(function (ret) {
                var response = JSON.parse(ret);
                response["loud"] = this.state.loudness;
                response["describe"] = this.state.oneWord;
                response["feel"] = this.state.feeling;
                response["place"] = this.state.place;
                console.log(response);
                AsyncStorage.setItem("formData", JSON.stringify(response));
            }.bind(this)).then(function () {
                navigate('Measure2');
            }.bind(this));
        }
    }

    render() {
        return (
            <View>
                <ScrollView contentContainerStyle={styles.scrollWrapper}>
                    <View style={styles.wrapper}>

                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}> Where were you at the time of the measurement? {" "} </Text>
                            </View>
                            <SelectMultipleGroupButton
                                multiple={false}
                                group={[
                                    { value: 'Indoors' },
                                    { value: 'Outdoors' },
                                    { value: 'At work' }]}
                                buttonViewStyle={questionButtonSize}
                                highLightStyle={questionButtonsStyle}
                                textStyle={fontStyle}
                                onSelectedValuesChange={value =>
                                    this.setPlace(value)
                                }
                            />
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}>How loud were the sounds? {" "} </Text>
                            </View>
                            <SelectMultipleGroupButton
                                multiple={false}
                                group={[
                                    { value: 'Very quiet' },
                                    { value: 'Quiet' },
                                    { value: 'Moderately Loud' },
                                    { value: 'Loud' },
                                    { value: 'Very Loud' }]}
                                buttonViewStyle={questionButtonSize}
                                highLightStyle={questionButtonsStyle}
                                textStyle={fontStyle}
                                onSelectedValuesChange={value =>
                                    this.setLoudness(value)
                                }
                            />
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}>Which word best describes the sounds? {" "} </Text>
                            </View>
                            <SelectMultipleGroupButton
                                multiple={false}
                                group={[
                                    { value: 'Very pleasant' },
                                    { value: 'Pleasant' },
                                    { value: 'Neutral' },
                                    { value: 'Noisy' },
                                    { value: 'Unbearable' }]}
                                buttonViewStyle={questionButtonSize}
                                highLightStyle={questionButtonsStyle}
                                textStyle={fontStyle}
                                onSelectedValuesChange={value =>
                                    this.setOneWord(value)
                                }
                            />
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}>How did the sounds make you feel? {" "} </Text>
                            </View>
                            <SelectMultipleGroupButton
                                multiple={false}
                                group={[
                                    { value: 'Relaxed' },
                                    { value: 'Tranquil' },
                                    { value: 'Neutral' },
                                    { value: 'Irritated' },
                                    { value: 'Anxious' },
                                    { value: 'Frustrated' },
                                    { value: 'Angry' }]}
                                buttonViewStyle={questionButtonSize}
                                highLightStyle={questionButtonsStyle}
                                textStyle={fontStyle}
                                onSelectedValuesChange={value =>
                                    this.setFeeling(value)
                                }
                            />
                        </View>


                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                alignItems: 'stretch'
                            }}>
                            <TouchableOpacity
                                style={[styles.button, styles.clearButton]}
                                // disabled={this.state.started}
                                onPress={() => this.props.navigation.navigate('Measure')}
                            >

                                <IconFA
                                    name={'arrow-left'}
                                    // size={width / 15}
                                    color="white"
                                    style={{
                                        flex: 1,
                                        alignSelf: 'center',
                                        textAlign: 'left',
                                        fontSize: width / 15,
                                        // backgroundColor:'white'
                                    }}
                                />
                                <View style={{
                                    flex: 1,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        // flex: 3,
                                        // position: 'absolute',
                                        fontSize: width / 15,
                                        // alignSelf: 'stretch',
                                        // textAlign: 'left',
                                        color: 'white',
                                        // backgroundColor:'red'
                                    }}>Clear</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={[styles.button, styles.submitButton]}
                                // disabled={this.state.started}
                                onPress={() => this.next()}
                            >

                                <View style={{
                                    flex: 1,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        // flex: 3,
                                        // position: 'absolute',
                                        fontSize: width / 15,
                                        // alignSelf: 'stretch',
                                        // textAlign: 'left',
                                        color: 'white',
                                        // backgroundColor:'red'
                                    }}>Next</Text></View>

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
            </View>
        );
    }


// Function used to set the state
    setPlace(value) {
        this.setState({
            place: value[0]
        });
    }

    setLoudness(value) {
        this.setState({
            loudness: value[0]
        });
    }

    setOneWord(value) {
        this.setState({
            oneWord: value[0]
        });
    }

    setFeeling(value) {
        this.setState({
            feeling: value[0]
        });
    }

}


const lightGreen = '#31BD4B';
const darkGray = "#383838";

const fontSize = width / 15;

const fontStyle = { fontSize: fontSize, padding: 5 };


const questionButtonsStyle = {
    borderColor: lightGreen,
    backgroundColor: "transparent",
    textColor: darkGray,
    borderTintColor: lightGreen,
    backgroundTintColor: lightGreen,
    textTintColor: "white",
    // padding:20
};

const questionButtonSize = {
    borderRadius: 15,
    height: 'auto',
    borderWidth: 3,
    // padding: 20,
    // margin:10
};


const styles = StyleSheet.create({
    padding: {
        paddingVertical: 10,
    },
    wrapText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },


    wrapper: {
        flexGrow: 1,
        minHeight: height - 25,
        // height: 800,
        alignItems: 'stretch',
        padding: 30,
        alignContent: 'center',
        // backgroundColor: "#e9eeec",
        // minHeight: 600,

    },


    scrollWrapper: {
        // flexGrow: 1,
        // justifyContent: "space-between",
        // height: height - 25,
        // alignItems: 'stretch',
        // // padding: 80,
        // flexWrap: 'wrap',
        // alignContent: 'center'
    },

    text: {
        fontSize: fontSize,
        color: "black",
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    button: {
        flex: 1,
        minHeight: 40,
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
});
