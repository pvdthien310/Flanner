import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import GlobalPeople from '../../../components/Fess/GlobalPeople'
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Fess from './../FlannerChat';
import ChannelScreen from './../ChannelScreen';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarActiveTintColor: 'black',
                style:{
                    height:65,
                    justifyContent:'center',
                    paddingVertical:15,
                    backgroundColor:'#FFF',
                    elevation:2
                },
            }}
        >
                 <Tab.Screen
                    name='Chat'
                    component={Fess}
                    options={{
                        tabBarLabel:'',
                        tabBarIcon:({color,size})=>(
                            <Entypo name="chat" color={color} size={30}/>
                        ),
                        headerShown: true
                    }}
                />
                 <Tab.Screen
                    name='People'
                    component={GlobalPeople}
                    options={{
                        tabBarLabel:'',
                        tabBarIcon:({color,size})=>(
                            <Ionicons name='ios-person' color={color} size={30}/>
                        ),
                        headerShown: true
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
        <Stack.Navigator screenOptions={screenOptionStyle} >
            <Stack.Screen name='Fess' component={BottomTabNavigator} options={{headerShown: false}} />
            <Stack.Screen name='Channel' component={ChannelScreen} options={{headerShown: true}} />
        </Stack.Navigator>
    )
}

export default ChatStackNavigator;