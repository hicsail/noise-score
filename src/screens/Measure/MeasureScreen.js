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
import { LineChart, Grid, YAxis } from 'react-native-svg-charts';
import Table from '../../components/Table';
import ListItem from '../../components/ListItem';
import ClearSubmitButtons from '../../components/ClearSubmitButtons';

export default class MeasureScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      decibels: [],
      started: false,
      stopped: false
    };
  }

  static navigationOptions = {
    title: 'Measure Sounds',
    headerStyle: {
      backgroundColor: "#31BD4B"
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

  startMeasurement = () => {
    this.requestAudioPermissionAndroid()
      .then((didGetPermission)=> {
        if (didGetPermission){
          this.state.started = true;
          this.state.stopped = false;
          RNSoundLevelModule.start();
          RNSoundLevelModule.onNewFrame = (d) => {
            this.setState({
              decibels : this.state.decibels.concat(d.value)
            });
          }
        }
    });
  };


  stopMeasurement = () => {
    this.setState({
      started : false,
      stopped : true
    });

    RNSoundLevelModule.stop();
  };

  clearData = () => {
    this.setState({
      decibels : [],
      started : false,
      stopped : false
  });
  };

  submit = () => {
    this.props.navigation.navigate('Measure1');
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

        {!this.state.started ? <View style = {styles.iconButton}>
          <IconFA.Button
            name={'microphone'}
            size={30}
            borderRadius={30}
            color='white'
            backgroundColor={brightGreen}
            onPress={()=> this.startMeasurement()}>
            <Text style = {styles.buttonText}>Start</Text>
          </IconFA.Button>
        </View> : null }


        {this.state.started ? <View style = {styles.iconButton}>
          <IconFA.Button
            name={'stop'}
            size={30}
            borderRadius={30}
            color="white"
            backgroundColor={'#FF0000'}
            onPress={()=> this.stopMeasurement()}>
            <Text style = {styles.buttonText}>Stop</Text>
          </IconFA.Button>
        </View> : null }


        <View style={styles.chart}>

          <YAxis
            data={ this.state.decibels }
            contentInset={{ top: 20, bottom: 20, right: 20, left: 20 }}
            svg={{
              fill: 'grey',
              fontSize: 12,
            }}
            numberOfTicks={ 5 }
            formatLabel={ value => `${value}dB` }/>

          <LineChart
            style={{ flex: 1, marginLeft: 16 }}
            data={ this.state.decibels }
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20, right: 20, left: 20 }}>
            <Grid/>
          </LineChart>
        </View>

        {this.state.decibels.length > 0 ? <View>
          <Table ave={this.aveDecibel().toFixed(2)}
               min={Math.min(...this.state.decibels).toFixed(2)}
               max={Math.max(...this.state.decibels).toFixed(2)}/>
          </View> : null }


        {this.state.stopped ?
          <ClearSubmitButtons
            clear={this.clearData}
            submit={this.submit}
          />
        : null}

    </ScrollView>

  );
   }
}

const brightGreen = "#31BD4B";
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
  navContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly'
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
  },
  padding: {
    padding: 20,
  },
  chart: {
    height: 200,
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 12
  }
});


