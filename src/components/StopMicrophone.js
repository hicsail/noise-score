import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';



const stopMicrophone = (props) => (

  <View style = {styles.button}>
      <IconFA.Button
        name={'stop'}
        size={30}
        borderRadius={30}
        color="white"
        backgroundColor={red}
        onPress={()=> props.stopMeasurement()}>
        <Text style = {styles.text}>Stop</Text>
      </IconFA.Button>
  </View>

);

const red = '#FF0000';
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


export default stopMicrophone;
