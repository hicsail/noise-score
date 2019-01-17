import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const listItem = (props) => (
  <View style={styles.listItem}>
    <Text>{props.decibel}</Text>
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 10,
    backgroundColor: '#eee'
  }
});

export default listItem;