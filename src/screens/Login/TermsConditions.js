import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    AsyncStorage,
    Slider,
    Alert,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import IconFA from "react-native-vector-icons/FontAwesome";


const { width, height } = Dimensions.get('window');
export default class TermsConditions extends React.Component {
    constructor(props) {
        super(props);
    }

    next() {
        // Make API call to verify that we can create a user
        // Then navigate to MapScreen.js

        const { navigate } = this.props.navigation;
        // We know all inputs will be valid
        // Now we need to add it to form data

        AsyncStorage.getItem('formData').then(function (ret) {
            var response = JSON.parse(ret);
            // We need to make the API call to create a new user
            axios.post('http://10.0.2.2:9000/api/signup', response).then(function (response) {
                // Lets save relevent information and login!
                Alert.alert(
                    'Welcome to Noise Score!',
                    'Click measurements to get started.',
                    [
                        { text: 'Lets go!', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                );
                let ret = response['data'];
                AsyncStorage.setItem("userData", JSON.stringify(ret));
                navigate("App")
            }).catch(function (error) {
                console.log(error);
                alert(error.message);
            });
        }.bind(this));
    }

    render() {
        return (


            <View style={{ flex: 1 }}>

                <View style={{ flex: 1 }}>

                    <ScrollView>

                        <View style={styles.wrapper}>
                            <Text style={[styles.text, styles.h2]}>
                                Privacy Policy - NoiseScore
                            </Text>
                            <Text style={styles.text}>
                                This Privacy Policy explains information gathering and use practices for the NoiseScore
                                application (the “App”). The App is controlled by Trustees of Boston University (the
                                “University”) and administered and managed by the Community Noise Lab, a research lab at
                                the
                                Boston University School of Public Health (the “Lab”). The App is a free smartphone
                                application designed to gather both objective and subjective information about community
                                noise levels. This community engagement research tool allows you to provide measurable
                                and
                                spatial input about your experience with noise. Researchers will analyze information
                                gathered from users of NoiseScore to conduct research, including research on the impact
                                of
                                noise pollution on health and well-being.
                                When you download and use the app, you will be asked to read our terms and conditions
                                and
                                agree with them. If you do not agree with the terms of this Privacy Policy, please do
                                not
                                access or use the App.
                                It is your decision whether to participate in this study and you may choose to stop
                                using
                                the App at any time. The Lab is conducting this research to gather a deeper
                                understanding
                                about your thoughts, feelings, and behaviors about the sounds you encounter in your
                                everyday
                                life. When you first create an account, you will answer a short survey so that we can
                                learn
                                a little more about who you are and your general attitudes about community noise and
                                sound
                                issues. With this App, you will be able to create a noise event. With each noise event
                                you
                                create, you will measure its sound level (in decibels), map your location, record the
                                noise
                                sources (barking dog, siren, aircraft, etc.) and answer a series of questions designed
                                to
                                gather your opinions on how this noise event made you feel. Once you submit your noise
                                event, your responses will be added to our live heat map. The data provided by you and
                                other
                                research participants ("participants") will be collected and used for research purposes.
                                Upon completion of a NoiseScore noise event, you will be able to view an aggregation of
                                ALL
                                participant responses via the App heat map. You will also be able to review your
                                historical
                                records.
                                This Privacy Policy does not apply to any third party applications or software that
                                integrates with the App, or any other third party products, services or businesses.

                            </Text>

                            <Text style={[styles.text, styles.h2]}>
                                Information Collection & Use
                            </Text>
                            <Text style={styles.text}>
                                <Text style={styles.h3}>
                                    Information you provide {'\n'}
                                </Text>
                                <Text>
                                    The University does not collect personally identifiable information about you when
                                    you
                                    download the App unless you voluntarily provide that information.{'\n'}
                                    {'\n'}1. User background{'\n'}
                                    The App obtains information you provide when you download the App and respond to the
                                    survey to create an account. The survey will ask you to create a username and will
                                    request your email address, city and state of residence, zip code, preferred
                                    pronoun,
                                    birth year, and ethnicity. The survey will also ask a series of questions regarding
                                    your
                                    sensitivity to noise; the noise levels in your home, community, and work; and your
                                    general state of health (‘very poor’ to ‘excellent’). In addition, the University
                                    may
                                    request personally identifiable information from you if, for example, you ask a
                                    question
                                    or request to be contacted.{'\n'}

                                    {'\n'}2. Decibel Measurements{'\n'}
                                    The App includes a feature that you may use to measure decibel levels around you.
                                    The
                                    App stores the decibel measurements, when and where they were taken, your comments
                                    on
                                    the noise sources, and your reflections on how the sounds made you feel.

                                </Text>
                                <Text style={styles.h3}>
                                    Information Gathered Automatically{'\n'}
                                </Text>
                                <Text>
                                    When you use the App, the University may collect and store digital information sent
                                    by
                                    your mobile device, including IP addresses (i.e., the internet address of your
                                    computer
                                    or device), geolocation, the device operating system, unique device identifiers, and
                                    other digital property, such as cookies, installation events, app crashes, pages
                                    visited, length of visit, and browser types The University does not link IP
                                    addresses or
                                    cookies to any personally identifiable information.
                                </Text>

                            </Text>

                            <Text style={[styles.text, styles.h2]}>
                                Information Security
                            </Text>
                            <Text style={styles.text}>
                                The University has implemented reasonable physical, technical and administrative
                                procedures
                                to safeguard and secure information it collects online against unauthorized disclosure,
                                loss, or misuse, in accordance with the Data Protection Standards Policy. Under that
                                Policy,
                                the University has classified data according to its sensitivity, and set requirements
                                for
                                protection accordingly.
                                The University cannot provide an absolute guarantee as to the security of any
                                information
                                transmitted through its website or digital properties.

                            </Text>

                            <Text style={[styles.text, styles.h2]}>
                                Information Sharing
                            </Text>
                            <Text style={styles.text}>
                                The University will share de-identified, aggregate data collected via the App in the
                                NoiseScore map accessible in the App. The map shows decibel measurements, locations,
                                dates,
                                times, and noise sources. The map does not show user names or personally identifiable
                                information.
                                Researchers will share data where we have removed anything that we think would show your
                                identity. There still may be a small chance that someone could figure out that the
                                information is about you. Such sharing includes:
                                {'\n'} • Publishing results in a medical book or journal.
                                {'\n'} • Adding results to a Federal government database.
                                {'\n'} • Using research data in future studies, done by us or by other scientists.
                                {'\n'}
                                Like most smartphone applications, the App uses third-party entities, such as hosting
                                companies or technology platforms, to facilitate the App. These third-party entities
                                track
                                Internet services and record the data in log files. The log files include information
                                such
                                as Internet Protocol addresses, the date and time that users accessed web pages or other
                                Internet services, installation events, app crashes, browser types, and cookies. These
                                third
                                parties will provide protection at least as strong as the protections described in this
                                Privacy Policy.
                                Otherwise, the University will share information about you with third-parties only to
                                the
                                extent necessary to deliver the App’s services (i.e. with third party hosting companies
                                or
                                technology companies subject to confidentiality obligations or in circumstances where
                                the
                                University reasonably believes that doing so is necessary or appropriate to: satisfy any
                                applicable law, regulation, legal process or governmental request; investigate
                                compliance
                                with or enforce University policies; detect, prevent or otherwise address fraud,
                                security or
                                technical issues; or protect the rights, property or safety of the University, its
                                faculty,
                                staff, and students or others. The information referred to in this section may include
                                personally identifiable information.


                            </Text>

                            <Text style={[styles.text, styles.h2]}>
                                Third Party Websites
                            </Text>
                            <Text style={styles.text}>
                                The App may link to websites that are not controlled by the University (“Third Party
                                Sites”). The University is not responsible for the privacy practices or content of Third
                                Party Sites.
                            </Text>

                            <Text style={[styles.text, styles.h2]}>
                                Children’s Privacy
                            </Text>
                            <Text style={styles.text}>
                                The App is not intended for use by persons under 18 years old; if you are under 18 years
                                of
                                age, you should not use the App. From time to time, the University may review accounts
                                and
                                delete records of persons under 18 years old.
                            </Text>

                            <Text style={[styles.text, styles.h2]}>
                                Changes to this Privacy Policy
                            </Text>
                            <Text style={styles.text}>
                                The University may modify this Privacy Policy from time to time. Changes will be
                                effective
                                on the date posted.
                            </Text>

                            <Text style={[styles.text, styles.h2]}>
                                Data Retention/Deletion Policies
                            </Text>
                            <Text style={styles.text}>
                                Information collected through the App will be kept after the end of the research study
                                conducted by the Lab.
                                Subject to exemptions provided by law, you may have the right to request access to
                                information that the App has collected about you, as well as to seek to update, delete
                                or
                                correct this information. You may be able to do this within the App, but if you cannot,
                                you
                                may contact edw@bu.edu for assistance. We may not be able to delete information about
                                you
                                that has been de-identified and aggregated.

                            </Text>

                            <Text style={[styles.text, styles.h2]}>
                                Questions
                            </Text>
                            <Text style={styles.text}>
                                Questions about this Privacy Policy should be directed to edw@bu.edu. The investigator
                                or a
                                member of the research team will try to answer questions you may have about the research
                                being conducted. If you have questions or concerns, or need to report an injury suffered
                                while participating in this research, contact Erica Walker at 617-358-2439 or
                                edw@bu.edu.
                                You may also contact the Boston Medical Center and Boston University Medical Campus IRB
                                at
                                617-358-5372 or email medirb@bu.edu. The IRB is a group that helps monitor research. You
                                should call or email the IRB if you want to find out about your rights as a research
                                subject. You should also call or email if you want to talk to someone who is not part of
                                the
                                study about your questions, concerns, or problems.
                            </Text>

                        </View>
                    </ScrollView>
                    <View style={{ flexGrow: 1, position: 'relative', bottom: 0 }}>
                        <View style={{
                            flexGrow: 1,
                            alignSelf: 'flex-end',
                            height: 60,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'stretch'
                        }}
                        >
                            <TouchableOpacity
                                style={[styles.button, styles.clearButton, { flex: 1 }]}
                                // disabled={this.state.started}
                                onPress={() => this.props.navigation.replace('SignIn')}
                            >


                                <Text style={{
                                    flex: 1,
                                    // position: 'absolute',
                                    fontSize: width / 20,
                                    alignSelf: 'stretch',
                                    textAlign: 'center',
                                    color: 'white',
                                    // backgroundColor:'red'
                                }}>Decline</Text>

                            </TouchableOpacity>


                            <TouchableOpacity
                                style={[styles.button, styles.submitButton, { flex: 3 , alignSelf:'stretch'}]}
                                // disabled={this.state.started}
                                onPress={() => this.next()}
                            >


                                <Text style={{
                                    flex: 1,
                                    // position: 'absolute',
                                    fontSize: width / 20,
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    color: 'white',
                                    // backgroundColor:'red'
                                }}>Accept and Signup</Text>


                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>

            // <View style={{ height:height-300}}>
            //
            //
            //
            //
            //
            //     <View style={styles.wrapper}>
            //         <View style={{ flex: 1, flexGrow:1 }}>
            //             <Text style={[styles.text, styles.h1, { textAlign: 'center', paddingTop: 10 }]}> Please read and
            //                 accept the privacy policy of NoiseScore</Text>
            //         </View>
            //
            //
            //
            //     </View>
            // </View>
        );
    }


// Function used to set the state
    setPlace(value) {
        this.setState({
            place: value[0]
        });
    }

    setLoudness(value) {
        this.setState({
            loudness: value[0]
        });
    }

    setOneWord(value) {
        this.setState({
            oneWord: value[0]
        });
    }

    setFeeling(value) {
        this.setState({
            feeling: value[0]
        });
    }

}


const lightGreen = '#31BD4B';
const darkGray = "#383838";

const fontSize = width / 15;

const fontStyle = { fontSize: fontSize, padding: 5 };


const questionButtonsStyle = {
    borderColor: lightGreen,
    backgroundColor: "transparent",
    textColor: darkGray,
    borderTintColor: lightGreen,
    backgroundTintColor: lightGreen,
    textTintColor: "white",
    // padding:20
};

const questionButtonSize = {
    borderRadius: 15,
    height: 'auto',
    borderWidth: 3,
    // padding: 20,
    // margin:10
};


const styles = StyleSheet.create({
    padding: {
        paddingVertical: 10,
    },
    wrapText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },


    wrapper: {
        flexGrow: 1,
        // minHeight: height - 100,
        // height: 800,
        alignItems: 'stretch',
        padding: 30,
        alignContent: 'center',
        // backgroundColor: "#e9eeec",
        // minHeight: 600,

    },


    scrollWrapper: {
        // flexGrow: 1,
        // justifyContent: "space-between",
        // height: height - 25,
        // alignItems: 'stretch',
        // // padding: 80,
        // flexWrap: 'wrap',
        // alignContent: 'center'
    },

    text: {
        fontSize: width / 30,
        color: "black",
        marginBottom: 10,
        // fontWeight: 'bold',
        textAlign: 'left'
    },

    h1: {
        fontSize: width / 15,
        fontWeight: 'bold',
        textAlign: 'justify'
    },

    h2: {
        fontSize: width / 16,
        fontWeight: 'bold',
        textAlign: 'justify'
    },

    h3: {
        fontSize: width / 22,
        fontWeight: 'bold',
        textAlign: 'justify'
    },

    button: {
        flex: 1,
        minHeight: 40,
        flexDirection: 'row',
        // justifyContent: 'center',

        alignSelf: 'stretch',
        // borderWidth: 2,
        borderRadius: 10,

        // borderColor: '#31BD4B',

        margin: 5,
        padding: 10,
    },

    submitButton: {
        backgroundColor: '#31BD4B',
        borderColor: '#31BD4B'
    },

    clearButton: {
        backgroundColor: '#4E5255',
        borderColor: '#4E5255'
    },
});
