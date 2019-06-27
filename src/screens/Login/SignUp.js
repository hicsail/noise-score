import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native';
import { home } from "../../../App";
import axios from 'axios';
import { Input, Text, SocialIcon, Button, Icon } from 'react-native-elements';
import t from 'tcomb-form-native';
import CustomInput from '../../Base/CustomInput'
import IconFA from "react-native-vector-icons/FontAwesome";

// import { styles } from "./LoginScreen";
import AsyncStorage from '@react-native-community/async-storage';
import * as constants from '../../components/constants';

export default class SignUp extends React.Component {


    constructor(props) {
        super(props);

        this.inputs = {
            username: {
                label: 'Username',
                placeholder: 'Username',
                errors: {
                    empty: 'Please choose a username',
                    inuse: 'Someone is using that username already',
                }
            },
            password: {
                label: 'Password',
                placeholder: 'kWj3f19L',
                errors: {
                    empty: 'Please provide a password',
                    length: 'Your password must be 8 or more characters',
                    weak: 'Use at least 3 of capital, lower, numbers, symbols'
                }
            },
            confirmPass: {
                label: 'Confirm Password',
                placeholder: 'Retype your password',
                errors: {
                    empty: 'You need to confirm your password',
                    match: 'Your passwords don\'t match',
                }
            },
            email: {
                label: 'Email Address',
                placeholder: 'you@someone.com',
                errors: {
                    empty: 'Please provide your email address',
                    invalid: 'Please provide a valid email address',
                    inuse: 'This email is already registered '
                }
            },
            city: {
                label: 'City ',
                placeholder: 'Allston',
                errors: {
                    empty: 'Please provide your city of residence',
                    invalid: 'City does not match your zip code'
                }
            },
            state: {
                label: 'State',
                placeholder: 'MA',
                errors: {
                    empty: 'Please provide your state',
                    invalid: 'Your state does not match your zip code',
                }
            },
            zip: {
                label: 'Zip Code',
                placeholder: '02134',
                errors: {
                    empty: 'Please provide your zipcode',
                    invalid: 'Your zip code does match your state and city'
                }
            },

        };
        this.state = {
            username: '\t',
            usernameError: '',

            password: '\t',
            passwordError: '',

            confirmPass: '\t',
            confirmError: '\t',

            email: '\t',
            emailError: '',

            city: '\t',
            cityError: '',

            state: '\t',
            stateError: '',

            zip: '\t',
            zipError: '',

        };

        // this.state.username = this.state.username.bind(this);
        this.UsernameHandle = this.UsernameHandle.bind(this);
        this.PasswordHandle = this.PasswordHandle.bind(this);
        this.ConfirmHandle = this.ConfirmHandle.bind(this);
        this.EmailHandle = this.EmailHandle.bind(this);
        this.CityHandle = this.CityHandle.bind(this);
        this.StateHandle = this.StateHandle.bind(this);
        this.ZipHandle = this.ZipHandle.bind(this);
    }


    UsernameHandle(e) {
        this.setState({ username: e });
        if (e === '')
            this.setState({ usernameError: 'empty' });
        else
            this.setState({ usernameError: '' });
    }

    PasswordHandle(e) {
        this.setState({ password: e });
        if (e === '')
            this.setState({ passwordError: 'empty' });
        else {
            this.setState({ passwordError: this.passStrength(e) });
        }


    }

    ConfirmHandle(e) {
        this.setState({ confirmPass: e });
        if (e === '')
            this.setState({ confirmError: 'empty' });
        else if (e !== this.state.password)
            this.setState({ confirmError: 'match' });
        else
            this.setState({ confirmError: '' });
    }


    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    EmailHandle(e) {
        this.setState({ email: e });
        if (e === '')
            this.setState({ emailError: 'empty' });
        else
            this.setState({ emailError: '' });
    }

    CityHandle(e) {
        this.setState({ city: e });
        if (e === '')
            this.setState({ cityError: 'empty' });
        else
            this.setState({ cityError: '' });
    }

    StateHandle(e) {
        this.setState({ state: e });
        if (e === '')
            this.setState({ stateError: 'empty' });
        else
            this.setState({ stateError: '' });
    }

