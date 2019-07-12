import { Button, Header, Input, Text } from "react-native-elements";
import { Alert, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import ForgotResetPassword from "./ForgotResetPassword"
import axios from "axios";
import * as constants from '../../components/constants';
import SignUp from "./SignUp";

export default class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: '',
            email: '',
            password: '',
            confirmPassword: '',
        }


    }






    checkEmpty() {

        if (this.state.key === '') {
            this.simpleAlert("Recovery key not filled", "Please fill the recovery key sent to your email");
            return false;
        }

        if (this.state.email === '') {
            this.simpleAlert("Email address not filled", "Please fill your email address");
            return false;
        }

        if (this.state.password === '') {
            this.simpleAlert("Password not filled", "Please fill your password");
            return false;
        }
        else {
            if (SignUp.passStrength(this.state.password) !== ''){
                this.simpleAlert('Invalid password.', 'Use at least 3 of capital, lower, numbers, symbol.');
                return false;
            }
        }

        if (this.state.confirmPassword === '') {
            this.simpleAlert("Confirm password not filled", "Please confirm your password",);
            return false;
        }

        return true;
    }


    PassCheck() {
        let result = true;
        if (this.state.password !== this.state.confirmPassword) {
            this.simpleAlert("Passwords don't match", "Passwords are not the same, try again");
            result = false;
        }
        //axios post for complexity
        return result;
    }

    simpleAlert(title = "Error", text = "You have an error") {
        Alert.alert(
            title, text,
            [{ text: 'Ok' }],
            { cancelable: false });
    }


    async submit() {
        const { navigate } = this.props.navigation;
        if (this.checkEmpty()) {

            if (this.PassCheck()) {

                const userCredentials = {
                    key: this.state.key,
                    email: this.state.email,
                    password: this.state.password
                };

                //axios post for reset password
                await axios.post('http://' + constants.IP_ADDRESS + '/api/login/reset', userCredentials)
                  .then(function (ret) {
                    Alert.alert("Password Reset", "Your password has been reset. Please login using your new password");
                    navigate("SignIn");
                }).catch(function (error) {
                    alert("Invalid key or email.  Please try again.");
                    console.log("THE ERROR:");
                    console.log("*********************\n\n\n" + error + "****************\n\n\n");
                });
            }
        }
    }


    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: 30 }}>

                <Input
                    autoCapitalize='none'
                    placeholder='Key'
                    rightIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(key) => this.setState({ key })}
                />
                <Input
                    style={{
                        flex: 1
                    }}
                    autoCapitalize='none'
                    placeholder='Email'
                    rightIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(email) => this.setState({ email })}
                />
                <Input
                    secureTextEntry={true}
                    autoCapitalize='none'
                    placeholder='Password'
                    rightIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(password) => this.setState({ password })}
                />
                <Input
                    secureTextEntry={true}
                    autoCapitalize='none'
                    placeholder='Repeat Password'
                    rightIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                />

                <Button
                    title="Update and Sign In"
                    onPress={() => this.submit()}
                />
            </View>
        )
    }
}

