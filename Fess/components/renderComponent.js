import {
    Avatar,
    Bubble,
    InputToolbar,
    MessageText,
    Send,
    Time,
    GiftedChat
} from 'react-native-gifted-chat'

import React, {
    useCallback
} from 'react';

import {
    View,
    TouchableOpacity
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


import { Linh1, Linh2 } from './data'

// export const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
// }, []);

export const renderBubble = (props) => {
    return (
        <Bubble {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: props?.currentMessage?.image ? "transparent" : 'white',
                },

                left: {
                    backgroundColor: props?.currentMessage?.image ? "transparent" : 'dimgray',
                }
            }}

            textStyle={{
                right: {
                    color: 'black'
                },
                left: {
                    color: 'white'
                }
            }}
        >
        </Bubble>
    );
}

export const renderSend = (props) => {
    return (
        <Send {...props}>
            <View style={{ marginRight: 5, marginBottom: 5 }}>
                <Ionicons name="send" size={28} color="black" />
            </View>
        </Send>
    );
}

export const scrollToBottomComponent = () => {
    return (
        <AntDesign name="caretdown" size={24} color='black' />


    );
}

export const renderActions = () => {
    return (
        <View style={{ flexDirection: "row", marginLeft: 15, marginBottom: 5 }}>
            <TouchableOpacity onPress={openCameraPicker}>
                <Feather name="camera" size={25} color='black' style={{ marginLeft: 2, marginRight: 5 }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={openPhotoLibary}>
                <FontAwesome name="photo" size={24} color='black' style={{ marginLeft: 8, marginRight: 5 }} />
            </TouchableOpacity>
        </View>
    );
}

export const renderInputToolbar = (props) => {
    return (
        <InputToolbar
            {...props}
            containerStyle={{
                backgroundColor: 'white',
                borderRadius: 25,
                marginLeft: 7,
                marginRight: 7,
                shadowColor: 'light-gray'
            }}
        />
    );
}

export const renderTime = (props) => {
    return (
        <Time {...props}
            timeTextStyle={{
                right: {
                    color: "black"
                },
                left: {
                    color: props?.currentMessage?.image ? "dimgray" : "white"
                }
            }}
        />
    );
}

export const renderAvatar = (props) => {
    return (
        <Avatar {...props}
            imageStyle={{
                left: {
                    width: 40,
                    height: 40,
                }
            }}>

        </Avatar>
    );
}

export const renderChatEmpty = () => {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            transform: [{ scaleY: -1 }]

        }}>
            <Image
                style={{
                    height: 200,
                    width: 200,
                    borderRadius: 100,
                }}
                source={Linh2.avatar} />


            <Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 30 }}>{Linh2.name}</Text>
            <Text style={{ marginTop: 10, fontSize: 20, color: 'gray', marginLeft: 10, marginRight: 10, textAlign: 'center' }}>Hey, let type something to {Linh2.name} to begin your conversation!</Text>
        </View>
    );
}

const openCameraPicker = async () => {
    permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.granted === false) {
        alert("Flâner requires permission to access your camera roll.")
        return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();

    if (pickerResult.cancelled === true) {
        return;
    }

    onSend({
        image: pickerResult.uri,
        user: Linh1,
    });
}

const openPhotoLibary = async () => {
    permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted === false) {
        alert("Flâner requires permission to access your libary.")
        return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
    });

    if (pickerResult.cancelled === true) {
        return;
    }

    onSend({
        image: pickerResult.uri,
        user: Linh1
    });
}

export const renderMessageText = (props) => {
    return (
        <MessageText
            {...props}
            linkStyle={{
                left: { color: 'orange' },
                right: { color: 'blue' },
            }}
        />
    )
}

export const renderCustomView = (props) => {
    return (
        <View style={{ minHeight: 20, alignItems: 'left', marginLeft: 10 }}>
            <Text>
                {props.currentMessage.user.name}
            </Text>
        </View>
    );
}
