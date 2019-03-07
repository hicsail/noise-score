import React from 'react';
import {AsyncStorage, Button, Picker, StyleSheet, Text, View} from 'react-native';
import axios from "axios";



export default class AccountScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "temp",
      userID : -1,
      userData : null
    };

  }

  componentDidMount() {

    // Add listener to notice when we need to reload data
    this.subs = [
      this.props.navigation.addListener('willFocus', () => this.updateData())
    ];

    var self = this;
    // Get the information for the Account Screen
    AsyncStorage.getItem('userData').then(function (ret) {
      if (ret) {
        var response = JSON.parse(ret);
        this.setState({
          username : response['user']['username'],
          userID : response['user']['_id']
        }, function(){
          // Now we need to get all their measurement information
          var params = {
            userID : this.state.userID,
            username : this.state.username
          };
          axios.post('http://localhost:9000/api/userMeasurements', params).then(function (ret){
            self.setState({
              userData : ret['data']
            });
            // this.generateData(self);
          }).catch(function (error){
            alert(error);
          });
        });
      }
    }.bind(this));
  }



  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  logout() {


    const {navigate} = this.props.navigation;

    AsyncStorage.getItem('userData').then(function (ret) {
      if (ret) {
        var response = JSON.parse(ret);
        var key = response['session']['key'];
        console.log(key);
        var username = response['user']['username'];
        // TODO: Change this to API Call
        this.removeItemValue("userData").then(function (ret){
          if(ret){

            // axios.delete('http://localhost:9000/api/delete')
            //     .then(function (response) {
            //       navigate("SignedOut");
            //     })
            //     .catch(function (error) {
            //       console.log(error);
            //       alert("Invalid Username or Password");
            //     });

          } else {
            alert("Error")
          }
        });
      }
    }.bind(this));
  }

  generateData(data){
    // The iterator used to generate what is displayed for the data.
    if(data != null){
      var counter = -1;
      return data.map((data) => {
        counter += 1;
        var id = data['_id'];
        var date = this.parseISOString(data['date']);
        var avgDecibels = data['rawData']["average"];
        var sources = data['sources'];
        return (
              <Text key={id}>Number: {counter} {"\n"} {'\t'}Date/Time: {date.toDateString()}/{date.toTimeString()}. {"\n"} {'\t'}Average Decibels: {avgDecibels}{"\n"} {'\t'}Major Sources:  {sources}</Text>
        )
      });

    }
  }
  updateData(){
    // If we have the data to make the correct API call
    if(this.state.userID != -1 && this.state.username != "temp"){
      var self = this;
      var params = {
        userID : this.state.userID,
        username : this.state.username
      };
      // Update the userData by making the call 'api/userMeasurements'
      axios.post('http://localhost:9000/api/userMeasurements', params).then(function (ret){
        self.setState({
          userData : ret['data']
        });
        // this.generateData(self);
      }).catch(function (error){
        alert(error);
      });
    }
  }

  // Helper function to parse the ISO date
  parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }
  reloadButton() {


    // Simple function to reload the data
    this.updateData();
    this.forceUpdate();
    //this.state.userData = null;
    console.log(this.state.userData);
  }

  render() {

    const { username } = this.state;
    var data = this.state.userData;
    var iterator = this.generateData(data);
   // var iterator = null;

    return (
      <View style={styles.container}>
        <Button
            onPress={() => this.reloadButton()}
            title="Reload"/>
        <Text>Account page</Text>
        <Text>Username: {username}</Text>
        <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Sign Out"
            onPress={() => this.logout()}
        />
        {iterator}

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
