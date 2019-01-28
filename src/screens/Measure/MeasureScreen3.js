import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import NavButtons from '../../components/NavButtons';

export default class MeasureScreen3 extends React.Component {

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

        <Text>text field description </Text>

        <NavButtons navigation = {this.props.navigation}
                    back={'Measure2'}
                    next={null}/>

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
