import React from 'react';
import {StyleSheet, View, Image, Alert} from 'react-native';
import {Input, Text} from 'react-native-elements';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import CheckBox from 'react-native-check-box'

import AsyncStorage from '@react-native-community/async-storage';
import * as Keychain from 'react-native-keychain';

import axios from 'axios';

import ForgotResetPassword from "./ForgotResetPassword";
import CustomButton from "../../Base/CustomButton"

import {width, height, IP_ADDRESS, brightGreen} from "../../components/constants";

export default class LoginScreen extends React.Component {

    // ------------ Initialise props and state with required fields ------------
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            checked: '',
        };
    }


    // ------------ Keychain methods for storing, retrieving and resetting user credentials,... ------------
    // ------------ used to implement remember password feature, more secure than AsyncStorage ------------
    save = async (accessControl) => {
        console.log(this.state);

        try {
            if (this.state.checked === 'checked') {
                await Keychain.setGenericPassword(
                    this.state.username,
                    this.state.password,
                );

            } else {
                this.reset().then(function () {
                }).done();
            }
        } catch (err) {
            console.log('Could not save credentials, ' + err);
        }
        // --- Store "Remember password" checked status in async storage ---
        await AsyncStorage.setItem("checkBtn", this.state.checked).then(function () {
        }).done();

    };

    async load() {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                this.setState({...credentials});
            } else {
                console.log('No credentials stored.');
            }
        } catch (err) {
            console.log('Could not load credentials. ' + err);
        }
    }

    async reset() {
        try {
            await Keychain.resetGenericPassword();
            this.setState({
                username: '',
                password: '',
            });
        } catch (err) {
            console.log('Could not reset credentials, ' + err);
        }
    }


    // ------------------------------------------------------------------------

    componentDidMount() {
        // --- Retrieve user credentials from keychain storage ---
        this.load().done();

        // --- Retrieve "Remember password" checked status in async storage ---
        AsyncStorage.getItem('checkBtn', null).then(function (ret) {
            console.log(ret);
            this.setState({checked: (ret === null || ret === '') ? '' : ret})
        }.bind(this))
    }


    // ------------ Log-In method for the app, called when login button is pressed ------------
    submit() {

        //Get user credential from screen's state object
        const userCredentials = {
            username: this.state.username.replace(' ', ''),
            password: this.state.password.replace(' ', '')
        };
        const {navigate} = this.props.navigation;

        // ------ Store username and password in keychain store ------
        // this.save().then(function () {
        //     console.log("success")
        // }).done();

        let thisVar = this;
        // ------ Check credentials and if correct redirect to the home screen, else display error message ------
        axios.post('http://' + IP_ADDRESS + '/api/login', userCredentials)
            .then(function (response) {
                // --- Store User's data in async storage for future use ---
                let ret = response['data'];
                AsyncStorage.setItem("userData", JSON.stringify(ret));


                thisVar.save(userCredentials.username, userCredentials.password).done();
                // --- Navigate to the home screen ---
                navigate("App")
            })
            .catch(function (error) {

                Alert.alert("Invalid Credentials", "Your username or your password are incorrect. Try again.");
            });
    }

    // ------------ Rendering method of the Login Screen ------------
    render() {
        return (

            <KeyboardAwareScrollView ContentContainerStyle={styles.wrapper}>
                <View style={styles.wrapper}>

                    {/* ------ Top main logo ------*/}
                    <View style={styles.imgWrapper}>
                        <Image style={styles.imgStyle}
                               source={require('./../../../assets/splash_logo.jpeg')}
                        />
                    </View>

                    {/* ------ Input fields ------- */}
                    <View style={styles.inputs}>

                        {/* --- Username input box --- */}
                        <Input
                            placeholder='Username'
                            value={this.state.username}
                            rightIcon={{type: 'font-awesome', name: 'user'}}
                            onChangeText={(username) => this.setState({username})}
                        />

                        {/* --- Password input box --- */}
                        <Input
                            secureTextEntry={true}
                            autoCapitalize='none'
                            placeholder='Password'
                            value={this.state.password}
                            rightIcon={{type: 'font-awesome', name: 'lock'}}
                            onChangeText={(password) => this.setState({password})}
                        />

                        <CheckBox
                            style={{paddingHorizontal: 10}}
                            onClick={() => {
                                this.setState({
                                    checked: this.state.checked === 'checked' ? '' : 'checked'
                                })
                            }}
                            isChecked={this.state.checked === 'checked'}
                            leftText={"Remember me  "}
                            leftTextStyle={{textAlign: 'right',}}
                            checkBoxColor={brightGreen}

                        />

                        {/* ---  Sign in button --- */}
                        <CustomButton
                            text="Sign In"
                            onPress={() => this.submit()}
                        />

                        <Text style={styles.centerTextStyle}>
                            - OR -
                        </Text>

                        {/* ---  Sign Up button --- */}
                        <CustomButton
                            text="Sign Up"
                            onPress={() => this.props.navigation.navigate("SignUp1")}
                            customStyle={styles.signUpBtn}
                            customTextStyle={{color: '#31BD4B'}}
                        />

                        {/* --- Forgot password clickable text --- */}
                        <Text
                            style={styles.centerTextStyle}
                            onPress={() => this.props.navigation.navigate("ForgotResetPassword")}
                        >
                            Forgot your password ? Click <Text style={styles.underlined}>here</Text> !
                        </Text>
                    </View>

                    {/* ------ Bottom secondary logo ------*/}
                    <View style={styles.imgWrapper}>
                        <Image style={styles.imgStyle}
                               source={require('./../../../assets/Splash-image-mini3.png')}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}


//------------ Styling for components of login screen ------------
const styles = StyleSheet.create({

    wrapper: {
        flexGrow: 1,
        minHeight: height - 25,
        alignItems: 'stretch',
        alignContent: 'center',
        padding: 30,
        paddingBottom: 0,
        color:'red'
    },

    imgWrapper: {flexGrow: 2,},

    imgStyle: {
        flexGrow: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
    },

    inputs: {
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: 'stretch',
        alignContent: 'center',
    },

    underlined: {textDecorationLine: 'underline'},

    signUpBtn: {backgroundColor: 'white',},

    centerTextStyle: {alignSelf: 'center',},
});
