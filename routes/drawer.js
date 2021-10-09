import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ChatStackNavigator from '../screens/Fess/navigations/Navigator'

import { CustomDrawer } from '../custom/customDrawer';
import { BottomNavigator } from './newFeed/newfeedBottomNav';

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
            <Button onPress={() => navigation.navigate('Drawer')} title="Go back home" />

        </View>
    );
}

const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
    return (
        
            
        <Drawer.Navigator initialRouteName="Home" 
        screenOptions = {{
            headerShown: false
        }} 
        drawerContent = {(props) => <CustomDrawer {...props}/> } >
           
            <Drawer.Screen name = "Drawer" component = {BottomNavigator}/>
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
            <Drawer.Screen name="Flâner Chat" component={ChatStackNavigator} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
}