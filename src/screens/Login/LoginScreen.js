import React, { Component }  from 'react';
import {StyleSheet, Text, View, Button, TextInput, AsyncStorage} from 'react-native';
import { home } from "../../../App";
import axios from 'axios';



export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        const {navigate} = this.props.navigation;
        AsyncStorage.getItem("userData").then(function (ret) {
            // TODO: Change this so it makes an API call
            var response = JSON.parse(ret);
            if(response['authHeader']!= null){
                    navigate("SignedIn");
            }
        });

        // TODO: Change this
        this.state = {
            username: 'username',
            password: ''};
    }

    submit(){
        const requestBody = {
                username: this.state.username,
                password: this.state.password
        };
        const {navigate} = this.props.navigation;
        axios.post('http://localhost:9000/api/login', requestBody)
            .then(function (response) {
                // Store the userData:
                var ret = response['data'];
                AsyncStorage.setItem("userData", JSON.stringify(ret));
                navigate("SignedIn")
            })
            .catch(function (error) {
                console.log(error);
                alert("Invalid Username or Password");
            });

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
                <Text>Username:</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                />
                <Text>Password:</Text>
                <TextInput
                    secureTextEntry={true}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                />
                <Button
                    buttonStyle={{ marginTop: 20 }}
                    backgroundColor="transparent"
                    textStyle={{ color: "#bcbec1" }}
                    title="Sign In"
                    onPress={() => this.submit()}
                />

                <Button
                    buttonStyle={{ marginTop: 20 }}
                    backgroundColor="transparent"
                    textStyle={{ color: "#bcbec1" }}
                    title="Sign Up"
                    onPress={() => this.props.navigation.navigate("SignUp1")}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
