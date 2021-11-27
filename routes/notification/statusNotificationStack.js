import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
 import StatusNotification from '../../screens/Notification/statusNotification'
import NotiDetailStatus from '../../screens/Notification/StatusNotification/notiDetailStatus'
import ShowReactInfoFotStatusNoti from '../../screens/FriendInformation/StatusNotification/showReactInfoforStatusNoti'
import FriendInfoForStatusNoti from '../../screens/FriendInformation/StatusNotification/friendProfileforStatusNoti'
import UserKnowledgeForSN from '../../screens/Notification/StatusNotification/UserKnowledgeforSN'
import UserStatusForSN from '../../screens/Notification/StatusNotification/UserStatusforSN'
import StatusNotiDetailKnowledge from '../../screens/Notification/StatusNotification/notiDetailKnowledge'




const Stack = createNativeStackNavigator()

export const StatusNotificationStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Status Notification' component={StatusNotification} />
            <Stack.Screen name='Status Detail Notification' component={NotiDetailStatus} />
            <Stack.Screen name='Status Notification Detail Knowledge' component={StatusNotiDetailKnowledge} />
            <Stack.Screen name='Status Notification Show React User' component={ShowReactInfoFotStatusNoti} />
            <Stack.Screen name='Status Notification Friend Profile' component={FriendInfoForStatusNoti} />
            <Stack.Screen name='Status Notification Friend Knowledge' component={UserKnowledgeForSN} />
            <Stack.Screen name='Status Notification Friend Status' component={UserStatusForSN} />

        </Stack.Navigator>
    )
}