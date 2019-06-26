import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
// import styles from './StartMicrophone'


const stopMicrophone = (props) => (


    <TouchableOpacity style={[styles.button, stopStyle.buttonColor]} onPress={() => props.stopMeasurement()}>

        <IconFA
            name={'pause'}
            size={width / 6}
            // borderRadius={300}
            color='red'
            // backgroundColor='transparent'
        >

        </IconFA>
    </TouchableOpacity>

);
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    button: {
        // flex: 1,
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        height: width / 3,
        width: width / 3,  //The Width must be the same as the height
        borderRadius: 2 * width / 3, //Then Make the Border Radius twice the size of width or Height
        borderWidth: 8,
        borderColor: 'red'

    },
    text: {
        color: 'white',
        fontSize: 30,
        // flex: 1,
    },
});

const stopStyle = StyleSheet.create({
    buttonColor: {
        backgroundColor: 'white',
    }
});

export default stopMicrophone;
