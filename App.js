import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    createBottomTabNavigator,
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';

import { Input, Text, Button } from 'react-native-elements';
import { StyleSheet, View, ScrollView, AsyncStorage, Image, Alert } from 'react-native';
// import { AsyncStorage } from "react-native";
import MapScreen from './src/screens/Map/MapScreen';
import MeasureScreen from './src/screens/Measure/MeasureScreen';
import MeasureScreen1 from './src/screens/Measure/MeasureScreen1';
import MeasureScreen2 from './src/screens/Measure/MeasureScreen2';
import MeasureScreen3 from './src/screens/Measure/MeasureScreen3';
import AccountScreen from './src/screens/Account/AccountScreen';
import moreInfo from './src/screens/Account/moreInfo';
import AccountPage from './src/screens/Account/AccountPage';
import LoginScreen from './src/screens/Login/LoginScreen';
import SignUp from './src/screens/Login/SignUp';
import SignUp2 from './src/screens/Login/SignUp2';
import SignUp3 from './src/screens/Login/SignUp3';
import resetPassword from './src/screens/Account/ResetPassword';
import ForgotResetPassword from "./src/screens/Login/ForgotResetPassword";
import axios from "axios";


console.disableYellowBox = ["Unable to symbolicate"];

const MeasureStack = createStackNavigator({
    Measure: MeasureScreen,
    Measure1: MeasureScreen1,
    Measure2: MeasureScreen2,
    Measure3: MeasureScreen3,
});


const AccountStack = createStackNavigator({
    Account1: AccountScreen,
    Account2: AccountPage,
    Account3: moreInfo,
    // Account4: resetPassword,
});

const ForgotPassStack = createStackNavigator({
    LoginScreen: LoginScreen,
    ForgotPass: ForgotResetPassword
});

const MapStack = createStackNavigator({
    normalMap: {
        screen: MapScreen,
        navigationOptions: { header: null }
    }
});

const brightGreen = "#31BD4B";

const home = createBottomTabNavigator(
    {
        Map: MapStack,
        Measure: MeasureStack,
        Account: AccountStack,
        ForgotPass: ForgotPassStack
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Account') {
                    iconName = `user`;
                } else if (routeName === 'Map') {
                    iconName = `map`;
                } else if (routeName === 'Measure') {
                    iconName = `microphone`;
                }

                // You can return any component that you like here!
                return <Icon name={iconName} size={25} color={tintColor}/>;
            },
            tabBarOnPress: ({ navigation, defaultHandler }) => {
                // if(navigation.state.routeName == "Account"){
                //     console.log(navigation);
                // }
                // if (args.scene.focused) { // if tab currently focused tab
                //     if (args.scene.route.index !== 0) { // if not on first screen of the StackNavigator in focused tab.
                //         navigation.dispatch(NavigationActions.reset({
                //             index: 0,
                //             actions: [
                //                 NavigationActions.navigate({ routeName: args.scene.route.routes[0].routeName }) // go to first screen of the StackNavigator
                //             ]
                //         }))
                //     }
                // } else {
                //     args.jumpToIndex(args.scene.index) // go to another tab (the default behavior)
                // }
                defaultHandler();
            }
        }),
        tabBarOptions: {
            activeTintColor: brightGreen,
            inactiveTintColor: 'gray',
        }
    }
);


const SignUpStack = createStackNavigator({
    SignUp: SignUp,
    SignUp1: SignUp2,
    SignUp3: SignUp3,
});

export const login = createStackNavigator({
    SignIn: {
        screen: LoginScreen,
        navigationOptions: {
            header: null

        }
    },
    SignUp1: {
        screen: SignUp,
        navigationOptions: {
            title: "",
            headerTintColor: '#323232',
            headerStyle: {
                backgroundColor: '#31BD4B'
            },
            // tintColor: '#cccc31'
        }
    },
    SignUp2: {
        screen: SignUp2,
        navigationOptions: {
            title: "",
            headerTintColor: '#323232',
            headerStyle: {
                backgroundColor: '#31BD4B'
            },
        }
    },
    SignUp3: {
        screen: SignUp3,
        navigationOptions: {
            title: "",
            headerTintColor: '#323232',
            headerStyle: {
                backgroundColor: '#31BD4B'
            },
        }
    },
    ForgotResetPassword: {
        screen: ForgotResetPassword,
        navigationOptions: {
            title: "Forgot Password",
            headerTintColor: '#323232',
            headerStyle: {
                backgroundColor: '#31BD4B'
            },
        }
    }
});


// export const USER_KEY = "auth-demo-key";
//
// export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");
//
// export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);
//
// export const isSignedIn = () => {
//     // return false;
//     return new Promise((resolve, reject) => {
//         AsyncStorage.getItem(USER_KEY)
//             .then(res => {
//                 if (res !== null) {
//                     resolve(true);
//                 } else {
//                     resolve(false);
//                 }
//             })
//             .catch(err => reject(err));
//     });
// };


var signedIn = false;


export const root = createSwitchNavigator({
        SignedIn: {
            screen: home
        },
        SignedOut: {
            screen: login
        }
    },
    {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
);


const First = createAppContainer(root);

// const home = createAppContainer(bottomNav);

// class AuthLoading extends React.Component() {
//     constructor(props){
//         super(props);
//         this.fetchStatus();
//     }
//
//     fetchStatus = async () => {
//         const loggedIn = await
//     }
// }


export class Authentication extends React.Component {

}

export class SplashScreen extends React.Component {
    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => {
                    resolve('result')
                },
                2000
            )
        )
    };

    async AuthenticateUser() {
        return await (
            AsyncStorage.getItem("userData", null).then(async function (ret) {
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


                        return axios.get('http://10.0.2.2:9000/api/sessions/my', { headers: header })
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

    componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        // const data = await this.performTimeConsumingTask();

        const data2 = this.AuthenticateUser();
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        console.log("data is " + data2);
        if (data2) {
            this.props.navigation.navigate('App');
        }
        else {
            this.props.navigation.navigate("UserLogin")
        }
    }

    render() {
        return (
            <View style={styles.viewStyles}>
                <Image
                    source={require('./assets/splash_logo.jpeg')}
                    style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        width: undefined,
                        height: undefined
                    }}
                />
                <Image
                    source={require('./assets/splash-image.jpeg')}
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

const styles = {
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'orange'
    },
    textStyles: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    }
};

const Second = createSwitchNavigator({
    Splash: SplashScreen,
    App: First,
    UserLogin: LoginScreen
});

// export default createAppContainer(InitialNavigator);
//
// export default class App extends React.Component {
//     render() {
//         return <Second/>
//     }
// }


export default createAppContainer(Second);