    ZipHandle(e) {
        this.setState({ zip: e });
        if (e === '')
            this.setState({ zipError: 'empty' });
        else
            this.setState({ zipError: '' });
    }


    passStrength(password) {
        let ctr = 0;

        if (password.length < 8) {
            return 'length';
        }
        else {

            let matchedCase = [];
            matchedCase.push("[$@$!%*#?&]"); // Special Charector
            matchedCase.push("[A-Z]");      // Uppercase Alpabates
            matchedCase.push("[0-9]");      // Numbers
            matchedCase.push("[a-z]");     // Lowercase Alphabates

            // Check the conditions

            for (let i = 0; i < matchedCase.length; i++) {
                if (new RegExp(matchedCase[i]).test(password)) {
                    ctr++;
                }
            }
        }
        if (ctr < 3)
            return 'weak';
        else
            return ''


    }

    passwordStrenghTest(password) {
        // Function to conduct a basic password check

        var ret = true;


        let ctr = 0;
        if (password.length < 8) {
            let matchedCase = [];
            matchedCase.push("[$@$!%*#?&]"); // Special Charector
            matchedCase.push("[A-Z]");      // Uppercase Alpabates
            matchedCase.push("[0-9]");      // Numbers
            matchedCase.push("[a-z]");     // Lowercase Alphabates

            // Check the conditions

            for (let i = 0; i < matchedCase.length; i++) {
                if (new RegExp(matchedCase[i]).test(password)) {
                    ctr++;
                }
            }
        }
        else {
            return false;
        }

        switch (ctr) {
            case 0:
            case 1:
            case 2:
                console.log("Very Weak");
                break;
            case 3:
                console.log("Medium");
                break;
            case 4:
                console.log("Strong");
                break;
        }

        if (password.length < 8) {
            console.log(password.length < 8);
            ret = false;
        } else {
            var numbers = false;
            var capital = false;
            for (var i = 0; i < password.length; i++) {
                if (password.indexOf(i) !== -1) {
                    numbers = true;
                }
                if (password.charAt(i) == password.charAt(i).toUpperCase()) {
                    capital = true;
                }
            }

            ret = (capital && numbers);
        }
        return true;
    }

    // static navigationOptions = ({ navigation }) => {
    //     //return header with Custom View which will replace the original header
    //     return {
    //         header: (
    //             <View style={{ height: height / 10, padding: 5, backgroundColor: '#31BD4B' }}>
    //                 <View
    //                     style={{ flex: 1, justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }}>
    //
    //                     <TouchableOpacity style={{
    //                         width: 0.15 * width, height: height / 12, margin: 5, backgroundColor: 'black',
    //                         justifyContent: 'center', alignItems: 'center', zIndex:1000
    //                     }}
    //                                       onPress={() => navigation.goBack()}>
    //                         <Icon type={'arrow-left'}/>
    //                     </TouchableOpacity>
    //
    //
    //
    //                     <View style={{
    //                         flex: 1,
    //                         height: null,
    //
    //                         width: 0.7 * width,
    //                         // alignSelf: 'center',
    //                         // alignContent: 'center',
    //                         alignItems: 'center',
    //                         justifyContent: 'center',
    //                         // paddingVertical: 5
    //                     }}>
    //                         <Image style={{ flex: 1, resizeMode: 'contain', }}
    //                                source={require('./../../../assets/splash_logo2.jpeg')}
    //                         />
    //                     </View>
    //
    //
    //                     <TouchableOpacity style={{
    //                         width: 0.15 * width, height: height / 12, margin: 5, backgroundColor: 'red',
    //                         justifyContent: 'center', alignItems: 'center'
    //                     }}
    //                                       onPress={() => navigation.goBack()}>
    //                         {/*<Button*/}
    //                             {/*style={{ backgroundColor: 'red', color: 'black' }}*/}
    //                             {/*onPress={() => navigation.goBack()}*/}
    //                             {/*title={'Back'}*/}
    //                         {/*/>*/}
    //                     </TouchableOpacity>
    //                 </View>
    //             </View>
    //         ),
    //     };
    // };

