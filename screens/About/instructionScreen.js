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
//import Video from 'react-native-video';

const InstructionScreen = ({ navigation }) => {

    const listInstruction = [
        {
            id: 1,
            name: 'Add Post',
            url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            instruction: 'Do you want to add a post? Follow here to know! ',
        },
        {
            id: 2,
            name: 'Custom your profile',
            url: 'https://res.cloudinary.com/flaner/video/upload/v1632720356/samples/sea-turtle.mp4',
            instruction: 'All about your profile. Follow us!'
        }
    ]

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
                                width: 40,
                                height: 40,
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

            <FlatList data={listInstruction}
                keyExtractor={listInstruction.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('VideoInstructionScreen', { ins:item })}>
                        <View style={{ flexDirection: 'row', padding: 10 }}>

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
                                    fontSize: 20,
                                    color: 'black',
                                    textDecorationLine: 'underline',
                                }}>{item.name}</Text>

                                <Text style={{
                                    fontFamily: 'nunitoregular',
                                    fontSize: 18,
                                    color: 'black',
                                    marginRight: 10
                                }}>{item.instruction}</Text>

                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

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
        width: 320,
        height: 200,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default InstructionScreen