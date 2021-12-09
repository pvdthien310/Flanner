import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { UserKnowledgeStack } from './userKnowledgestack'
import { UserStatusStack } from './userStatusStack'
import SavedPost from '../../screens/InformationUser/savedPost'


const Stack = createNativeStackNavigator()

export const UserSavedPostStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Saved Post Screen' component={SavedPost} />
        </Stack.Navigator>
    )
}