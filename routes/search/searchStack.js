import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../../screens/search/searchScreen'

const Stack = createNativeStackNavigator()

export const SearchStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Search Screen' component= {SearchScreen} />
        </Stack.Navigator>
    )
}