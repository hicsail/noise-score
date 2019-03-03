import React from 'react';
import {
  Platform,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  View, AsyncStorage
} from 'react-native';
import RNSoundLevelModule from 'react-native-sound-level';
import Table from '../../components/Table';
import ListItem from '../../components/ListItem';
import DecibelChart from '../../components/DecibelChart';
import ClearSubmitButtons from '../../components/ClearSubmitButtons';
import StartMicrophone from '../../components/StartMicrophone';
import StopMicrophone from '../../components/StopMicrophone';
import ReferenceDecibels from '../../components/ReferenceDecibels';


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
          RNSoundLevelModule.start();
          RNSoundLevelModule.onNewFrame = (d) => {
            this.setState({
              decibels : this.state.decibels.concat(d.value),
              started : true,
              stopped : false
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
    // We need to gather the data
    var data = [-Math.min(...this.state.decibels).toFixed(2),  -Math.max(...this.state.decibels).toFixed(2),-this.aveDecibel().toFixed(2) ];
    var form = {
        'rawData' : data
      };
    AsyncStorage.setItem("formData", JSON.stringify(form));
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

      <ScrollView contentContainerStyle={{
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 20
      }}>

        {this.state.started ? <View><StopMicrophone stopMeasurement={this.stopMeasurement}/></View> :
          <View><StartMicrophone startMeasurement={this.startMeasurement}/></View> }

          <DecibelChart decibels={this.state.decibels}/>

          {this.state.decibels.length > 0 ? <View style={styles.tablePadding}>
            <Table
              title={'Decibels Measured'}
              data={[
                ['min', -Math.min(...this.state.decibels).toFixed(2)],
                ['max', -Math.max(...this.state.decibels).toFixed(2)],
                ['ave', -this.aveDecibel().toFixed(2)]]}/>

             <ReferenceDecibels/>

          </View> : null }

        {this.state.started || this.state.stopped ?
          <ClearSubmitButtons
            disabled={!this.state.stopped}
            clear={this.clearData}
            submit={this.submit}
          /> : null }

    </ScrollView>

  );
   }
}

// example decibel source: http://chchearing.org/noise/common-environmental-noise-levels

const styles = StyleSheet.create({
  tablePadding: {
    paddingBottom: 45
  }
});


