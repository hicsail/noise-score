import React, { Component } from 'react';
import { Platform } from 'react-native';
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
import TermsConditions from './src/screens/Login/TermsConditions';
import ForgotResetPassword from "./src/screens/Login/ForgotResetPassword";
import ResetPassword from "./src/screens/Login/ResetPassword"
import Splashscreen from "./src/screens/Login/Splashscreen";
import Text from "react-native-elements/src/text/Text";
import HeatmapFilters from "./src/screens/Map/HeatmapFilters";

import OneSignal from 'react-native-onesignal'; // Import package from node modules

const { width, height } = Dimensions.get('window');
console.disableYellowBox = ["Unable to symbolicate"];
const brightGreen = "#31BD4B";


// --------------------- Stack Navigators ---------------------

//Recordings stack navigator for its 4 screens
const MeasureStack = createStackNavigator({
    Measure: { screen: MeasureScreen, navigationOptions: getHeader(false) },
    Measure1: { screen: MeasureScreen1, navigationOptions: getHeader(true) },
    Measure2: { screen: MeasureScreen2, navigationOptions: getHeader(true) },
    Measure3: { screen: MeasureScreen3, navigationOptions: getHeader(true) },
});


const AccountStack = createStackNavigator({
    Account1: { screen: AccountScreen, },
    Account2: { screen: AccountPage, navigationOptions: getHeader(true) },
    Account3: { screen: moreInfo, navigationOptions: getHeader(true) },
});



const SignUpStack = createStackNavigator({
    SignUp: SignUp,
    SignUp1: SignUp2,
    SignUp3: SignUp3,
});


const MapStack = createStackNavigator({
    normalMap: { screen: MapScreen, navigationOptions: getHeader(false) },
    HeatmapFilters: {screen: HeatmapFilters, navigationOptions:getHeader(true)}
});


// const ForgotPassStack = createStackNavigator({
//     ForgotResetPassword: { screen: ForgotResetPassword },
//     ResetPassword: { screen: ResetPassword },
// });


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


export function getHeader(rightComponent) {
    return {
        headerTitleStyle: {
            flex: 1,
            height: null,

            width: 0.7 * width,
            // alignSelf: 'center',
            // alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            // paddingVertical: 5
        },
        headerTitle: <Image style={{ flex: 1, height: height / 10 - 10, resizeMode: 'contain' }}
                            source={require('./assets/logo-white.png')}
        />,
        headerStyle: {
            height: height / 10, backgroundColor: '#31BD4B'
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
        headerBackTitle: ' ',
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
            navigationOptions: getHeader(true),
        },
        SignUp2: {
            screen: SignUp2,
            navigationOptions: getHeader(true),
        },
        SignUp3: {
            screen: SignUp3,
            navigationOptions: getHeader(true),
        },

        TermsConditions: {
            screen: TermsConditions,
            navigationOptions: getHeader(true),
        },

        ForgotResetPassword: {
            screen: ForgotResetPassword,
            navigationOptions: getHeader(true),
        },

        ResetPassword: {
            screen: ResetPassword,
            navigationOptions: getHeader(true)
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
let AppNavigator;

// iOS uses LaunchScreen.xib as splashscreen
// if (Platform.OS === 'ios') {
//
//     AppNavigator = createSwitchNavigator({
//         UserLogin: Login,
//         App: home
//     });
//
// } else {
    AppNavigator = createSwitchNavigator({
            Splash: Splashscreen,
            App: home,
            UserLogin: Login
        },
        {
            initialRoute: Splashscreen
        });
// }

export default class App extends Component {

    constructor(properties) {
        super(properties);

        // TODO - make hicsail OneSignal Account
        OneSignal.init("aa0fa885-0f3e-47c8-b21c-abcf075727ec");
        OneSignal.configure();
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
      }
    
      componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
      }
    
      onReceived(notification) {
        console.log("Notification received: ", notification);
      }
    
      onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
      }
    
      onIds(device) {
        console.log('Device info: ', device);
      }

      render() {
        /* In the root component we are rendering the app navigator */
        return <AppContainer />;
      }
    }


    const AppContainer = createAppContainer(AppNavigator);
