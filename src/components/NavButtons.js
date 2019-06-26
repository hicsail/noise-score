import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const navButtons = (props) => (
    <View style={styles.padding}>
        <View style={styles.navContainer}>
            <View style={styles.navButtons}>


                <TouchableOpacity
                    style={[styles.button, styles.submitButton]}

                    onPress={() => props.navigation.navigate(props.back)}
                >

                    <Text style={{
                        fontSize: width / 15,
                        alignSelf: 'center',
                        textAlign: 'center',
                        color: 'white'
                    }}>Next</Text>

                    <IconFA
                        name={'paper-plane'}
                        size={width / 15}
                        color="white"
                        style={{ flex: 1, alignSelf: 'center', textAlign: 'right' }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.submitButton]}

                    onPress={() => props.navigation.navigate(props.back)}
                >

                    <Text style={{
                        fontSize: width / 15,
                        alignSelf: 'center',
                        textAlign: 'center',
                        color: 'white'
                    }}>Next</Text>

                    <IconFA
                        name={'arrow-right'}
                        size={width / 15}
                        color="white"
                        style={{ flex: 1, alignSelf: 'center', textAlign: 'right' }}
                    />
                </TouchableOpacity>


                <IconFA.Button
                    name={'arrow-left'}
                    size={30}
                    borderRadius={30}
                    color="white"
                    backgroundColor={brightGreen}
                    onPress={() => props.navigation.navigate(props.back)}>
                    <Text style={styles.buttonText}>Back</Text>
                </IconFA.Button>


                {props.next !== null ? <View>
                    <IconFA.Button
                        name={'arrow-right'}
                        size={30}
                        borderRadius={30}
                        color="white"
                        backgroundColor={brightGreen}
                        onPress={() => props.navigation.navigate(props.next)}>
                        <Text style={styles.buttonText}>Next</Text>
                    </IconFA.Button>
                </View> : null}

            </View>
        </View>
    </View>

);


const brightGreen = "#31BD4B";
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
    },
    navContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    navButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    nextButton: {
        backgroundColor: brightGreen
    },
    buttonText: {
        color: "white"
    },
    button: {
        flex: 1,
        minHeight: 40,
        flexDirection: 'row',
        // justifyContent: 'center',

        alignSelf: 'stretch',
        // borderWidth: 2,
        borderRadius: 10,

        // borderColor: '#31BD4B',

        margin: 5,
        padding: 10,
    },

    submitButton: {
        backgroundColor: '#31BD4B',
        borderColor: '#31BD4B'
    },


});

export default navButtons;

