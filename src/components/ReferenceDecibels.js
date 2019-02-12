import React from 'react';
import {View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const referenceDecibels = () => (

  <View>
  <Text style={styles.title}> Example Decibel Levels </Text>

    <View style={styles.container}>

      <View style={styles.textAndIconSpacing}>
        <Icon name={"ambulance"} size={30} color={"#B7BBBD"}/>
        <Text style={styles.text}> Ambulance </Text>
        <Text style={styles.text}> 120 dB </Text>
      </View>

      <View style={styles.textAndIconSpacing}>
        <Icon name={"bell-ring"} size={30} color={"#B7BBBD"}/>
        <Text style={styles.text}> Doorbell </Text>
        <Text style={styles.text}> 80 dB </Text>
      </View>

      <View style={styles.textAndIconSpacing}>
        <Icon name={"library"} size={30} color={"#B7BBBD"}/>
        <Text style={styles.text}> Library </Text>
        <Text style={styles.text}> 40 dB </Text>
      </View>

    </View>
  </View>
);

const brightGreen = "#31BD4B";
const styles = StyleSheet.create({
  textAndIconSpacing: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: "pink",
    alignItems: 'center',
    width: 200,
    height: 50
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingLeft: 60,
    paddingRight: 60
  },
  text : {
    fontSize: 14,
    color: "#B7BBBD"
  },
  title : {
    fontSize: 20,
    alignSelf: "center",
    color: "#B7BBBD",
    paddingBottom: 10
  },

});

export default referenceDecibels;

