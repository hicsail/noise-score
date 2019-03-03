import { AppRegistry } from 'react-native';
import App from './App';
import { noisescore as noisescore } from './app.json';
AppRegistry.registerComponent('noisescore', () => App);


// import { createRootNavigator } from "./App";
// import React from "react";
// import { isSignedIn } from "./auth";
//
// export default class App extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             signedIn: false,
//             checkedSignIn: false
//         };
//     }
//
//     componentDidMount() {
//         isSignedIn()
//             .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
//             .catch(err => alert("An error occurred"));
//     }
//
//     render() {
//         const { checkedSignIn, signedIn } = this.state;
//
//         // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
//         if (!checkedSignIn) {
//             return null;
//         }
//
//         if (signedIn) {
//             return <SignedIn />;
//         } else {
//             return <SignedOut />;
//         }
//     }
//
//
// }


// import App from './App';

// import React from "react";
// import { Login } from "./App";
//
// export default class App extends React.Component {
//     render() {
//         return <Login />;
//     }
// }
