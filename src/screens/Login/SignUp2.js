import React from 'react';
import {StyleSheet, Text, View, Button, Picker, ScrollView, Dimensions } from 'react-native';
import {SelectMultipleGroupButton} from "react-native-selectmultiple-button";
import AsyncStorage from '@react-native-community/async-storage';

export default class AccountScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            yearBorn : -1,
            pronouns : "undefined",
            ethnicity : "undefined",
            sensitive : "undefined",
            homeNoise : "undefined",
            communityNoise : "undefined",
            workNoise : "undefined",
            health : "undefined"
        };
    }

    next(){
        // Store relevant information and move to the next screen (SignUp3.js)

        const {navigate} = this.props.navigation;
        // First we have to check if all the inputs are valid
        if(this.state.pronouns === "undefined"){
            alert("Please select what pronouns you would like to use.")
        } else if (this.state.yearBorn === -1){
            alert("Please select the year you were born in.")
        } else if(this.state.ethnicity === "undefined") {
            alert("Please select an Ethnicity");
        } else if(this.state.sensitive === "undefined"){
            alert("Please enter a valid sensitivity.");
        } else if(this.state.homeNoise === "undefined") {
            alert("Please enter a valid Home Noise.");
        }else if (this.state.communityNoise === "undefined") {
            alert("Please enter a valid Community Noise.");
        }else if(this.state.workNoise === "undefined") {
            alert("Please enter a valid Work Noise.");
        }else if (this.state.health === "undefined") {
            alert("Please enter a valid health.");
        }else {
            // Else we need to add it to form data
            AsyncStorage.getItem('formData').then(function(ret){
                var response = JSON.parse(ret);
                response["pronouns"] = this.state.pronouns;
                response['ethnicity'] = this.state.ethnicity;
                response['sensitive'] = this.state.sensitive;
                response['home'] = this.state.homeNoise;
                response['community'] = this.state.communityNoise;
                response['work'] = this.state.workNoise;
                response['health']= this.state.health;
                AsyncStorage.setItem("formData", JSON.stringify(response));
            }.bind(this)).then(function(){
                navigate('SignUp3');
            }.bind(this));
            }
    }


    yearsIter(){
        // Returns an iterator that is used to select the year for the user

        // Need to create some code to generate all the years (for the date you were born)
        var years = [];
        for (var y = 2019; y >= 1920; y--) {
            years.push([y]);
        }
        // Iterator to display all the options
        return years.map((year) => {
            return (
                <Picker.Item key={year.toString()}  label={year.toString()} value={year.toString()}/>
            )
        });
    }

    render() {
        return (
            <View style={styles.container}>
            <ScrollView>
                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                      <Text style={styles.textHeader}>To complete your registration please answer the following questions </Text>
                        <Text style={styles.subText}> Before you start using NoiseScore,
                            we would like to gather a little more information about who you are, your attitudes about community noise
                            and sound issues, your general health, and time activity during a typical week.</Text>
                    </View>
                </View>
                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>What pronouns would you like to use?</Text>
                    </View>
                        <Picker
                            selectedValue={this.state.pronouns}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({pronouns: itemValue})
                            }>
                            <Picker.Item label="Select Pronoun" value="undefined" />
                            <Picker.Item label="He/His" value="He/His" />
                            <Picker.Item label="She/Her" value="She/Her" />
                            <Picker.Item label="They/Them" value="They/Them" />
                        </Picker>
                </View>
                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>What year were you born?</Text>
                    </View>
                    <Picker
                        selectedValue={this.state.yearBorn}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({yearBorn: itemValue})
                        }>
                        <Picker.Item label="Select Year" value="-1" />
                        {this.yearsIter()}

                    </Picker>
                </View>
                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>I Identify as:</Text>
                        <Text style={styles.text}>(select all that apply)</Text>
                    </View>
                    <SelectMultipleGroupButton
                        multiple={true}
                        group={[
                            { value: 'Asian' },
                            { value: 'Black/African' },
                            { value: 'African American Descendant of Slavery' },
                            { value: 'Caucasian' },
                            { value: 'Hispanic/Latinx' },
                            { value: 'Pacific Islander'},
                            { value: 'Other'}]}
                        buttonViewStyle={questionButtonSize}
                        highLightStyle={questionButtonsStyle}
                        textStyle={{ fontSize:15 }}
                        onSelectedValuesChange={value =>
                            this.setEthnicity(value)
                        }
                    />
                </View>
                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>Compared to people around you, do you consider yourself sensitive to noise?</Text>
                    </View>

                    <SelectMultipleGroupButton
                        multiple={false}
                        group={[
                            { value: 'Not at All' },
                            { value: 'Very Little' },
                            { value: 'A Little' },
                            { value: 'Moderately' },
                            { value: 'Severely' }]}
                        buttonViewStyle={questionButtonSize}
                        highLightStyle={questionButtonsStyle}
                        textStyle={{ fontSize:15 }}
                        onSelectedValuesChange={value =>
                            this.setSensitive(value)
                        }
                    />
                </View>
                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>How would you rate the noise levels in your home? </Text>
                    </View>

                    <SelectMultipleGroupButton
                        multiple={false}
                        group={[
                            { value: 'Very quiet' },
                            { value: 'Quiet' },
                            { value: 'Neutral' },
                            { value: 'Loud' },
                            { value: 'Very Loud' }]}
                        buttonViewStyle={questionButtonSize}
                        highLightStyle={questionButtonsStyle}
                        textStyle={{ fontSize:15 }}
                        onSelectedValuesChange={value =>
                            this.setHomeNoise(value)
                        }
                    />
                </View>
                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>How would you rate the noise levels in your community?  </Text>
                        <Text style={styles.subText}>(community defined as a radius around your home)</Text>
                    </View>
                    <SelectMultipleGroupButton
                        multiple={false}
                        group={[
                            { value: 'Very quiet' },
                            { value: 'Quiet' },
                            { value: 'Neutral' },
                            { value: 'Loud' },
                            { value: 'Very Loud' }]}
                        buttonViewStyle={questionButtonSize}
                        highLightStyle={questionButtonsStyle}
                        textStyle={{ fontSize:15 }}
                        onSelectedValuesChange={value =>
                            this.setCommunityNoise(value)
                        }
                    />
                </View>
                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>How would you rate the noise levels at your place of employment? </Text>
                    </View>

                    <SelectMultipleGroupButton
                        multiple={false}
                        group={[
                            { value: 'Very quiet' },
                            { value: 'Quiet' },
                            { value: 'Neutral' },
                            { value: 'Loud' },
                            { value: 'Very Loud' }]}
                        buttonViewStyle={questionButtonSize}
                        highLightStyle={questionButtonsStyle}
                        textStyle={{ fontSize:15 }}
                        onSelectedValuesChange={value =>
                            this.setWorkNoise(value)
                        }
                    />
                </View>
                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>In general, how would you describe your health? </Text>
                    </View>

                    <SelectMultipleGroupButton
                        multiple={false}
                        group={[
                            { value: 'Very poor' },
                            { value: 'Poor' },
                            { value: 'Fair' },
                            { value: 'Good' },
                            { value: 'Excellent' }]}
                        buttonViewStyle={questionButtonSize}
                        highLightStyle={questionButtonsStyle}
                        textStyle={{ fontSize:15 }}
                        onSelectedValuesChange={value =>
                            this.setHealth(value)
                        }
                    />
                </View>
            </ScrollView>
                <View style={styles.button}>
                    <Button
                        title="Next"
                        onPress={() => this.next()}
                        style={styles.button}
                        backgroundColor={'white'}
                        color={'#323232'}
                    />
                </View>
            </View>
        );
    }

    // Helper function to setState of values passed in
    setEthnicity(value) {
        this.setState({
            ethnicity: value[0]
        });
    }

    setSensitive(value) {
        this.setState({
            sensitive: value[0]
        });
    }

    setHomeNoise(value) {
        this.setState({
            homeNoise: value[0]
        });
    }

    setCommunityNoise(value) {
        this.setState({
            communityNoise: value[0]
        });
    }

    setWorkNoise(value) {
        this.setState({
            workNoise: value[0]
        });
    }

    setHealth(value) {
        this.setState({
            health: value[0]
        });
    }
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    padding: {
        padding: 20,
    },
    button: {
        marginBottom: 30,
        marginTop: 20,
        backgroundColor: '#323232',
        alignItems: 'center'
    },
    wrapText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        width : "100%"
    },
    textHeader : {
        fontSize: 26,
        color: "black",
        justifyContent: 'center',
        textAlignVertical: "center",
        textAlign: "center",
        fontWeight: 'bold',
    },
    text: {
        fontSize: 25,
        color: "black",
        justifyContent: 'center',
        textAlignVertical: "center",
        textAlign: "center",
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 20,
        color: "black",
        justifyContent: 'center',
        textAlignVertical: "center",
        textAlign: "center"
    },
    textInput : {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    content : {
        marginTop : 100,
        width: '75%',
        alignItems: 'center',
        textAlign: 'center'
    },
    header : {
        fontFamily: 'Euphemia UCAS',
        fontSize: 20,
        color: '#323232'
    },

});

const lightGreen = '#31BD4B';
const darkGray = "#383838";

const fontSize = width / 15;

const fontStyle = { fontSize: fontSize, padding: 5 };


const questionButtonsStyle = {
    borderColor: lightGreen,
    backgroundColor: "transparent",
    textColor: darkGray,
    borderTintColor: lightGreen,
    backgroundTintColor: lightGreen,
    textTintColor: "white",
    // padding:20
};

const questionButtonSize = {
    borderRadius: 15,
    height: 'auto',
    borderWidth: 3,
    // padding: 20,
    // margin:10
};
