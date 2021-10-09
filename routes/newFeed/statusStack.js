import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Status from '../../screens/Status/status'
import DetailStatus from '../../screens/Status/detailStatus'
import statusMember from '../../components/statusMember'
const Stack = createNativeStackNavigator()

export const StatusStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Status' component={Status} />
            <Stack.Screen name='Status Detail' component={DetailStatus} />
            <Stack.Screen name='Status Member' component={statusMember} />
        </Stack.Navigator>
    )
}