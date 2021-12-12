import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainInfor from '../../screens/InformationUser/mainInfo'
import EditProFile from '../../screens/InformationUser/editProfile'
import { UserSavedPostStack } from './userPostStack'
import { UserKnowledgeStack } from './userKnowledgestack'
import { UserStatusStack } from './userStatusStack'
const Stack = createNativeStackNavigator()

export const UserInformationStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='User Dashboard' component= {MainInfor} />
            <Stack.Screen name='Edit Profile' component= {EditProFile} />
            <Stack.Screen name='User Knowledge Stack' component= {UserKnowledgeStack} />
            <Stack.Screen name='User Status Stack' component= {UserStatusStack} />
            <Stack.Screen name='User Saved Post Stack' component= {UserSavedPostStack} />
        </Stack.Navigator>
    )
}