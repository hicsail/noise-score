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
            console.log(self.state);
            // this.generateData(self);
          }).catch(function (error){
            alert(error);
          });

        // .bind(this)
        });
      }
    }.bind(this));
  }

  componentDidUpdate(){
    this.componentDidMount();
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
    const requestBody = {
      username: this.state.username,
      password: this.state.password
    };

    const {navigate} = this.props.navigation;

    AsyncStorage.getItem('userData').then(function (ret) {
      if (ret) {
        var response = JSON.parse(ret);
        var key = response['session']['key'];
        console.log(key);
        var username = response['user']['username'];
        this.setState({username: username});
        // TODO: Change this to API Call
        this.removeItemValue("userData").then(function (ret){
          if(ret){
            axios.delete('http://localhost:9000/api/delete')
                .then(function (response) {
                  navigate("SignedOut");
                })
                .catch(function (error) {
                  console.log(error);
                  alert("Invalid Username or Password");
                });

          } else {
            alert("Error")
          }
        });
      }
    }.bind(this));
  }

  generateData(data){
    if(data != null){
      return data.map((data) => {
        var temp = data['_id'];
        return (
            <Text>{temp}</Text>
        )
      });
    }
  }

  render() {


    const { username } = this.state;
    var data = this.state.userData;
    var iterator = this.generateData(data);


    return (
      <View style={styles.container}>
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
