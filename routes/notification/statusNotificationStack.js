import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
 import DetailStatus from '../../screens/Status/detailstatus'
 import StatusNotification from '../../screens/Notification/statusNotification'
import NotiDetailStatus from '../../screens/Notification/notiDetailStatus'

const Stack = createNativeStackNavigator()

export const StatusNotificationStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Status Notification' component={StatusNotification} />
            <Stack.Screen name='Status Detail Notification' component={NotiDetailStatus} />
        </Stack.Navigator>
    )
}