import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';
import ToggleSwitch from "toggle-switch-react-native";
import RNPickerSelect from 'react-native-picker-select';
import CustomButton from "../../Base/CustomButton";

import {width} from "../../components/constants"


export default class HeatmapFilters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            noiseType: 'db',
            location: 'indoors',
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

    componentDidMount() {
        let thisRef = this;
        this.retrieveItem('filters').then(function (filters) {
            console.log(filters);
            // let parsedFilters = JSON.parse(filters);
            thisRef.setState(filters, () => console.log(this.state));

        });
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

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                // backgroundColor: 'lightblue'
            }}>

                <View style={{position: 'absolute', bottom: 10, left: width / 6, right: width / 6}}>
                    <CustomButton style={{width: 2 * width / 3}} text={"Save"} onPress={() => this.saveFilters()}/>
                </View>

                <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'center', margin: 20}}>

                    <Text> Noise Level</Text>
                    <View style={{justifySelf: 'center', marginHorizontal: 20}}>
                        <ToggleSwitch

                            isOn={this.state.noiseType==='feel'}
                            onColor="green"
                            offColor="red"
                            label=""
                            labelStyle={{color: "black", fontWeight: "900"}}
                            size="medium"
                            onToggle={() => this.setState({noiseType: this.state.noiseType === 'db' ? 'feel' : 'db'})}/>
                    </View>
                    <Text>Sound Perception</Text>
                </View>
                <View style={{margin: 20}}>
                    <RNPickerSelect
                        // placeholder={"hi"}
                        items={sports}
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

            </View>
        )
    }

}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'red',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

const sports = [
    {
        label: 'Indoors',
        value: 'indoors',
    },
    {
        label: 'Outdoors',
        value: 'outdoors',
    },
    {
        label: 'At Work',
        value: 'atwork',
    },
];