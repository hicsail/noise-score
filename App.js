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
import LoginScreen from './src/screens/Login/LoginScreen';
import SignUp from './src/screens/Login/SignUp';
import SignUp2 from './src/screens/Login/SignUp2';
import SignUp3 from './src/screens/Login/SignUp3';


console.disableYellowBox = ["Unable to symbolicate"];

const MeasureStack = createStackNavigator({
  Measure: MeasureScreen,
  Measure1: MeasureScreen1,
  Measure2: MeasureScreen2,
  Measure3: MeasureScreen3,
});



const brightGreen = "#31BD4B";

const home = createBottomTabNavigator(
    {
        Map: MapScreen,
        Measure: MeasureStack,
        Account: AccountScreen
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
            title: "Sign In"
        }
    },
    SignUp1: {
        screen: SignUp,
        navigationOptions: {
            title: "Sign Up"
        }
    },
    SignUp2: {
        screen: SignUp2,
        navigationOptions: {
            title: "Sign Up"
        }
    },
    SignUp3: {
        screen: SignUp3,
        navigationOptions: {
            title: "Sign Up"
        }
    }
});




// export const createRootNavigator = (signedIn = false) => {
//     return createSwitchNavigator(
//         {
//             SignedIn: {
//                 screen: bottomNav
//             },
//             SignedOut: {
//                 screen: login
//             }
//         },
//         {
//             initialRouteName: signedIn ? "SignedIn" : "SignedOut"
//         }
//     );
// };

//
// export const createRootNavigator = (signedIn = false) => {
//     return createSwitchNavigator(
//         {
//             SignedIn: {
//                 screen: home
//             },
//             SignedOut: {
//                 screen: login
//             }
//         },
//         {
//             initialRouteName: signedIn ? "SignedIn" : "SignedOut"
//         }
//     );
// };



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


