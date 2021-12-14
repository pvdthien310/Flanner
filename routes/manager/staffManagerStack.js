import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StaffScreen from '../../screens/Manager/Staff/staffScreen'
import EditStaffScreen from '../../screens/Manager/Staff/editStaffScreen'
import NewStaffScreen from '../../screens/Manager/Staff/newStaffScreen'

const Stack = createNativeStackNavigator()

export const StaffManagerStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator initialRouteName='Staff Screen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Staff Screen' component={StaffScreen} />
            <Stack.Screen name='Edit Staff Screen' component={EditStaffScreen} />
            <Stack.Screen name='New Staff Screen' component={NewStaffScreen} />
        </Stack.Navigator>
    )
}