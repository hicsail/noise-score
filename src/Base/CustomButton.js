import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

class customButton extends Component {
    render() {
        const { text, onPress } = this.props;
        return (
            <TouchableOpacity style={[styles.buttonStyle, this.props.customStyle]}
                              onPress={() => onPress()}
            >
                <Text style={[styles.textStyle, this.props.customTextStyle]}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

customButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    customStyle: PropTypes.object,
    customTextStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'center'
    },

    buttonStyle: {
        // flex:1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#31BD4B',//'#215441',
    }
});

export default customButton;