    async locationValidate(city = "", state = "", zip = '0') {
        // Function to validate teh city, state, and zip of a certain location
        // Makes backend call to verify

        let location = {
            city: city,
            state: state,
            zip: zip
        };

        // ------------ Final check for validity of location provided, call on the backend, return result of post ------------

        return await axios.post('http://' + constants.IP_ADDRESS + '/api/validateZip', location).then(
            function (response) {
                // If we have not prompted a change in city and state we're good to go and return true.
                if (response.data.city === (city) && response.data.state === (state))
                    return true;


                Alert.alert(
                    //Alert title
                    'Validation Error\n',
                    //Alert message
                    'Your Zipcode does not match your City and State\n' +
                    'Did you mean ' + response.data.city + ", " + response.data.state + "?\n",
                    [{ text: 'Ok' }],
                    { cancelable: false },
                );

                return false;
            }
        ).catch(
            function (error) {
                alert("Whoops. Something went wrong validating your location!");
                console.log(error);

                return false;
            }
        );
    }


    errorCheck() {
        let errors = this.state.usernameError +
            this.state.passwordError + this.state.confirmError + this.state.emailError +
            this.state.cityError + this.state.stateError + this.state.zipError;
        return errors === '';
    }

    async validCheck() {

        let credentials = {
            email: this.state.email,
            username: this.state.username
        };


        let response;


        response = await axios.post('http://' + constants.IP_ADDRESS + '/api/available', credentials)
            .then(async function (response) {

                return response;
            })
            .catch(function (error) {
                return {}
            });

        if (this.state.username !== '' && this.state.username !== '\t')

            if (!response.data['username']) {
                this.setState({ usernameError: 'inuse' });
            }
        if (this.state.email !== '' && this.state.username !== '\t')
            if (!response.data['email']) {
                this.setState({ emailError: 'inuse' });
            }
        console.log(response);
        // this.setState({ usernameError: res['usernameError'] });


        //Validate location
        let location = {
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip
        };

        response = await axios.post('http://' + constants.IP_ADDRESS + '/api/validateZip', location).then(
            function (response) {
                return response
            })
            .catch(function (error) {
                return null
            });

        if (response !== null) {

            if (!(response.data.city === (this.state.city) && response.data.state === (this.state.state))) {
                this.setState({
                    cityError: 'invalid',
                    stateError: 'invalid',
                    zipError: 'invalid',
                });
            }
            else {
                this.setState({
                    cityError: '',
                    stateError: '',
                    zipError: '',
                });
            }
        }
        console.log(this.state);
    };


    async next() {
        const { navigate } = this.props.navigation;

        if (this.state.username === '\t')
            this.UsernameHandle('');
        if (this.state.password === '\t')
            this.PasswordHandle('');
        if (this.state.confirmPass === '\t')
            this.ConfirmHandle('');
        if (this.state.email === '\t')
            this.EmailHandle('');
        if (this.state.city === '\t')
            this.CityHandle('');
        if (this.state.state === '\t')
            this.StateHandle('');
        if (this.state.zip === '\t')
            this.ZipHandle('');


        await this.validCheck();

        if (this.errorCheck()) {
            console.log('ready to store');
            let signUpData = {
                'username': this.state.username,
                'password': this.state.password,
                'email': this.state.email,
                'location': [this.state.city, this.state.state, this.state.zip]
            };
            AsyncStorage.setItem("formData", JSON.stringify(signUpData)).then(function () {
                console.log("in here");
                navigate('SignUp2');
            });

        }
        else {
            Alert.alert("Invalid inputs", 'Please check again the information you provided');
        }

    }


    componentDidMount() {

    }

