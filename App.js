import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    createBottomTabNavigator,
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';

import { View, Image, Dimensions } from 'react-native'
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
import ForgotResetPassword from "./src/screens/Login/ForgotResetPassword";
import ResetPassword from "./src/screens/Login/ResetPassword"
import Splashscreen from "./src/screens/Login/Splashscreen";
import Text from "react-native-elements/src/text/Text";

const { width, height } = Dimensions.get('window');
console.disableYellowBox = ["Unable to symbolicate"];
const brightGreen = "#31BD4B";


// --------------------- Stack Navigators ---------------------

//Recordings stack navigator for its 4 screens
const MeasureStack = createStackNavigator({
    Measure: { screen: MeasureScreen, navigationOptions: getHeader(false) },
    Measure1: { screen: MeasureScreen1, navigationOptions: getHeader(true) },
    Measure2: { screen: MeasureScreen2,  },
    Measure3: { screen: MeasureScreen3, navigationOptions: getHeader(true) },
});


const AccountStack = createStackNavigator({
    Account1: { screen: AccountScreen, navigationOptions: getHeader(false) },
    Account2: { screen: AccountPage, navigationOptions: getHeader(true) },
    Account3: { screen: moreInfo, navigationOptions: getHeader(true) },
});

// const ForgotPassStack = createStackNavigator({
//     Account: AccountStack,
//     ForgotPass: ForgotResetPassword
// });


const MapStack = createStackNavigator({
    normalMap: { screen: MapScreen, navigationOptions: getHeader(false) }
});

const home = createBottomTabNavigator(
    {
        Map: MapStack,
        Measure: MeasureStack,
        Account: AccountStack,
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
                defaultHandler();
            }
        }),
        tabBarOptions: {
            activeTintColor: brightGreen,
            inactiveTintColor: 'gray',
        }
    }
);

// export const SignupStack = createStackNavigator(
//     {
//
//     },
//     {
//         // header: getHeader()
//     }
// );

const ForgotPassStack = createStackNavigator({
    ForgotResetPassword: { screen: ForgotResetPassword },
    ResetPassword: { screen: ResetPassword },
});


export function getHeader(rightComponent) {
    return {
        headerTitleStyle: {
            alignSelf: 'center',
            textAlign: "center",
            justifyContent: 'center',
            flex: 1,
            fontWeight: 'bold',
            textAlignVertical: 'center'
        },
        headerTitle: <Image source={require("./assets/logo-bright-green.png")} resizeMode={'contain'}
                            style={{
                                height: height / 8,
                                alignSelf: "center",
                                // width: width / 2,
                                marginLeft: "auto",
                                marginRight: "auto"
                            }}/>,
        headerStyle: {
            backgroundColor: 'lightgray',
            height: height / 10
        },
        headerRightStyle: {
            alignSelf: 'center',
            textAlign: "center",
            justifyContent: 'center',
            flex: 1,
            fontWeight: 'bold',
            textAlignVertical: 'center',
            backgroundColor: 'white'
        },
        headerRight: rightComponent ? <View></View> : null,

        headerTintColor: "white",
    }
}

export const Login = createStackNavigator({
        SignIn: {
            screen: LoginScreen,
            navigationOptions: { header: null }
        },

        SignUp1: {
            screen: SignUp,
            navigationOptions: getHeader("Step 1/3"),
        },
        SignUp2: {
            screen: SignUp2,
            // navigationOptions: getHeader("Step 2/3"),
        },
        SignUp3: {
            screen: SignUp3,
            // navigationOptions: getHeader("Step 3/3"),
        },

        ForgotResetPassword: {
            screen: ForgotResetPassword,
            navigationOptions: getHeader("Forgot Password ?"),
        },

        ResetPassword: {
            screen: ResetPassword,
            navigationOptions: getHeader("Reset Password")
        }


    }
    , {
        // headerMode: getHeader()
    }
);


export const root = createStackNavigator({
        SignedIn: { screen: home },
        SignedOut: { screen: Login }
    },
);


// const First = createAppContainer(root);

const AppNavigator = createSwitchNavigator({
        Splash: Splashscreen,
        App: home,
        UserLogin: Login
    },
    {
        initialRoute: Splashscreen
    });


export default createAppContainer(AppNavigator);