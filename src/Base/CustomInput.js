import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView, Alert, TextInput, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
// import { home } from "../../../App";
// import axios from 'axios';
import { Input, Text, SocialIcon, Button } from 'react-native-elements';

const { width, height } = Dimensions.get('window');


export default class CustomInput extends Component {

    static propTypes = {
        placeholder: PropTypes.any,
        placeholderStyle: PropTypes.any,

        controlFunc: PropTypes.func,

        name: PropTypes.string,
        label: PropTypes.string,
        content: PropTypes.string,
        isPassword: PropTypes.bool,
        isEmail: PropTypes.bool,
        value: PropTypes.string,
        errorMessage: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isError: false,
            field: '\t',
            errorMessage: null,
        }
    }

    isValid() {
        return (this.props.errorMessage === '' || this.props.errorMessage === undefined);
    }

    async getMessage() {
        console.log("in here");
        if (this.isValid()) {
            console.log("in here");
            return "Field is required";
        }
        return "";
    }


    emptyCheck() {
        return (this.state.field === '\t' || this.state.field !== '')
    }

    getValue() {
        return this.state.field;
    }

    events() {
        this.props.controlFunc();
        this.setState({ username: username })
    }


    render() {

        return (

            <View style={styles.inputWrapper}>

                {/*If label was specified add the component to the input block*/}
                {this.props.label ?
                    <Text style={styles.text}>
                        {this.props.label}
                    </Text>
                    : null
                }

                {/*Initialize input box with a default style and add the error style when the input is left empty*/}
                <View style={[styles.inputBox, this.isValid() ? null : styles.errorInputBox]}>
                    <TextInput
                        style={[styles.text, styles.placeholderText]}
                        placeholder={this.props.placeholder}
                        placeholderStyle={styles.placeholderText}
                        // placeholderTextColor={this.emptyCheck() ? 'gray' : 'red'}
                        secureTextEntry={this.props.isPassword}
                        underlineColorAndroid='rgba(0,0,0,0)'

                        onChangeText={(field) => {
                            this.props.controlFunc(field);
                            this.setState({ field: field })
                        }}

                    />
                </View>

                <Text
                    style={this.isValid() ? {
                        display: "none"
                    } : [{ color: "red" }, styles.placeholderText]}>
                    {this.props.errorMessage}
                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    inputWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        // minHeight: 60,
        // height: 80,
        // paddingHorizontal: 40,
        marginVertical: 5,
    },

    text: {
        fontSize: width / 20,
        color: "black",
        textAlignVertical: "center",
        fontFamily: 'Euphemia UCAS',
        textAlign: 'center'
    },

    placeholderText: {
        textAlign: 'left',
        paddingLeft: 25,
    },

    inputBox: {
        borderColor: '#31BD4B',
        // borderWidth: 1,
        borderRadius: 30,
        borderBottomWidth: 3,
        // borderWidth: 3,
        alignItems: 'stretch',
    },

    errorInputBox: {
        borderColor: 'red',
    },

});

