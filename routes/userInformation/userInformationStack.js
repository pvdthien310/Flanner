import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainInfor from '../../screens/InformationUser/mainInfo'
import EditProFile from '../../screens/InformationUser/editProfile'
import { UserPostStack } from './userPostStack'
import SavedPost from '../../screens/InformationUser/savedPost'
import { UserKnowledgeStack } from './userKnowledgestack'
import { UserStatusStack } from './userStatusStack'
const Stack = createNativeStackNavigator()

export const UserInformationStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='User Dashboard' component= {MainInfor} />
            <Stack.Screen name='Edit Profile' component= {EditProFile} />
            <Stack.Screen name='Saved Post' component= {SavedPost} />
            <Stack.Screen name='User Knowledge Stack' component= {UserKnowledgeStack} />
            <Stack.Screen name='User Status Stack' component= {UserStatusStack} />

        </Stack.Navigator>
    )
}