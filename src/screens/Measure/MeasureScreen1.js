import React from 'react';
import {StyleSheet, Text, View, ScrollView } from 'react-native';
import { SelectMultipleGroupButton } from "react-native-selectmultiple-button";
import NavButtons2 from '../../components/NavButtons2';
import AsyncStorage from '@react-native-community/async-storage';


export default class MeasureScreen1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // intensity: '',
      loudness: '',
      oneWord: '',
      feeling: ''
    };
  }

  static navigationOptions = {
    title: 'Comment',
    headerStyle: {
      backgroundColor: "#31BD4B"
    },
    headerTintColor: 'white'
  };



  next(){
      // Move to the next screen (MeasureScreen2.js)
      const {navigate} = this.props.navigation;

      // Need to add information Loud, Describe, Feel, save to local storage before moviing
      if (this.state.loudness == '' || this.state.oneWord == '' || this.state.feeling == ''){
          alert("Please answer every question.");
      } else {
          AsyncStorage.getItem('formData').then(function (ret) {
              var response = JSON.parse(ret);
              response["loud"] = this.state.loudness;
              response["describe"] = this.state.oneWord;
              response["feel"] = this.state.feeling;
              AsyncStorage.setItem("formData", JSON.stringify(response));
          }.bind(this)).then(function(){
              navigate('Measure2');
          }.bind(this));
      }
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.padding}>
          <View style={styles.wrapText}>
            <Text style={styles.text}>How loud</Text>
            <Text style={styles.text}>were the sounds?</Text>
          </View>
          <SelectMultipleGroupButton
            multiple={false}
            group={[
              { value: 'Very quiet' },
              { value: 'Quiet' },
              { value: 'Moderately Loud' },
              { value: 'Loud' },
              { value: 'Very Loud' }]}
            buttonViewStyle={questionButtonSize}
            highLightStyle={questionButtonsStyle}
            textStyle={{ fontSize:15 }}
            onSelectedValuesChange={value =>
              this.setLoudness(value)
            }
          />
        </View>
        <View style={styles.padding}>
          <View style={styles.wrapText}>
            <Text style={styles.text}>Which word best</Text>
            <Text style={styles.text}>describes the sounds?</Text>
          </View>
          <SelectMultipleGroupButton
            multiple={false}
            group={[
              { value: 'Very pleasant' },
              { value: 'Pleasant' },
              { value: 'Neutral' },
              { value: 'Noisy' },
              { value: 'Unbearable' }]}
            buttonViewStyle={questionButtonSize}
            highLightStyle={questionButtonsStyle}
            textStyle={{ fontSize:15 }}
            onSelectedValuesChange={value =>
              this.setOneWord(value)
            }
          />
        </View>
        <View style={styles.padding}>
          <View style={styles.wrapText}>
            <Text style={styles.text}>How did the sounds</Text>
            <Text style={styles.text}>make you feel?</Text>
          </View>
          <SelectMultipleGroupButton
            multiple={false}
            group={[
              { value: 'Relaxed' },
              { value: 'Tranquil' },
              { value: 'Neutral' },
              { value: 'Irritated' },
              { value: 'Anxious' },
              { value: 'Frustrated' },
              { value: 'Angry' }]}
            buttonViewStyle={questionButtonSize}
            highLightStyle={questionButtonsStyle}
            textStyle={{ fontSize:15 }}
            onSelectedValuesChange={value =>
              this.setFeeling(value)
            }
          />
        </View>
        <NavButtons2 navigation={this.props.navigation}
                    back={'Measure'}
                    next={this.next.bind(this)}/>
      </ScrollView>
    );
  }


// Function used to set the state
  setLoudness(value) {
    this.setState({
      loudness: value[0]
    });
  }
  setOneWord(value) {
    this.setState({
      oneWord: value[0]
    });
  }
  setFeeling(value) {
    this.setState({
      feeling: value[0]
    });
  }

}



const lightGreen = '#31BD4B';
const darkGray = "#383838";

const questionButtonsStyle = {
  borderColor: darkGray,
  backgroundColor: "transparent",
  textColor: darkGray,
  borderTintColor: lightGreen,
  backgroundTintColor: lightGreen,
  textTintColor: "black"
};

const questionButtonSize ={
  borderRadius: 10,
  height: 40
};


const styles = StyleSheet.create({
  padding: {
    padding: 20,
  },
  wrapText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  text: {
    fontSize: 26,
    color: "black"
  }
});
