import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Table, Rows, Row} from 'react-native-table-component'

const table = (props) => (
    <View style={styles.table}>
      <Table borderStyle={styles.tableBorder}>
        <Row data={[props.title]} style={styles.titleStyle} textStyle={styles.title}/>
        <Rows data={props.data} style={styles.rowStyle} textStyle={styles.text}/>
      </Table>
    </View>
);

const styles = StyleSheet.create({
  table: {
    justifyContent: 'center',
    height: 150,
    paddingLeft: 25,
    paddingRight: 25
  },
  text: {
    fontSize: 16,
    alignSelf: "center",
    color: "rgb(134, 65, 244)"
  },
  tableBorder: {
    borderWidth: 2,
    borderColor: 'white'
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
    color: "black"
  },
  titleStyle: {
    backgroundColor: '#B7BBBD',
    alignItems: 'center'
  },
  rowStyle: {
    alignItems: 'center',
    backgroundColor: '#F7F7F8'
  }
});

export default table;
