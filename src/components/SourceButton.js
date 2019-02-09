import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class SourceButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (

        <TouchableOpacity style={styles.buttonContainer} source={this.props.text} onPress={ () =>
          this.props.sources.indexOf(this.props.val) === -1 ?
            this.props.addSource(this.props.val) : this.props.removeSource(this.props.val)
        } style={ this.props.sources.indexOf(this.props.val) === -1 ?
          styles.unselected : styles.selected}>

          <View style={styles.textAndIconSpacing}>
            <Icon name={this.props.icon} size={35} color={"white"}/>
            <Text style={styles.sourceButtonText}>{this.props.text} </Text>
          </View>

        </TouchableOpacity>

    )
  }
}



const brightGreen = "#31BD4B";
const sourceButton = {
  marginRight:40,
  marginLeft:40,
  marginTop:10,
  paddingTop:10,
  paddingBottom:10,
  borderRadius:10,
  borderWidth: 1,
  borderColor: '#fff'
};

const styles = StyleSheet.create({
  textAndIconSpacing: {
    flexDirection: 'column',
    borderRadius: 10,
    justifyContent: 'space-between',
    color: "white",
    alignItems: 'center',
    width: 100,
    height: 55
  },
  buttonContainer: {
    width: 200,
    height: 75
  },
  sourceButtonText : {
    fontSize: 16,
    color: 'white'
  },
  unselected: {
    backgroundColor: "#92979B",
    ...sourceButton
  },
  selected: {
    backgroundColor: brightGreen,
    ...sourceButton
  },
});


