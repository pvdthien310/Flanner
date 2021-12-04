import * as  React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../../screens/search/searchScreen'
import FriendInfoForSearch from '../../screens/FriendInformation/Search/friendProfileforSearch'
import ShowReactInfoForSearch from '../../screens/FriendInformation/Search/showReactInfoforSearch'
import UserKnowledgeForSearch from '../../screens/search/UserKnowledgeforSearch'
import UserStatusForSearch from '../../screens/search/UserstatusforSearch'
import SearchDetailKnowledge from '../../screens/search/searchDetailKnowledge'

const Stack = createNativeStackNavigator()

export const SearchStack = (props) => {
    const { navigation } = props
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Search Screen' component= {SearchScreen} />
            <Stack.Screen name='Search Friend Profile' component= {FriendInfoForSearch} />
            <Stack.Screen name='Search Show React User' component={ShowReactInfoForSearch} />
            <Stack.Screen name='Search Friend Knowledge' component={UserKnowledgeForSearch} />
            <Stack.Screen name='Search Friend Status' component={UserStatusForSearch} />
            <Stack.Screen name='Search Detail Knowledge' component= {SearchDetailKnowledge} />


        </Stack.Navigator>
    )
}