import React from 'react'
import { useRoute } from '@react-navigation/core';
import { 
    Channel,
    MessageList,
    MessageInput,
    OverlayProvider
} from "stream-chat-react-native-core"
import { SafeAreaProvider } from 'react-native-safe-area-context';

const ChannelScreen = () => {

    const route = useRoute();

    const channel = route.params?.channel;

    return (
        <SafeAreaProvider>
            <OverlayProvider>
                <Channel  channel={channel}>
                    <MessageList />
                    <MessageInput />
                </Channel>
            </OverlayProvider>
        </SafeAreaProvider>
    )
}

export default ChannelScreen

