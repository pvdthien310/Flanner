import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CensorScreen from '../../screens/Manager/Censor/censorScreen'
import DetailReport from '../../screens/Manager/Censor/detailReport'


const Stack = createNativeStackNavigator()

export const CensorManagerStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Censor Screen' component={CensorScreen} />
            <Stack.Screen name='Detail Report Screen' component={DetailReport} />
        </Stack.Navigator>
    )
}