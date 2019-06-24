import React from 'react';
import { Alert, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { home } from "../../../App";
import axios from 'axios';
import { Button, Header, Input, Text } from 'react-native-elements';
import { withNavigation } from "react-navigation";
import ResetPassword from "./ResetPassword";
import * as constants from '../../components/constants';

class ForgotResetPassword extends React.Component {

    static navigationOptions = {
        title: 'ForgotResetPassword',
    };


    constructor(props) {
        // Check if we already are logged in (navigate to MapScreen.js)
        // Otherwise do nothing
        super(props);
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


    async forgotPassword() {
        const data = { email: this.state.email };
        // If mail exists, send verification token and return true, else return false;
        let result = false;
        result = await axios.post('http://' + constants.IP_ADDRESS + '/api/login/forgot', data)
            .then(function () {
                return true;
            })
            .catch(function () {
                return false;
            });

        console.log("result of forgot password is " + result);
        if (result)
            this.props.navigation.navigate('ResetPassword');
        else
            this.simpleAlert("Verficiation Failed", "Invalid email. Please check and retry")
    }


    simpleAlert(title = "Error", text = "You have an error") {
        Alert.alert(
            title, text,
            [{ text: 'Ok' }],
            { cancelable: false });
    }


    render() {
        return (


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
                    title="Get token and reset password"
                    onPress={() => {
                        this.forgotPassword();
                    }}

                />
                <Text>Already have a retrieval token, click here</Text>
                <Button
                    title="Reset password"
                    onPress={() => this.props.navigation.navigate('ResetPassword')}
                />
            </View>

        )
    }

}

export default withNavigation(ForgotResetPassword);
