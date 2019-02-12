import React from 'react';
import {View, StyleSheet } from 'react-native';
import { LineChart, Grid, YAxis } from 'react-native-svg-charts';


const decibelChart = (props) => (

  <View style={styles.chart}>

    <YAxis
      data={ props.decibels }
      contentInset={{ top: 20, bottom: 10, right: 20, left: 20 }}
      svg={{
        fill: 'grey',
        fontSize: 12,
      }}
      numberOfTicks={ 5 }
      formatLabel={ value => `${-value}dB` }/>

    <LineChart
      style={{ flex: 1, marginLeft: 16 }}
      data={ props.decibels }
      svg={{ stroke: 'rgb(134, 65, 244)', strokeWidth:5}}
      contentInset={{ top: 20, bottom: 10, right: 20, left: 10 }}>
      <Grid/>
    </LineChart>
  </View>
);


const styles = StyleSheet.create({
  chart: {
    height: 250,
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 12,
    padding: 10
  }

});

export default decibelChart;
