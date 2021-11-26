import React, {useState, useEffect, useRef} from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Animated, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import Profiles from '../../components/Fess/Profile'
import Messages from '../../components/Fess/Messages'
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {StreamChat} from 'stream-chat'
import {useChatContext, OverlayProvider, Channel, Chat, ChannelList} from 'stream-chat-expo'

const API_KEY = "tw5mmngstvph"
const client = StreamChat.getInstance(API_KEY);
const Fess = (props) => {
   
 const { user } = useSelector(state => { return state.User })
 const[isReady, setIsReady] = useState("false");
 const[selectedChannel, setSelectedChannel] = useState(null);

    useEffect( () =>
    {
        const connectUser = async () =>{
            await client.connectUser(
                {
                    id: user.userID,
                    name: user.name,
                },
                client.devToken("vadim")
            );
            
            const channel = client.channel("messaging", "notjustdev",{
                name: "notJust.dev",
            });
            await channel.watch();
            console.log(user.userID);
            setIsReady(true);
        };
        connectUser();

        return () => client.disconnectUser();
    },[]);

    const onChannelPressed = (channel) => {
        setSelectedChannel(channel);
    }

    console.log(isReady);
    if(!isReady)
    {
        return null;
    } else {
        return(
            <SafeAreaProvider>
                <OverlayProvider>
                    <Chat client={client}>

                        {selectedChannel ? (
                           <Channel channel={selectedChannel}>
                               <Text style={{ marginTop: 50 }} > Go back</Text>
                            </Channel>
                        ) : (
                        <ChannelList onSelect={onChannelPressed} />  
                        )}



                    </Chat>
                </OverlayProvider>
            </SafeAreaProvider>
    )
    }
   
}
export default Fess;


