import React, { Component }  from 'react';
import {StyleSheet, Text, View, Button, TextInput, AsyncStorage} from 'react-native';
import { home } from "../../../App";
import axios from 'axios';


export default class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'username',
            password: 'password',
            name: 'name',
            email: 'example@example.com',
            city: 'city',
            state: 'state',
            zip: 'zipcode'
        };
    }
validateEmail(email) {
    if(email == "example@example.com"){

        return false;
    } else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

passwordStrenghTest(password){
        var ret = true;
        if(password.length < 8 ){
            console.log(password.length < 8 );
            ret = false;
        } else {
        var numbers = false;
        var capital = false;
        for (var i = 0; i < password.length; i++ ){
            if(password.indexOf(i) !== -1){
                numbers = true;
            }
            if (password.charAt(i) == password.charAt(i).toUpperCase()){
                capital = true;
            }
        }

        ret = ( capital && numbers);
        }
        return ret;
}


    next(){

        const {navigate} = this.props.navigation;
        if(this.state.username === "username"){
            alert("Please enter a valid username")
        } else if (this.state.password == "password"){
            // TODO: We need to do a password strength test
            alert("Please enter a valid password")
        } else if (this.passwordStrenghTest(this.state.password) == false) {
            alert("Please enter a valid password")
        } else if(this.validateEmail(this.state.email) == false) {
            alert("Please enter a valid email");
        } else if(this.state.name === "name") {
            alert("Please enter a valid name");
            // TODO: Change this do that we verify the city, state, and zip code.
        } else if (this.state.city == "city"){
            alert("Please enter a valid city");
        } else if (this.state.state == "state") {
            alert("Please enter a valid state");
        } else if (this.state.zip == "zipcode") {
            alert("Please enter a valid zipCode");
        } else {
        var signUpData = {
            'username': this.state.username,
            'password': this.state.password,
            'email': this.state.email,
            'name': this.state.name,
            'location': [this.state.city, this.state.state, this.state.zip]
        };
        AsyncStorage.setItem("formData", JSON.stringify(signUpData)).then(function(){
            navigate('SignUp2');
        });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Sign Up!</Text>

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
                <Text>Email:</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                />
                <Text>Name:</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                />
                <Text>City:</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(city) => this.setState({city})}
                    value={this.state.city}
                />
                <Text>State:</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(state) => this.setState({state})}
                    value={this.state.state}
                />
                <Text>Zipcode:</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(zip) => this.setState({zip})}
                    value={this.state.zip}
                />

                <Button
                    buttonStyle={{ marginTop: 20 }}
                    backgroundColor="transparent"
                    textStyle={{ color: "#bcbec1" }}
                    title="Next"
                    onPress={() => this.next()}
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
        justifyContent: 'center',
    },
    text: {
        fontSize: 26,
        color: "black",
        justifyContent: 'center',
        textAlignVertical: "center",
        textAlign: "center"
    }
});

