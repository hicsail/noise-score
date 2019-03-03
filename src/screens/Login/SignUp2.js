import React from 'react';
import {StyleSheet, Text, View, Button, Picker, ScrollView, AsyncStorage} from 'react-native';
import NavButtons2 from "../../components/NavButtons2";
import SourceButton from '../../components/SourceButton';
import * as constants from '../../components/constants';
import {SelectMultipleGroupButton} from "react-native-selectmultiple-button";

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
        const {navigate} = this.props.navigation;
        // First we have to check if all the inputs are valid
        if(this.state.pronouns === "undefined"){
            alert("Please select what pronouns you would like to use.")
        } else if (this.state.yearBorn == -1){
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
        // Need to create some code to generate all the years (for the date you were born)
        var years = [];
        for (var y = 1980; y <= 2019; y++) {
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
            <ScrollView>
                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                      <Text>Welcome to Noise-Score!{"\n"} Just a couple more questions to get started</Text>
                    </View>
                </View>

                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text>What pronouns would you like to use?</Text>
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
                        <Text>What year were you born in?</Text>
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
                        <Text style={styles.text}>I Identify As:</Text>
                        <Text style={styles.text}>(Select all that apply)</Text>
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
                        <Text style={styles.text}>How would you rate the noise levels in your HOME? </Text>
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
                        <Text style={styles.text}>How would you rate the noise levels in your COMMUNITY?  </Text>
                        <Text style={styles.text}>(community defined as a radius around your home)</Text>
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
                        <Text style={styles.text}>How would you rate the noise levels at WORK? </Text>
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
                        <Text style={styles.text}>In general, how is your health? </Text>
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

                <NavButtons2 navigation={this.props.navigation}
                             back={'SignUp1'}
                             next={this.next.bind(this)}/>
            </ScrollView>

        );
    }

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

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });

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
        color: "black"
    }
});

const brightGreen = "#31BD4B";
const lightGreen = '#31BD4B';
const darkGray = "#383838";

const questionButtonsStyle = {
    borderColor: darkGray,
    backgroundColor: "transparent",
    textColor: darkGray,
    borderTintColor: lightGreen,
    backgroundTintColor: lightGreen,
    textTintColor: "black"
};

const questionButtonSize ={
    borderRadius: 10,
    height: 40
};
