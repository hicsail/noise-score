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
            username: null,
            userID : -1,
            userData : null,
            infoData: null,
            describe : null,
            feel : null,
            location : null,
            loud : null,
            rawData : null,
            sources : null,
            words : null
        };

    }

    componentDidMount() {

        // Get the information for the moreInfo screen
        AsyncStorage.getItem('moreInfo').then(function (ret) {
            if (ret) {
                var response = JSON.parse(ret);
                this.setState({
                    username : response['username'],
                    describe : response['describe'],
                    feel : response['feel'],
                    location : response['location'],
                    loud : response['loud'],
                    rawData : response['rawData'],
                    sources : response['sources'],
                    words : response['words']
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

        const username  = this.state.username;
        const location = this.state.location;
        const lang = location['lang'];
        const lat = location['lat'];
        console.log(lang, lat);

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
