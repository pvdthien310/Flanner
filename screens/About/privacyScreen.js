import React, {
    useState,
    useEffect
} from 'react';

import { Entypo } from '@expo/vector-icons';

import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    FlatList,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';


const PrivacyScreen = ({ navigation }) => {
    const pressgobackHandler = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity style={{
                        width: 45
                    }} onPress={pressgobackHandler}>
                        <View style={{
                            flexDirection: 'row',
                            margin: 10,
                            width: 40
                        }}>
                            <MaterialIcons name="keyboard-backspace" size={30} color="black" />
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={require('../../assets/flaner.png')}
                            style={{
                                width: 30,
                                height: 30,
                                ///  backgroundColor: 'red',
                            }}>
                        </Image>
                        <Text style={{
                            fontFamily: 'robotobold',
                            fontSize: 25,
                            marginLeft: 15
                        }}>Privacy</Text>
                    </View>
                </View>

            </SafeAreaView>

            <ScrollView>
                <View style={styles.view}>
                    <Text style={styles.name}>{postPrivacy.name}</Text>

                    <Text style={styles.itm}>{postPrivacy.itm1}</Text>

                    <Text style={styles.content}>{postPrivacy.content1}</Text>

                    <Text style={styles.itm}>{postPrivacy.itm1}</Text>

                    <Text style={styles.content}>{postPrivacy.content1}</Text>

                    <Text style={styles.content}>{postPrivacy.content2}</Text>
                </View >

                <View style={styles.view}>
                    <Text style={styles.name}>{fraudPrivacy.name}</Text>

                    <Text style={styles.content}>{fraudPrivacy.content}</Text>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 30
                    }}>
                        <Entypo name="dot-single" size={23} color="dimgray" />
                        <Text style={...styles.content}>{fraudPrivacy.listDoNot[0]} </Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 30
                    }}>
                        <Entypo name="dot-single" size={23} color="dimgray" />
                        <Text style={...styles.content}>{fraudPrivacy.listDoNot[1]} </Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 30
                    }}>
                        <Entypo name="dot-single" size={23} color="dimgray" />
                        <Text style={...styles.content}>{fraudPrivacy.listDoNot[2]} </Text>
                    </View>
                </View>

                <View style={styles.view}>
                    <Text style={styles.name}>{wordPrivacy.name}</Text>

                    <Text style={styles.content}>{wordPrivacy.content}</Text>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 30
                    }}>
                        <Entypo name="dot-single" size={23} color="dimgray" />
                        <Text style={...styles.content}>{wordPrivacy.listDoNot[0]} </Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 30
                    }}>
                        <Entypo name="dot-single" size={23} color="dimgray" />
                        <Text style={...styles.content}>{fraudPrivacy.listDoNot[1]} </Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 30
                    }}>
                        <Entypo name="dot-single" size={23} color="dimgray" />
                        <Text style={...styles.content}>{fraudPrivacy.listDoNot[2]} </Text>
                    </View>
                </View>

                <View style = {styles.view}>
                    <Text style = {styles.name}>{rightPrivacy.name}</Text>

                    <Text style = {styles.content}>{rightPrivacy.content}</Text>
                </View>

                <View style = {styles.view}>
                    <Text style = {styles.thanks}>{thanks}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 5,
        flex: 1,
        backgroundColor: 'whitesmoke',
        marginBottom: 10
    },
    view: {
        margin: 15,
    },
    name: {
        textAlign: 'left',
        fontFamily: 'nunitobold',
        fontSize: 20,
        color: 'black',
        marginTop: 5,
        marginRight: 10,

    },
    content: {
        fontFamily: 'nunitoregular',
        fontSize: 15,
        marginTop: 5,
        marginBottom: 10,
        marginRight: 10,
    },
    thanks: {
        fontFamily: 'nunitobold',
        fontSize: 15,
        margin: 10
    },
    itm: {
        fontFamily: 'nunitoregular',
        fontSize: 15,
        marginTop: 5,
        marginBottom: 10,
        marginRight: 10,
        fontStyle: 'italic'
    }
})
export default PrivacyScreen

const postPrivacy = {
    name: 'Post',
    itm1: 'What is Status Posts?',
    content1: 'Status are posts with content about sharing feelings, personal experiences of the poster.' +
        ' Only when you are friends, you can see each others status.',
    itm2: 'What is Knowledge Posts?',
    content2: 'Knowledge are articles sharing about common knowledge, in many fields such as education, ' +
        'culture, economy, science, entertainment ... that the writer wants to bring the value of knowledge to ' +
        'all Flâner users. . These articles must have clear grounds and evidence.',
    content3: 'Users need to clearly distinguish the purpose of the two types of posts. We do not accept' +
        ' confusion between them. There are also some regulations below. Please read carefully so as not to make' +
        ' mistakes, because if you make a mistake, we will take appropriate action!'
}

const fraudPrivacy = {
    name: 'Fraud',
    content: 'We will remove content that has the purpose of deceiving, intentionally misrepresenting ' +
        'information or defrauding/taking advantage of others to obtain money/ property, including content that' +
        ' seeks to mediate or promote acts. this through our service. Do not post:',
    listDoNot: [
        'Defrauding others to gain financial or personal benefits in order to cause harm to individuals ' +
        'and organizations.',

        'Collusion with others to acquire financial interests or personal interests',

        'Content participate, advocate, encourage, facilitate or admit the violation of law activities'
    ]
}

const wordPrivacy = {
    name: 'Words',
    content: 'This is a problem that happens frequently. We define attack as violent or degrading language,' +
        ' harmful stereotypes, demeaning language, expressions of contempt, disgust or rejection, swearing, calls' +
        ' for boycotts, or calls for boycotts. isolation. With the desire to bring about a healthy community,' +
        ' we decided that users should not post:',
    listDoNot: [
        'Do not use hate speech, swear words, insult any other personal or collective identity',

        'Public language insults , pro-violence',

        'Actions that boycott others'
    ]
}

const rightPrivacy = {
    name: 'Intellectual property rights',
    content: 'Flâner does not allow people to post content that infringes on the intellectual property rights' +
        ' of others, including copyrights and trademarks goods.'
}

const thanks = 'Once again, we thank you for choosing Flâner. With the mission to bring you the best experience, ' +
    'we will strive to perfect and improve Flâner even more. For a nice and healthy community, in addition to the ' +
    'development team, we need you to work with us. Wish you the best!'