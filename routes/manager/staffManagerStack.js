import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StaffScreen from '../../screens/Manager/Staff/staffScreen'


const Stack = createNativeStackNavigator()

export const StaffManagerStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            
            <Stack.Screen name='Staff Screen' component={StaffScreen} />


        </Stack.Navigator>
    )
}