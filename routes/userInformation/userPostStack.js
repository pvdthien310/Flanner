import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { UserKnowledgeStack } from './userKnowledgestack'
import { UserStatusStack } from './userStatusStack'
import SavedPost from '../../screens/InformationUser/SavedPostUser/savedPost'
import DetailSavedPost from '../../screens/InformationUser/SavedPostUser/detailSavedPost'


const Stack = createNativeStackNavigator()

export const UserSavedPostStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Saved Post Screen' component={SavedPost} />
            <Stack.Screen name='Detail Saved Post Screen' component={DetailSavedPost} />
        </Stack.Navigator>
    )
}