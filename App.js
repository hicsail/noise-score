import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
    createSwitchNavigator
} from 'react-navigation';


import { AsyncStorage } from "react-native";
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


console.disableYellowBox = ["Unable to symbolicate"];

const MeasureStack = createStackNavigator({
  Measure: MeasureScreen,
  Measure1: MeasureScreen1,
  Measure2: MeasureScreen2,
  Measure3: MeasureScreen3,
});


const AccountStack = createStackNavigator({
    Account1 : {
        screen: AccountScreen,
        navigationOptions: {
            header: null

        }
    },
    Account2 : {
        screen: AccountPage,
        navigationOptions: {
            header: null

        }
    },
    Account3 : {
        screen :  moreInfo,
        navigationOptions:{
            header:null
        }
    },
    Account4 : {
        screen :  resetPassword,
        navigationOptions:{
            header:null
        }
    }
});

const MapStack = createStackNavigator({
        normalMap : {
            screen: MapScreen,
            navigationOptions: { header: null }
        }
});

const brightGreen = "#31BD4B";

const home = createBottomTabNavigator(
    {
        Map: MapStack,
        Measure: MeasureStack,
        Account: AccountStack
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
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
            headerTintColor: '#cccc31',
            headerStyle: {
                backgroundColor: '#323232'
            },
            // tintColor: '#cccc31'
        }
    },
    SignUp2: {
        screen: SignUp2,
        navigationOptions: {
            title: "",
            headerTintColor: '#cccc31',
            headerStyle: {
                backgroundColor: '#323232'
            },
        }
    },
    SignUp3: {
        screen: SignUp3,
        navigationOptions: {
            title: "",
            headerTintColor: '#cccc31',
            headerStyle: {
                backgroundColor: '#323232'
            },
        }
    }
});








export const USER_KEY = "auth-demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
    // return false;
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_KEY)
            .then(res => {
                if (res !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    });
};


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


const first = createAppContainer(root);
// const home = createAppContainer(bottomNav);




export default first;


