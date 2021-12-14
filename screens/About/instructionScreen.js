import * as React from 'react';

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
///import Video from 'expo-av'
import Video from 'react-native-video';

const InstructionScreen = ({ navigation }) => {
    const pressgobackHandler = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            {/* <SafeAreaView>
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
                        <Text style={{
                            fontFamily: 'robotobold',
                            fontSize: 25,
                        }}>Instructions</Text>
                    </View>
                </View> 
                
            </SafeAreaView> */}
            <Video source={{uri: "https://res.cloudinary.com/flaner/video/upload/v1632720356/samples/sea-turtle.mp4"}}
                       style={styles.backgroundVideo}/>
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
})

export default InstructionScreen