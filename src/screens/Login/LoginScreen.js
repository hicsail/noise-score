import React from 'react';
import { StyleSheet, View, ScrollView, AsyncStorage, Image, Alert } from 'react-native';
import { home } from "../../../App";
import axios from 'axios';
import { Input, Text, Button } from 'react-native-elements';
import ForgotResetPassword from "./ForgotResetPassword";

export default class LoginScreen extends React.Component {

    static navigationOptions = {
        title: 'Home',
    };

    constructor(props) {
        // Check if we already are logged in (navigate to MapScreen.js)
        // Otherwise do nothing
        super(props);
        const { navigate } = this.props.navigation;
        // If we are already logged in (i.e. local storage) then we can make an API call to
        // Ensure that we still have the credentials and can directly move to the SignedIn Screen
        AsyncStorage.getItem("userData", null).then(function (ret) {
            let response = JSON.parse(ret);
            console.log(ret);

            if (ret) {
                if (response['authHeader'] != null) {
                    // Verify user with sessions
                    var authHeader = response['authHeader'];
                    const header = {
                        'Content-Type': 'application/json',
                        'Authorization': authHeader
                    };

                    axios.get('http://10.0.2.2:9000/api/sessions/my', { headers: header }).then(function (ret) {
                        navigate("SignedIn");
                    }).catch(function (error) {
                        console.log("error validating user", error);
                    })

                }
            }
        });
        this.state = {
            username: 'username',
            password: '',

            forgotPass: false
        }
        ;
    }

    componentDidMount() {

    }

    submit() {
        // Submit a username and password combination
        // Makes API call and navigates to MapScreen.js on success

        const requestBody = {
            username: this.state.username,
            password: this.state.password
        };
        const { navigate } = this.props.navigation;
        // change 10.0.2.2 to 10.0.2.2 for android
        console.log(this.state);
        axios.post('http://10.0.2.2:9000/api/login', requestBody)
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
            <View style={styles.wrap}>
                <View style={styles.container}>
                    {!this.state.forgotPass ?

                        <ScrollView>

                            <View style={styles.login}>
                                <Image
                                    source={require('./../../../assets/logo.png')}
                                    style={styles.logo}
                                />
                                {/*< Image source={require('./../../../assets/NoiseScore1.2.png')} style={styles.logo}/>*/}
                                {/*< Image source={require('./../../../assets/NoiseScore1.png')} style={styles.logo}/>*/}

                                <Input
                                    autoCapitalize='none'
                                    placeholder='Username'
                                    rightIcon={{ type: 'font-awesome', name: 'user' }}
                                    onChangeText={(username) => this.setState({ username })}
                                />

                                <Input
                                    secureTextEntry={true}
                                    autoCapitalize='none'
                                    placeholder='Password'
                                    rightIcon={{ type: 'font-awesome', name: 'lock' }}
                                    onChangeText={(password) => this.setState({ password })}
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

                                <Button
                                    buttonStyle={styles.button}
                                    backgroundColor={'white'}
                                    title="Forgot Password"
                                    color={'white'}
                                    onPress={() => this.setState({ forgotPass: true })}//this.props.navigation.navigate("ForgotResetPassword")}
                                />
                            </View>

                        </ScrollView>
                        :

                        <ForgotResetPassword/>
                        /* <View>
                             <Text style={styles.text}>Email</Text>
                             <Input
                                 style={styles.textInput}
                                 autoCapitalize='none'
                                 onChangeText={(email) => this.setState({email})}
                                 placeholder='example@example.com'
                             />
                             <Button
                                 buttonStyle={styles.button}
                                 backgroundColor={'white'}
                                 title="Forgot Password"
                                 color={'white'}
                                 onPress={() => {
                                     alert("HI");
                                     this.props.navigation.navigate("ForgotResetPassword");
                                 }}//this.props.navigation.navigate("ForgotResetPassword")}
                             />
                         </View>*/
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: '#cccc31',
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: "100%",

    },
    logo: {
        width: 200,
        height: 220
    },
    login: {
        alignItems: 'center',
        textAlign: 'center',
    },
    header: {
        fontFamily: 'Euphemia UCAS',
        fontSize: 40,
        color: '#323232'
    },
    button: {
        marginTop: 20,
        // borderRadius:3,
        backgroundColor: '#323232'
    },
    wrap: {
        backgroundColor: '#cccc31',
        alignItems: 'center',
        flex: 1,

    },
});
