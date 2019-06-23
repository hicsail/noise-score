import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import SourceButton from '../../components/SourceButton';
import * as constants from '../../components/constants';
import NavButtons2 from '../../components/NavButtons2';
import AsyncStorage from '@react-native-community/async-storage';

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

  // Helper function to add source
  addSource = (source) => {
    this.setState({
      sources : [...this.state.sources, source]
    });

  };

  // Helper function to remove source
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

  next(){
    // used to move to the next screen (MeasureScreen3.js)
    const {navigate} = this.props.navigation;
    // Need to add information about sources, save to local storage before moving
    if (this.state.sources.length == 0){
      alert("Please select one source.");
    } else if (this.state.sources.length > 5){
      alert("Please only select 5 sources.")
    } else {
      AsyncStorage.getItem('formData').then(function (ret) {
        var response = JSON.parse(ret);
        response["sources"] = this.state.sources;
        AsyncStorage.setItem("formData", JSON.stringify(response));
      }.bind(this)).then(function(){
        navigate('Measure3');
      }.bind(this));
    }
  }


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
          <Text style={styles.text}>Select all major sound sources: </Text>
        </View>
        <View style={styles.buttonContainer}>
            {buttons}
        </View>
        <NavButtons2 navigation={this.props.navigation}
                     back={'Measure1'}
                     next={this.next.bind(this)}/>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  buttonContainer : {
    flex: 1,
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  textContainer: {
    flex: 1,
    marginTop : 20,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  text : {
    fontSize: 26,
    color: "black"
  }
});
