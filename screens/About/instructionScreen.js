import * as React from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    Button
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Video, AVPlaybackStatus } from 'expo-av'
import { ScrollView } from 'react-native-gesture-handler';
//import Video from 'react-native-video';

const { height, width } = Dimensions.get("screen")

const InstructionScreen = ({ navigation }) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const pressgobackHandler = () => {
        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
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
                        }}>Instructions</Text>
                    </View>
                </View>

            </SafeAreaView>

            <ScrollView showsVerticalScrollIndicator ={false}>
                <Video
                        ref={video}
                        style={styles.video}
                        source={{
                        uri:'https://res.cloudinary.com/flaner/video/upload/v1639646238/Source/flaner/Flaner_1_fe3bae.mp4'
                        }}
                        useNativeControls
                        resizeMode="cover"
                        shouldPlay
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                        onPress={() => {
                            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                        }}
                    />

                <Text style={{
                    fontFamily: 'nunitoregular',
                    fontSize: 18,
                    color: 'black',
                    marginTop: 20,
                    marginLeft: 15,
                    marginRight: 15
                }}>We always look forward to helping you have a good Flâner experience.
                    If you are not sure how to use it, we have prepared some instructions for you below:
                </Text>

                <FlatList style={{ marginTop: 5, marginBottom: 10 }}
                    data={listInstruction}
                    keyExtractor={listInstruction.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                        onPress={() => {video.current.pauseAsync()
                            navigation.navigate('VideoInstructionScreen', { ins: item })
                            }}>
                            <View style={{ 
                                flexDirection: 'row',
                                 padding: 10 
                                 }}>

                                <Text style={{
                                    textAlign: 'left',
                                    fontFamily: 'nunitobold',
                                    fontSize: 20,
                                    marginLeft: 10,
                                    color: 'black'
                                }}>{item.id}. </Text>

                                <View>
                                    <Text style={{
                                        fontFamily: 'nunitobold',
                                        fontSize: 18,
                                        color: 'black',
                                        textDecorationLine: 'underline',
                                    }}>{item.name}</Text>

                                    <Text style={{
                                        fontFamily: 'nunitoregular',
                                        fontSize: 15,
                                        color: 'black',
                                        marginRight: 35,
                                        textAlign: 'justify'
                                    }}>{item.instruction}</Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
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
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    video: {
        alignSelf: 'center',
        width: width* 0.9,
        height: width * 0.9 * 1080 / 1920,
        marginTop: 15,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default InstructionScreen

const listInstruction = [
    {
        id: '1',
        name: 'Add Post',
        url: 'https://res.cloudinary.com/flaner/video/upload/v1639631685/Source/flaner/IMG_6049_hhfizk.mov',
        instruction: 'How are you today? Do you have something to share, or do you have a valuable source of knowledge'+
        ' that you want to spread to everyone? You can add a post. Follow here to know! ',
    },

    {
        id: '2',
        name: 'Custom your profile',
        url: 'https://res.cloudinary.com/flaner/video/upload/v1639631680/Source/flaner/IMG_6047_xdmtid.mov',
        instruction: 'All about your profile, including your personal information and your avatar.'+
        ' At Flâner, you are yourself and you can express yourself. Follow us!'
    },

    {
        id: '3',
        name: 'Report a post',
        url: 'https://res.cloudinary.com/flaner/video/upload/v1639631671/Source/flaner/IMG_6048_yoa454.mov',
        instruction: 'Do you accidentally see a post that violates our privacy and you concern about that it will '+
        'give a bad affect to this community? Please feel free to report!'
    },

    {
        id: '4',
        name: 'Save a post',
        url: 'https://res.cloudinary.com/flaner/video/upload/v1639631685/Source/flaner/IMG_6044_svipyg.mov',
        instruction: 'What a fantastic content! It is a great status or a valuable piece of knowledge, and you want'+
        ' to save it. Do not worry, we have supported!'
    }
]