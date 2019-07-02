import React from "react";
import { Dimensions, Image, View } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import * as constants from '../../components/constants';

// export let authStatus = false;
export default class Splashscreen extends React.Component {
    static authStatus = false;

    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => {
                    resolve('result')
                },
                5000
            )
        )
    };

    async AuthenticateUser() {
        return (
            AsyncStorage.getItem("userData", null).then(async function (ret) {
                let response = JSON.parse(ret);
                console.log('UserData:');
                console.log(ret);

                if (ret) {
                    if (response['authHeader'] != null) {
                        // Verify user with sessions
                        var authHeader = response['authHeader'];
                        const header = {
                            'Content-Type': 'application/json',
                            'Authorization': authHeader
                        };

                        return axios.get('http://' + constants.IP_ADDRESS + '/api/sessions/my', { headers: header })
                            .then(function () {
                                return true;
                            })
                            .catch(function () {
                                return false;
                            })
                    }

                }
                return false;
            })

        )
    };

    async componentDidMount() {

        // Preload data from an external API
        // Preload data using AsyncStorage
        const loadTime = this.performTimeConsumingTask();
        Splashscreen.authStatus = await this.AuthenticateUser();
        console.log('Auth Status: ', Splashscreen.authStatus);
        await loadTime;
        this.props.navigation.navigate(Splashscreen.authStatus ? 'App' : 'UserLogin');
    }

    render() {
        return (
            <View style={styles.viewStyles}>
                <Image
                    source={require('../../../assets/logo-bright-green2.png')}
                    style={{
                        flex: 1,
                        alignSelf: 'center',
                        resizeMode:'contain',
                        width: width-40,

                        // height: undefined,
                    }}
                />
                <Image
                    source={require('../../../assets/splash-image-transparent.png')}
                    style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        width: undefined,
                        height: undefined
                    }}
                />
            </View>
        );
    }
}
const { width, height } = Dimensions.get('window');

const styles = {
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white'
    },
    textStyles: {
        // color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    }
};



