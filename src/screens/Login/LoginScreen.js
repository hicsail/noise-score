import React, { Component }  from 'react';
import {StyleSheet, View, TextInput, AsyncStorage, Image} from 'react-native';
import { home } from "../../../App";
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, SocialIcon, Button} from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen'



export default class LoginScreen extends React.Component {


    static navigationOptions = {
        title: 'Home',
    };

    constructor(props) {
        super(props);
        const {navigate} = this.props.navigation;
        AsyncStorage.getItem("userData").then(function (ret) {
            var response = JSON.parse(ret);
            if (ret){
                if(response['authHeader']!= null){
                    // Verify user with sessions
                    var authHeader = response['authHeader'];
                    const header = {
                        'Content-Type': 'application/json',
                        'Authorization' : authHeader
                    };

                    axios.get('http://localhost:9000/api/sessions/my', {headers: header}).then(function (ret){
                        console.log(ret);
                        navigate("SignedIn");
                    })

                }
            }
        });

        this.state = {
            username: 'username',
            password: ''
        };
    }

    componentDidMount() {
        // SplashScreen.hide();
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
                <View style={styles.login}>
                    <Image
                        source={require('./../../../assets/logo.png')}
                        style={styles.logo}
                    />
                        <Text style={styles.header}>NOISESCORE{"\n"}</Text>
                        <Input
                            autoCapitalize = 'none'
                            placeholder='Username'
                            rightIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={(username) => this.setState({username})}
                        />


                        <Input
                            secureTextEntry={true}
                            autoCapitalize = 'none'
                            placeholder='Password'
                            rightIcon={{ type: 'font-awesome', name: 'lock' }}
                            onChangeText={(password) => this.setState({password})}
                        />
                </View>
                <View>
                    <Button
                        buttonStyle={styles.button}
                        title="Sign In"
                        onPress={() => this.submit()}
                    />

                    <Button
                        buttonStyle={styles.button}
                        backgroundColor={'white'}
                        title="Sign Up"
                        color={'white'}
                        onPress={() => this.props.navigation.navigate("SignUp1")}
                    />
                </View>

                {/*<View style={styles.socialIcon}>*/}
                    {/*<SocialIcon*/}
                        {/*type='twitter'*/}
                        {/*iconColor={'white'}*/}
                        {/*underlayColor={'#323232'}*/}
                    {/*/>*/}
                {/*</View>*/}
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
    socialIcon : {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
    },
    logo : {
        width: 200,
        height: 220
    },
    login : {
        marginTop : 150,
        width: '75%',
        alignItems: 'center',
        textAlign: 'center'
    },
    header : {
        fontFamily: 'Euphemia UCAS',
        fontSize: 40,
        color: '#323232'
    },
    button : {
        marginTop: 20,
        backgroundColor: '#323232'
    }
});
