import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

const startMicrophone = (props) => (

    <View style = {styles.button}>
      <IconFA.Button
        name={'microphone'}
        size={30}
        borderRadius={30}
        color='white'
        backgroundColor={brightGreen}
        onPress={()=> props.startMeasurement()}>
        <Text style = {styles.text}>Start</Text>
      </IconFA.Button>
    </View>
);



const brightGreen = "#31BD4B";
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20
  },
  text: {
    color: 'white',
    fontSize: 20
  },
});

export default startMicrophone;
