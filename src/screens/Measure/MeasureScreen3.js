import React from 'react';
import {StyleSheet, Text, ScrollView, View, TextInput} from 'react-native';
import NavButtons from '../../components/NavButtons';
import ClearSubmitButtons from '../../components/ClearSubmitButtons';

export default class MeasureScreen3 extends React.Component {

  static navigationOptions = {
    title: 'Comment',
    headerStyle: {
      backgroundColor: "#31BD4B"
    },
    headerTintColor: 'white'
  };


  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }

  clear = () => {
    this.setState({
      comment : ''
    });
  };

  submit() {
    // TODO
    alert('Submitted measurement.');
  }


  render() {
    return (
      <ScrollView>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Add a comment.</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>(up to 140 characters)</Text>
          </View>

          <TextInput
            multiline = {true}
            style={{height: 200, borderColor: 'gray', borderWidth: 1, fontSize: 26}}
            onChangeText={(comment) => this.setState({comment})}
            value={this.state.comment}
            maxLength={140}
          />


        <ClearSubmitButtons
          clear={this.clear}
          submit={this.submit}
          />


          <NavButtons
            navigation = {this.props.navigation}
                      back={'Measure2'}
                      next={null}/>

      </ScrollView>
    );
  }
}

const brightGreen = "#31BD4B";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  text : {
    fontSize: 26,
    color: "black"
  }
});
