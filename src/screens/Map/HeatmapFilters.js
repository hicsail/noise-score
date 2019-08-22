import React from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Text} from 'react-native-elements';
import ToggleSwitch from "toggle-switch-react-native";
import RNPickerSelect from 'react-native-picker-select';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';


import AsyncStorage from '@react-native-community/async-storage';


import CustomButton from "../../Base/CustomButton";

import {brightGreen, darkGray, width, height} from "../../components/constants"
import * as filters from "./filters"
import Icon from "react-native-vector-icons/FontAwesome";
import {SelectMultipleGroupButton} from "react-native-selectmultiple-button";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default class HeatmapFilters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            noiseType: '',
            location: 'Everything',
        };

        this.inputRefs = {
            firstTextInput: null,
            favSport0: null,
            favSport1: null,
            lastTextInput: null,
            favSport5: null,
        };


    }

    async retrieveItem(key) {
        try {
            const retrievedItem = await AsyncStorage.getItem(key);
            return JSON.parse(retrievedItem);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    componentWillMount() {
        let thisRef = this;
        thisRef.retrieveItem('filters').then(function (filters) {
            console.log(filters);
            if (filters) {
                // let parsedFilters = JSON.parse(filters);
                thisRef.setState({
                    noiseType: filters['noiseType'],
                    location: filters['location']
                }, () => console.log("the state is ", thisRef.state))
            }
        }).then();

        // AsyncStorage.clear();
    }

    async storeItem(key, item) {
        try {
            //we want to wait for the Promise returned by AsyncStorage.setItem()
            //to be resolved to the actual value before returning the value
            return await AsyncStorage.setItem(key, JSON.stringify(item));
        }
        catch (error) {
            console.log(error.message);
        }
    }

    saveFilters() {
        AsyncStorage.setItem("filters", JSON.stringify(this.state));
        this.props.navigation.navigate("normalMap")
    }


    render() {
        const {state} = this.state;
        if (state === null) return null;

        const defIndex = this.state.noiseType === 'feel';
        console.log("the state before render is ", this.state, defIndex);
        return (

            <View style={styles.wrapper}>

                <View style={{
                    position: 'absolute',
                    bottom: 10,
                    left: width / 6,
                    right: width / 6,
                    margin: 0,
                    zIndex: 1000
                }}>
                    <CustomButton style={{width: 2 * width / 3, margin: 0}} text={"Save"}
                                  onPress={() => this.saveFilters()}/>
                </View>
                <KeyboardAwareScrollView ContentContainerStyle={styles.filtersWrapper}>

                    <View style={styles.wrapText}>
                        <Text style={styles.text}> Heatmap filters </Text>
                    </View>

                    {/*<View style={styles.filtersWrapper}>*/}
                    {/*<View style={styles.toggleWrapper}>*/}
                    {/*    <View sytle={{backgroundColor: 'red'}}>*/}
                    {/*        <Text*/}
                    {/*            style={[{*/}

                    {/*                fontSize: width * 0.04,*/}
                    {/*                textAlignVertical: 'center', textAlign: 'center',*/}
                    {/*            }, this.state.noiseType === 'feel' ? {color: 'gray', fontSize: width * 0.04,} : {*/}
                    {/*                color: brightGreen,*/}
                    {/*                fontSize: width * 0.05,*/}

                    {/*            }]}>Decibel Level</Text>*/}
                    {/*    </View>*/}
                    {/*    <View style={{marginHorizontal: 10}}>*/}
                    {/*        <ToggleSwitch*/}

                    {/*            isOn={this.state.noiseType === 'feel'}*/}
                    {/*            onColor={brightGreen}*/}
                    {/*            offColor={brightGreen}*/}
                    {/*            label=""*/}
                    {/*            labelStyle={{color: "black", fontWeight: "900"}}*/}
                    {/*            size="large"*/}
                    {/*            onToggle={() => this.setState({noiseType: this.state.noiseType === 'db' ? 'feel' : 'db'})}/>*/}
                    {/*    </View>*/}
                    {/*    <View style={{}}>*/}
                    {/*        <Text*/}
                    {/*            style={[{*/}
                    {/*                textAlignVertical: 'center', textAlign: 'center',*/}

                    {/*            }, this.state.noiseType === 'feel' ? {*/}
                    {/*                color: brightGreen,*/}
                    {/*                fontSize: width * 0.05,*/}
                    {/*            } : {color: 'gray', fontSize: width * 0.04,}]}>*/}
                    {/*            Noise Perception</Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}


                    {/*<View style={[{*/}
                    {/*    flexDirection: 'row',*/}
                    {/*    justifyContent: 'space-evenly',*/}
                    {/*    backgroundColor: 'whitesmoke',*/}
                    {/*    shadowColor: '#000',*/}
                    {/*    shadowOffset: {width: 0, height: 1},*/}
                    {/*    shadowOpacity: 0.8,*/}
                    {/*    shadowRadius: 1,*/}
                    {/*    padding: 15,*/}
                    {/*    margin: 20,*/}
                    {/*    marginTop: 0,*/}
                    {/*    elevation: 5, borderRadius: 10, alignSelf: 'center',*/}
                    {/*}, {width: '90%'}]}*/}
                    {/*>*/}
                    {/*    <View style={{flexDirection: 'column', alignItems: 'center'}}>*/}
                    {/*        <TouchableOpacity style={[{*/}
                    {/*            width: 0.15 * width, height: width * 0.15, borderRadius: 100,*/}
                    {/*            justifyContent: 'center', alignItems: 'center', backgroundColor: brightGreen,*/}
                    {/*        }, this.state.noiseType === 'feel' ? {backgroundColor: 'gray'} : {}]}*/}
                    {/*        >*/}

                    {/*            <Icon*/}
                    {/*                name="line-chart"*/}
                    {/*                size={0.1 * width}*/}
                    {/*                color='white'*/}
                    {/*            />*/}


                    {/*        </TouchableOpacity>*/}
                    {/*        <Text>Decibel Level</Text>*/}
                    {/*    </View>*/}
                    {/*    <View style={{flexDirection: 'column', alignItems: 'center'}}>*/}
                    {/*        <TouchableOpacity style={[{*/}
                    {/*            width: 0.15 * width,*/}
                    {/*            height: width * 0.15,*/}
                    {/*            borderRadius: 100,*/}
                    {/*            backgroundColor: brightGreen,*/}
                    {/*            justifyContent: 'center',*/}
                    {/*            alignItems: 'center',*/}
                    {/*        }, this.state.noiseType === 'feel' ? {} : {backgroundColor: 'gray'}]}*/}
                    {/*        >*/}

                    {/*            <Icon*/}
                    {/*                name="comments"*/}
                    {/*                size={0.11 * width}*/}
                    {/*                color='white'*/}
                    {/*            />*/}

                    {/*        </TouchableOpacity>*/}
                    {/*        <Text>Noise Perception</Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}


                    <View style={[{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        backgroundColor: 'whitesmoke',
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 1},
                        shadowOpacity: 0.8,
                        shadowRadius: 1,
                        padding: 15,
                        margin: 20,
                        // marginTop: 0,
                        elevation: 5, borderRadius: 10, alignSelf: 'center',
                    }, {width: '90%'}]}>
                        <CustomButton text={"Decibel level"} onPress={() => this.setState({noiseType: 'dbs'})}
                                      customStyle={this.state.noiseType !== 'feel' ? {} : {backgroundColor: 'white'}}
                                      customTextStyle={this.state.noiseType !== 'feel' ? {} : {color: darkGray}}/>
                        <CustomButton text={"Perception level"} onPress={() => this.setState({noiseType: 'feel'})}
                                      customStyle={this.state.noiseType === 'feel' ? {} : {backgroundColor: 'white'}}
                                      customTextStyle={this.state.noiseType === 'feel' ? {} : {color: darkGray}}/>
                    </View>


                    <View style={[{
                        backgroundColor: 'whitesmoke',
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 1},
                        shadowOpacity: 0.8,
                        shadowRadius: 1,
                        elevation: 5, borderRadius: 10, alignSelf: 'center', padding: 15,
                        marginBottom: 20
                    }, {width: '90%'}]}>
                        <Text style={{

                            fontSize: width * 0.04,
                            textAlignVertical: 'center', textAlign: 'center', marginBottom: 5,
                        }}> Where the measurements were taken ? </Text>
                        <RNPickerSelect
                            placeholder={{label: 'All the possible locations', value: 'Everywhere'}}
                            items={filters.location}
                            onValueChange={value => {
                                this.setState({
                                    location: value,
                                });
                            }}
                            style={pickerSelectStyles}
                            value={this.state.location}
                            useNativeAndroidPickerStyle={false}
                            ref={el => {
                                this.inputRefs.location = el;
                            }}
                        />
                    </View>
                    {/*</View>*/}
                </KeyboardAwareScrollView>
            </View>

        )
    }

}


const lightGreen = '#31BD4B';

const fontSize = width * 0.04;

const fontStyle = {fontSize: fontSize, padding: 5};


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

const fontSize2 = width / 15;

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: brightGreen,
        borderRadius: 4,
        color: darkGray,
        backgroundColor: 'white',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        width: undefined,
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: brightGreen,
        borderRadius: 8,
        color: darkGray,
        textAlign: 'center',
        backgroundColor: 'white',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    filtersWrapper: {
        height: '90%'
    },
    toggleWrapper: {
        // width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 2,
        padding: 15,
        justifyContent: 'space-evenly',
        borderColor: brightGreen,
        // height:'90%',
        margin: 20,
        // marginTop: 0,
        backgroundColor: 'whitesmoke',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        borderRadius: 10
    },
    toggleText: {},
    toggleActiveText: {},
    toggleInactiveText: {},


    wrapText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop:10,
    },
    text: {
        fontSize: fontSize2,
        color: "black",
        marginBottom: 10,
        fontWeight: '200',
        textAlign: 'center'
    },
});
