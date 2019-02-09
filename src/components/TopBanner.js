import React from 'react';
import {View, Text, StyleSheet} from 'react-native';



const topBanner = (props) => (
  <View style={styles.topBanner}>
    <Text style={styles.text}>
      {props.content}
    </Text>
  </View>
);

const brightGreen = "#31BD4B";
const styles = StyleSheet.create({
  topBanner: {
    justifyContent: 'center',
    backgroundColor: brightGreen,
    height: 80
  },
  text: {
    fontSize: 26,
    alignSelf: "center",
    color: "black"
  }
});

export default topBanner;
