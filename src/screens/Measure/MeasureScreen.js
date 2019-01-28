import React from 'react';

import {
  Platform,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  View } from 'react-native';

import IconFA from 'react-native-vector-icons/FontAwesome';
import RNSoundLevelModule from 'react-native-sound-level';
import { LineChart, Grid } from 'react-native-svg-charts';
import ListItem from '../../components/ListItem';


export default class MeasureScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      decibels: [],
      started: false
    };
  }

  static navigationOptions = {
    title: 'Measure Sounds',
    headerStyle: {
      backgroundColor: '#00FF00'
    },
    headerTintColor: 'white'
  };

  async requestAudioPermissionAndroid() {
    if (Platform.OS === 'ios') {
      return true;
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        'title': 'Noise Score App Audio Permission',
        'message': 'Noise Score App needs access to your microphone ' +
          'to record decibel levels.'
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  startRecord = () => {
    this.requestAudioPermissionAndroid()
      .then((didGetPermission)=> {
        if (didGetPermission){
          this.state.started = true;
          console.log("got permission, starting to record.");
          RNSoundLevelModule.start();
          RNSoundLevelModule.onNewFrame = (d) => {
            this.setState({
              decibels : this.state.decibels.concat(d.value)
            });
          }
        }
    });
  };


  stopRecord = () => {
    RNSoundLevelModule.stop();
    this.state.started = false;
  };

  aveDecibel = () => {
    let total = 0;
    for (let i=0; i < this.state.decibels.length; i++) {
      total += this.state.decibels[i];
    }
    return total / this.state.decibels.length;
  };



  render() {
    const decibelsOutput = this.state.decibels.map((decibel, i) => (
      <ListItem key={i} decibel={decibel} />
    ));


    return (

      <ScrollView>

        <View style = {styles.iconButton}>
          <IconFA.Button
            name={'microphone'}
            size={30}
            borderRadius={30}
            color='white'
            backgroundColor={brightGreen}
            onPress={()=> this.startRecord()}>
            <Text style = {styles.buttonText}>Start</Text>
          </IconFA.Button>
        </View>


        <LineChart
          style={{ height: 300, paddingVertical: 12 }}
          data={ this.state.decibels }
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Grid/>
        </LineChart>


        {this.state.started ? <View style = {styles.iconButton}>
          <IconFA.Button
            name={'stop'}
            size={30}
            borderRadius={30}
            color="white"
            backgroundColor={brightGreen}
            onPress={this.stopRecord}>
            <Text style = {styles.buttonText}>Stop</Text>
          </IconFA.Button>
        </View> : null }


        {this.state.decibels.length > 0 ? <View style={styles.center}>
          <Text style = {styles.text}>
            Max: { Math.max(...this.state.decibels).toFixed(2) }
          </Text>
          <Text style = {styles.text}>
            Min: { Math.min(...this.state.decibels).toFixed(2) }
          </Text>
          <Text style = {styles.text}>
            Average: { this.aveDecibel().toFixed(2) }
          </Text>
        </View> : null }


        {this.state.started ? <View style = {styles.iconButton}>
            <IconFA.Button
              name={'trash'}
              size={30}
              borderRadius={30}
              color="white"
              backgroundColor={brightGreen}
              onPress={()=> alert("Deleted")}>
              <Text style = {styles.buttonText}>Delete</Text>
            </IconFA.Button>
        </View> : null }


        {this.state.started ? <View style = {styles.iconButton}>
          <IconFA.Button
            name={'paper-plane'}
            size={30}
            borderRadius={30}
            color="white"
            backgroundColor={brightGreen}
            onPress={()=> this.props.navigation.navigate('Measure1')}>
            <Text style = {styles.buttonText}>Submit</Text>
          </IconFA.Button>
        </View> : null }

    </ScrollView>

  );
   }
}

const brightGreen = "#00FF00";

const styles = StyleSheet.create({
  center: {
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  button: {
    backgroundColor: '#00FF00',
    padding: 20,
    borderRadius: 30
  },
  deleteButton: {
    backgroundColor: 'darkgrey',
    padding: 20,
    borderRadius: 30,
    justifyContent: 'space-between'
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  container: {
    justifyContent: 'space-evenly',
  },
  navButtons: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});


