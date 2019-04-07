import React from 'react';
import {AsyncStorage, Picker, StyleSheet, View, ScrollView} from 'react-native';
import axios from "axios";
import { ListItem , Button, Text, Header} from 'react-native-elements';
import PTRView from 'react-native-pull-to-refresh';
import Icon from 'react-native-vector-icons/FontAwesome';



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


    goBack(){
        const {navigate} = this.props.navigation;
        navigate("Account1")
    }




    render() {

        const { username } = this.state;


        return (
            <View style={styles.container}>

                {/*<Text>Account page</Text>*/}
                {/*<Text>Username: {username}</Text>*/}

                {/*<Button*/}
                {/*buttonStyle={{ marginTop: 20 }}*/}
                {/*backgroundColor="transparent"*/}
                {/*textStyle={{ color: "#bcbec1" }}*/}
                {/*title="Sign Out"*/}
                {/*onPress={() => this.logout()}*/}
                {/*/>*/}
                {/*{iterator}*/}
                {/*<Button*/}
                {/*onPress={() => this.reloadButton()}*/}
                {/*title="Reload"*/}
                {/*buttonStyle={styles.reload}/>*/}
                <Header
                    centerComponent={{ text: username, style: { color: '#fff' } }}
                    containerStyle={styles.header}
                    leftComponent={<Button  icon={
                        <Icon
                            name="arrow-left"
                            size={15}
                            color="#323232"
                        />
                    }onPress = {() => this.goBack()}
                                            buttonStyle={styles.headerButton}/>}

                />

                <ScrollView>

                    <Button
                    buttonStyle={styles.button}
                    backgroundColor="transparent"
                    textStyle={{ color: "#bcbec1" }}
                    title="Sign Out"
                    onPress={() => this.logout()}
                    />
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
    headerButton : {
        backgroundColor : '#cccc31'
    },
    button : {
        marginTop: 20,
        backgroundColor: '#323232',
        marginHorizontal: 100
    }

});
