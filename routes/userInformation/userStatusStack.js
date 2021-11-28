import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import UserStatus from '../../screens/InformationUser/userStatus'
import userStatusMember from '../../components/UserInformation/StatusUserInfo/userStatusMember'
import EditStatus from '../../screens/InformationUser/StatusUser/editStatus'
import ShowReactInfoForStatusUserInfo from '../../screens/FriendInformation/StatusUserInfo/showReactInfoforSUserInfo'
import FriendInfoForStatusUserInfo from '../../screens/FriendInformation/StatusUserInfo/friendProfileforSUserInfo'
import UserKnowledgeForSUSer from '../../screens/InformationUser/StatusUser/UserKnowledgeforSUser'
import UserStatusForSUser from '../../screens/InformationUser/StatusUser/UserStatusforSUser'
import StatusUserDetailKnowledge from '../../screens/InformationUser/StatusUser/StatusUserDetailKnowledge'
const Stack = createNativeStackNavigator()

export const UserStatusStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Status User Status' component= {UserStatus} />
            <Stack.Screen name='Status User Member' component={userStatusMember} />
            <Stack.Screen name='Status User Edit Status' component= {EditStatus} />
            <Stack.Screen name='Status User Info Show React User' component={ShowReactInfoForStatusUserInfo} />
            <Stack.Screen name='Status User Info Friend Profile' component={FriendInfoForStatusUserInfo} />
            <Stack.Screen name='Status User Friend Knowledge' component={UserKnowledgeForSUSer} />
            <Stack.Screen name='Status User Friend Status' component={UserStatusForSUser} />
            <Stack.Screen name='Status User Detail Knowledge' component= {StatusUserDetailKnowledge} />

            

        </Stack.Navigator>
    )
}