import * as React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import { Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { images, Poststyle } from '../styles/poststyle'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function Header({ navigation, title }) {
    const openMenu = () => {
        navigation.openDrawer();
    }
    return (
        <ImageBackground source={require('../assets/game_bg.png')} style={styles.header}>
            <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />
            <View style={styles.headerTitle}>
                <Image style={styles.headerImage} source={require('../assets/logo/logo.png')} />
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
        <ImageBackground source={require('../assets/game_bg.png')} style={styles.header}>
            {/* <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} /> */}
            {/* <Image style={styles.headerImage} onPress={openMenu} source={require('../assets/logo/Logo.png')} /> */}
            <TouchableOpacity onPress={openMenu}>
                <View style={styles.headerTitle}>

                    <Image style={styles.headerImage} source={require('../assets/logo/logo.png')} />
                    <Text style={styles.headerText}>{title}</Text>
                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                    <Ionicons name="notifications" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('User Information')}>
                    <Image source={images.avatars['2']} style={styles.imageavatar} />
                </TouchableOpacity>
            </View>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({

    header: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0,
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
        alignItems: 'center'
    },
    headerImage: {

        width: 45,
        height: 45,
        resizeMode: 'stretch'
    },
    imageavatar: {
        width: 35,
        height: 35,
        borderRadius: 10,
        alignItems: 'center',
        marginStart: 15
    },
})