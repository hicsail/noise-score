import React from 'react';
import {StyleSheet, View, Image, Alert} from 'react-native';
import {Input, Text} from 'react-native-elements';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import CheckBox from 'react-native-check-box'

import AsyncStorage from '@react-native-community/async-storage';
import * as Keychain from 'react-native-keychain';

import axios from 'axios';

import CustomButton from "../../Base/CustomButton"

import {width, height, IP_ADDRESS, brightGreen} from "../../components/constants";
import ToggleSwitch from "toggle-switch-react-native";


const filters = {
    dbs: 0,
    perception: 1,

    indoors: 0,
    outdoors: 1,
    atWork: 2,


};

export default class HeatmapFilters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            noiseType: true,
            location: filters['indoors'],

        }
    }

    render() {
        var data = [["C", "Java", "JavaScript", "PHP"]];
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                // backgroundColor: 'lightblue'
            }}>
                <View style={{flexDirection: 'row', alignContent: 'center'}}>

                    <Text> Noise Level</Text>
                    <View style={{justifySelf:'center'}}>
                        <ToggleSwitch

                            isOn={this.state.noiseType}
                            onColor="green"
                            offColor="red"
                            label=""
                            labelStyle={{color: "black", fontWeight: "900"}}
                            size="medium"
                            onToggle={() => this.setState({noiseType: !this.state.noiseType})}/>
                    </View>
                    <Text>Sound Perception</Text>
                </View>
            </View>

        )
    }

}