import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


const topBanner = (props) => (
  <View style={styles.topBanner}>
    <Text style={styles.text}>
      {props.content}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  topBanner: {
    justifyContent: 'center',
    backgroundColor: '#00FF00',
    height: 80
  },
  text: {
    fontSize: 26,
    alignSelf: "center",
    color: "black"
  }
});

export default topBanner;
