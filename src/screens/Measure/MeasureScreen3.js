import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import {StyleSheet, Text, ScrollView, View, TextInput, AsyncStorage} from 'react-native';
import NavButtons from '../../components/NavButtons';
import ClearSubmitButtons from '../../components/ClearSubmitButtons';
import axios from "axios";
import updateData from '../Account/AccountScreen';

export default class MeasureScreen3 extends React.Component {

  static navigationOptions = {
    title: 'Comment',
    headerStyle: {
      backgroundColor: "#31BD4B"
    },
    headerTintColor: 'white'
  };


  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }

  clear = () => {
    this.setState({
      comment : ''
    });
  };

  submit() {
    const {navigate} = this.props.navigation;

    var sucsess = true;
    AsyncStorage.getItem('formData').then(function (ret) {

      var response = JSON.parse(ret);
      if (this.state.comment.length > 0){
      response["words"] = this.state.comment;
      } else {
        response["words"] = " ";
      }
      response['date'] =  new Date();

      AsyncStorage.getItem('userData').then(function (ret2) {
        var userData = JSON.parse(ret2);
        response["username"] = userData['user']['username'];
        response["userID"] = userData['user']['_id'];

        navigator.geolocation.getCurrentPosition(
            position => {

              var longitude = position['coords']['latitude'];
              var latitude = position['coords']['longitude'];
              response['location'] = [latitude,longitude];
              axios.post('http://localhost:9000/api/inputMeasurement', response)
                  .then(function (response1) {
                    // Done!
                  })
                  .catch(function (error) {
                    sucsess = false;
                  });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );





      });
    }.bind(this)).then(function(){
      if(sucsess){
        alert('Submitted measurement.');


        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Measure' })],
        });
        this.props.navigation.dispatch(resetAction);

      // navigate('Measure');

      }else {
        alert('Error');
      }
    }.bind(this));



  }


  render() {

    return (
      <ScrollView>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Add a comment.</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>(up to 140 characters)</Text>
          </View>

          <TextInput
            multiline = {true}
            style={styles.textInput}
            onChangeText={(comment) => this.setState({comment})}
            value={this.state.comment}
            maxLength={140}
          />


        <ClearSubmitButtons
          clear={this.clear}
          submit={this.submit.bind(this)}
          />


          <NavButtons
            navigation = {this.props.navigation}
                      back={'Measure2'}
                      next={null}/>

      </ScrollView>
    );
  }
}

const brightGreen = "#31BD4B";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  text : {
    fontSize: 26,
    color: "black"
  },
  textInput : {
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 26
  }
});
