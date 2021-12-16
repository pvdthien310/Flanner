import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/core';
import {
    Channel,
    MessageList,
    MessageInput,
    OverlayProvider,
} from "stream-chat-react-native-core"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LogBox, StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux';
import { AntDesign, Ionicons } from '@expo/vector-icons'
import {ChannelAvatar} from 'stream-chat-expo'


// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...', 'Non-serializable values were found in the navigation state', 'VirtualizedLists should never be nested', 'source.uri should not be an empty string']);

//Ignore all log notifications
LogBox.ignoreAllLogs();


const ChannelScreen = ({ navigation, route }) => {

    const channel = route.params.channel;

    const { user } = useSelector(state => { return state.User })

    const [members, setMembers] = useState([])

    const [nameHeader, setNameHeader] = useState('')

    const [imgHeader, setImgHeader] = useState('')

    const fetchMembers = async () => {
        const response = await channel.queryMembers({});
        console.log(members)
        setMembers(response.members);
    };


    useEffect(() => {
        fetchMembers();
    }, [])

    useEffect(() => {
        if (members.length === 2) {
            var i;
            for(i = 0; i < 2; i++) {
                if(members[i].user.id != user.userID)
                {
                    setNameHeader(members[i].user.name);
                    break;
                }
            }
        } else {
            setNameHeader(channel.data.name);
        }
    })

    useEffect(() => {
        if (members.length === 2) {
            var i;
            for(i = 0; i < 2; i++) {
                if(members[i].user.id != user.userID)
                {
                    setImgHeader(members[i].user.image);
                    break;
                }
            }
        } else {
            setImgHeader("https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-communication-communication-kiranshastry-lineal-kiranshastry.png");
        }
    })

    const onDoubleTapMessage = ({
        actionHandlers
    }) => {
        actionHandlers?.toggleReaction('love')
    };


    return (
        <LinearGradient
            colors={["white", "white", "white"]}
            style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Fess")}
                        style={{
                            marginEnd: 10
                        }}
                    >
                        <Ionicons name="arrow-back-outline" size={25} color="white" />
                    </TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'

                    }}>
                        {/* <Image style={styles.avatar} source={{ uri: imgHeader }} /> */}
                        <ChannelAvatar channel={channel} />
                        <Text style={styles.username}>{nameHeader}</Text>
                    </View>
                </View>
                <View style={
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        
                    }
                }>
                    <TouchableOpacity style ={{
                        marginEnd: 15
                    }}>
                        <Ionicons name="call-outline" size={27} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Ionicons name="videocam-outline" size={30} color="white" />
                    </TouchableOpacity>

                </View>

            </View>
            <SafeAreaProvider style={{ marginBottom: 10 }} >
                <OverlayProvider>
                    <Channel channel={channel}
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
        backgroundColor: "#313149",
        width: '100%',
        flexDirection: 'row',
        height: '10%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 30,
        paddingStart: 10,
        paddingEnd:10

    },
    username: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'nunitobold',
        marginLeft: 10
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 15,
        borderColor: 'white',
        backgroundColor: 'white',
        marginEnd: 10

    }

})