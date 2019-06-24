import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert, TextInput, Dimensions } from 'react-native';
import { home } from "../../../App";
import axios from 'axios';
import { Input, Text, SocialIcon, Button } from 'react-native-elements';
import t from 'tcomb-form-native';
import CustomInput from '../../Base/CustomInput'
// import { styles } from "./LoginScreen";
import AsyncStorage from '@react-native-community/async-storage';
import * as constants from '../../components/constants';

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '\t',
            password: '\t',
            confirmPass: '\t',
            email: '\t',
            city: '\t',
            state: '\t',
            zip: '\t',

            usernameFilled: true,
        };

        // this.state.username = this.state.username.bind(this);
        this.UsernameHandle = this.UsernameHandle.bind(this);
        this.PasswordHandle = this.PasswordHandle.bind(this);
        this.ConfirmHandle = this.ConfirmHandle.bind(this);
    }


    UsernameHandle(e) {
        this.setState({ username: e });
    }

    PasswordHandle(e) {
        console.log(e);
        this.setState({ password: e });
    }

    ConfirmHandle(e) {
        this.setState({ confirmPass: e })
    }

    passwordStrenghTest(password) {
        // Function to conduct a basic password check

        var ret = true;


        let ctr = 0;
        if (password.length < 8) {
            let matchedCase = [];
            matchedCase.push("[$@$!%*#?&]"); // Special Charector
            matchedCase.push("[A-Z]");      // Uppercase Alpabates
            matchedCase.push("[0-9]");      // Numbers
            matchedCase.push("[a-z]");     // Lowercase Alphabates

            // Check the conditions

            for (let i = 0; i < matchedCase.length; i++) {
                if (new RegExp(matchedCase[i]).test(password)) {
                    ctr++;
                }
            }
        }
        else {
            return false;
        }

        switch (ctr) {
            case 0:
            case 1:
            case 2:
                console.log("Very Weak");
                break;
            case 3:
                console.log("Medium");
                break;
            case 4:
                console.log("Strong");
                break;
        }

        if (password.length < 8) {
            console.log(password.length < 8);
            ret = false;
        } else {
            var numbers = false;
            var capital = false;
            for (var i = 0; i < password.length; i++) {
                if (password.indexOf(i) !== -1) {
                    numbers = true;
                }
                if (password.charAt(i) == password.charAt(i).toUpperCase()) {
                    capital = true;
                }
            }

            ret = (capital && numbers);
        }
        return ret;
    }

    async locationValidate(city = "", state = "", zip = '0') {
        // Function to validate teh city, state, and zip of a certain location
        // Makes backend call to verify

        //Check if user provided all the inputs, return appropriate error/tip message
        if (this.state.city === '' || this.state.city === '\t') {
            alert('You need to fill your current city');
            return false;
        }
        else if (this.state.state === '' || this.state.state === '\t') {
            alert('You need to fill your current state');
            return false;
        }
        else if (this.state.zip === '' || this.state.zip === '\t') {
            alert('You need to fill your current zipcode');
            return false;
        }


        let location = {
            city: city,
            state: state,
            zip: zip
        };

        // ------------ Final check for validity of location provided, call on the backend, return result of post ------------

        return await axios.post('http://' + constants.IP_ADDRESS + '/api/validateZip', location).then(
            function (response) {
                // If we have not prompted a change in city and state we're good to go and return true.
                if (response.data.city === (city) && response.data.state === (state))
                    return true;

                Alert.alert(
                    //Alert title
                    'Validation Error\n',
                    //Alert message
                    'Your Zipcode does not match your City and State\n' +
                    'Did you mean ' + response.data.city + ", " + response.data.state + "?\n",
                    [{ text: 'Ok' }],
                    { cancelable: false },
                );
                return false;
            }
        ).catch(
            function (error) {
                alert("Whoops. Something went wrong validating your location!");
                console.log(error);
                return false;
            }
        );
    }

    next() {
        // Store relevant information and move to the next screen (SignUp2.js)

        const { navigate } = this.props.navigation;
        const self = this;
        var ret = {
            email: this.state.email,
            username: this.state.username
        };
        // Make an API call to see if the username or email are already in use
        // Also check other values in the form

        axios.post('http://' + constants.IP_ADDRESS + '/api/available', ret).then(async function (response) {
            if (!response.data['username']) {
                alert("Username already in use")
            }
            else if (!response.data['email']) {
                alert("Email already in use")
            }
            else if (!self.passwordStrenghTest(self.state.password)) {
                alert("Please enter a valid password");
            }
            else if (self.state.password !== self.state.password1) {
                alert("Passwords do not match");
            }
            else if (!(await self.locationValidate(self.state.city, self.state.state, self.state.zip))) {
            }
            else {
                // If all test pass, prepare the signUpData and move to the next screen
                var signUpData = {
                    'username': self.state.username,
                    'password': self.state.password,
                    'email': self.state.email,
                    'location': [self.state.city, self.state.state, self.state.zip]
                };
                AsyncStorage.setItem("formData", JSON.stringify(signUpData)).then(function () {
                    navigate('SignUp2');
                });
            }
        }).catch(function (error) {
            alert("Whoops. Something went wrong. Error: " + error);
        });
    }


    // async manipulateChildState() {
    //     console.log("hi");
    //     let child = this.refs.childRef.getValue();
    //     console.log(child);
    //     // do something here
    // }

    componentDidMount() {

    }

    render() {

        return (
            <ScrollView contentContainerStyle={styles.scrollWrapper}>


                <View style={styles.wrapper}>

                    <Text
                        style={styles.textHeader}> Sign
                        Up
                    </Text>

                    {/*Username input */}
                    <CustomInput
                        placeholder={'Choose your username'}
                        name={'Username'}
                        content={this.state.username}
                        controlFunc={this.UsernameHandle}
                    />

                    {/*Password input */}
                    <CustomInput
                        label={'Password'}
                        placeholder={'Choose your password'}
                        name={'Password'}
                        isPassword={true}
                        content={this.state.password}
                        controlFunc={this.PasswordHandle}
                    />

                    {/*Confirm password input */}
                    <CustomInput
                        label={'Confirm Password'}
                        placeholder={'Re-enter your password'}
                        name={'Confirm Password'}
                        isPassword={true}
                        content={this.state.confirm}
                        controlFunc={this.ConfirmHandle}
                    />

                    <Input
                        autoCapitalize='none'
                        secureTextEntry={true}
                        // style={styles.textInput}
                        onChangeText={(password1) => this.setState({ password1 })}
                        placeholder='Confirm Password'
                    />
                    {/*<Text style={styles.text}>Email</Text>*/}
                    <Input
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(email) => this.setState({ email })}
                        placeholder='example@example.com'
                    />
                    {/*<Text style={styles.text}>City of Residence</Text>*/}
                    <Input
                        style={styles.textInput}
                        shake={true}
                        onChangeText={(city) => this.setState({ city })}
                        // ref={input => this.cityInput = input}
                        placeholder='Allston'
                    />
                    {/*<Text style={styles.text}>State of Residence</Text>*/}
                    <Input
                        style={styles.textInput}
                        onChangeText={(state) => this.setState({ state })}
                        ref={input => this.stateInput = input}
                        placeholder='MA'
                    />
                    {/*<Text style={styles.text}>Zipcode of Residence</Text>*/}
                    <Input
                        style={styles.textInput}
                        onChangeText={(zip) => this.setState({ zip })}
                        placeholder='02134'
                    />


                    <Button
                        title="Next"
                        onPress={() => this.next()}
                        buttonStyle={styles.button}
                        backgroundColor={'white'}
                        color={'white'}
                    />
                </View>
            </ScrollView>
        );
    }

}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'stretch',
        // width: "90%",
        paddingLeft: width / 10,
        paddingRight: width / 10,
        height: height,
    },
    text: {
        fontSize: 20,
        color: "black",
        textAlignVertical: "center",
        textAlign: "center",
        fontFamily: 'Euphemia UCAS',
        paddingHorizontal: 100
    },
    textInput: {
        // flex: 1,
        fontSize: 15,
        color: "black",
        // textAlignVertical: "center",
        // textAlign: "center",
        fontFamily: 'Euphemia UCAS',
        // paddingHorizontal: 80,
        backgroundColor: 'white',
        // width: "100%",
        height: 40,
        // borderColor: 'gray',
        // borderBottomWidth: 1,
        // alignItems: 'stretch',
        // paddingHorizontal: 25,

    },

    errorText: {},

    errorInput: {
        height: 40,
        borderColor: 'red',
        borderBottomWidth: 1,
        alignItems: 'stretch',
        // paddingHorizontal: 25,
    },
    content: {
        marginTop: "10%",
        textAlign: 'center'
    },
    header: {
        fontFamily: 'Euphemia UCAS',
        fontSize: 20,
        color: '#323232'
    },
    button: {
        marginBottom: 30,
        marginTop: 20,
        backgroundColor: '#323232',
        alignItems: 'center'
    },
    textHeader: {
        fontSize: 26,
        marginTop: "10%",
        color: "black",
        justifyContent: 'center',
        textAlignVertical: "center",
        textAlign: "center"
    },
    buttonWrapper: {
        marginBottom: 30,
        width: "70%",
        backgroundColor: '#323232',
    },


    wrapper: {
        flexGrow: 1,
        minHeight: height - 25,
        // height: 800,
        alignItems: 'stretch',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30,
        alignContent: 'center',
        // backgroundColor: "#e9eeec",
        // minHeight: 600,

    },

    imgWrapper: {
        flexGrow: 3,
        // alignItems: 'stretch',
        // alignContent: 'center',
        // position: 'absolute',
        // top: 0,
    },

    scrollWrapper: {
        flexGrow: 1,
        // height:4000,
        // justifyContent: "space-between",
        // minHeight: height - 25,
        // alignItems: 'stretch',
        // // padding: 80,
        // flexWrap: 'wrap',
        // alignContent: 'center'
    },

    imgStyle: {
        flexGrow: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined

        // top: 0,
        // left: 0,
    },

    inputs: {
        flexGrow: 2,
        justifyContent: "space-between",
        alignItems: 'stretch',
        // padding: 80,
        // flexWrap: 'wrap',
        alignContent: 'center',
    },
});
