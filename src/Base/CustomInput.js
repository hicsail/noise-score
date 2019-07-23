import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Input,} from 'react-native-elements';
import PropTypes from 'prop-types';
const { width, height, } = Dimensions.get('window');


export default class CustomInput extends React.Component {

    // ------  Define acceptable props and which of them are required ------
    static propTypes = {
        label: PropTypes.string,
        placeholder: PropTypes.any,
        errorMessage: PropTypes.string,
        controlFunc: PropTypes.func.isRequired,
        iconName: PropTypes.string,
        iconColor: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            field: '\t',
        }
    }

    isValid() {
        return (this.props.errorMessage === '' || this.props.errorMessage === undefined);
    }

    // ----------------------- Rendering method of the Custom Button component -----------------------
    render() {

        return (

            <View style={{ marginVertical: 5 }}>
                <Input
                    {...this.props}
                    labelStyle={styles.text}

                    inputContainerStyle={[styles.inputBox, this.isValid() ? null : styles.errorInputBox]}
                    inputStyle={[styles.text, styles.placeholderText]}

                    //Make default input underline invisible
                    underlineColorAndroid='rgba(0,0,0,0)'

                    //Add a right icon, if specified and style its container
                    rightIcon={this.props.iconName ? {
                        type: 'font-awesome',
                        name: this.props.iconName,
                        color: this.props.iconColor ? this.props.iconColor : '#383838'
                    } : null}
                    rightIconContainerStyle={{ marginRight: 25 }}

                    errorStyle={[styles.errorStyle, styles.placeholderText]}

                    onChangeText={(field) => {
                        this.props.controlFunc(field);
                        this.setState({ field: field })
                    }}


                />
            </View>
        );
    }
}

//------------ Styling for custom button component ------------
const styles = StyleSheet.create({
    inputWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        marginVertical: 5,
    },

    text: {
        fontSize: width / 20,
        color: "#383838",
        textAlignVertical: "center",
        fontFamily: 'Euphemia UCAS',
        textAlign: 'center',
        fontWeight: 'normal',
    },

    placeholderText: {
        textAlign: 'left',
        paddingLeft: 25,
    },

    inputBox: {
        borderColor: '#31BD4B',
        borderRadius: 30,
        borderBottomWidth: 3,
        alignItems: 'stretch',
    },

    errorInputBox: {
        borderColor: 'red',
    },

    errorStyle: {
        color: "red",
        paddingVertical: 0,
        marginTop: 3,
        marginBottom: 0,
    },

});

