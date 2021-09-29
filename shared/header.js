import * as React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import { Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { images, Poststyle } from '../styles/poststyle'


export default function Header({ navigation, title }) {
    const openMenu = () => {
        navigation.openDrawer();
    }
    return (
        <ImageBackground source={require('../assets/Picture/game_bg.png')} style={styles.header}>
            <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />
            <View style={styles.headerTitle}>
                <Image style={styles.headerImage} source={require('../assets/logo/Logo.png')} />
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </ImageBackground>

    )
}
export const HeaderNews = ({ navigation, title }) => {
    const openMenu = () => {
        navigation.openDrawer();
    }
    return (
        <ImageBackground source={require('../assets/Picture/game_bg.png')} style={styles.header}>
            <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />
            {/* <Image style={styles.headerImage} onPress={openMenu} source={require('../assets/logo/Logo.png')} /> */}
            <View style={styles.headerTitle}>
                <Image style={styles.headerImage} source={require('../assets/logo/Logo.png')} />
                <Text style={styles.headerText}>{title}</Text>
            </View>
            <Image source={images.avatars['2']} style={styles.imageavatar} />
        </ImageBackground>

    )
}

const styles = StyleSheet.create({

    header: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 30
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 1,
        marginTop: 5,
    },
    icon: {
        position: 'absolute',
    },
    headerTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    headerImage: {

        width: 35,
        height: 35,
        resizeMode: 'stretch'
    },
    imageavatar: {
        width: 35,
        height: 35,
        borderRadius: 10,
        alignItems: 'flex-end',
    },
})