import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import GlobalPeople from '../../../components/Fess/GlobalPeople'
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Fess from './../FlannerChat';
import ChannelScreen from './../ChannelScreen';
import CreateFessScreen from './../CreateFessScreen';
import {BlurView} from 'expo-blur';
import {StyleSheet, View} from 'react-native'

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 15,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#313149',
                    borderRadius: 15,
                    height: 60,

                    ...styles.shadow
                }
            }}
        >
                 <Tab.Screen
                    name='Chat'
                    component={Fess}
                    options={{
                        tabBarLabel:'',
                        tabBarIcon:({color,size})=>(
                            <Entypo style ={{marginTop: 10}} name="chat" color={color} size={25}/>
                        ),
                        headerShown: false
                    }}
                />
                 <Tab.Screen
                    name='People'
                    component={GlobalPeople}
                    options={{
                        tabBarLabel:'',
                        tabBarIcon:({color,size})=>(
                            <Ionicons style ={{marginTop: 10}} name='ios-person' color={color} size={25}/>
                        ),
                        headerShown: false
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
            <Stack.Screen name='Channel' component={ChannelScreen} options={{headerShown: false}} />
            <Stack.Screen name='CreateFess' component={CreateFessScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export default ChatStackNavigator;
const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#313149',
        shadowOffset: {
            width: 0,
            height: 10,
        },
    }
});