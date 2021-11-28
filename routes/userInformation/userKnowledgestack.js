import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainInfor from '../../screens/InformationUser/mainInfo'
import EditProFile from '../../screens/InformationUser/editProfile'
import UserKnowledge from '../../screens/InformationUser/userKnowledge'
import userKnowledgeMember from '../../components/UserInformation/KnowledgeUserInfo/userKnowledgeMember'
import UserDetailKnowledge from '../../screens/InformationUser/KnowledgeUser/userDetailKnowledge'
import EditKnowledge from '../../screens/InformationUser/KnowledgeUser/editKnowledge'
import ShowReactInfoForKnowledgeUserInfo from '../../screens/FriendInformation/KnowledgeUserInfo/showReactInfoforKUserInfo'
import FriendInfoForKnowledgeUserInfo from '../../screens/FriendInformation/KnowledgeUserInfo/friendProfileforKUserInfo'
import UserKnowledgeForKUSer from '../../screens/InformationUser/KnowledgeUser/UserKnowledgeforKUser'
import UserStatusForKUser from '../../screens/InformationUser/KnowledgeUser/UserStatusforKUser'
const Stack = createNativeStackNavigator()

export const UserKnowledgeStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Knowledge User' component= {UserKnowledge} />
            <Stack.Screen name='Knowledge User Member' component={userKnowledgeMember} />
            <Stack.Screen name='Knowledge User Info Show React User' component={ShowReactInfoForKnowledgeUserInfo} />
            <Stack.Screen name='Knowledge User Info Friend Profile' component={FriendInfoForKnowledgeUserInfo} />
            <Stack.Screen name='Knowledge User Detail Knowledge' component= {UserDetailKnowledge} />
            <Stack.Screen name='Knowledge User Edit Knowledge' component= {EditKnowledge} />
            <Stack.Screen name='Knowledge User Friend Knowledge' component={UserKnowledgeForKUSer} />
            <Stack.Screen name='Knowledge User Friend Status' component={UserStatusForKUser} />
            
        </Stack.Navigator>
    )
}