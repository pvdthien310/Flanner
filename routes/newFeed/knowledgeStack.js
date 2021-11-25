import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Knowledge from '../../screens/Knowledge/knowledge'
import DetailKnowledge from '../../screens/Knowledge/detailknowledge'
import KnowledgeMember from '../../components/knowledgeMember'
import ShowReactInfo from '../../screens/FriendInformation/showReactInfo'
import ReactMember from '../../components/ShowReactUser/reactMember'
import FriendInfo from '../../screens/FriendInformation/friendProfile'
import UserKnowledgeForNF from '../../screens/Knowledge/UserKnowledgeforNF'

const Stack = createNativeStackNavigator()

export const KnowledgeStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Knowledge' component={Knowledge} />
            <Stack.Screen name='Knowledge Detail' component={DetailKnowledge}/>
            <Stack.Screen name='Knowledge Member' component={KnowledgeMember} />
            <Stack.Screen name='Knowledge Show React User' component={ShowReactInfo} />
            <Stack.Screen name='Knowledge UI React User' component={ReactMember} />
            <Stack.Screen name='Knowledge Friend Profile' component={FriendInfo} />
            <Stack.Screen name='Knowledge Friend Knowledge' component={UserKnowledgeForNF} />




        </Stack.Navigator>
    )
}