import React from 'react';
import { Alert, Dimensions, View, ScrollView } from 'react-native';
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
        super(props);
        this.state = {
            key: '',
            email: '',
            password: '',
            confirmPassword: '',
            providedMail: false
        }
    }

    forgotPassword() {
        const data = { email: this.state.email };
        const { navigate } = this.props.navigation;
        // If mail exists, send verification token and return true, else return false;

        axios.post('http://' + constants.IP_ADDRESS + '/api/login/forgot', data)
            .then(function () {
                navigate('ResetPassword');
            })
            .catch(function () {
                Alert.alert("Verification Failed", "Invalid email. Please check and retry.")
            });

    }


    simpleAlert(title = "Error", text = "You have an error") {
        Alert.alert(
            title, text,
            [{ text: 'Ok' }],
            { cancelable: false });
    }


    render() {
        return (

            <ScrollView style={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', padding: 30 }}>
                    <View style={{ height: height / 2, justifyContent: 'space-evenly' }}>
                        <View style={{ flex: 1, }}>
                            <View style={{ marginVertical: 10 }}>
                                <Input
                                    autoCapitalize='none'
                                    placeholder='Email'
                                    rightIcon={{ type: 'font-awesome', name: 'envelope' }}
                                    onChangeText={(email) => {
                                        this.setState({ email });
                                    }}
                                />
                            </View>
                            <Button
                                title="Get token and reset password"
                                onPress={() => {
                                    this.forgotPassword();
                                }}
                                style={{ marginTop: 10 }}
                            />
                        </View>
                        <View style={{ flex: 1, alignText: 'center' }}>
                            <Text style={{
                                marginVertical: 10
                            }}>Already have a retrieval token, click here</Text>
                            <Button
                                title="Reset password"
                                onPress={() => this.props.navigation.navigate('ResetPassword')}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }

}

const { width, height } = Dimensions.get('window');
export default withNavigation(ForgotResetPassword);
