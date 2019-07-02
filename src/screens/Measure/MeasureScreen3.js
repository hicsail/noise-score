import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import * as constants from '../../components/constants';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TextInput,
    Alert,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import NavButtons from '../../components/NavButtons';
import ClearSubmitButtons from '../../components/ClearSubmitButtons';
import axios from "axios";
import IconFA from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get('window');
export default class MeasureScreen3 extends React.Component {

    static navigationOptions = {
        title: 'Comment',
        headerStyle: {
            backgroundColor: "#31BD4B"
        },
        headerTintColor: 'white'
    };


    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            started: false
        };
    }

    clear = () => {
        this.setState({
            comment: '',
            started: false
        });
    };

    submit() {
        // Function to handle submitting a measurement
        // Get all needed data from local storage (AsyncStorage)
        // Make API call to input the measurement ('/api/inputMeasurement')
        const { navigate } = this.props.navigation;
        var success = true;

        AsyncStorage.getItem('formData', null).then(function (ret) {
            var response = JSON.parse(ret);
            console.log('\nresponse data is :\n');
            console.log(response);
            if (this.state.comment.length > 0) {
                response["words"] = this.state.comment;
            } else {
                response["words"] = " ";
            }
            response['date'] = new Date();
            AsyncStorage.getItem('userData').then(function (ret2) {
                var userData = JSON.parse(ret2);
                response["username"] = userData['user']['username'];
                response["userID"] = userData['user']['_id'];

                navigator.geolocation.getCurrentPosition(
                    position => {
                        var longitude = position['coords']['latitude'];
                        var latitude = position['coords']['longitude'];
                        response['location'] = [latitude, longitude];
                        axios.post('http://' + constants.IP_ADDRESS + '/api/inputMeasurement', response)
                            .then(function (response1) {
                                // Done!
                            })
                            .catch(function (error) {
                                success = false;
                            });
                    },
                    error => Alert.alert(error.message),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                );
            });
        }.bind(this)).then(function () {
            if (success) {
                Alert.alert(
                    'Submitted Measurement',
                    'Thanks for contributing to the project!',
                    [
                        { text: 'Continue' },
                    ],
                    { cancelable: false },
                );
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Measure' })],
                });
                this.props.navigation.dispatch(resetAction);
            } else {
                alert('Error');
            }
        }.bind(this));


    }


    render() {
        return (
            <ScrollView>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Add a comment.</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>(up to 140 characters)</Text>
                </View>
                <TextInput
                    multiline={true}
                    style={styles.textInput}
                    onChangeText={(comment) => {
                        this.setState({ comment });
                        this.state.started = true; }}
                    value={this.state.comment}
                    maxLength={140}
                />


                <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'stretch'
                    }}>

                    <TouchableOpacity
                      style={[styles.clearButton, this.state.started ? styles.darkButton : styles.disabledButton]}
                      onPress={() => this.clear()}>
                        <IconFA
                          name={'trash'}
                          color="white"
                          style={{
                              flex: 1,
                              alignSelf: 'center',
                              textAlign: 'left',
                              fontSize: width / 15
                          }}/>
                        <Text style={{
                            fontSize: width / 15,
                            color: 'white'
                        }}>Clear Comment</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'stretch'
                        }}>
                        <TouchableOpacity
                            style={[styles.button, styles.darkButton]}
                            onPress={() => this.props.navigation.navigate('Measure2')}
                        >

                            <IconFA
                                name={'arrow-left'}
                                color="white"
                                style={{
                                    flex: 1,
                                    alignSelf: 'center',
                                    textAlign: 'left',
                                    fontSize: width / 15,
                                }}
                            />
                            <View style={{
                                flex: 1,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: width / 15,
                                    color: 'white',
                                }}>Back</Text>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={[styles.button, styles.submitButton]}
                            onPress={() => this.submit()}
                        >

                            <View style={{
                                flex: 1,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: width / 15,
                                    color: 'white',
                                }}>Submit</Text></View>

                            <IconFA
                                name={'paper-plane'}
                                size={width / 15}
                                color="white"
                                style={{ flex: 1, alignSelf: 'center', textAlign: 'right' }}
                            />

                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    text: {
        fontSize: 26,
        color: "black"
    },
    textInput: {
        height: 200,
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 26
    },

    button: {
        flex: 1,
        minHeight: 40,
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderRadius: 10,
        margin: 5,
        padding: 10,
    },

    submitButton: {
        backgroundColor: '#31BD4B',
        borderColor: '#31BD4B'
    },

    darkButton: {
        backgroundColor: '#4E5255',
        borderColor: '#4E5255'
    },
    clearButton: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        minHeight: 40,
        minWidth: 120,
        marginLeft: 80,
        marginRight: 80,
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
    },
    disabledButton: {
        backgroundColor: '#B7BBBD',
        borderColor: '#B7BBBD'
    }
});
