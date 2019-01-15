import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class RecordScreen2 extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Please Comment</Text>
        <Text>Select all major noise sources.</Text>
        <View style={styles.navButtons}>
          <Button
            title="Back"
            onPress={() => this.props.navigation.navigate('Record1')}
          />
          <Button
            title="Next"
          />
        </View>
      </View>
    );
  }
}

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