import * as React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import { Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { images, Poststyle } from '../styles/poststyle'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';




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
    const { user } = useSelector(state => state.User)
    const dispatch = useDispatch();

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
                    <Text style={{...styles.headerText}}>{title}</Text>
                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Notification')
                    dispatch({ type: 'UPDATE_FEATURE', payload: 2 })

                    }}>
                    <Ionicons name="notifications" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                   navigation.navigate('User Information', {
                    screen: 'User Dashboard',
                    params: { },
                  });
                    dispatch({ type: 'UPDATE_FEATURE', payload: 0 })

                    }}>
                    <Image source={{uri: user.avatar}} style={styles.imageavatar} />
                </TouchableOpacity>
            </View>
        </ImageBackground>

    )
}
export const HeaderDrawer = ({ navigation, title }) => {

    const openMenu = () => {
        navigation.openDrawer();
    }
    const pressgobackHandler = () => {
        navigation.goBack();
    }
    return (
        <View  style={styles.headerDrawer}>
            
                <Text style={styles.headerText}>{title}</Text>
               
               
        </View>

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
        top:-5

    },
    headerDrawer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        marginStart: 0,
       
       
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 1,
        marginTop: 5,
        fontFamily:'nunitobold'
    },
    icon: {
        position: 'absolute',
    },
    headerTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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