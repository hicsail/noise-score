import React, { Component }  from 'react';
import {StyleSheet, View, TextInput, AsyncStorage, Picker} from 'react-native';
import { home } from "../../../App";
import axios from 'axios';
import { Input, Text, SocialIcon, Button} from 'react-native-elements';

export default class SignUp extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            username: 'username',
            password: 'password',
            password1 : 'password',
            name: 'name',
            email: 'example@example.com',
            city: 'city',
            state: 'state',
            zip: 'zipcode'
        };
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
        const self = this;
        var ret = {
            email : this.state.email,
            username : this.state.username
        };
        axios.post('http://localhost:9000/api/available', ret).then(function (response){
            if(!response.data['username']){
                alert("Username already in use")
            }
            else if(!response.data['email']){
                alert("Email already in use")
            } else if (self.passwordStrenghTest(self.state.password) == false) {
                alert("Please enter a valid password")
            } else if(this.state.password != this.state.password1){
                alert("Passwords do not match");
            } else if(self.state.name === "name") {
                alert("Please enter a valid name");
                // TODO: Change this do that we verify the city, state, and zip code.
            } else if (self.state.city == "city"){
                alert("Please enter a valid city");
            } else if (self.state.state == "state") {
                alert("Please enter a valid state");
            } else if (self.state.zip == "zipcode") {
                alert("Please enter a valid zipCode");
            } else {
                var signUpData = {
                    'username': self.state.username,
                    'password': self.state.password,
                    'email': self.state.email,
                    'name': self.state.name,
                    'location': [self.state.city, self.state.state, self.state.zip]
                };
                AsyncStorage.setItem("formData", JSON.stringify(signUpData)).then(function(){
                    navigate('SignUp2');
                });
            }


        }).catch(function (error){
            alert("Whoops. Something went wrong. Error: " + error);
        });


    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.header}>Sign Up{"\n"}</Text>

                    <Text style={styles.text}>Username:</Text>
                    <Input
                        style={styles.textInput}
                        autoCapitalize = 'none'
                        onChangeText={(username) => this.setState({username})}
                        placeholder='Username'
                    />
                    <Text style={styles.text}>Password:</Text>
                    <Input
                        autoCapitalize = 'none'
                        secureTextEntry={true}
                        style={styles.textInput}
                        onChangeText={(password) => this.setState({password})}
                        placeholder='Password'
                    />
                    <Input
                        autoCapitalize = 'none'
                        secureTextEntry={true}
                        style={styles.textInput}
                        onChangeText={(password1) => this.setState({password1})}
                        placeholder='Confirm Password'
                    />
                    <Text style={styles.text}>Email:</Text>
                    <Input
                        style={styles.textInput}
                        autoCapitalize = 'none'
                        onChangeText={(email) => this.setState({email})}
                        placeholder='example@example.com'
                    />
                    <Text style={styles.text}>Name:</Text>
                    <Input
                        style={styles.textInput}
                        onChangeText={(name) => this.setState({name})}
                        placeholder='Sam Smith'
                    />
                    <Text style={styles.text}>City:</Text>
                    <Input
                        style={styles.textInput}
                        onChangeText={(city) => this.setState({city})}
                        placeholder='Boston'
                    />
                    <Text style={styles.text}>State:</Text>
                    <Input
                        style={styles.textInput}
                        onChangeText={(state) => this.setState({state})}
                        placeholder='MA'
                    />
                    <Text style={styles.text}>Zipcode:</Text>
                    <Input
                        style={styles.textInput}
                        onChangeText={(zip) => this.setState({zip})}
                        placeholder='02134'
                    />

                    <Button
                        // textStyle={{ color: "#bcbec1" }}
                        title="Next"
                        onPress={() => this.next()}
                        buttonStyle={styles.button}
                        backgroundColor={'white'}
                        color={'white'}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cccc31',
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        color: "black",
        textAlignVertical: "center",
        textAlign: "left",
        fontFamily: 'Euphemia UCAS',
    },
    textInput : {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    content : {
        marginTop : 100,
        width: '75%',
        alignItems: 'center',
        textAlign: 'center'
    },
    header : {
        fontFamily: 'Euphemia UCAS',
        fontSize: 20,
        color: '#323232'
    },
    button : {
        marginTop: 20,
        backgroundColor: '#323232'

    }

});

