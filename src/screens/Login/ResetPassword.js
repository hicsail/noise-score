import { Button, Header, Input, Text } from "react-native-elements";
import { Alert, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import ForgotResetPassword from "./ForgotResetPassword"
import axios from "axios";


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
        else if (this.state.email === '') {
            this.simpleAlert("Email address not filled", "Please fill your email address");
            return false;
        }
        else if (this.state.password === '') {
            this.simpleAlert("Password not filled", "Please fill your password");
            return false;
        }
        else if (this.state.confirmPassword === '') {
            this.simpleAlert("Confirm password not filled", "Please confirm your password",);
            return false;
        }

        return true;
    }


    PassCheck() {
        let result = true;
        if (this.state.password !== this.state.confirmPassword) {
            this.simpleAlert("Passwords don't match", "Passwords inputed are not the same, try again");
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

        if (this.checkEmpty()) {
            this.simpleAlert("Simple alert", "This is a simple alert");
            if (this.PassCheck()) {
                alert("all good");
                const userCredentials = {
                    key: this.state.key,
                    email: this.state.email,
                    password: this.state.password
                };
                console.log(this.state);
                //axios post for reset password
                await axios.post('http://10.0.2.2:9000/api/login/reset', userCredentials).then(function (ret) {
                    alert("Hello");
                    this.props.navigation.navigate("SignIn")
                }).catch(function (error) {
                    Alert.alert("error validating user", "Invalid mail or retrieval token");
                    console.log("*********************\n\n\n" + error + "****************\n\n\n")
                });

            }
        }
    }


    render() {
        return (
            <View>

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

