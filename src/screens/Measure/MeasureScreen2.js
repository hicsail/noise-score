import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import NavButtons from '../../components/NavButtons';

export default class MeasureScreen2 extends React.Component {

  static navigationOptions = {
    title: 'Comment',
    headerStyle: {
      backgroundColor: '#00FF00'
    },
    headerTintColor: 'white'
  };

  render() {
    return (
      <ScrollView>
        <Text>Select all major noise sources.</Text>
        <Text>eg: truck, airplane, car, siren </Text>

        <NavButtons navigation = {this.props.navigation}
                    back={'Measure1'}
                    next={'Measure3'}/>


      </ScrollView>
    );
  }
}

const brightGreen = "#00FF00";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  navButtons: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
