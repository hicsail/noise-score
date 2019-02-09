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
        <View style={styles.navContainer}>
          <View style={styles.navButtons}>

            <View style={styles.padding}>
              <View style={styles.navContainer}>
                <View style={styles.navButtons}>

                  <IconFA.Button
                    name={'trash'}
                    size={30}
                    borderRadius={30}
                    color="white"
                    backgroundColor={"grey"}
                    onPress={() => this.props.clear()}>
                    <Text style={styles.buttonText}>Clear</Text>
                  </IconFA.Button>

                  <IconFA.Button
                    name={'paper-plane'}
                    size={30}
                    borderRadius={30}
                    color="white"
                    backgroundColor={brightGreen}
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



