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
                // Verify user with sessions
                var authHeader = response['authHeader'];
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization' : authHeader
                };

                axios.get('http://localhost:9000/api/sessions/my', {headers: header}).then(function (ret){
                    navigate("SignedIn");
                }).catch(function (error){

                });

            }
        });

        this.state = {
            username: 'username',
            password: ''
        };
    }


    // AsyncStorage.getItem('userData').then(function (ret) {
    //     if(ret){
    //         var response = JSON.parse(ret);
    //         var authHeader = response['authHeader'];
    //         const header = {
    //             'Content-Type': 'application/json',
    //             'Authorization' : authHeader
    //         };
    //         axios.get('http://localhost:9000/api/userMeasurements', {headers: header, params:params}).then(function (ret){
    //             self.setState({
    //                 userData : ret['data']
    //             });
    //             // this.generateData(self);
    //         }).catch(function (error){
    //             alert(error);
    //         });
    //     }
    // });

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
