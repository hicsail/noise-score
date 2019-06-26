import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Icon from "react-native-elements/src/icons/Icon";

const startMicrophone = (props) => (

    <TouchableOpacity style={[styles.button, startStyle.buttonColor, props.customStyle]} onPress={() => props.startMeasurement()}>

        <IconFA
            name={'circle'}
            size={width /5}
            // borderRadius={300}
            color='#31BD4B'
            backgroundColor='transparent'
        >

            {/*<Text style={styles.text}>Start</Text>*/}
        </IconFA>
    </TouchableOpacity>
);

const { width, height } = Dimensions.get('window');
const brightGreen = "#31BD4B";
const styles = StyleSheet.create({
    button: {
        // flex: 1,
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        height: width / 2,
        width: width / 2,  //The Width must be the same as the height
        borderRadius: width /2, //Then Make the Border Radius twice the size of width or Height
        borderWidth: 8,
        borderColor: '#31BD4B'

    },
    text: {
        color: 'white',
        fontSize: 30,
        // flex: 1,
    },
});

const startStyle = StyleSheet.create({
    buttonColor: {
        backgroundColor: 'white',
    }
});

export default startMicrophone;
