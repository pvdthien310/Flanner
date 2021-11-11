import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainInfor from '../../screens/InformationUser/mainInfo'
import EditProFile from '../../screens/InformationUser/editProfile'
import UserKnowledge from '../../screens/InformationUser/userKnowledge'
import userKnowledgeMember from '../../components/UserInformation/userKnowledgeMember'
import UserDetailKnowledge from '../../screens/InformationUser/userDetailKnowledge'
import EditKnowledge from '../../screens/InformationUser/editKnowledge'
const Stack = createNativeStackNavigator()

export const UserKnowledgeStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='User Knowledge' component= {UserKnowledge} />
            <Stack.Screen name='User Knowledge Member' component={userKnowledgeMember} />
            <Stack.Screen name='User Detail Knowledge' component= {UserDetailKnowledge} />
            <Stack.Screen name='User Edit Knowledge' component= {EditKnowledge} />

        </Stack.Navigator>
    )
}