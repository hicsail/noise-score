import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    Alert,
    TouchableHighlight,
    KeyboardAvoidingView
} from 'react-native';
import { home } from "../../../App";
import axios from 'axios';
import { Input, Text, Button } from 'react-native-elements';
import ForgotResetPassword from "./ForgotResetPassword";
import AccountScreen from "../Account/AccountScreen";
import CustomButton from "../../Base/CustomButton"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dimensions } from "react-native";
import * as constants from '../../components/constants';
import AsyncStorage from '@react-native-community/async-storage';
import {SignupStack} from '../../../App'


const { width, height } = Dimensions.get('window');
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


        // AsyncStorage.getItem("userData", null).then(function (ret) {
        //     let response = JSON.parse(ret);
        //
        //     console.log(ret);
        //
        //     if (ret) {
        //         if (response['authHeader'] != null) {
        //             // Verify user with sessions
        //             var authHeader = response['authHeader'];
        //             const header = {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': authHeader
        //             };
        //
        //             axios.get('http://' + constants.IP_ADDRESS + '/api/sessions/my', { headers: header }).then(function (ret) {
        //                 navigate("SignedIn");
        //             }).catch(function (error) {
        //                 console.log("error validating user", error);
        //             })
        //
        //         }
        //     }
        // });

        this.state = {
            username: '',
            password: '',
            forgotPass: false
        };
    }

    componentDidMount() {

    }

    submit() {
        // Submit a username and password combination
        // Makes API call and navigates to MapScreen.js on success

        const userCredentials = {
            username: this.state.username,
            password: this.state.password
        };
        console.log("In here 1");
        const { navigate } = this.props.navigation;
        let url = 'http://' + constants.IP_ADDRESS + '/api/login';
        axios.post(url, userCredentials)
            .then(function (response) {
                // Store the userData:
                let ret = response['data'];
                console.log("In here 2");
                AsyncStorage.setItem("userData", JSON.stringify(ret));
                navigate("App")
            })
            .catch(function (error) {
                console.log(error);
                alert("Invalid Username or Password");
            });
    }


    render() {
        return (

            <ScrollView contentContainerStyle={styles.scrollWrapper}>
                <View style={styles.wrapper}>

                    <View style={styles.imgWrapper}>
                        <Image style={styles.imgStyle}
                               source={require('./../../../assets/splash_logo.jpeg')}
                        />
                    </View>

                    <View style={styles.inputs}>

                        <Input
                            // autoCapitalize='none'
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

                        <CustomButton
                            // buttonStyle={styles.button}
                            text="Sign In"
                            onPress={() => this.submit()}
                            customStyle={{ borderWidth: 3, borderColor: '#31BD4B' }}
                        />
                        <Text style={{ marginVertical: 0, alignSelf: 'center', justifyContent: 'center' }}>
                            - OR -
                        </Text>
                        <CustomButton
                            // style={styles.button}
                            text="Sign Up"
                            onPress={() => this.props.navigation.navigate("SignUp1")}
                            customStyle={{ backgroundColor: 'white', borderWidth: 3, borderColor: '#31BD4B' }}
                            customTextStyle={{ color: '#31BD4B' }}
                        />

                        <Text style={styles.forgotStyle}
                              onPress={() => this.props.navigation.navigate("ForgotResetPassword")}>
                            Forgot your password ? Click here !
                        </Text>
                    </View>
                    <View style={{ flexGrow: 2, }}>
                        <Image style={styles.imgStyle}
                               source={require('./../../../assets/Splash-image-mini3.png')}
                        />
                    </View>
                </View>
            </ScrollView>
        )
            ;
    }
}

const styles = StyleSheet.create({

    wrapper: {
        flexGrow: 1,
        minHeight: height - 25,
        alignItems: 'stretch',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30,
        alignContent: 'center',
        // backgroundColor: "#e9eeec",
        // minHeight: 600,
        // backgroundColor:"gray"

    },

    imgWrapper: {
        flexGrow: 2,
        // backgroundColor:'lightgreen'
        // alignItems: 'stretch',
        // alignContent: 'center',
        // position: 'absolute',
        // top: 0,
    },

    scrollWrapper: {
        // flexGrow: 1,
        // justifyContent: "space-between",
        height: height - 25,
        // alignItems: 'stretch',
        // // padding: 80,
        // flexWrap: 'wrap',
        // alignContent: 'center'
    },

    imgStyle: {
        flexGrow: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined

        // top: 0,
        // left: 0,
    },

    inputs: {
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: 'stretch',
        // padding: 80,
        // flexWrap: 'wrap',
        alignContent: 'center',
        // backgroundColor:'lightblue'
    },

    forgotStyle: {
        // justifyContent: "space-between",
        alignSelf: 'center'
    },
});