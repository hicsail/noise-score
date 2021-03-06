import { createStackNavigator } from "react-navigation";
import LoginScreen from "./Login/LoginScreen";
import SignUp from "./Login/SignUp";
import SignUp2 from "./Login/SignUp2";
import SignUp3 from "./Login/SignUp3";
import ForgotResetPassword from "./Login/ForgotResetPassword";
import MeasureScreen from "./Measure/MeasureScreen";
import MeasureScreen1 from "./Measure/MeasureScreen1";
import MeasureScreen2 from "./Measure/MeasureScreen2";
import MeasureScreen3 from "./Measure/MeasureScreen3";


export const Measurements = createStackNavigator({
    Measure: MeasureScreen,
    Measure1: MeasureScreen1,
    Measure2: MeasureScreen2,
    Measure3: MeasureScreen3,
});

// export const login = createStackNavigator({
//     SignIn: {
//         screen: LoginScreen,
//         navigationOptions: {
//             header: null
//
//         }
//     },
//     SignUp1: {
//         screen: SignUp,
//         navigationOptions: getHeader(),
//     },
//     SignUp2: {
//         screen: SignUp2,
//         navigationOptions: getHeader(),
//
//     },
//     SignUp3: {
//         screen: SignUp3,
//         navigationOptions: getHeader(),
//
//     },
//     ForgotResetPassword: {
//         screen: ForgotResetPassword,
//         navigationOptions: getHeader("Login"),
//     }
//
// });

function getHeader(title = "", tintcolor = '#323232', headbgcolor = '#31BD4B') {
    return {
        title: title,
        headerTintColor: tintcolor,
        headerStyle: {
            backgroundColor: headbgcolor
        }
    }
}
