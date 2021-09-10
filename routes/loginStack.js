import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from '../screens/splashScreen'
import SignInScreen from '../screens/signInScreen';
import SignUpScreen from '../screens/signUpScreen';
import { DrawerStack } from './drawer';

import { CardStyleInterpolators } from '@react-navigation/stack';
import { TransitionSpecs } from '@react-navigation/stack';

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