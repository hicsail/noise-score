import React from 'react';
import {AsyncStorage, Picker, StyleSheet, View, ScrollView} from 'react-native';
import axios from "axios";
import { ListItem , Button, Text, Header} from 'react-native-elements';
import PTRView from 'react-native-pull-to-refresh';
import Icon from 'react-native-vector-icons/FontAwesome';
import Panel from 'react-native-panel';



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
            this.props.navigation("SignedOut");
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


  moreInfo (data){
    AsyncStorage.setItem("moreInfo", JSON.stringify(data));
    const {navigate} = this.props.navigation;
    navigate("Account3");
  }

  generateData(data){
    // The iterator used to generate what is displayed for the data.
    var dateFormat = require('dateformat');

    if(data != null){

      var counter = -1;
      return data.reverse().map((data) => {
        counter += 1;
        if(data['rawData']["average"] < 10){
          return (
              <ListItem
                  key={counter}
                  leftAvatar={{ source: require('./../../../assets/soft.png')}}
                  title={dateFormat(data['date'], "ddd, mmm dS, yyyy, h:MM TT")}
                  subtitle={data['rawData']["average"].toString() + " dB"}
                  rightIcon={<Icon
                      name="arrow-right"
                      size={15}
                      color="#323232"
                  />}
                  onPress={() => {this.moreInfo(data)}}
              />
          )
        } else if (data['rawData']["average"] > 10 && data['rawData']["average"] < 40){
          return (
              <ListItem
                  key={counter}
                  leftAvatar={{ source: require('./../../../assets/medium.png')}}
                  title={dateFormat(data['date'], "ddd, mmm dS, yyyy, h:MM TT")}
                  subtitle={data['rawData']["average"].toString() + " dB"}
                  rightIcon={<Icon
                      name="arrow-right"
                      size={15}
                      color="#323232"
                  />}
                  onPress={() => {this.moreInfo(data)}}
              />
          )
        } else {
        return (
            <ListItem
                key={counter}
                leftAvatar={{ source: require('./../../../assets/loud.png')}}
                title={dateFormat(data['date'], "ddd, mmm dS, yyyy, h:MM TT")}
                subtitle={data['rawData']["average"].toString() + " dB"}
                rightIcon={<Icon
                    name="arrow-right"
                    size={15}
                    color="#323232"
                />}
                onPress={() => {this.moreInfo(data)}}
            />
        )
        }
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
            this.props.navigation("SignedOut");
          });
        }
      });

    }
  }


  reloadButton() {

    // Simple function to reload the data
    this.updateData();
    this.forceUpdate();
    //this.state.userData = null;
    // console.log(this.state.userData);
  }
  accountPage(){
    const {navigate} = this.props.navigation;
    navigate("Account2");
  }

  render() {

    const { username } = this.state;
    var data = this.state.userData;
    // var iterator = this.generateData(data);
   // var iterator = null;
    var list = this.generateData(data);


    return (
      <View style={styles.container}>


        <Header
            centerComponent={{ text: username, style: { color: '#fff' } }}
            containerStyle={styles.header}
            leftComponent={<Button  icon={
              <Icon
                  name="user-circle"
                  size={15}
                  color="#323232"
              />
            }onPress = {() => this.accountPage()}
            buttonStyle={styles.button}/>}
            rightComponent={<Button  icon={
              <Icon
                  name="retweet"
                  size={15}
                  color="#323232"
              />
            }onPress = {() => this.reloadButton()}
                                     buttonStyle={styles.button}/>}
        />

        <ScrollView>
        <View>
          {list}
        </View>
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  reload : {

  },
  header : {
    backgroundColor:  '#323232',
  },
  button : {
    backgroundColor : '#cccc31'
  }
});
