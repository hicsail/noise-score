import React from 'react';
import {StyleSheet, Text, View, Button, ScrollView, Slider, Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import * as constants from '../../components/constants';

export default class AccountScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weekdayCommuting: 10,
            weekdayActivities: 40,
            weekdayHome: 20,
            weekdaySleeping: 20,
            weekdayPhysical: 5,
            weekdayRunning: 5,
            weekendCommuting: 10,
            weekendActivities: 40,
            weekendHome: 20,
            weekendSleeping: 20,
            weekendPhysical: 5,
            weekendRunning: 5,
            pressed: false,
        }
        ;
    }

    // componentDidMount() {
    //     this.next();
    // }

    next() {
        // Make API call to verify that we can create a user
        // Then navigate to MapScreen.js

        const { navigate } = this.props.navigation;
        // We know all inputs will be valid
        // Now we need to add it to form data

        AsyncStorage.getItem('formData').then(function (ret) {
            var response = JSON.parse(ret);
            var weekdayArray = [this.state.weekdayCommuting, this.state.weekdayActivities, this.state.weekdayHome, this.state.weekdaySleeping, this.state.weekdayRunning];
            var weekendArray = [this.state.weekendCommuting, this.state.weekendActivities, this.state.weekdayHome, this.state.weekdaySleeping, this.state.weekendRunning];
            response['weekday'] = weekdayArray;
            response['weekend'] = weekendArray;
            AsyncStorage.setItem("formData", JSON.stringify(response));
            // We need to make the API call to create a new user

            let url = 'http://' + constants.IP_ADDRESS + '/api/signup';
            axios.post(url, response).then(function (response){
                // Lets save relevent information and login!
                Alert.alert(
                    'Welcome to Noise Score!',
                    'Click measurements to get started.',
                    [
                        { text: 'Lets go!', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                );
                let ret = response['data'];
                AsyncStorage.setItem("userData", JSON.stringify(ret));
                navigate("App")
            }).catch(function (error) {
                console.log(error);
                alert(error.message);
            });

        }.bind(this)).then(function () {
            navigate('TermsConditions');
        }.bind(this));
    }

    render() {
        const step = 5;
        return (


            <View style={styles.container}>

                <View>

                    <ScrollView>
                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}>Last few questions! </Text>
                            </View>
                        </View>
                        <View style={styles.padding}>
                            <Text>
                                <Text style={styles.text}>On a general </Text>
                                <Text style={styles.innerText}>weekday </Text>
                                <Text style={styles.text}>what percentage of time do you spend:</Text>
                            </Text>
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}>Commuting: {this.state.weekdayCommuting}%</Text>
                            </View>
                            <Slider
                                style={{ width: 300 }}
                                step={step}
                                minimumValue={0}
                                maximumValue={100}
                                value={this.state.weekdayCommuting}
                                onValueChange={val => this.setState({ age: val })}
                                onSlidingComplete={val => this.setweekdayCommuting(val)}
                            />
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}>Activities at school or
                                    work: {this.state.weekdayActivities}%</Text>
                            </View>

                            <Slider
                                style={{ width: 300 }}
                                step={step}
                                minimumValue={0}
                                maximumValue={100}
                                value={this.state.weekdayActivities}
                                onValueChange={val => this.setState({ age: val })}
                                onSlidingComplete={val => this.setweekdayActivities(val)}
                            />
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}>At home: {this.state.weekdayHome}%</Text>
                            </View>
                            <Slider
                                style={{ width: 300 }}
                                step={step}
                                minimumValue={0}
                                maximumValue={100}
                                value={this.state.weekdayHome}
                                onValueChange={val => this.setState({ age: val })}
                                onSlidingComplete={val => this.setweekdayHome(val)}
                            />
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}>Sleeping: {this.state.weekdaySleeping}%</Text>
                            </View>

                            <Slider
                                style={{ width: 300, color: 'red' }}
                                step={step}
                                minimumValue={0}
                                maximumValue={100}
                                value={this.state.weekdaySleeping}
                                onValueChange={val => this.setState({ age: val })}
                                onSlidingComplete={val => this.setweekdaySleeping(val)}
                            />
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}>Physical Activity: {this.state.weekdayPhysical}%</Text>
                            </View>
                            <Slider
                                style={{ width: 300 }}
                                step={step}
                                minimumValue={0}
                                maximumValue={100}
                                value={this.state.weekdayPhysical}
                                onValueChange={val => this.setState({ age: val })}
                                onSlidingComplete={val => this.setweekdayPhysical(val)}
                            />
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}>Running errands: {this.state.weekdayRunning}%</Text>
                            </View>
                            <Slider
                                style={{ width: 300 }}
                                step={step}
                                minimumValue={0}
                                maximumValue={100}
                                value={this.state.weekdayRunning}
                                onValueChange={val => this.setState({ age: val })}
                                onSlidingComplete={val => this.setweekdayRunning(val)}
                            />
                        </View>
                        <View style={styles.padding}>
                            <Text>
                                <Text style={styles.text}>On a general </Text>
                                <Text style={styles.innerText}>weekend </Text>
                                <Text style={styles.text}>what percentage of time do you spend:</Text>
                            </Text>
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}>Commuting: {this.state.weekendCommuting}%</Text>
                            </View>

                            <Slider
                                style={{ width: 300 }}
                                step={step}
                                minimumValue={0}
                                maximumValue={100}
                                value={this.state.weekendCommuting}
                                onValueChange={val => this.setState({ age: val })}
                                onSlidingComplete={val => this.setweekendCommuting(val)}
                            />
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}>Activities at school or
                                    work: {this.state.weekendActivities}%</Text>
                            </View>
                            <Slider
                                style={{ width: 300 }}
                                step={step}
                                minimumValue={0}
                                maximumValue={100}
                                value={this.state.weekendActivities}
                                onValueChange={val => this.setState({ age: val })}
                                onSlidingComplete={val => this.setweekendActivities(val)}
                            />
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}>At home: {this.state.weekendHome}%</Text>
                            </View>
                            <Slider
                                style={{ width: 300 }}
                                step={step}
                                minimumValue={0}
                                maximumValue={100}
                                value={this.state.weekendHome}
                                onValueChange={val => this.setState({ age: val })}
                                onSlidingComplete={val => this.setweekendHome(val)}
                            />
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}>Sleeping: {this.state.weekendSleeping}%</Text>
                            </View>
                            <Slider
                                style={{ width: 300 }}
                                step={step}
                                minimumValue={0}
                                maximumValue={100}
                                value={this.state.weekendSleeping}
                                onValueChange={val => this.setState({ age: val })}
                                onSlidingComplete={val => this.setweekendSleeping(val)}
                            />
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}>Physical Activity: {this.state.weekendPhysical}%</Text>
                            </View>
                            <Slider
                                style={{ width: 300 }}
                                step={step}
                                minimumValue={0}
                                maximumValue={100}
                                value={this.state.weekendPhysical}
                                onValueChange={val => this.setState({ age: val })}
                                onSlidingComplete={val => this.setweekendPhysical(val)}
                            />
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.wrapText}>
                                <Text style={styles.text}>Running errands: {this.state.weekendRunning}%</Text>
                            </View>
                            <Slider
                                style={{ width: 300 }}
                                step={step}
                                minimumValue={0}
                                maximumValue={100}
                                value={this.state.weekendRunning}
                                onValueChange={val => this.setState({ age: val })}
                                onSlidingComplete={val => this.setweekendRunning(val)}
                            />
                        </View>
                    </ScrollView>
                    <Text> hi</Text>
                    <View style={{ position: 'absolute', bottom: 0 }}>
                        <Button
                            title="Next"
                            onPress={() => this.next()}
                            buttonStyle={styles.button}
                            backgroundColor={'white'}
                            color={'#323232'}
                        />
                    </View>
                </View>

            </View>

        );
    }

    setweekdayCommuting(value) {
        this.setState({
            weekdayCommuting: value
        });
    }

    setweekdayActivities(value) {
        this.setState({
            weekdayActivities: value
        });
    }

    setweekdayHome(value) {
        this.setState({
            weekdayHome: value
        });
    }

    setweekdaySleeping(value) {
        this.setState({
            weekdaySleeping: value
        });
    }

    setweekdayPhysical(value) {
        this.setState({
            weekdayPhysical: value
        });
    }

    setweekdayRunning(value) {
        this.setState({
            weekdayRunning: value
        });
    }


    setweekendCommuting(value) {
        this.setState({
            weekendCommuting: value
        });
    }

    setweekendActivities(value) {
        this.setState({
            weekendActivities: value
        });
    }

    setweekendHome(value) {
        this.setState({
            weekendHome: value
        });
    }

    setweekendSleeping(value) {
        this.setState({
            weekendSleeping: value
        });
    }

    setweekendPhysical(value) {
        this.setState({
            weekendPhysical: value
        });
    }

    setweekendRunning(value) {
        this.setState({
            weekendRunning: value
        });
    }
}

const styles = StyleSheet.create({
    padding: {
        padding: 20,
    },
    wrapText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    text: {
        fontSize: 26,
        color: "black",
        justifyContent: 'center',
        textAlignVertical: "center",
        textAlign: "center"
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    button: {
        marginBottom: 30,
        backgroundColor: '#323232',
    },
    innerText: {
        fontSize: 26,
        color: "black",
        justifyContent: 'center',
        textAlignVertical: "center",
        textAlign: "center",
        fontStyle: 'italic'
    }
});



