import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DetailKnowledge from '../../screens/Knowledge/detailknowledge'
import KnowledgeNotification from '../../screens/Notification/knowledgeNotification'
const Stack = createNativeStackNavigator()

export const KnowledgeNotificationStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Knowledge Notification' component={KnowledgeNotification} />
            <Stack.Screen name='Knowledge Detail Notification' component={DetailKnowledge} />
        </Stack.Navigator>
    )
}