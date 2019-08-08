import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import ToggleSwitch from "toggle-switch-react-native";
import RNPickerSelect from 'react-native-picker-select';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';


import AsyncStorage from '@react-native-community/async-storage';


import CustomButton from "../../Base/CustomButton";
import {brightGreen, darkGray, width} from "../../components/constants"
import * as filters from "./filters"

export default class HeatmapFilters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            noiseType: 'db',
            location: 'Everything',
            activeSections: [],
        };

        this.inputRefs = {
            firstTextInput: null,
            favSport0: null,
            favSport1: null,
            lastTextInput: null,
            favSport5: null,
        };


    }

    async retrieveItem(key) {
        try {
            const retrievedItem = await AsyncStorage.getItem(key);
            return JSON.parse(retrievedItem);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    componentDidMount() {
        let thisRef = this;
        this.retrieveItem('filters').then(function (filters) {
            console.log(filters);
            // let parsedFilters = JSON.parse(filters);
            thisRef.setState(filters, () => console.log(this.state));

        });
    }

    async storeItem(key, item) {
        try {
            //we want to wait for the Promise returned by AsyncStorage.setItem()
            //to be resolved to the actual value before returning the value
            return await AsyncStorage.setItem(key, JSON.stringify(item));
        }
        catch (error) {
            console.log(error.message);
        }
    }

    saveFilters() {
        AsyncStorage.setItem("filters", JSON.stringify(this.state));
        this.props.navigation.navigate("normalMap")
    }


    _renderSectionTitle = section => {
        return (
            <View style={styles.content}>
                <Text>{section.content}</Text>
            </View>
        );
    };

    _renderHeader = section => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.title}</Text>
            </View>
        );
    };

    _renderContent = section => {
        return (
            <View style={styles.content}>
                <Text>{section.content}</Text>
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                // backgroundColor: 'lightblue'
            }}>

                <View style={{position: 'absolute', bottom: 10, left: width / 6, right: width / 6}}>
                    <CustomButton style={{width: 2 * width / 3}} text={"Save"} onPress={() => this.saveFilters()}/>
                </View>

                <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'center', margin: 20}}>

                    <Text> Noise Level</Text>
                    <View style={{justifySelf: 'center', marginHorizontal: 20}}>
                        <ToggleSwitch

                            isOn={this.state.noiseType === 'feel'}
                            onColor="green"
                            offColor="red"
                            label=""
                            labelStyle={{color: "black", fontWeight: "900"}}
                            size="medium"
                            onToggle={() => this.setState({noiseType: this.state.noiseType === 'db' ? 'feel' : 'db'})}/>
                    </View>
                    <Text>Sound Perception</Text>
                </View>
                <View style={{margin: 20}}>
                    <RNPickerSelect
                        // placeholder={<Text> Everything </Text>}
                        items={filters.location}
                        onValueChange={value => {
                            this.setState({
                                location: value,
                            });
                        }}
                        style={pickerSelectStyles}
                        value={this.state.location}
                        useNativeAndroidPickerStyle={false}
                        ref={el => {
                            this.inputRefs.location = el;
                        }}
                    />
                </View>
                <View>
                    <Accordion
                        sections={SECTIONS}
                        activeSections={this.state.activeSections}
                        renderSectionTitle={this._renderSectionTitle}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        onChange={this._updateSections}
                    />
                </View>

            </View>
        )
    }

}
const SECTIONS = [
    {
        title: 'First',
        content: 'Lorem ipsum...',
    },
    {
        title: 'Second',
        content: 'Lorem ipsum...',
    },
];

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: brightGreen,
        borderRadius: 4,
        color: darkGray,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: brightGreen,
        borderRadius: 8,
        color: darkGray,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 25,
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
    },
});
