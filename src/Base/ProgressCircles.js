import { View, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";

import PropTypes from "prop-types";

const { width } = Dimensions.get('window');

export default class ProgressCircles extends React.Component {

    static propTypes = {
        totalSteps: PropTypes.number.isRequired,
        currentStep: PropTypes.number.isRequired,
        customSize: PropTypes.object,
        customActiveColor: PropTypes.object,
        customDisabledColor: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    /* ------------------------ Step progress ------------------------ */
    render() {
        let circles = [];

        // Choose between defualt values and provided ones
        let size = this.props.customSize ? this.props.customSize : width * 0.04;
        let active = this.props.customActiveColor ? this.props.customActiveColor : '#31bd4b';
        let disabled = this.props.customDisabledColor ? this.props.customDisabledColor : 'lightgray';

        for (let i = 0; i < this.props.totalSteps; i++) {
            let color = ((i + 1) <= this.props.currentStep) ? active : disabled;

            circles.push(
                <View key={i}
                      style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={size} name='circle' type='font-awesome' color={color}/>
                </View>
            )
        }


        return (
            <View
                style={{
                    flexDirection: 'row', justifyContent: 'space-evenly',
                    marginVertical: 10, paddingHorizontal: '15%'
                }}
            >
                {circles}
            </View>
        )
    }


}