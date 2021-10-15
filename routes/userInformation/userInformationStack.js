import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainInfor from '../../screens/InformationUser/mainInfo'
const Stack = createNativeStackNavigator()

export const UserInformationStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='User Information' component= {MainInfor} />
        </Stack.Navigator>
    )
}