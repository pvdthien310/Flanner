import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawer } from '../custom/customDrawer';
import { BottomNavigator } from './newFeed/newfeedBottomNav';
import MainInfor from '../screens/InformationUser/mainInfo';
import NotificationTab from './notification/NotificationStack';
import Header, { HeaderDrawer, HeaderNews } from '../shared/header';

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

export const DrawerStack = (props) => {

    const { navigation } = props

    return (
        <Drawer.Navigator initialRouteName="Home" 
        drawerContent = {(props) => <CustomDrawer {...props}/> } >
           
            <Drawer.Screen name = "Drawer" component = {BottomNavigator} options= {{ headerShown : false}}/>
            <Drawer.Screen name = "Notification Stack"component = {NotificationTab} options = {{ headerTitle:  () => <HeaderDrawer navigation={navigation} title ='Notification'  /> }} />
            <Drawer.Screen name = "User Information" component = {MainInfor} options = {{ headerTitle:  () => <HeaderDrawer navigation={navigation} title ='User Information'  /> }}/>

        </Drawer.Navigator>
    );
}