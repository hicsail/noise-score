import React from 'react';
import { AsyncStorage, Picker, StyleSheet, View, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import axios from "axios";
import { ListItem, Button, Text, Header, } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');
export default class AccountScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            username: "temp",
            userID: -1,
            userData: null
        };

    }

    static navigationOptions = ({ navigation }) => {
        //return header with Custom View which will replace the original header
        const { params } = navigation.state;
        return {
            header: (
                <View style={{ height: height / 10, padding: 5, backgroundColor: '#31BD4B' }}>
                    <View
                        style={{ flex: 1, justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }}>

                        <TouchableOpacity style={{
                            width: 0.15 * width, height: height / 12, margin: 5,
                            justifyContent: 'center', alignItems: 'center',
                        }}
                                          onPress={() => params.account()}>

                            <Icon
                                name="user-circle"
                                size={0.09 * width}
                                color="white"
                            />


                        </TouchableOpacity>


                        <View style={{
                            flex: 1,
                            height: null,

                            width: 0.7 * width,
                            // alignSelf: 'center',
                            // alignContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // paddingVertical: 5
                        }}>
                            <Image style={{ flex: 1, width: 0.7 * width, resizeMode: 'contain' }}
                                   source={require('./../../../assets/logo-white.png')}
                            />
                            {/*<Text style={{ fontSize: 25, color: 'white' }}>Hello, Stathis</Text>*/}
                        </View>


                        <TouchableOpacity style={{
                            width: 0.15 * width, height: height / 12, margin: 5,
                            justifyContent: 'center', alignItems: 'center'
                        }}
                                          disabled={true}
                        >

                            {/*<Image style={{ flex: 1, width: 0.15 * width, resizeMode: 'contain' }}*/}
                            {/*source={require('./../../../assets/mic-white.png')}*/}
                            {/*/>*/}

                            {/*<Image style={{ flex: 1, width: 0.15 * width, resizeMode: 'contain' }}*/}
                            {/*source={require('./../../../assets/logo-white.png')}*/}
                            {/*/>*/}

                            {/*<Button*/}
                            {/*style={{ backgroundColor: 'red', color: 'black' }}*/}
                            {/*onPress={() => navigation.goBack()}*/}
                            {/*title={'Back'}*/}
                            {/*/>*/}
                        </TouchableOpacity>
                    </View>
                </View>
            ),
        };
    };

    componentDidMount() {
        // Add listener to notice when we need to reload data. Whenever we move to this screen
        // Also make API call to get all the users measurements and save it as a local variable

        this.props.navigation.setParams({ account: this.account });
        this.subs = [
            this.props.navigation.addListener('willFocus', () => this.updateData())
        ];
        var self = this;
        // Get the information for the Account Screen
        AsyncStorage.getItem('userData').then(function (ret) {
            if (ret) {
                var response = JSON.parse(ret);
                var authHeader = response['authHeader'];
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                };
                this.setState({
                    username: response['user']['username'],
                    userID: response['user']['_id']
                }, function () {
                    // Now we need to get all their measurement information
                    var params = {
                        userID: this.state.userID,
                        username: this.state.username
                    };
                    axios.get('http://10.0.2.2:9000/api/userMeasurements', {
                        headers: header,
                        params: params
                    }).then(function (ret) {
                        self.setState({
                            userData: ret['data']
                        });
                        console.log("\n\n\n\n\n\n\n\n");
                        console.log(ret['data'])
                    }).catch(function (error) {
                        // If there is an error sign out
                        alert(error);
                        this.props.navigation("SignedOut");
                    });
                });
            }
        }.bind(this));
    }

    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch (exception) {
            return false;
        }
    }


    moreInfo(data) {
        // Store the data we already have (the specific measurement)  and move to moreInfo.js
        AsyncStorage.setItem("moreInfo", JSON.stringify(data));
        const { navigate } = this.props.navigation;
        navigate("Account3");
    }

    generateData(data) {
        // Function that creates the iterator used to
        // generate what is displayed for the data. Used in the final render

        var dateFormat = require('dateformat');
        if (data != null) {
            var counter = -1;
            return data.reverse().map((data) => {
                counter += 1;
                if (data['rawData']["average"] < 10) {
                    return (
                        <ListItem
                            key={counter}
                            leftAvatar={{ source: require('./../../../assets/soft.png') }}
                            title={dateFormat(data['date'], "ddd, mmm dS, yyyy, h:MM TT")}
                            subtitle={data['rawData']["average"].toString() + " dB " + "| " + data['sources'][0]}
                            rightIcon={<Icon
                                name="arrow-right"
                                size={15}
                                color="#323232"
                            />}
                            onPress={() => {
                                this.moreInfo(data)
                            }}
                        />
                    )
                } else if (data['rawData']["average"] > 10 && data['rawData']["average"] < 40) {
                    return (
                        <ListItem
                            key={counter}
                            leftAvatar={{ source: require('./../../../assets/medium.png') }}
                            title={dateFormat(data['date'], "ddd, mmm dS, yyyy, h:MM TT")}
                            subtitle={data['rawData']["average"].toString() + " dB " + "| " + data['sources'][0]}
                            rightIcon={<Icon
                                name="arrow-right"
                                size={15}
                                color="#323232"
                            />}
                            onPress={() => {
                                this.moreInfo(data)
                            }}
                        />
                    )
                } else {
                    return (
                        <ListItem
                            key={counter}
                            leftAvatar={{ source: require('./../../../assets/loud.png') }}
                            title={dateFormat(data['date'], "ddd, mmm dS, yyyy, h:MM TT")}
                            subtitle={data['rawData']["average"].toString() + " dB " + "| " + data['sources'][0]}
                            rightIcon={<Icon
                                name="arrow-right"
                                size={15}
                                color="#323232"
                            />}
                            onPress={() => {
                                this.moreInfo(data)
                            }}
                        />
                    )
                }
            });
        }
    }

    updateData() {
        // Function to update the data to show to the user
        // Makes API call '/api/userMeasurements' and
        // stores in local storage (AsyncStorage)

        // If we have the data to make the correct API call
        if (this.state.userID != -1 && this.state.username != "temp") {
            var self = this;
            var params = {
                userID: this.state.userID,
                username: this.state.username
            };
            // Update the userData by making the call 'api/userMeasurements'
            AsyncStorage.getItem('userData').then(function (ret) {
                if (ret) {
                    var response = JSON.parse(ret);
                    var authHeader = response['authHeader'];
                    const header = {
                        'Content-Type': 'application/json',
                        'Authorization': authHeader
                    };
                    axios.get('http://10.0.2.2:9000/api/userMeasurements', {
                        headers: header,
                        params: params
                    }).then(function (ret) {
                        self.setState({
                            userData: ret['data']
                        });
                        // this.generateData(self);
                    }).catch(function (error) {
                        alert(error);
                        this.props.navigation("SignedOut");
                    });
                }
            });

        }
    }

    reloadButton() {
        // Simple function to reload the data
        this.updateData();
        this.forceUpdate();
    }

    accountPage() {
        // Function to move to AccountPage.js
        const { navigate } = this.props.navigation;
        navigate("Account2");
    }

    account = () => {
        const { navigate } = this.props.navigation;
        navigate("Account2");
    };

    render() {
        const { username } = this.state;
        var data = this.state.userData;
        var list = this.generateData(data);
        return (
            <View style={styles.container}>
                {/*<Header*/}
                {/*centerComponent={{ text: username, style: { color: '#323232' } }}*/}
                {/*containerStyle={styles.header}*/}
                {/*leftComponent={*/}
                {/*<Button*/}
                {/*icon={*/}
                {/*<Icon*/}
                {/*name="user-circle"*/}
                {/*size={15}*/}
                {/*color="white"*/}
                {/*/>*/}
                {/*}*/}
                {/*onPress={() => this.accountPage()}*/}
                {/*buttonStyle={styles.button}/>}*/}
                {/*rightComponent={*/}
                {/*<Button*/}
                {/*icon={*/}
                {/*<Icon*/}
                {/*name="retweet"*/}
                {/*size={15}*/}
                {/*color="white"*/}
                {/*/>*/}
                {/*}*/}
                {/*onPress={() => this.reloadButton()}*/}
                {/*buttonStyle={styles.button}/>}*/}
                {/*/>*/}
                <ScrollView>
                    <View>
                        {list}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#31BD4B',
    },
    button: {
        backgroundColor: '#323232'
    }
});
