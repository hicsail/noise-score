import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

export default class ClearSubmitButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <View style={styles.padding}>
        <View style={styles.container}>
          <View style={styles.buttonSpacing}>

            <View style={styles.padding}>
              <View style={styles.container}>
                <View style={styles.buttonSpacing}>

                      <IconFA.Button
                        disabled={this.props.disabled}
                        name={'trash'}
                        size={30}
                        borderRadius={30}
                        color="white"
                        backgroundColor={this.props.disabled ? '#B7BBBD' : "#4E5255"}
                        onPress={() => this.props.clear()}>
                        <Text style={styles.buttonText}>Clear</Text>
                      </IconFA.Button>

                      <IconFA.Button
                        disabled={this.props.disabled}
                        name={'paper-plane'}
                        size={30}
                        borderRadius={30}
                        color="white"
                        backgroundColor={this.props.disabled ? '#B7BBBD' : brightGreen}
                        onPress={() => this.props.submit()}>
                        <Text style={styles.buttonText}>Submit</Text>
                      </IconFA.Button>

                </View>
              </View>
            </View>

          </View>
        </View>
      </View>
    )
  }
}


const brightGreen = "#31BD4B";
const styles = StyleSheet.create({
  padding: {
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
 buttonSpacing: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonText: {
    color: "white"
  }
});



