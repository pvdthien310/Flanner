import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { EvilIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function SplashScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image
                    animation={logoAnim}
                    style={styles.logo}
                    source={require('../assets/flaner.png')}
                    resizeMode='stretch' />
            </View>
            <Animatable.View style={styles.footer} animation='fadeInUpBig'  >
                <Text style={styles.title}>Stay connect with everyone!</Text>
                <Text style={styles.text}>Sign in with account</Text>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('DrawerStack') }}>
                    <LinearGradient
                        colors={['black', 'dimgray']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Get Started</Text>
                        <EvilIcons name="chevron-right" size={24} color='white' style={{}} />
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
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5,

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
        fontWeight: 'bold'
    }
})