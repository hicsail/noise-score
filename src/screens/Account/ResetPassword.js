import React from 'react';
import {AsyncStorage, StyleSheet, View} from 'react-native';
import axios from "axios";
import {Button, Text, Header, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AccountScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "temp",
            userID: -1,
            password: null
        };
    }

    componentDidMount() {
        // Get the information for the Account Screen from local storage (AsyncStorage)
        AsyncStorage.getItem('userData').then(function (ret) {
            if (ret) {
                var response = JSON.parse(ret);
                var authHeader = response['authHeader'];
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization' : authHeader
                };
                this.setState({
                    username : response['user']['username'],
                    userID : response['user']['_id']
                }, function(){
                    // Now we need to get all their measurement information
                    var params = {
                        userID : this.state.userID,
                        username : this.state.username
                    };

                });
            }
        }.bind(this));
    }

    // Helper function to delete local storage
    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (exception) {
            return false;
        }
    }

    accountScreen() {
        // Navigate to AccountScreen.js
        const {navigate} = this.props.navigation;
        navigate("Account2");
    }

    render() {
            return (
                <View style={styles.container}>
                    <Header
                        centerComponent={{ text: this.state.username, style: { color: '#323232' } }}
                        containerStyle={styles.header}
                        leftComponent={<Button  icon={
                            <Icon
                                name="arrow-left"
                                size={15}
                                color="white"
                            />
                        }onPress = {() => this.accountScreen()}
                                                buttonStyle={styles.headerButton}/>}
                    />
                    <View style={styles.content}>

                        <Text style={styles.text}>Enter your new password:</Text>
                        <Text>{"\n"}</Text>
                        <Input
                            style={styles.textInput}
                            autoCapitalize = 'none'
                            onChangeText={(password) => this.setState({password})}
                            placeholder='Password'
                        />
                        <Text>{"\n"}</Text>
                        <Input
                            style={styles.textInput}
                            autoCapitalize = 'none'
                            placeholder='Confirm Password'
                        />
                        <Text>{"\n"}</Text>
                        <Button
                            buttonStyle={styles.button}
                            backgroundColor="transparent"
                            textStyle={{ color: "#bcbec1" }}
                            title="Submit"
                            onPress={() => this.resetPassword()}
                        />
                    </View>
                </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    backButton : {
        backgroundColor : '#cccc31'
    },
    bottomHalf : {
        backgroundColor: '#323232',
        height: '30%',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex : 1

    },
    textHeader: {
        fontSize: 20,
        fontWeight : 'bold',
        color: "white",
        textAlign: 'center'
    },
    text: {
        fontSize: 15,
        color: "black",
        textAlignVertical: "center",
        textAlign: "left",
        fontFamily: 'Euphemia UCAS',
    },
    buttonPosition : {
        position: 'absolute',//use absolute position to show button on top of the map
        top: '50%', //for center align
        alignSelf: 'flex-end' //for align to right
    },
    button : {
        marginTop: 20,
        backgroundColor: '#323232',
        marginHorizontal: 100
    },
    header : {
        backgroundColor:  '#31BD4B',
        zIndex: 999
    },
    headerButton : {
        backgroundColor : '#323232'
    },
    content : {
        marginTop : "50%",
        width: '75%',
        alignItems: 'center',
        textAlign: 'center'
    },
    textInput : {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },

});


const lightGreen = '#31BD4B';


