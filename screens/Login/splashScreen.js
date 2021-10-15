import * as React from 'react';
import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { EvilIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { AsyncStorage } from 'react-native';

export default function SplashScreen({ navigation }) {
    _retrieveData = async () => {
        try {
            const temp = await AsyncStorage.getItem('newUser');

            if (temp !== null) {
                navigation.navigate('SignInScreen')
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    _storeData = async () => {
        try {
            await AsyncStorage.setItem('newUser', 'true');

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        _retrieveData();
        _storeData();

    }
        , [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image
                    animation={logoAnim}
                    style={styles.logo}
                    source={require('../../assets/flaner.png')}
                    resizeMode='stretch'
                    easing='ease-out-back' />
            </View>
            <Animatable.View style={styles.footer} animation='fadeInUpBig' easing='ease-out-back'>
                <Text style={styles.title}>Stay connect with everyone!</Text>
                <Text style={styles.text}>Sign in with account</Text>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('SignInScreen') }}>
                    <LinearGradient
                        colors={['black', 'dimgray']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Get Flâner</Text>
                        <EvilIcons name="chevron-right" size={24} color='white' />
                    </LinearGradient>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    )
}

const { height } = Dimensions.get("screen");
const logoHeight = height * 0.2;

const logoAnim = {
    from: {
        rotate: "0deg",
        scale: 0
    },
    to: {
        rotate: "360deg",
        scale: 1
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CFCFCF'
    },
    header: {
        height: height * 0.54,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        height: 500,
        backgroundColor: 'white',
        //borderTopLeftRadius: 30,
        borderTopRightRadius: 70,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        height: logoHeight,
        width: logoHeight
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
    },
    text: {
        color: 'grey',
        marginTop: 5,
        color: 'lightslategrey',
        fontFamily: 'nunitoregular'

    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'nunitoregular'
    }
})