import React from 'react';
import { StyleSheet, View, ScrollView, AsyncStorage, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { home } from "../../../App";
import axios from 'axios';
import { Input, Text, Button, Header } from 'react-native-elements';
import { withNavigation } from "react-navigation";


class ForgotResetPassword extends React.Component {

    static navigationOptions = {
        title: 'ForgotResetPassword',
    };


    constructor(props) {
        // Check if we already are logged in (navigate to MapScreen.js)
        // Otherwise do nothing
        super(props);
        const { navigate } = this.props.navigation;
        this.state = {
            key: '',
            email: '',
            password: '',
            confirmPassword: '',
            providedMail: false
        }
    }

    componentDidMount() {

    }


    forgotPassword() {

        const data = {
            email: this.state.email
        };
        Alert.alert(
            "hih", "jfojfs"
        );
        axios.post('http://10.0.2.2:9000/api/login/forgot', data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                // console.log(error)
            });
    }

    async submit() {

        if (this.checkEmpty()) {
            this.simpleAlert("Simple alert", "This is a simple alert");
            if (this.PassCheck()) {
                alert("all good");
                const payload = {
                    key: this.state.key,
                    email: this.state.email,
                    password: this.state.password
                };
                console.log(this.state);
                //axios post for reset password
                await axios.post('http://10.0.2.2:9000/api/login/reset', payload).then(function (ret) {
                    alert("Hello");
                }).catch(function (error) {
                    console.log("error validating user", error);
                })
            }

        }
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

    render() {
        return (

            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
                alignSelf: 'stretch',
                textAlign: 'center'
            }}>
                {this.state.providedMail ?

                    <View>

                        <Header
                            // centerComponent={{text: username, style: {color: '#323232'}}}
                            // containerStyle={styles.header}
                            leftComponent={<Button icon={
                                <Icon
                                    name="arrow-left"
                                    size={15}
                                    color="white"
                                />
                            } onPress={() => this.setState({ providedMail: false })}/>}


                        />
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
                    :
                    <View>
                        <Input
                            autoCapitalize='none'
                            placeholder='Email'
                            rightIcon={{ type: 'font-awesome', name: 'envelope' }}
                            onChangeText={(email) => {
                                this.setState({ email });
                            }}
                        />
                        <Button
                            title="Update and Sign In"
                            onPress={() => {
                                this.setState({ providedMail: true });
                                this.forgotPassword();
                            }}

                        />
                        <Text>Already have a key, click here</Text>
                        <Button
                            title="Reset your password"
                            onPress={() => this.setState({ providedMail: true })}
                        />
                    </View>
                }
            </View>
        )
    }

}

export default withNavigation(ForgotResetPassword);
