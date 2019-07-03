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
                            <Text style={styles.text}>

                                <Text style={styles.h1}>
                                    Before you register and begin using this app, you must agree to our Consent process,
                                    Terms and Conditions, and Privacy Statement.
                                </Text>
                                {'\n\n'}

                                <Text style={styles.h2}>
                                    What is NoiseScore?
                                </Text>
                                {'\n\n'}

                                    NoiseScore is a free smartphone research application designed to gather both
                                    objective and subjective information about your community noise levels. This
                                    community engagement research tool allows you to provide measurable and spatial
                                    input about your experience with noise.

                                    You can use NoiseScore to:
                                    {'\n'}
                                    {'\n\t'} '• Objectively describe your community noise levels by recording its sound level
                                    (measured in decibels)
                                    {'\n\t'} • Subjectively describe this noise level by answering a short survey
                                    {'\n\t'} • Add your response to our live noise heat map that can be used to gauge the sound
                                    and noise climate in not only your community but communities all over the globe.

                                {'\n'}{'\n'}
                                    NoiseScore is currently being administered and managed by Community Noise Lab, a
                                    research lab at Boston University’s School of Public Health.
                                <Text style={{ fontWeight: 'bold' }}>
                                    By downloading and using this app, you are participating in a research study.
                                </Text>


                                     It is your decision whether or not to
                                    participate in this study and you may choose to stop using the app at any time. We
                                    are conducting this research to gather a deeper understanding about your thoughts,
                                    feelings, and behaviors about the sounds you encounter in your everyday life. When
                                    you first create an account, you will answer a short survey so that we can learn a
                                    little more about who you are and your general attitudes about community noise and
                                    sound issues. With this app, you will be able to create a noise event. With each
                                    noise event you create, you will measure its sound level (in decibels), map your
                                    location, record the noise sources (barking dog, siren, aircraft, etc.) and answer a
                                    series of questions designed to gather your opinions on how this noise event made
                                    you feel. This process takes approximately one-minute to complete. The data provided
                                    by you and other research participants ("participants") will be collected and used
                                    for research purposes. Upon completion of a NoiseScore noise event, you will be able
                                    to view an aggregation of ALL participant responses via our heat map. You will also
                                    be able to review your historical records.
                                    The main risk of participating in this study is discomfort, which may be caused by
                                    you feeling uncomfortable collecting sound level and noise perception data with your
                                    smartphone and adding your responses to our live heat map. Please note that
                                    downloading and using the app is completely optional. If you decide to download and
                                    use the app to measure a noise event you do not have to answer any questions that
                                    make you feel uncomfortable. Further, you are free to quit measuring a noise event
                                    or use the app at any time. If you chose to quit before submitting a noise event,
                                    none of your answers will be saved.
                                    This research project will last for two years. However, it may be extended, if
                                    permission to continue is given by Boston Medical Center and Boston University
                                    Medical Campus IRB.

                                {'\n\n'}
                                <Text style={styles.h3}>
                                    Potential Benefits
                                </Text>
                                {'\n\n'}
                                There are no direct benefits to you. Your being in the study may help the investigators
                                learn more about the relationship between urban sound levels and community noise
                                perception.
                                {'\n\n'}
                                <Text style={styles.h3}>
                                    Costs
                                </Text>
                                {'\n\n'}
                                There are no costs to you for being in this research study.
                                {'\n\n'}
                                <Text style={styles.h3}>
                                    Payment
                                </Text>
                                {'\n\n'}
                                You will receive no compensation for your participation.
                                {'\n\n'}
                                <Text style={styles.h3}>
                                    Confidentiality
                                </Text>
                                {'\n\n'}
                                We will store your information in ways we think are secure. We will store electronic
                                files in computer systems with password protection and encryption. However, we cannot
                                guarantee complete confidentiality. Please note that app responses will be kept for 7
                                years after the end of our research study.

                                We will share research data where we have removed anything that we think would show your
                                identity. There still may be a small chance that someone could figure out that the
                                information is about you. Such sharing includes:
                                {'\n\t'}• Publishing results in a medical book or journal.
                                {'\n\t'} • Adding results to a Federal government database.
                                {'\n\t'}• Using research data in future studies, done by us or by other scientists.
                                {'\n\n'}
                                <Text style={styles.h3}>
                                    Subject's rights
                                </Text>
                                {'\n\n'}
                                By consenting to be in this study you do not waive any of your legal rights. Consenting
                                means that you have been given information about this study and that you agree to
                                participate in the study. If you do not agree to be in this study or if at any time you
                                withdraw from this study you will not suffer any penalty or lose any benefits to which
                                you are entitled. Your participation is completely up to you.
                                We may decide to have you stop being in the study even if you want to stay. Some reasons
                                this could happen are if staying in the study may be bad for you, or if the study is
                                stopped.

                                {'\n\n'}
                                <Text style={styles.h2}>
                                    Terms of Use
                                </Text>
                                {'\n\n'}
                                NoiseScore is provided to you subject to the following Terms of Use, which may be
                                updated by Trustees of Boston University ("we," "us," or "Boston University") from time
                                to time with or without notice to you. You will always be able to view the most current
                                version of the NoiseScore Terms of Use by clicking on a link on the bottom of the
                                registration page.
                                By using NoiseScore, you agree to these Terms of Use. If you do not agree to all of
                                these Terms of Use, do not use NoiseScore.

                                {'\n\n'}
                                <Text style={styles.h3}>
                                    Your Account
                                </Text>
                                {'\n\n'}
                                When registering for NoiseScore, you will establish a personal NoiseScore E account with
                                your own username and unique password. You agree to maintain the security of your user
                                identification, password and other confidential information relating to the use of your
                                NoiseScore account.
                                You are responsible for taking all reasonable steps to ensure that no unauthorized
                                person shall have access to your NoiseScore passwords or accounts.
                                It is your sole responsibility to (1) control the dissemination and use of passwords;
                                (2) authorize, monitor, and control access to and use of your NoiseScore account and
                                password; (3) promptly inform Boston University of any need to deactivate a password.
                                You grant Boston University and all other persons or entities involved in the operation
                                of NoiseScore the right to transmit, monitor, retrieve, store, and use your information
                                in connection with NoiseScore.
                                Based upon the information that you provide to us when you register for a NoiseScore E
                                account, we may contact you via email.
                                {'\n\n'}
                                <Text style={styles.h3}>
                                    Proprietary Rights
                                </Text>
                                {'\n\n'}
                                You acknowledge and agree that NoiseScore and the information and software presented to
                                you through NoiseScore or used in connection with NoiseScore contain proprietary and
                                confidential information that is protected under U.S. intellectual property laws. You
                                agree not to sell, rewrite, modify, reproduce, redistribute, create derivative works, or
                                rent any proprietary information presented to you through NoiseScore.
                                {'\n\n'}
                                <Text style={styles.h3}>
                                    Privacy and Security
                                </Text>
                                {'\n\n'}
                                It is understood and agreed that Boston University shall use reasonable efforts to
                                preserve the privacy and security of data provided to or generated by it, but Boston
                                University makes no representations or warranties whatsoever with respect to the
                                privacy, security, confidentiality, availability, integrity, or other matter whatsoever
                                related to data. Please see the Privacy Policy below for more information.
                                {'\n\n'}
                                <Text style={styles.h3}>
                                    Communications
                                </Text>
                                {'\n\n'}
                                Boston University make no representations or warranties about the accuracy, reliability,
                                completeness, usefulness, adequacy, or suitability of the communications provided
                                through the use of NoiseScore. Nor does Boston University make any representations or
                                warranties that data flowing to and from NoiseScore will not be delayed, interrupted or
                                experience losses of data, or that files available for downloading from NoiseScore, if
                                applicable, will be free of infection by viruses, worms, Trojan horses or other code
                                with destructive properties.
                                {'\n\n'}
                                <Text style={styles.h3}>
                                    Jurisdiction
                                </Text>
                                {'\n\n'}
                                You expressly agree that exclusive jurisdiction for any dispute with Boston University,
                                or in any way relating to your use of NoiseScore, resides in the courts of the
                                Commonwealth of Massachusetts and you further agree and expressly consent to the
                                exercise of personal jurisdiction in the courts of the Commonwealth of Massachusetts in
                                connection with any such dispute including any claim involving NoiseScore, Boston
                                University, and its affiliates, licensees, and their directors, officers, employees,
                                agents and contractors.
                                These Terms of Use are governed by the laws of the Commonwealth of Massachusetts,
                                without respect to its conflict of laws principles.
                                If any provision of these Terms of Use is found to be invalid by any court having
                                competent jurisdiction, the invalidity of such provision shall not affect the validity
                                of the remaining provisions of these Terms of Use, which shall remain in full force and
                                effect.
                                No waiver of any of these Terms of Use shall be deemed a further or continuing waiver of
                                such term or condition or any other term or condition.

                                {'\n\n'}
                                <Text style={[styles.text, styles.h2]}>
                                    Privacy Policy
                                </Text>
                                {'\n\n'}
                                This Privacy Policy explains information gathering and use practices for the NoiseScore
                                application (the “App”). The App is controlled by Trustees of Boston University (the
                                “University”) and administered and managed by the Community Noise Lab, a research lab at
                                the Boston University School of Public Health (the “Lab”). The App is a free smartphone
                                application designed to gather both objective and subjective information about community
                                noise levels. This community engagement research tool allows you to provide measurable
                                and spatial input about your experience with noise. Researchers will analyze information
                                gathered from users of NoiseScore to conduct research, including research on the impact
                                of noise pollution on health and well-being.
                                When you download and use the app, you will be asked to read our terms and conditions
                                and agree with them. If you do not agree with the terms of this Privacy Policy, please
                                do not access or use the App.
                                It is your decision whether to participate in this study and you may choose to stop
                                using the App at any time. The Lab is conducting this research to gather a deeper
                                understanding about your thoughts, feelings, and behaviors about the sounds you
                                encounter in your everyday life. When you first create an account, you will answer a
                                short survey so that we can learn a little more about who you are and your general
                                attitudes about community noise and sound issues. With this App, you will be able to
                                create a noise event. With each noise event you create, you will measure its sound level
                                (in decibels), map your location, record the noise sources (barking dog, siren,
                                aircraft, etc.) and answer a series of questions designed to gather your opinions on how
                                this noise event made you feel. Once you submit your noise event, your responses will be
                                added to our live heat map. The data provided by you and other research participants
                                ("participants") will be collected and used for research purposes. Upon completion of a
                                NoiseScore noise event, you will be able to view an aggregation of ALL participant
                                responses via the App heat map. You will also be able to review your historical records.
                                This Privacy Policy does not apply to any third party applications or software that
                                integrates with the App, or any other third party products, services or businesses.
                                {'\n\n'}
                                <Text style={styles.h1}>
                                    Information Collection & Use

                                </Text>
                                {'\n\n'}
                                <Text style={styles.h3}>
                                    Information you provide
                                </Text>
                                {'\n\n'}
                                The University does not collect personally identifiable information about you when you
                                download the App unless you voluntarily provide that information.
                                1. User background
                                The App obtains information you provide when you download the App and respond to the
                                survey to create an account. The survey will ask you to create a username and will
                                request your email address, city and state of residence, zip code, preferred pronoun,
                                birth year, and ethnicity. The survey will also ask a series of questions regarding your
                                sensitivity to noise; the noise levels in your home, community, and work; and your
                                general state of health (‘very poor’ to ‘excellent’). In addition, the University may
                                request personally identifiable information from you if, for example, you ask a question
                                or request to be contacted.

                                2. Decibel Measurements
                                The App includes a feature that you may use to measure decibel levels around you. The
                                App stores the decibel measurements, when and where they were taken, your comments on
                                the noise sources, and your reflections on how the sounds made you feel.

                                {'\n\n'}
                                <Text style={styles.h3}>
                                    Information Gathered Automatically{'\n'}
                                </Text>
                                {'\n\n'}
                                When you use the App, the University may collect and store digital information sent
                                by
                                your mobile device, including IP addresses (i.e., the internet address of your
                                computer
                                or device), geolocation, the device operating system, unique device identifiers, and
                                other digital property, such as cookies, installation events, app crashes, pages
                                visited, length of visit, and browser types The University does not link IP
                                addresses or
                                cookies to any personally identifiable information.

                                {'\n\n'}
                                <Text style={[styles.text, styles.h2]}>
                                    Information Security
                                </Text>
                                {'\n\n'}
                                The University has implemented reasonable physical, technical and administrative
                                proceduresto safeguard and secure information it collects online against
                                unauthorized
                                disclosure,loss, or misuse, in accordance with the Data Protection Standards Policy.
                                Under that
                                Policy,the University has classified data according to its sensitivity, and set
                                requirements for protection accordingly. The University cannot provide an absolute
                                guarantee as to the security of any
                                information transmitted through its website or digital properties.
                                {'\n\n'}
                                <Text style={[styles.text, styles.h2]}>
                                    Information Sharing
                                </Text>
                                {'\n\n'}
                                The University will share de-identified, aggregate data collected via the App in the
                                NoiseScore map accessible in the App. The map shows decibel measurements, locations,
                                dates, times, and noise sources. The map does not show user names or personally identifiable
                                information. Researchers will share data where we have removed anything that we think would show your
                                identity. There still may be a small chance that someone could figure out that the
                                information is about you. Such sharing includes:
                                {'\n'} • Publishing results in a medical book or journal.
                                {'\n'} • Adding results to a Federal government database.
                                {'\n'} • Using research data in future studies, done by us or by other scientists.
                                {'\n'}
                                Like most smartphone applications, the App uses third-party entities, such as hosting
                                companies or technology platforms, to facilitate the App. These third-party entities
                                track Internet services and record the data in log files. The log files include information
                                such as Internet Protocol addresses, the date and time that users accessed web pages or other
                                Internet services, installation events, app crashes, browser types, and cookies. These
                                third parties will provide protection at least as strong as the protections described in this
                                Privacy Policy. Otherwise, the University will share information about you with third-parties only to
                                the extent necessary to deliver the App’s services (i.e. with third party hosting companies
                                or technology companies subject to confidentiality obligations or in circumstances where
                                the University reasonably believes that doing so is necessary or appropriate to: satisfy any
                                applicable law, regulation, legal process or governmental request; investigate
                                compliance with or enforce University policies; detect, prevent or otherwise address fraud,
                                security or technical issues; or protect the rights, property or safety of the University, its
                                faculty, staff, and students or others. The information referred to in this section may include
                                personally identifiable information.
                                {'\n\n'}
                                <Text style={[styles.text, styles.h2]}>
                                    Third Party Websites
                                </Text>
                                {'\n\n'}
                                The App may link to websites that are not controlled by the University (“Third Party
                                Sites”). The University is not responsible for the privacy practices or content of Third
                                Party Sites.
                                {'\n\n'}
                                <Text style={[styles.text, styles.h2]}>
                                    Children’s Privacy
                                </Text>
                                {'\n\n'}
                                The App is not intended for use by persons under 18 years old; if you are under 18 years
                                of age, you should not use the App. From time to time, the University may review
                                accounts and delete records of persons under 18 years old.
                                {'\n\n'}
                                <Text style={[styles.text, styles.h2]}>
                                    Changes to this Privacy Policy
                                </Text>
                                {'\n\n'}
                                The University may modify this Privacy Policy from time to time. Changes will be
                                effective on the date posted.
                                {'\n\n'}
                                <Text style={[styles.text, styles.h2]}>
                                    Data Retention/Deletion Policies
                                </Text>
                                {'\n\n'}
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
                                {'\n\n'}
                                <Text style={[styles.text, styles.h2]}>
                                    Questions
                                </Text>
                                {'\n\n'}
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
                                style={[styles.button, styles.submitButton, { flex: 3, alignSelf: 'stretch' }]}
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
        fontSize: 15,
        color: "black",
        marginBottom: 10,
        // fontWeight: 'bold',
        textAlign: 'left'
    },

    h1: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    h2: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    h3: {
        fontSize: 16,
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
