import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

export default class RecordScreen1 extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Please Comment.</Text>
        <Text>Question 1.</Text>
        <Text>Question 2.</Text>
        <Text>Question 3.</Text>
        <Text>Question 4.</Text>
        <Text>Question 5.</Text>
        <View style={styles.navButtons}>
          <Button
            title="Back"
            onPress={() => this.props.navigation.navigate('Record')}
          />
          <Button
            title="Next"
            onPress={() => this.props.navigation.navigate('Record2')}
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