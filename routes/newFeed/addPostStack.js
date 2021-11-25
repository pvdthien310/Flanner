import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddKnowledge from '../../screens/Addpost/addKnowledge'
import AddStatus from '../../screens/Addpost/addStatus'
import MakeDesision from '../../screens/Addpost/makeDesision'

const Stack = createNativeStackNavigator()

export const AddPostStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Add Post' component={MakeDesision} />
            <Stack.Screen name='Add Knowledge' component={AddKnowledge} />
            <Stack.Screen name='Add Status' component={AddStatus} />

        </Stack.Navigator>
    )
}