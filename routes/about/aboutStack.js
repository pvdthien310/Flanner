import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AboutScreen from '../../screens/About/aboutScreen'
import PrivacyScreen from '../../screens/About/privacyScreen'
import InstructionScreen from '../../screens/About/instructionScreen'



const Stack = createNativeStackNavigator()

export const AboutStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='About Screen' component={AboutScreen} />
            <Stack.Screen name='PrivacyScreen' component={PrivacyScreen} />
            <Stack.Screen name='InstructionScreen' component={InstructionScreen} />
        </Stack.Navigator>
    )
}