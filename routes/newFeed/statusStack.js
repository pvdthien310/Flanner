import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Status from '../../screens/Status/status'
import StatusMember from '../../components/statusMember'
import DetailStatus from '../../screens/Status/detailstatus'
const Stack = createNativeStackNavigator()

export const StatusStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Status' component={Status} />
            <Stack.Screen name='Status Detail' component={DetailStatus} />
            <Stack.Screen name='Status Member' component={StatusMember} />

        </Stack.Navigator>
    )
}