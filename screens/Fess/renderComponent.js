import React from 'react';
import { Image, Text } from 'react-native';
import {
    Avatar,
    Bubble,
    InputToolbar,
    MessageText,
    Send,
    Time,
    Day,
    GiftedChat
} from 'react-native-gifted-chat'

import {
    View,
    TouchableOpacity
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


import { Linh1, Linh2 } from './TestData/data'

export const renderBubble = (props) => {
    return (
        <Bubble {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: props?.currentMessage?.image ? "transparent" : 'white',
                    padding: props?.currentMessage?.image ? 2: 7,
                    paddingBottom: props?.currentMessage?.image? 0: 7
                },

                left: {
                    backgroundColor: props?.currentMessage?.image ? "transparent" : 'lightslategrey',
                    padding: props?.currentMessage?.image ? 2: 7,
                    paddingBottom: props?.currentMessage?.image? 0: 7
                }
            }}

            textStyle={{
                right: {
                    color: 'black',
                },
                left: {
                    color: 'white'
                }
            }}

            usernameStyle={{
                color:  props?.currentMessage?.image? 'transparent':'white'
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
        <AntDesign name="caretdown" size={25} color='black' />
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
                marginTop: 2,
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
                    color: props?.currentMessage?.image ? "transparent" : "black"
                },
                left: {
                    color: props?.currentMessage?.image ? "transparent" : "white"
                }
            }}
        />
    );
}

export const renderDay = (props)=>{
    return (
        <Day {...props}
            wrapperStyle={{
                backgroundColor: 'black',
                paddingHorizontal: 8,
                paddingVertical: 5,
                borderRadius: 5,
            }}
        />
    )
}

export const renderAvatar = (props) => {
    return (
        <Avatar {...props}
            imageStyle={{
                left: {
                    width: 35,
                    height: 35,
                    borderRadius: 10,
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
