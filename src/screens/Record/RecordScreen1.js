import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { SelectMultipleGroupButton } from "react-native-selectmultiple-button";
import TopBanner from '../../components/TopBanner';


export default class RecordScreen1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // intensity: '',
      loudness: '',
      oneWord: '',
      feeling: ''
    };
  }


  render() {

    return (
      <ScrollView>
        <TopBanner content={"Please comment."} />

        {/*<View style={styles.questionArea}>*/}
          {/*<View style={styles.wrapText}>*/}
            {/*<Text style={styles.text}>How intense was the activity?</Text>*/}
          {/*</View>*/}
          {/*<SelectMultipleGroupButton*/}
            {/*multiple={false}*/}
            {/*group={[*/}
              {/*{ value: 'Not at all' },*/}
              {/*{ value: 'A little' },*/}
              {/*{ value: 'Moderately' },*/}
              {/*{ value: 'Very' }]}*/}
            {/*//defaultSelectedIndexes={[0]}*/}
            {/*buttonViewStyle={questionButtonSize}*/}
            {/*highLightStyle={questionButtonsStyle}*/}
            {/*textStyle={{ fontSize:15 }}*/}
            {/*onSelectedValuesChange={value =>*/}
              {/*this.setIntensity(value)*/}
            {/*}*/}
          {/*/>*/}
        {/*</View>*/}

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

        {/*<View style={styles.padding}>*/}
          {/*<View style={styles.wrapText}>*/}
            {/*<Text style={styles.text}>*/}
              {/*DEV ONLY:{this.state.intensity}{"  "}{this.state.loudness}{"\n"}*/}
              {/*{this.state.oneWord}{"  "}{this.state.feeling}*/}
            {/*</Text>*/}
          {/*</View>*/}
        {/*</View>*/}

        <View style={styles.padding}>
          <View style={styles.navContainer}>
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
        </View>

      </ScrollView>
    );
  }

  // setIntensity(value) {
  //   this.setState({
  //     intensity: value
  //   });
  // }
  setLoudness(value) {
    this.setState({
      loudness: value
    });
  }
  setOneWord(value) {
    this.setState({
      oneWord: value
    });
  }
  setFeeling(value) {
    this.setState({
      feeling: value
    });
  }

}

const lightGreen = '#00FF00';

const questionButtonsStyle = {
  borderColor: "gray",
  backgroundColor: "transparent",
  textColor: "gray",
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
    fontSize: 26
  },
  navContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  navButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
