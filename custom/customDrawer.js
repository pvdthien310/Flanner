import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import { images, Poststyle } from '../styles/poststyle'

export const CustomDrawer = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5
                    }}>
                        <Image style={Poststyle.imageavatar} source={require('../assets/logo/logo.png')} />
                        <Text style={styles.appname}>Flanner</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} >
                    <View style={styles.info}>
                        <View>
                            <Text style={styles.textstyle}>Thien Pham</Text>
                            <Text style={styles.textstyle}>pvdthien@gmail.com</Text>


                        </View>
                        <Image source={{
                            uri: 'https://i.pinimg.com/originals/d0/52/45/d05245eec289068e4c9ed777df16ec4f.jpg'
                        }}
                            style={styles.avatar}
                        />
                    </View>
                </TouchableOpacity>


                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity style={{
                position: 'absolute',
                right: 0,
                left: 0,
                bottom: 50,
                backgroundColor: 'grey',
                padding: 20
            }}>
                <Text >Log out</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 15,
        marginEnd: 15
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'black'

    },
    textstyle: {
        fontFamily: 'nunito-bold',
        color: 'white'
    },
    appname: {
        fontFamily: 'nunito-bold',
        fontSize: 22,
    }
})