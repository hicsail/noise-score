import IconFA from "react-native-vector-icons/FontAwesome";
import Text from "react-native-elements/src/text/Text";
import { TouchableOpacity } from "react-native";
import React from "react";

export default class RightIconButton extends Component {
    constructor(props) {
        super(props)
    }

    return() {
        render(
            <TouchableOpacity
                style={
                    [styles.button,
                    this.props.active ?
                        [styles.disabledButton, this.props.disabledStyle]
                    :
                        [styles.buttonStyle, this.props.customStyle]]}
                disabled={this.props.active}
                onPress={() => this.props.onPressMethod()}
            >

                <IconFA
                    name={this.props.iconName}
                    size={this.iconSize}
                    color="white"
                    style={{
                        flex: 1,
                        alignSelf: 'center',
                        textAlign: 'left',
                    }}
                />

                <Text style={[{
                    fontSize: width / 15,
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: 'white'
                }, this.props.textStyle]}>Clear</Text>
            </TouchableOpacity>
        )
    };


}