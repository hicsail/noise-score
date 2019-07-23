import React from 'react';
import {StyleSheet, Text, View, Picker, ScrollView,} from 'react-native';
import {SelectMultipleGroupButton} from "react-native-selectmultiple-button";

import AsyncStorage from '@react-native-community/async-storage';

import CustomButton from '../../Base/CustomButton'
import ProgressCircles from '../../Base/ProgressCircles'
import {height, width, brightGreen, darkGray} from '../../components/constants'


export default class AccountScreen extends React.Component {

    constructor(props) {
        super(props);

        // ----- Instantiate state object with default values ------
        this.state = {
            yearBorn: "-1",
            pronouns: "undefined",
            ethnicity: "undefined",
            sensitive: "undefined",
            homeNoise: "undefined",
            communityNoise: "undefined",
            workNoise: "undefined",
            health: "undefined"
        };
    }

    // ---------------------- Check if all inputs are filled, alert user if not ----------------------
    errorCheck() {
        if (this.state.ethnicity === "undefined")
            alert("Please specify you ethnicity.");
        else if (this.state.sensitive === "undefined")
            alert("Please specify your sensitivity to noise.");
        else if (this.state.homeNoise === "undefined")
            alert("Please specify the noise level in your home.");
        else if (this.state.communityNoise === "undefined")
            alert("Please specify the noise level in your community.");
        else if (this.state.workNoise === "undefined")
            alert("Please specify the noise level in your work place.");
        else if (this.state.health === "undefined")
            alert("Please specify your health status.");
        else
            return true;

        return false
    }

    addSource = (source) => {
        this.setState({
            sources: [...this.state.sources, source]
        });

    };

    // Helper function to remove source
    removeSource = (source) => {
        let sourcesArray = [...this.state.sources];
        const index = sourcesArray.indexOf(source);
        if (index > -1) {
            sourcesArray.splice(index, 1);
            this.setState({
                sources: sourcesArray
            })
        }
    };


    // ------------ Method to move to next sign up step ------------
    next() {

        if (this.errorCheck()) {
            const {navigate} = this.props.navigation;

            // ------ Retrieve, update and store user data in async storage for use in the last step of the signup process...
            // ---- ... and navigate to the next step of the signup process ------
            AsyncStorage.getItem('formData', null).then(function (ret) {
                let response = JSON.parse(ret);

                response["pronouns"] = this.state.pronouns;
                response['ethnicity'] = this.state.ethnicity.join();
                response['sensitive'] = this.state.sensitive;
                response['home'] = this.state.homeNoise;
                response['community'] = this.state.communityNoise;
                response['work'] = this.state.workNoise;
                response['health'] = this.state.health;
                response['year'] = this.state.yearBorn;

                AsyncStorage.setItem("formData", JSON.stringify(response)).done();
            }.bind(this)).done(function () {
                navigate('SignUp3');
            }.bind(this));
        }
    }

    // ------------ Generate a list of all years from 1920 to now ------------
    yearsIter() {
        let years = [];
        for (let y = new Date().getFullYear() - 18; y >= 1920; y--) {
            years.push([y]);
        }
        // Iterator to display all the options
        return years.map((year) => {
            return (
                <Picker.Item key={year.toString()} label={year.toString()} value={year.toString()}/>
            )
        });
    }

