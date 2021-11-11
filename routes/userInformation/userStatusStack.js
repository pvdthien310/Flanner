import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import UserStatus from '../../screens/InformationUser/userStatus'
import userStatusMember from '../../components/UserInformation/userStatusMember'
const Stack = createNativeStackNavigator()

export const UserStatusStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='User Knowledge' component= {UserStatus} />
            <Stack.Screen name='User Status Member' component={userStatusMember} />
            

        </Stack.Navigator>
    )
}