import React from 'react'
import { useRoute } from '@react-navigation/core';
import { 
    Channel,
    MessageList,
    MessageInput,
    OverlayProvider
} from "stream-chat-react-native-core"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();

const ChannelScreen = () => {

    const route = useRoute();

    const channel = route.params?.channel;

const onDoubleTapMessage = ({
  actionHandlers
}) => {
  actionHandlers?.toggleReaction('love')
};

    return (
        <SafeAreaProvider>
            <OverlayProvider>
                <Channel  channel={channel}
                    onDoubleTapMessage={onDoubleTapMessage}
                >
                    <MessageList />
                    <MessageInput />
                </Channel>
            </OverlayProvider>
        </SafeAreaProvider>
    )
}

export default ChannelScreen

