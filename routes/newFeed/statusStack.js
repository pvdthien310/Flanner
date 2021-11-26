import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Status from '../../screens/Status/status'
 import DetailStatus from '../../screens/Status/detailstatus'
import statusMember from '../../components/Status/statusMember'
import ShowReactInfoForStatus from '../../screens/FriendInformation/Status/showReactInfoforStatus'
import ReactMemberforStatus from '../../components/ShowReactUser/reactMemberforStatus'
const Stack = createNativeStackNavigator()

export const StatusStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Status' component={Status} />
            <Stack.Screen name='Status Detail' component={DetailStatus} />
            <Stack.Screen name='Status Member' component={statusMember} />
            <Stack.Screen name='Status Show React User' component={ShowReactInfoForStatus} />
            <Stack.Screen name='Status UI React User' component={ReactMemberforStatus} />
        </Stack.Navigator>
    )
}