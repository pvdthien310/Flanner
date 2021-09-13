import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './../screens/Profile';
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Discussion from './../screens/Discussion';
import Chat from './../screens/FlannerChat';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator 
            tabBarOptions={{
                activeTintColor:'#f2404c',
                inactiveTintColor:'#000119',
                style:{
                    height:65,
                    justifyContent:'center',
                    paddingVertical:15,
                    backgroundColor:'#FFF',
                    elevation:2
                }
            }}
        >
                 <Tab.Screen
                    name='Chat'
                    component={Chat}
                    options={{
                        tabBarLabel:'',
                        tabBarIcon:({color,size})=>(
                            <Entypo name="chat" color={color} size={30}/>
                        )
                    }}
                />
                 <Tab.Screen
                    name='Profile'
                    component={Profile}
                    options={{
                        tabBarLabel:'',
                        tabBarIcon:({color,size})=>(
                            <Ionicons name='ios-person' color={color} size={30}/>
                        )
                    }}
                />
        </Tab.Navigator>
    );
};
const Stack = createStackNavigator();
const screenOptionStyle = {
    headerShown:false
};

const ChatStackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name='Chat' component={BottomTabNavigator}/>
            <Stack.Screen name='Discussion' component={Discussion}/>
        </Stack.Navigator>
    )
}

export default ChatStackNavigator;