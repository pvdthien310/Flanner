import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {useChatContext, OverlayProvider, ChannelList} from 'stream-chat-expo'



const Fess = ({navigation}) => {
   
 const { user } = useSelector(state => { return state.User })
 const[isReady, setIsReady] = useState(false);
 const{client} = useChatContext();

    useEffect( () =>
    {
        const connectUser = async () =>{
            await client.connectUser(
                {
                    id: user.userID,
                    name: user.name,
                    image: user.avatar,
                },
                client.devToken(user.userID)
            );
            setIsReady(true);
        };
        connectUser();
        return () => client.disconnectUser();
    },[]);

    const filters = {
        members: {
            $in: [user.userID]
        }
    }

    const onChannelPressed = (channel) => {
        navigation.navigate("Channel", {channel});
    }

    console.log(isReady);
    if(!isReady)
    {
        return null;
    } else {
        return(
            <SafeAreaProvider>
                <OverlayProvider>
                    <ChannelList onSelect={onChannelPressed} filters={filters} />  
                </OverlayProvider>
            </SafeAreaProvider>
    )
    }
   
}
export default Fess;



