import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../../screens/search/searchScreen'
import FriendInfoForSearch from '../../screens/FriendInformation/Search/friendProfileforSearch'

const Stack = createNativeStackNavigator()

export const SearchStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Search Screen' component= {SearchScreen} />
            <Stack.Screen name='Search Friend Profile' component= {FriendInfoForSearch} />

        </Stack.Navigator>
    )
}