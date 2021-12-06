import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import KnowledgeNotification from '../../screens/Notification/knowledgeNotification'
import NotiDetailKnowledge from '../../screens/Notification/KnowledgeNotification/notiDetailKnowledge'
import ShowReactInfoForKnowledgeNoti from '../../screens/FriendInformation/KnowledgeNotification/showReactInfoforKnowledgeNoti'
import FriendInfoForKnowledgeNoti from '../../screens/FriendInformation/KnowledgeNotification/friendProfileforKnowledgeNoti'
import UserKnowledgeForKN from '../../screens/Notification/KnowledgeNotification/UserKnowledgeforKN'
import UserStatusForKN from '../../screens/Notification/KnowledgeNotification/UserStatusforKN'
import CommentScreenForKNoti from '../../screens/Notification/KnowledgeNotification/commentScreen'

const Stack = createNativeStackNavigator()

export const KnowledgeNotificationStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Knowledge Notification' component={KnowledgeNotification} />
            <Stack.Screen name='Knowledge Detail Notification' component={NotiDetailKnowledge} />
            <Stack.Screen name='Knowledge Notification Show React User' component={ShowReactInfoForKnowledgeNoti} />
            <Stack.Screen name='Knowledge Notification Friend Profile' component={FriendInfoForKnowledgeNoti} />
            <Stack.Screen name='Knowledge Notification Friend Knowledge' component={UserKnowledgeForKN} />
            <Stack.Screen name='Knowledge Notification Friend Status' component={UserStatusForKN} />
            <Stack.Screen name='Knowledge Notification Comment' component={CommentScreenForKNoti} />


        </Stack.Navigator>
    )
}