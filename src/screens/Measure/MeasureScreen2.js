import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import NavButtons from '../../components/NavButtons';
import SourceButton from '../../components/SourceButton';
import * as constants from '../../components/constants';

export default class MeasureScreen2 extends React.Component {

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
      sources: [],
    };
  }

  addSource = (source) => {
    this.setState({
      sources : [...this.state.sources, source]
    });

  };


  removeSource = (source) => {
    let sourcesArray = [...this.state.sources];
    const index = sourcesArray.indexOf(source);
    if (index > -1) {
      sourcesArray.splice(index, 1);
      this.setState({
        sources: sourcesArray
      })
    }
  };


  render() {

    // make source buttons
    let buttons = [];
    let count = 0;
    constants.NOISE_SOURCES.forEach((e)=> {
      buttons.push( <SourceButton
          key={count}
          val={e.val}
          text={e.text}
          icon={e.icon}
          sources={this.state.sources}
          addSource={this.addSource}
          removeSource={this.removeSource}
        />
      );
      count += 1;
    });

    return (
      <ScrollView>

        <View style={styles.textContainer}>
          <Text style={styles.text}>Select all major</Text>
          <Text style={styles.text}>noise sources.</Text>
        </View>

        <View style={styles.buttonContainer}>
            {buttons}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>{this.state.sources}</Text>
        </View>

        <NavButtons navigation = {this.props.navigation}
                    back={'Measure1'}
                    next={'Measure3'}/>

      </ScrollView>
    );
  }
}

const brightGreen = "#31BD4B";
const styles = StyleSheet.create({
  buttonContainer : {
    flex: 1,
    flexDirection: "row",
    flexWrap: 'wrap',
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