    // ------------ Rendering method of the Login Screen ------------
    render() {
        return (
            // ------ Extra View component helps with sticky progress bar ------
            <View style={{flex: 1}}>


                {/* ------ Step progress bar ------ */}
                <ProgressCircles totalSteps={4} currentStep={2}/>

                {/* ------ Questions for user ------ */}
                <View style={styles.wrapper}>

                    <ScrollView>
                        {/* ------ Welcome and instructions text ------*/}
                        <View style={styles.wrapText}>
                            <Text style={[styles.text, styles.mainHeader]}>
                                To complete your registration please answer the following questions
                            </Text>
                            <Text style={[styles.text, styles.subText]}>
                                Before you start using NoiseScore, we would like to gather a little more information
                                about who you are, your attitudes about community noise and sound issues, your general
                                health, and time activity during a typical week.
                            </Text>
                        </View>

                        {/* ------------------ Sign Up questions ------------------ */}


                        <View style={styles.question}>
                            <Text style={[styles.text, styles.questionText]}>
                                What pronouns would you like to use?
                            </Text>

                            <Picker
                                selectedValue={this.state.pronouns}
                                onValueChange={
                                    (itemValue, itemIndex) =>
                                        this.setState({pronouns: itemValue})
                                }
                            >
                                <Picker.Item label="Select Pronoun" value="undefined"/>
                                <Picker.Item label="He/His" value="He/His"/>
                                <Picker.Item label="She/Her" value="She/Her"/>
                                <Picker.Item label="They/Them" value="They/Them"/>
                            </Picker>
                        </View>

                        {/* ----------------------------------------------------------------------------------------*/}

                        <View style={styles.question}>
                            <Text style={[styles.text, styles.questionText]}>
                                What year were you born?
                            </Text>
                            <Picker
                                selectedValue={this.state.yearBorn}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({yearBorn: itemValue})
                                }>
                                <Picker.Item style={{alignSelf: 'center'}} label="Select Year" value="-1"/>
                                {this.yearsIter()}

                            </Picker>
                        </View>

                        {/* ----------------------------------------------------------------------------------------*/}

                        <View style={styles.question}>
                            <Text style={[styles.text, styles.questionText]}>
                                I Identify as:{'\n'}
                                <Text style={[styles.text, styles.subText]}>
                                    (select all that apply)
                                </Text>
                            </Text>


                            <SelectMultipleGroupButton
                                multiple={true}
                                group={[
                                    {value: 'Asian'},
                                    {value: 'Black/African'},
                                    {value: 'African American Descendant of Slavery'},
                                    {value: 'Caucasian'},
                                    {value: 'Hispanic/Latinx'},
                                    {value: 'Pacific Islander'},
                                    {value: 'Other'}]}
                                buttonViewStyle={questionButtonSize}
                                highLightStyle={questionButtonsStyle}
                                textStyle={fontStyle}
                                onSelectedValuesChange={value => {
                                    this.setState({ethnicity: value});
                                    console.log(this.state.ethnicity);
                                }
                                }
                            />
                        </View>

                        {/* ----------------------------------------------------------------------------------------*/}

                        <View style={styles.question}>
                            <Text style={[styles.text, styles.questionText]}>
                                Compared to people around you, do you consider yourself sensitive to noise?
                            </Text>

                            <SelectMultipleGroupButton
                                multiple={false}
                                group={[
                                    {value: 'Not at all'},
                                    {value: 'Very Little'},
                                    {value: 'A Little'},
                                    {value: 'Moderately'},
                                    {value: 'Severely'}]}
                                buttonViewStyle={questionButtonSize}
                                highLightStyle={questionButtonsStyle}
                                textStyle={fontStyle}
                                onSelectedValuesChange={value =>
                                    this.setState({sensitive: value[0]})
                                }
                            />
                        </View>

                        {/* ----------------------------------------------------------------------------------------*/}

                        <View style={styles.question}>
                            <Text style={[styles.text, styles.questionText]}>
                                How would you rate the noise levels in your home?
                            </Text>


                            <SelectMultipleGroupButton
                                multiple={false}
                                group={[
                                    {value: 'Very quiet'},
                                    {value: 'Quiet'},
                                    {value: 'Neutral'},
                                    {value: 'Loud'},
                                    {value: 'Very Loud'}]}
                                buttonViewStyle={questionButtonSize}
                                highLightStyle={questionButtonsStyle}
                                textStyle={fontStyle}
                                onSelectedValuesChange={value =>
                                    this.setState({homeNoise: value[0]})
                                }
                            />
                        </View>

                        {/* ----------------------------------------------------------------------------------------*/}

                        <View style={styles.question}>
                            <Text style={[styles.text, styles.questionText]}>
                                How would you rate the noise levels in your community?
                                <Text style={[styles.text, styles.subText]}>{'\n'}(community defined as a radius around
                                    your home)</Text>
                            </Text>

                            <SelectMultipleGroupButton
                                multiple={false}
                                group={[
                                    {value: 'Very quiet'},
                                    {value: 'Quiet'},
                                    {value: 'Neutral'},
                                    {value: 'Loud'},
                                    {value: 'Very Loud'}]}
                                buttonViewStyle={questionButtonSize}
                                highLightStyle={questionButtonsStyle}
                                textStyle={fontStyle}
                                onSelectedValuesChange={value =>
                                    this.setState({
                                        communityNoise: value[0]
                                    })
                                }
                            />
                        </View>

                        {/* ----------------------------------------------------------------------------------------*/}

                        <View style={styles.question}>
                            <Text style={[styles.text, styles.questionText]}>
                                How would you rate the noise levels at your place of employment?
                            </Text>


                            <SelectMultipleGroupButton
                                multiple={false}
                                group={[
                                    {value: 'Very quiet'},
                                    {value: 'Quiet'},
                                    {value: 'Neutral'},
                                    {value: 'Loud'},
                                    {value: 'Very Loud'}]}
                                buttonViewStyle={questionButtonSize}
                                highLightStyle={questionButtonsStyle}
                                textStyle={fontStyle}
                                onSelectedValuesChange={value =>
                                    this.setState({workNoise: value[0]})
                                }
                            />
                        </View>

                        {/* ----------------------------------------------------------------------------------------*/}

                        <View style={styles.question}>
                            <Text
                                adjustsFontSizeToFit
                                numberOfLines={2}
                                style={[styles.text, styles.questionText]}>
                                In general, how would you describe your health?
                            </Text>

                            <SelectMultipleGroupButton
                                multiple={false}
                                group={[
                                    {value: 'Very poor'},
                                    {value: 'Poor'},
                                    {value: 'Fair'},
                                    {value: 'Good'},
                                    {value: 'Excellent'}]}
                                buttonViewStyle={questionButtonSize}
                                highLightStyle={questionButtonsStyle}
                                textStyle={fontStyle}
                                onSelectedValuesChange={value =>
                                    this.setState({health: value[0]})
                                }
                            />
                        </View>

                        {/* ----------------------------------------------------------------------------------------*/}

                        <CustomButton
                            text="Next"
                            onPress={() => this.next()}
                            customStyle={styles.button}

                        />
                    </ScrollView>
                </View>
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

    question: {
        marginVertical: 15,
    },

    text: {
        fontSize: 15,
        color: 'black',
        justifyContent: 'center',
        textAlignVertical: "center",
        textAlign: "center",
        marginBottom: 10,
    },

    questionText: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
    },

    mainHeader: {
        fontFamily: 'Euphemia UCAS',
        fontSize: width * 0.07,
        fontWeight: 'bold',
    },

    subText: {
        fontSize: width * 0.04,
        fontWeight: 'normal',
        color: '#383838'
    },


    button: {
        marginTop: 5,
        justifyContent: 'center',

    },


});

const fontSize = width * 0.05;

const fontStyle = {fontSize: fontSize, padding: 5};

const questionButtonsStyle = {
    borderColor: brightGreen,
    backgroundColor: "transparent",
    textColor: darkGray,
    borderTintColor: brightGreen,
    backgroundTintColor: brightGreen,
    textTintColor: "white",
    // padding:20
};

const questionButtonSize = {
    borderRadius: 15,
    height: 'auto',
    borderWidth: 3,
};