    render() {

        return (
            <View
                style={{ borderLeftWidth: 5, borderRightWidth: 5, borderColor: '#31BD4B' }}
            >

                <ScrollView contentContainerStyle={styles.scrollWrapper}>

                    <View style={styles.wrapper}>

                        <Text style={styles.textHeader}>
                            Sign Up
                        </Text>

                        {/*Username input */}
                        <CustomInput
                            label={this.inputs.username.label}
                            placeholder={this.inputs.username.placeholder}
                            name={this.inputs.username.label}
                            content={this.state.username}
                            errorMessage={this.inputs.username.errors[this.state.usernameError]}
                            controlFunc={this.UsernameHandle}
                            // value={this.state.username}
                        />

                        {/*Password input*/}
                        <CustomInput
                            label={this.inputs.password.label}
                            placeholder={this.inputs.password.placeholder}
                            name={this.inputs.password.label}
                            isPassword={true}
                            content={this.state.password}
                            errorMessage={this.inputs.password.errors[this.state.passwordError]}
                            controlFunc={this.PasswordHandle}
                        />

                        {/*Confirm password input */}
                        <CustomInput
                            label={this.inputs.confirmPass.label}
                            placeholder={this.inputs.confirmPass.placeholder}
                            name={this.inputs.confirmPass.label}
                            isPassword={true}
                            content={this.state.confirmPass}
                            errorMessage={this.inputs.confirmPass.errors[this.state.confirmError]}
                            controlFunc={this.ConfirmHandle}
                        />


                        {/*Email address input */}
                        <CustomInput
                            label={this.inputs.email.label}
                            placeholder={this.inputs.email.placeholder}
                            name={this.inputs.email.label}
                            content={this.state.email}
                            errorMessage={this.inputs.email.errors[this.state.emailError]}
                            controlFunc={this.EmailHandle}
                        />

                        {/*City input */}
                        <CustomInput
                            label={this.inputs.city.label}
                            placeholder={this.inputs.city.placeholder}
                            name={this.inputs.city.label}
                            content={this.state.city}
                            errorMessage={this.inputs.city.errors[this.state.cityError]}
                            controlFunc={this.CityHandle}
                        />

                        {/*State input */}
                        <CustomInput
                            label={this.inputs.state.label}
                            placeholder={this.inputs.state.placeholder}
                            name={this.inputs.state.label}
                            content={this.state.state}
                            errorMessage={this.inputs.state.errors[this.state.stateError]}
                            controlFunc={this.StateHandle}
                        />

                        {/*zip input */}
                        <CustomInput
                            label={this.inputs.zip.label}
                            placeholder={this.inputs.zip.placeholder}
                            name={this.inputs.zip.label}
                            content={this.state.zip}
                            errorMessage={this.inputs.zip.errors[this.state.zipError]}
                            controlFunc={this.ZipHandle}
                        />
                        <Button
                            title="Next"
                            onPress={() => this.next()}
                            buttonStyle={styles.button}
                            // backgroundColor={'white'}
                            // color={'white'}
                        />


                    </View>
                </ScrollView>
            </View>
        );
    }

}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'stretch',
        // width: "90%",
        paddingLeft: width / 10,
        paddingRight: width / 10,
        minHeight: height,
    },
    text: {
        fontSize: 20,
        color: "black",
        textAlignVertical: "center",
        textAlign: "center",
        fontFamily: 'Euphemia UCAS',
        // paddingHorizontal: 100
    },
    textInput: {
        fontSize: 15,
        color: "black",
        fontFamily: 'Euphemia UCAS',
        backgroundColor: 'white',
        height: 40,
    },

    errorText: {},

    errorInput: {
        height: 40,
        borderColor: 'red',
        borderBottomWidth: 1,
        alignItems: 'stretch',
        // paddingHorizontal: 25,
    },
    content: {
        marginTop: "10%",
        textAlign: 'center'
    },
    header: {
        flex: 10
    },
    button: {
        marginBottom: 30,
        marginTop: 20,
        backgroundColor: '#323232',
        alignItems: 'center'
    },
    textHeader: {
        fontSize: 30,
        marginVertical: 0.01 * height,
        color: "black",
        justifyContent: 'center',
        textAlignVertical: "center",
        textAlign: "center",
        fontFamily: 'Arial',
    },
    buttonWrapper: {
        marginBottom: 30,
        width: "70%",
        backgroundColor: '#323232',
    },


    wrapper: {
        flexGrow: 1,
        minHeight: height - height / 10,
        // height: 800,
        alignItems: 'stretch',
        paddingLeft: 30,
        paddingRight: 30,
        // paddingTop: 30,
        alignContent: 'center',
        // backgroundColor: "#e9eeec",
        // minHeight: 600,

    },

    imgWrapper: {
        flexGrow: 3,
    },

    scrollWrapper: {
        flexGrow: 1,
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
        flexGrow: 2,
        justifyContent: "space-between",
        alignItems: 'stretch',
        // padding: 80,
        // flexWrap: 'wrap',
        alignContent: 'center',
    },
});
