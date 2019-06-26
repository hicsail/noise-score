import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';


const navButtons = (props) => (
    <View style={styles.padding}>
        <View style={styles.navContainer}>
            <View style={styles.navButtons}>

                <IconFA.Button
                    name={'arrow-left'}
                    size={30}
                    borderRadius={30}
                    color="white"
                    backgroundColor={brightGreen}
                    onPress={() => props.navigation.navigate(props.back)}>
                    <Text style = {styles.buttonText}>Back</Text>
                </IconFA.Button>


                {props.next !== null ? <View>
                    <IconFA.Button
                        name={'arrow-right'}
                        size={30}
                        borderRadius={30}
                        color="white"
                        backgroundColor={brightGreen}
                        onPress={() => props.next()}>
                        <Text style = {styles.buttonText}>Next</Text>
                    </IconFA.Button>
                </View> : null }

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
    }
});

export default navButtons;

