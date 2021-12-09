import React from 'react'
import { useRoute } from '@react-navigation/core';
import { 
    Channel,
    MessageList,
    MessageInput,
    OverlayProvider,
} from "stream-chat-react-native-core"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LogBox, StyleSheet, View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import { useSelector } from 'react-redux';
import {AntDesign} from '@expo/vector-icons'


// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...','Non-serializable values were found in the navigation state','VirtualizedLists should never be nested']);

//Ignore all log notifications
LogBox.ignoreAllLogs();


const ChannelScreen = ({navigation, route}) => {

    const channel = route.params.channel;

    const { user } = useSelector(state => { return state.User })

const onDoubleTapMessage = ({
  actionHandlers
}) => {
  actionHandlers?.toggleReaction('love')
};

    return (
        <LinearGradient
            colors={["white", "white", "white"]}
             style={styles.container}>
                 <SafeAreaView style={styles.headerContainer}>
                     <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{marginLeft: 10}}
                   >
                         <AntDesign name="leftcircle" size={30} color="#313149" />
                     </TouchableOpacity>
                    <Text style={styles.username}>Discussion</Text>
                   </SafeAreaView>
                <SafeAreaProvider style={{marginBottom: 10}}>
                    <OverlayProvider >
                        <Channel  channel={channel}
                            onDoubleTapMessage={onDoubleTapMessage}
                        >
                            <MessageList />
                            <MessageInput />
                        </Channel>
                    </OverlayProvider>
                </SafeAreaProvider>            
            
        </LinearGradient>
       
    )
}

export default ChannelScreen

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
     main: {
        backgroundColor: '#FFF',
        height: '88%',
        paddingHorizontal: 20,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        paddingTop: 40
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10
    },
     username: {
        color: '#313149',
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        marginLeft: 106,
        alignSelf: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 2,
    }

})