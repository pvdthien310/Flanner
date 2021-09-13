import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from '../screens/Login/splashScreen'
import SignInScreen from '../screens/Login/signInScreen';
import SignUpScreen from '../screens/Login/signUpScreen';
import ForgotPasswordScreen from '../screens/Login/forgotPasswordScreen';
import { DrawerStack } from './drawer';


const Stack = createNativeStackNavigator();

export default function LoginStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="SignInScreen" component={SignInScreen} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="DrawerStack" component={DrawerStack} options={{
                    headerShown: false
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};