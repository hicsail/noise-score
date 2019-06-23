import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert, TextInput } from 'react-native';
import PropTypes from 'prop-types';
// import { home } from "../../../App";
// import axios from 'axios';
import { Input, Text, SocialIcon, Button } from 'react-native-elements';
// import AsyncStorage from '@react-native-community/async-storage';

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
        let result = this.emptyCheck();
        let message = null;
        if (result) {
            if (this.props.password) {

            }
            else if (this.props.isEmail) {

            }
        }
        else {
            // this.setState({ isError: true })
        }

        return result;
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
                        style={styles.text}
                        placeholder={this.props.placeholder}
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
                        color: "black",
                        display: "none"
                    } : { color: "red" }}>
                    {/*{this.getMessage().message}*/}
                    {this.props.name} is required
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
        paddingHorizontal: 40,
        marginVertical: 5
    },

    text: {
        fontSize: 15,
        color: "black",
        textAlignVertical: "center",
        fontFamily: 'Euphemia UCAS',
    },

    inputBox: {
        // height: 40,
        // minHeight: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        alignItems: 'stretch',
    },

    errorInputBox: {
        borderColor: 'red',
    },

});

