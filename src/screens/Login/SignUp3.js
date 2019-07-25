import React from 'react';
import { StyleSheet, Text, View, ScrollView, Slider } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import CustomButton from '../../Base/CustomButton'
import ProgressCircles from '../../Base/ProgressCircles'
import { height, width, brightGreen, darkGray } from '../../components/constants'

export default class AccountScreen extends React.Component {

    constructor(props) {
        super(props);

        // ----- Instantiate state object with default values ------
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
        };
    }

    // ------------ Method to move to next sign up step => "terms and conditions" ------------
    next() {

        // ------ Retrieve, update and store user data in async storage for use in the last step of the signup process...
        // ---- ... and navigate to the next step ("terms and conditions") of the signup process ------
        const { navigate } = this.props.navigation;
        console.log(this.state);
        AsyncStorage.getItem('formData', null).then(function (ret) {
            let response = JSON.parse(ret);

            let weekdayArray = [this.state.weekdayCommuting, this.state.weekdayActivities, this.state.weekdayHome,
                this.state.weekdaySleeping, this.state.weekdayRunning, this.state.weekdayPhysical];
            let weekendArray = [this.state.weekendCommuting, this.state.weekendActivities, this.state.weekdayHome,
                this.state.weekdaySleeping, this.state.weekendRunning, this.state.weekendPhysical];
            response['weekday'] = weekdayArray;
            response['weekend'] = weekendArray;

            AsyncStorage.setItem("formData", JSON.stringify(response)).done();

        }.bind(this)).then(function () {
            navigate('TermsConditions');
        }.bind(this));
    }

    // ------------ Rendering method of the Login Screen ------------
    render() {
        const step = 5;
        return (


            <View style={{ flex: 1 }}>
                <ProgressCircles totalSteps={4} currentStep={3}/>


                <ScrollView>
                    <View style={styles.wrapper}>

                        <Text style={[styles.text, styles.mainHeader]}>
                            Please tell us how you spend your time during the week!
                        </Text>


                        {/* ------------------------ Weekday percentages block ------------------------ */}
                        <View style={styles.questionBlock}>

                            <Text style={[styles.text, styles.questionText]}>
                                On a general <Text style={styles.innerText}> weekday </Text> what percentage of time do
                                you spend:
                            </Text>

                            <View style={styles.percentageBlock}>
                                <Text style={styles.text}>
                                    Commuting: {this.state.weekdayCommuting}%
                                </Text>

                                <Slider
                                    style={{ width: '90%', }}
                                    size={100}
                                    step={step}
                                    maximumValue={100}
                                    maximumTrackTintColor={darkGray}
                                    minimumTrackTintColor={brightGreen}
                                    thumbTintColor={brightGreen}
                                    thumbTouchSize={{ height: 60, width: 60 }}

                                    value={10}
                                    onValueChange={val => {
                                        this.setState({ weekdayCommuting: val })
                                    }}
                                />
                            </View>

                            <View style={styles.percentageBlock}>
                                <Text style={styles.text}>
                                    Activities at school or work: {this.state.weekdayActivities}%
                                </Text>


                                <Slider
                                    style={{ width: '90%', }}
                                    step={step}
                                    maximumValue={100}
                                    maximumTrackTintColor={darkGray}
                                    minimumTrackTintColor={brightGreen}
                                    thumbTintColor={brightGreen}
                                    thumbTouchSize={{ height: 60, width: 60 }}

                                    value={40}
                                    onValueChange={val => {
                                        this.setState({ weekdayActivities: val })
                                    }}
                                />
                            </View>

                            <View style={styles.percentageBlock}>

                                <Text style={styles.text}>
                                    At home: {this.state.weekdayHome}%
                                </Text>

                                <Slider
                                    step={step}
                                    style={{ width: '90%', }}
                                    maximumValue={100}
                                    maximumTrackTintColor={darkGray}
                                    minimumTrackTintColor={brightGreen}
                                    thumbTintColor={brightGreen}
                                    thumbTouchSize={{ height: 60, width: 60 }}

                                    value={20}
                                    onValueChange={val => {
                                        this.setState({ weekdayHome: val })
                                    }}

                                />
                            </View>

                            <View style={styles.percentageBlock}>

                                <Text style={styles.text}>
                                    Sleeping: {this.state.weekdaySleeping}%
                                </Text>
                                <Slider
                                    style={{ width: '90%', }}
                                    step={step}
                                    maximumValue={100}
                                    maximumTrackTintColor={darkGray}
                                    minimumTrackTintColor={brightGreen}
                                    thumbTintColor={brightGreen}
                                    thumbTouchSize={{ height: 60, width: 60 }}

                                    value={20}
                                    onValueChange={val => {
                                        this.setState({ weekdaySleeping: val })
                                    }}

                                />
                            </View>

                            <View style={styles.percentageBlock}>

                                <Text style={styles.text}>
                                    Physical Activity: {this.state.weekdayPhysical}%
                                </Text>
                                <Slider
                                    style={{ width: '90%', }}
                                    step={step}
                                    maximumValue={100}
                                    maximumTrackTintColor={darkGray}
                                    minimumTrackTintColor={brightGreen}
                                    thumbTintColor={brightGreen}
                                    thumbTouchSize={{ height: 60, width: 60 }}

                                    value={5}
                                    onValueChange={val => {
                                        this.setState({ weekdayPhysical: val })
                                    }}

                                />
                            </View>

                            <View style={styles.percentageBlock}>

                                <Text style={styles.text}>
                                    Running errands: {this.state.weekdayRunning}%
                                </Text>
                                <Slider
                                    style={{ width: '90%', }}
                                    step={step}
                                    maximumValue={100}
                                    maximumTrackTintColor={darkGray}
                                    minimumTrackTintColor={brightGreen}
                                    thumbTintColor={brightGreen}
                                    thumbTouchSize={{ height: 60, width: 60 }}

                                    value={5}
                                    onValueChange={val => {
                                        this.setState({ weekdayRunning: val })
                                    }}

                                />
                            </View>

                        </View>

                        {/* ------------------------ Weekend percentages block ------------------------ */}
                        <View style={styles.questionBlock}>

                            <Text style={[styles.text, styles.questionText]}>
                                On a general <Text style={styles.innerText}>weekend</Text> what percentage of time do
                                you spend:
                            </Text>


                            <View style={styles.percentageBlock}>
                                <Text style={styles.text}>
                                    Commuting: {this.state.weekendCommuting}%
                                </Text>

                                <Slider
                                    style={{ width: '90%', }}
                                    size={100}
                                    step={step}
                                    maximumValue={100}
                                    maximumTrackTintColor={darkGray}
                                    minimumTrackTintColor={brightGreen}
                                    thumbTintColor={brightGreen}
                                    thumbTouchSize={{ height: 60, width: 60 }}

                                    value={10}
                                    onValueChange={val => {
                                        this.setState({ weekendCommuting: val })
                                    }}
                                />
                            </View>

                            <View style={styles.percentageBlock}>
                                <Text style={styles.text}>
                                    Activities at school or work: {this.state.weekendActivities}%
                                </Text>


                                <Slider
                                    style={{ width: '90%', }}
                                    step={step}
                                    maximumValue={100}
                                    maximumTrackTintColor={darkGray}
                                    minimumTrackTintColor={brightGreen}
                                    thumbTintColor={brightGreen}
                                    thumbTouchSize={{ height: 60, width: 60 }}

                                    value={40}
                                    onValueChange={val => {
                                        this.setState({ weekendActivities: val })
                                    }}
                                />
                            </View>

                            <View style={styles.percentageBlock}>

                                <Text style={styles.text}>
                                    At home: {this.state.weekendHome}%
                                </Text>

                                <Slider
                                    style={{ width: '90%', }}
                                    step={step}
                                    maximumValue={100}
                                    maximumTrackTintColor={darkGray}
                                    minimumTrackTintColor={brightGreen}
                                    thumbTintColor={brightGreen}
                                    thumbTouchSize={{ height: 60, width: 60 }}

                                    value={20}
                                    onValueChange={val => {
                                        this.setState({ weekendHome: val })
                                    }}

                                />
                            </View>

                            <View style={styles.percentageBlock}>

                                <Text style={styles.text}>
                                    Sleeping: {this.state.weekendSleeping}%
                                </Text>
                                <Slider
                                    style={{ width: '90%', }}
                                    step={step}
                                    maximumValue={100}
                                    maximumTrackTintColor={darkGray}
                                    minimumTrackTintColor={brightGreen}
                                    thumbTintColor={brightGreen}
                                    thumbTouchSize={{ height: 60, width: 60 }}

                                    value={20}
                                    onValueChange={val => {
                                        this.setState({ weekendSleeping: val })
                                    }}

                                />
                            </View>

                            <View style={styles.percentageBlock}>

                                <Text style={styles.text}>
                                    Physical Activity: {this.state.weekendPhysical}%
                                </Text>
                                <Slider
                                    style={{ width: '90%', }}
                                    step={step}
                                    maximumValue={100}
                                    maximumTrackTintColor={darkGray}
                                    minimumTrackTintColor={brightGreen}
                                    thumbTintColor={brightGreen}
                                    thumbTouchSize={{ height: 60, width: 60 }}

                                    value={5}
                                    onValueChange={val => {
                                        this.setState({ weekendPhysical: val })
                                    }}

                                />
                            </View>

                            <View style={styles.percentageBlock}>

                                <Text style={styles.text}>
                                    Running errands: {this.state.weekendRunning}%
                                </Text>
                                <Slider
                                    style={{ width: '90%', }}
                                    step={step}
                                    maximumValue={100}
                                    maximumTrackTintColor={darkGray}
                                    minimumTrackTintColor={brightGreen}
                                    thumbTintColor={brightGreen}
                                    thumbTouchSize={{ height: 60, width: 60 }}

                                    value={5}
                                    onValueChange={val => {
                                        this.setState({ weekendRunning: val })
                                    }}

                                />
                            </View>

                        </View>

                        <CustomButton
                            text="Next"
                            onPress={() => this.next()}
                            buttonStyle={styles.button}
                        />
                    </View>
                </ScrollView>
            </View>

        );
    }

}

const styles = StyleSheet.create({
        wrapper: {
            flex: 1,
            backgroundColor: 'white',
            width: "100%",
            paddingHorizontal: 30,
            paddingBottom: 20,

        },


        text: {
            fontSize: width * 0.055,
            color: 'black',
            justifyContent: 'center',
            textAlignVertical: "center",
            textAlign: "center",
            marginBottom: 10,
        },

        questionText: {
            fontSize: width * 0.06,
        },

        mainHeader: {
            fontFamily: 'Euphemia UCAS',
            fontSize: width * 0.07,
        },

        innerText: {
            fontWeight: 'bold'
        },

        questionBlock: {
            marginVertical: 20,
        },

        percentageBlock: {
            marginBottom: 5,
            alignItems: 'center',
        },
    })
;

