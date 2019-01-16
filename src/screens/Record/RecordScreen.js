import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import RNSoundLevelModule from 'react-native-sound-level';
import { Platform, PermissionsAndroid, TouchableOpacity } from 'react-native';
import ListItem from '../../components/ListItem/ListItem';
import { LineChart, Grid } from 'react-native-svg-charts';


export default class RecordScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      decibels: [],
    };
  }


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
          RNSoundLevelModule.start();
          RNSoundLevelModule.onNewFrame = (d) => {
            this.setState({
              decibels : this.state.decibels.concat(d.value)
            });
          }
        }
    });
  }


  stopRecord(){
    RNSoundLevelModule.stop()
  }

  aveDecibel = () => {
    let total = 0;
    for (let i=0; i < this.state.decibels.length; i++) {
      total += this.state.decibels[i];
    }
    return total / this.state.decibels.length;
  }



  render() {
    const decibelsOutput = this.state.decibels.map((decibel, i) => (
      <ListItem key={i} decibel={decibel} />
    ))


    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.center}
          onPress={this.startRecord}>
          <Text> Measure Sounds </Text>
        </TouchableOpacity>

        <LineChart
          style={{ height: 100 }}
          data={ this.state.decibels }
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Grid/>
        </LineChart>

        <TouchableOpacity style={styles.center}
        onPress={this.stopRecord}>
        <Text> Stop </Text>
        </TouchableOpacity>

        {/*<View>*/}
          {/*{decibelsOutput}*/}
        {/*</View>*/}
        <View style={styles.center}>
          <Text>
            Max Decibel: { Math.max(...this.state.decibels) }
          </Text>
        </View>

        <View style={styles.center}>
          <Text>
          Ave Decibel: { this.aveDecibel() }
          </Text>
        </View>


        <View style={styles.navButtons, styles.center}>
          <Button
            title="Delete"
            onPress={() => this.props.navigation.navigate('Record1')}
          />
          <Button
            title="Submit"
            onPress={() => this.props.navigation.navigate('Record1')}
          />
        </View>
    </View>

  );
   }
}



const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',

    justifyContent: 'space-evenly',
  },
  navButtons: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});


