import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Knowledge from '../../screens/Knowledge/knowledge'
import DetailKnowledge from '../../screens/Knowledge/detailknowledge'
import KnowledgeMember from '../../components/knowledgeMember'
const Stack = createNativeStackNavigator()

export const KnowledgeStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Knowledge' component={Knowledge} />
            <Stack.Screen name='KnowLedge Detail' component={DetailKnowledge} />
            <Stack.Screen name='Member' component={KnowledgeMember} />

        </Stack.Navigator>
    )
}