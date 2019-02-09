import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Table, Rows, Row} from 'react-native-table-component'

const table = (props) => (
    <View style={styles.table}>
      <Table borderStyle={styles.tableBorder}>
        <Row data={['Decibels Measured']} style={styles.center} textStyle={styles.title}/>
        <Rows data={[['min', props.min], ['max', props.max], ['ave', props.ave]]} style={styles.center} textStyle={styles.text}/>
      </Table>
    </View>
);

const styles = StyleSheet.create({
  table: {
    justifyContent: 'center',
    height: 300
  },
  text: {
    fontSize: 26,
    alignSelf: "center",
    color: "black"
  },
  tableBorder: {
    borderWidth: 2,
    borderColor: '#c8e1ff'
  },
  title: {
    fontSize: 32,
    alignSelf: "center",
    color: "black"
  },
  center: {
    alignItems: 'center'
  }
});

export default table;
