import React from 'react';
import {StyleSheet, Text, View, Button, Picker, ScrollView, AsyncStorage, Slider} from 'react-native';
import axios from 'axios';


export default class AccountScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            weekdayCommuting : 50,
            weekdayActivities : 50,
            weekdayHome : 50,
            weekdaySleeping : 50,
            weekdayPhysical: 50,
            weekdayRunning : 50,
            weekendCommuting : 50,
            weekendActivities : 50,
            weekendHome : 50,
            weekendSleeping : 50,
            weekendPhysical: 50,
            weekendRunning : 50

        };
    }

    next(){
        const {navigate} = this.props.navigation;
        // We know all inputs will be valid
        // Now we need to add it to form data
        AsyncStorage.getItem('formData').then(function(ret){
            var response = JSON.parse(ret);
            var weekdayArray = [this.state.weekdayCommuting, this.state.weekdayActivities, this.state.weekdayHome, this.state.weekdaySleeping, this.state.weekdayRunning];
            var weekendArray = [this.state.weekendCommuting, this.state.weekendActivities, this.state.weekdayHome, this.state.weekdaySleeping, this.state.weekendRunning];
            response['weekday'] = weekdayArray;
            response['weekend'] = weekendArray;
            // We need to make the API call to create a new user
            axios.post('http://localhost:9000/api/signup', response).then(function (response){
                // Lets save relevent information and login!
                alert("Welcome to Noise-Score!");
                var ret = response['data'];
                AsyncStorage.setItem("userData", JSON.stringify(ret));
                navigate("SignedIn")
            }).catch(function (error){
                alert(error.message);
            });

            //navigate('SignUp3');
        }.bind(this));



    }


    render() {

        return (
            <View style={styles.container}>
            <ScrollView>
                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>Last couple of Questions!</Text>
                    </View>
                </View>
                <View style={styles.padding}>
                    <Text style={styles.text}>On a general weekday what percentage of time do you spend:</Text>
                </View>

                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>Commuting</Text>
                    </View>

                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.weekdayCommuting}
                        onValueChange={val => this.setState({ age: val })}
                        onSlidingComplete={ val => this.setweekdayCommuting(val)}
                    />
                </View>

                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>Activities at school or work</Text>
                    </View>

                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.weekdayActivities}
                        onValueChange={val => this.setState({ age: val })}
                        onSlidingComplete={ val => this.setweekdayActivities(val)}
                    />
                </View>

                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>At home</Text>
                    </View>

                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.weekdayHome}
                        onValueChange={val => this.setState({ age: val })}
                        onSlidingComplete={ val => this.setweekdayHome(val)}
                    />
                </View>

                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>Sleeping</Text>
                    </View>

                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.weekdaySleeping}
                        onValueChange={val => this.setState({ age: val })}
                        onSlidingComplete={ val => this.setweekdaySleeping(val)}
                    />
                </View>

                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>Physical Activity</Text>
                    </View>

                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.weekdayPhysical}
                        onValueChange={val => this.setState({ age: val })}
                        onSlidingComplete={ val => this.setweekdayPhysical(val)}
                    />
                </View>

                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>Running errands</Text>
                    </View>

                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.weekdayRunning}
                        onValueChange={val => this.setState({ age: val })}
                        onSlidingComplete={ val => this.setweekdayRunning(val)}
                    />
                </View>


                <View style={styles.padding}>
                    <Text style={styles.text}>On a general weekend what percentage of time do you spend:</Text>
                </View>

                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>Commuting</Text>
                    </View>

                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.weekendCommuting}
                        onValueChange={val => this.setState({ age: val })}
                        onSlidingComplete={ val => this.setweekendCommuting(val)}
                    />
                </View>

                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>Activities at school or work</Text>
                    </View>

                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.weekendActivities}
                        onValueChange={val => this.setState({ age: val })}
                        onSlidingComplete={ val => this.setweekendActivities(val)}
                    />
                </View>

                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>At home</Text>
                    </View>

                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.weekendHome}
                        onValueChange={val => this.setState({ age: val })}
                        onSlidingComplete={ val => this.setweekendHome(val)}
                    />
                </View>

                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>Sleeping</Text>
                    </View>

                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.weekendSleeping}
                        onValueChange={val => this.setState({ age: val })}
                        onSlidingComplete={ val => this.setweekendSleeping(val)}
                    />
                </View>

                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>Physical Activity</Text>
                    </View>

                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.weekendPhysical}
                        onValueChange={val => this.setState({ age: val })}
                        onSlidingComplete={ val => this.setweekendPhysical(val)}
                    />
                </View>

                <View style={styles.padding}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text}>Running errands</Text>
                    </View>

                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.weekendRunning}
                        onValueChange={val => this.setState({ age: val })}
                        onSlidingComplete={ val => this.setweekendRunning(val)}
                    />
                </View>






            </ScrollView>
                <View style={styles.button}>
                    <Button
                        title="Next"
                        onPress={() => this.next()}
                        buttonStyle={styles.button}
                        backgroundColor={'white'}
                        color={'white'}
                    />
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
        backgroundColor: '#cccc31',
        // TODO: THIS IS THE PROBLEM
        alignItems: 'center'
    },
    button : {
        marginBottom: 30,
        backgroundColor: '#323232',
    },
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
