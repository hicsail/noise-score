import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LineChart, Grid, YAxis } from 'react-native-svg-charts';


const decibelChart = (props) => (

    <View style={styles.chart}>

        <YAxis
            data={props.decibels}
            contentInset={{ top: 20, bottom: 10, right: 20, left: 20 }}
            svg={{
                fill: 'grey',
                fontSize: 12,
            }}
            numberOfTicks={5}
            formatLabel={value => `${value}dB`}/>

        <LineChart
            style={{ flex: 1, marginLeft: 16 }}
            data={props.decibels.slice(Math.max(props.decibels.length - 50, 0), -1)}
            svg={{ stroke: '#31BD4B', strokeWidth: 2 }}
            contentInset={{ top: 20, bottom: 10, right: 20, left: 10 }}>
            <Grid/>
        </LineChart>
    </View>
);


const styles = StyleSheet.create({
    chart: {
        // flex: 1,
        maxHeight: 250,
        minHeight: 150,
        flexDirection: 'row',
        // marginLeft: 12,
        // marginRight: 12,
        padding: 10
    }

});

export default decibelChart;
