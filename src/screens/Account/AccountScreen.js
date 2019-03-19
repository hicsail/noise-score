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
        var authHeader = response['authHeader'];
        const header = {
          'Content-Type': 'application/json',
          'Authorization' : authHeader
        };
        this.setState({
          username : response['user']['username'],
          userID : response['user']['_id']
        }, function(){
          // Now we need to get all their measurement information
          var params = {
            userID : this.state.userID,
            username : this.state.username
          };
          axios.get('http://localhost:9000/api/userMeasurements', {headers:header, params:params}).then(function (ret){
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
        var authHeader = response['authHeader'];
        const header = {
          'Content-Type': 'application/json',
          'Authorization' : authHeader
        };



        this.removeItemValue("userData").then(function (ret){
          if(ret){
              // navigate("SignedOut");
            axios.delete('http://localhost:9000/api/logout', {headers:header})
                .then(function (response) {
                  navigate("SignedOut");
                })
                .catch(function (error) {
                  console.log(error);
                  alert("Something went wrong!");
                });

          } else {
            alert("Error")
          }
        });
      }
    }.bind(this));
  }

  generateData(data){
    // The iterator used to generate what is displayed for the data.
    var dateFormat = require('dateformat');
    if(data != null){
      var counter = -1;
      return data.map((data) => {
        counter += 1;
        var id = data['_id'];
        var date = dateFormat(data['date'], "dddd, mmmm dS, yyyy, h:MM:ss TT");
        var avgDecibels = data['rawData']["average"];
        var sources = data['sources'];
        return (
              <Text key={id}>Number: {counter} {"\n"} {'\t'}Date/Time: {date}. {"\n"} {'\t'}Average Decibels: {avgDecibels}{"\n"} {'\t'}Major Sources:  {sources}</Text>
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
      AsyncStorage.getItem('userData').then(function (ret) {
        if(ret){
          var response = JSON.parse(ret);
          var authHeader = response['authHeader'];
          const header = {
            'Content-Type': 'application/json',
            'Authorization' : authHeader
          };
          axios.get('http://localhost:9000/api/userMeasurements', {headers: header, params:params}).then(function (ret){
            self.setState({
              userData : ret['data']
            });
            // this.generateData(self);
          }).catch(function (error){
            alert(error);
          });
        }
      });

    }
  }


  reloadButton() {

    // Simple function to reload the data
    this.updateData();
    this.forceUpdate();
  }

  render() {


    const { username } = this.state;
    var data = this.state.userData;
    var iterator = this.generateData(data);


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
