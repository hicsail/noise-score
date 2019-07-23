import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {width} from "../components/constants"


// ------------ Simple button with text ------------
export default class CustomButton extends Component {
    render() {
        const { text, onPress } = this.props;
        return (
            <TouchableOpacity
                style={[styles.buttonStyle, this.props.customStyle]}
                onPress={() => onPress()}
            >
                <Text style={[styles.textStyle, this.props.customTextStyle]}>
                    {text}
                </Text>
            </TouchableOpacity>
        );
    }
}

// ------------ Acceptable props for this custom button ------------
CustomButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    customStyle: PropTypes.object, // Overrides default style
    customTextStyle: PropTypes.object, // Overrides default style
};

// ------------ Default styling, green button with white text ------------
const styles = StyleSheet.create({
    textStyle: {
        fontSize: width/20,
        color: '#ffffff',
        textAlign: 'center'
    },

    buttonStyle: {
        padding: 10,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#31BD4B',
        backgroundColor: '#31BD4B',
    }
});
