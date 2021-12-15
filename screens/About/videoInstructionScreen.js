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
    Button,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Video, AVPlaybackStatus } from 'expo-av'
import { ScrollView } from 'react-native-gesture-handler';


const { height, width } = Dimensions.get("screen")

const VideoInstructionScreen = ({ navigation, route }) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const item = route.params.ins
    ///console.log(item)
    const videoUrl = item.url
    const instruction = item.instruction
    const name = item.name

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
                        }}>{name}</Text>
                    </View>
                </View>
            </SafeAreaView>

            <ScrollView>
                <Text style={{
                    fontFamily: 'nunitoregular',
                    fontSize: 18,
                    color: 'black',
                    marginRight: 10,
                    marginTop: 15,
                    marginLeft: 10,
                    alignItems: 'center'
                }}>{instruction}</Text>

                <Video
                    ref={video}
                    style={styles.video}
                    source={{
                       uri: videoUrl
                    }}
                    useNativeControls
                    resizeMode="cover"
                   /// onReadyForDisplay={naturr}
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                    onPress={() => {
                        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }}
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
        width: width* 0.95,
        height: height * 0.8,
        marginTop: 10

    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default VideoInstructionScreen