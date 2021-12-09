import React, {useState, useEffect} from 'react'
import { useRoute } from '@react-navigation/core';
import { 
    Channel,
    MessageList,
    MessageInput,
    OverlayProvider,
} from "stream-chat-react-native-core"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LogBox, StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import { useSelector } from 'react-redux';
import {AntDesign} from '@expo/vector-icons'


// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...','Non-serializable values were found in the navigation state','VirtualizedLists should never be nested','source.uri should not be an empty string']);

//Ignore all log notifications
LogBox.ignoreAllLogs();


const ChannelScreen = ({navigation, route}) => {

    const channel = route.params.channel;

    const { user } = useSelector(state => { return state.User })

    const [members, setMembers] = useState([])

    const [nameHeader, setNameHeader] = useState('')

    const [imgHeader, setImgHeader] = useState('')

    const fetchMembers = async () =>{
            const response = await channel.queryMembers({}) ;
            setMembers(response.members);
        };


    useEffect(() => {
        fetchMembers();
    },[])

    useEffect(() => {
         if(members.length === 2)
        {
            setNameHeader(members[1].user.name);
        } else {
            setNameHeader(channel.data.name);
        }
    })

    useEffect(() =>{
          if(members.length === 2)
        {
            setImgHeader(members[1].user.image);
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
                 <SafeAreaView style={styles.headerContainer}>
                          <TouchableOpacity
                        onPress={() => navigation.navigate("Fess")}
                        style={{marginLeft: 10}}
                   >
                         <AntDesign name="leftcircle" size={30} color="white" />
                     </TouchableOpacity>
                        <Image style={styles.avatar} source={{ uri: imgHeader}}/>
                        <Text style={styles.username}>{nameHeader}</Text>
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
        backgroundColor:"#313149",
        width: '100%',
        // flexDirection: 'column',
        height: '15%', 
        alignSelf: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
     username: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 5,
        marginBottom: -5,
        alignSelf: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: '-7%'
    }

})