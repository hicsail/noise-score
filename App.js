import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    createBottomTabNavigator,
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';
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


console.disableYellowBox = ["Unable to symbolicate"];
const brightGreen = "#31BD4B";


// --------------------- Stack Navigators ---------------------

//Recordings stack navigator for its 4 screens
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
});



const SignUpStack = createStackNavigator({
    SignUp: SignUp,
    SignUp1: SignUp2,
    SignUp3: SignUp3,
});


const MapStack = createStackNavigator({
    normalMap: {
        screen: MapScreen,
        navigationOptions: { header: null }
    }
});


const ForgotPassStack = createStackNavigator({
    ForgotResetPassword: { screen: ForgotResetPassword },
    ResetPassword: { screen: ResetPassword },
});

// const ForgotPassStack = createStackNavigator({
//     Account: AccountStack,
//     ForgotPass: ForgotResetPassword
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



const login = createStackNavigator({
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
        navigationOptions: getHeader("Step 2/3"),

    },
    SignUp3: {
        screen: SignUp3,
        navigationOptions: getHeader("Step 3/3"),

    },
    ForgotResetPassword: {
        screen: ForgotResetPassword,
        navigationOptions: getHeader("Forgot Password ?"),
    },

    ResetPassword: {
        screen: ResetPassword,
        navigationOptions: getHeader("Reset Password")
    }

});

export const root = createStackNavigator({
        SignedIn: { screen: home },
        SignedOut: { screen: login }
    },
);


const Second = createSwitchNavigator({
    Splash: Splashscreen,
    App: home,
    UserLogin: login
});


function getHeader(title = "", tintcolor = '#323232', headbgcolor = '#31BD4B') {
    return {
        title: title,
        headerTintColor: tintcolor,
        headerStyle: {
            backgroundColor: headbgcolor
        }
    }
}

export default createAppContainer(Second);
