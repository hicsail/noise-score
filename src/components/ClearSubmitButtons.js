import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

export default class ClearSubmitButtons extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <View style={styles.buttonSpacing}>
                {/*<View style={styles.container}>*/}
                {/*<View style={styles.buttonSpacing}>*/}

                <TouchableOpacity
                    style={[styles.button, this.props.disabled ? styles.disabledButton : styles.clearButton]}
                    disabled={this.props.disabled}

                    onPress={() => this.props.clear()}
                >
                    <IconFA
                        name={'trash'}
                        size={width / 20}
                        color="white"
                    >
                        <Text style={styles.buttonText}>Clear</Text>
                    </IconFA>
                </TouchableOpacity>


                <TouchableOpacity
                    style={[styles.button, this.props.disabled ? styles.disabledButton : styles.submitButton]}
                    onPress={() => this.props.submit()}
                    disabled={this.props.disabled}>
                    <IconFA
                        name={'paper-plane'}
                        size={width / 20}
                        color="white"
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </IconFA>
                </TouchableOpacity>

                {/*</View>*/}
                {/*</View>*/}
            </View>
        )
    }
}
const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
    padding: {
        // flex: 1,
        // padding: 20,
    },
    container: {
        flexGrow: 1,

        flexDirection: 'row',
        // backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    buttonSpacing: {
        flexGrow: 1,
        // padding: 20,
        marginBottom: 100,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-evenly'
    },
    buttonText: {
        color: "white"
    },

    button: {
        flex: 1,
        minHeight: 40,
        flexDirection: 'row',
        justifyContent: 'center',

        alignSelf: 'stretch',
        borderWidth: 2,
        borderRadius: 10,

        borderColor: '#31BD4B',

        margin: 10,
        padding: 10,
    },

    submitButton: {
        backgroundColor: '#31BD4B',
        borderColor: '#31BD4B'
    },

    clearButton: {
        backgroundColor: '#4E5255',
        borderColor: '#4E5255'
    },

    disabledButton: {
        backgroundColor: '#B7BBBD',
        borderColor: '#B7BBBD'
    }
});



