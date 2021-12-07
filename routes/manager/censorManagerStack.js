import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CensorScreen from '../../screens/Manager/Censor/censorScreen'


const Stack = createNativeStackNavigator()

export const CensorManagerStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Censor Screen' component={CensorScreen} />
        </Stack.Navigator>
    )
}