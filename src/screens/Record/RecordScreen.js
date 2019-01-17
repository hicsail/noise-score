import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView  } from 'react-native';
import RNSoundLevelModule from 'react-native-sound-level';
import { Platform, PermissionsAndroid, TouchableOpacity } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import TopBanner from '../../components/TopBanner';
import ListItem from '../../components/ListItem';


export default class RecordScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      decibels: [],
      started: false
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
          this.state.started = true;
          RNSoundLevelModule.start();
          RNSoundLevelModule.onNewFrame = (d) => {
            this.setState({
              decibels : this.state.decibels.concat(d.value)
            });
          }
        }
    });
  }


  stopRecord = () => {
    RNSoundLevelModule.stop();
    this.state.started = false;
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

      <ScrollView>
        <TopBanner content={"Measure sounds."} />

        <View style = {styles.buttonContainer}>
          <TouchableOpacity style = {styles.button}
                            onPress={this.startRecord}>
            <Text style = {styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>


        <LineChart
          style={{ height: 100 }}
          data={ this.state.decibels }
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Grid/>
        </LineChart>



        {this.state.started ? <View style = {styles.buttonContainer}>
          <TouchableOpacity style = {styles.button}
                            onPress={this.stopRecord}>
            <Text style = {styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View> : null }


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
    </ScrollView>

  );
   }
}



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
  buttonText: {
    color: 'black',
    fontSize: 20,
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


