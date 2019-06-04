import React, {Component} from 'react';
import {StyleSheet, View, AsyncStorage, ScrollView, Alert} from 'react-native';
import {home} from "../../../App";
import axios from 'axios';
import {Input, Text, SocialIcon, Button} from 'react-native-elements';

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password1: '',
            email: '',
            city: '',
            state: '',
            zip: ''
        };
    }

    passwordStrenghTest(password) {
        // Function to conduct a basic password check

        var ret = true;
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
        return true;
    }

    async locationValidate(city = "", state = "", zip = '0') {
        // Function to validate teh city, state, and zip of a certain location
        // Makes backend call to verify

        //SK - These 2 variables might not be needed, review with Sarah
        let city1 = city;
        let state1 = state;
        

        let result = false;


        if (this.state.city === '') {
            alert('You need to fill your current city');
            return false;
        }
        else if (this.state.state === '') {
            alert('You need to fill your current state');
            return false;
        }
        else if (this.state.zip === '') {
            alert('You need to fill your current zipcode');
            return false;
        }


        let
            location = {
                city: cit,
                state: stat,
                zip: zp
            };

        console.log(location);

        result = await axios.post('http://10.0.2.2:9000/api/validateZip', location).then(
            function (response) {
                // If we have not prompted a change in city and state we're good to go and return true.
                if (response.data.city === (city1) && response.data.state === (state1))
                    return true;

                //SK - these 2 variables might not be needed as well.
                var city = response.data.city;
                var state = response.data.state;
                alert(
                    'It looks like we had a problem verifying your location' +
                    'Did you mean ' + /*response.data*/city + ", " + /*response.data*/state + "?" +
                    [
                        {text: 'Go back'},

                        {cancelable: false}],
                );
                console.log("huuuh ?");
                return false;
            }
        ).catch(
            function (error) {
                alert("Whoops. Something went wrong validating your location!");
                console.log(error);
                return false;
            }
        );
        console.log(result);
        return result;
    }


    next() {
        // Store relevant information and move to the next screen (SignUp2.js)

        const {navigate} = this.props.navigation;
        const self = this;
        var ret = {
            email: this.state.email,
            username: this.state.username
        };
        // Make an API call to see if the username or email are already in use
        // Also check other values in the form
        axios.post('http://10.0.2.2:9000/api/available', ret).then(async function (response) {
            if (!response.data['username']) {
                alert("Username already in use")
            }
            else if (!response.data['email']) {
                alert("Email already in use")
            }
            else if (self.passwordStrenghTest(self.state.password) == false) {
                alert("Please enter a valid password");
            }
            else if (self.state.password != self.state.password1) {
                alert("Passwords do not match");
            }
            else if (!(await self.locationValidate(self.state.city, self.state.state, self.state.zip))) {
                // Do nothing, locationValidate will handle the alert
                console.log("here");
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

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textHeader}>Sign Up{"\n"}</Text>
                <ScrollView>
                    <Text style={styles.text}>Username</Text>
                    <Input
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(username) => this.setState({username})}
                        placeholder='Username'
                    />
                    <Text style={styles.text}>Password</Text>
                    <Input
                        autoCapitalize='none'
                        secureTextEntry={true}
                        style={styles.textInput}
                        onChangeText={(password) => this.setState({password})}
                        placeholder='Password'
                    />
                    <Input
                        autoCapitalize='none'
                        secureTextEntry={true}
                        style={styles.textInput}
                        onChangeText={(password1) => this.setState({password1})}
                        placeholder='Confirm Password'
                    />
                    <Text style={styles.text}>Email</Text>
                    <Input
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(email) => this.setState({email})}
                        placeholder='example@example.com'
                    />
                    <Text style={styles.text}>City of Residence</Text>
                    <Input
                        style={styles.textInput}
                        shake={true}
                        onChangeText={(city) => this.setState({city})}
                        // ref={input => this.cityInput = input}
                        placeholder='Allston'
                    />
                    <Text style={styles.text}>State of Residence</Text>
                    <Input
                        style={styles.textInput}
                        onChangeText={(state) => this.setState({state})}
                        ref={input => this.stateInput = input}
                        placeholder='MA'
                    />
                    <Text style={styles.text}>Zipcode of Residence</Text>
                    <Input
                        style={styles.textInput}
                        onChangeText={(zip) => this.setState({zip})}
                        placeholder='02134'
                    />
                </ScrollView>
                <Button
                    title="Next"
                    onPress={() => this.next()}
                    buttonStyle={styles.button}
                    backgroundColor={'white'}
                    color={'white'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        width: "100%",
    },
    text: {
        fontSize: 15,
        color: "black",
        textAlignVertical: "center",
        textAlign: "center",
        fontFamily: 'Euphemia UCAS',
        paddingHorizontal: 100
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        alignItems: 'stretch',
        paddingHorizontal: 50,

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

});

