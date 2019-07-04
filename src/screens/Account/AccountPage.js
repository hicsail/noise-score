import React from 'react';
import { Picker, StyleSheet, View, ScrollView, Image } from 'react-native';
import axios from "axios";
import { Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import * as constants from '../../components/constants';

export default class AccountScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userID: -1,
            userData: null
        };

    }




    componentDidMount() {
        // When the component mounts, gather the user data from local storage (AsyncStorage)
        // Store the data as a local variable
        AsyncStorage.getItem('userData', null).then(function (ret) {
            if (ret) {
                var response = JSON.parse(ret);
                var authHeader = response['authHeader'];
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                };
                this.setState({
                    username: response['user']['username'],
                    userID: response['user']['_id']
                });
            }
        }.bind(this));
        console.log(this.props.navigation);
        console.log("AAAAAAAAAAA");
        console.log(this.props.navigationOptions);
    }


    // Helper function to remove local storage
    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch (exception) {
            return false;
        }
    }

    logout() {
        // Function to log out and clear cookies (i.e. AsyncStorag)
        // Moves to LoginScreen.js
        const { navigate } = this.props.navigation;
        AsyncStorage.getItem('userData', null).then(function (ret) {
            if (ret) {
                // Get the auth header from storage
                var response = JSON.parse(ret);
                var authHeader = response['authHeader'];
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                };
                // Remove the cookie and make API call to log out
                this.removeItemValue("userData").then(function (ret) {
                    if (ret) {
                        axios.delete('http://' + constants.IP_ADDRESS + '/api/logout', { headers: header })
                            .then(function () {
                                navigate("UserLogin");
                            })
                            .catch(function (error) {
                                console.log(error);
                                alert("Something went wrong!");
                            });
                    } else {
                        alert("Error")
                    }
                });
            }
        }.bind(this));
    }

    goBack() {
        // Navigate to AccountScreen.js
        const { navigate } = this.props.navigation;
        navigate("Account1");
    }

    resetPassword() {
        // Navigate to ResetPassword.js
        const { navigate } = this.props.navigation;
        navigate("Account4");
    }


    render() {
        const { username } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Button
                        buttonStyle={styles.button}
                        backgroundColor="transparent"
                        textStyle={{ color: "#bcbec1" }}
                        title="Sign Out"
                        onPress={() => this.logout()}
                    />
                    {/*<Button*/}
                    {/*buttonStyle={styles.button}*/}
                    {/*backgroundColor="transparent"*/}
                    {/*textStyle={{ color: "#bcbec1" }}*/}
                    {/*title="Reset Password"*/}
                    {/*onPress={() => this.resetPassword()}*/}
                    {/*/>*/}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reload: {},
    header: {
        backgroundColor: '#31BD4B',
    },
    headerButton: {
        backgroundColor: '#323232'
    },
    button: {
        marginTop: 20,
        backgroundColor: '#323232',
        marginHorizontal: 100
    },
    content: {
        marginTop: "50%",
        width: '100%',
        height: "100%",

    },

});
