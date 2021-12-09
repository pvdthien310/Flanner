import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AboutScreen from '../../screens/About/aboutScreen'



const Stack = createNativeStackNavigator()

export const AboutStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='About Screen' component={AboutScreen} />
        </Stack.Navigator>
    )
}