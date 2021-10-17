import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import { images, Poststyle } from '../styles/poststyle'
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';



export const CustomDrawer = (props) => {
    const dispatch = useDispatch();
     const { _chosen } = useSelector(state => state.DrawerController)
    const { navigation } = props
    const [, forceRerender] = useState();
    useEffect(() => {
        console.log('re render')
        forceRerender
    }, [_chosen])
    
    return (
        <View style={{ flex: 1}}>
            <DrawerContentScrollView {...props}>
                <TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5,
                        shadowColor: 'black',
                        shadowOpacity: 0.3,
                        shadowOffset: { width: 1, height: 1 },
                    }}>
                        <Image style={Poststyle.imageavatar} source={require('../assets/logo/logo.png')} />
                        <Text style={styles.appname}>Flanner</Text>
                    </View>
                </TouchableOpacity>
                {_chosen != 0 ? 

                <TouchableOpacity
                    style={{
                        margin: 3,
                        
                        shadowOffset: { width: 1, height: 1 },
                        shadowColor: 'black',
                        shadowOpacity: 0.5,
                        backgroundColor: 'whitesmoke'
                    }}
                    activeOpacity={0.7} onPress={() => {
                        navigation.navigate('User Information', {
                        screen: 'User Dashboard',
                        params: { user: 'jane' },
                    })
                    dispatch({ type: 'UPDATE_FEATURE', payload: 0 })
                    }}>
                    <View style={styles.info}>
                        <View>
                            <Text style={styles.textstyle}>Thien Pham</Text>
                            <Text style={styles.textstyle1}>pvdthien@gmail.com</Text>
                        </View>
                        <Image source={{
                            uri: 'https://i.pinimg.com/originals/d0/52/45/d05245eec289068e4c9ed777df16ec4f.jpg'
                        }}
                            style={styles.avatar}
                        />
                    </View>
                </TouchableOpacity>
                : 
                <TouchableOpacity
                style={{
                    margin: 3,
                    
                    shadowOffset: { width: 0.5, height: 0.5 },
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                    backgroundColor: 'black'
                }}
                activeOpacity={0.7} >
                <View style={styles.info}>
                    <View>
                        <Text style={{...styles.textstyle, color: 'white'}}>Thien Pham</Text>
                        <Text style={styles.textstyle1}>pvdthien@gmail.com</Text>
                    </View>
                    <Image source={{
                        uri: 'https://i.pinimg.com/originals/d0/52/45/d05245eec289068e4c9ed777df16ec4f.jpg'
                    }}
                        style={styles.avatar}
                    />
                </View>
            </TouchableOpacity>
                 }
                { _chosen != 1 ?
                <TouchableOpacity
                    style={styles.frameFeature}
                    activeOpacity={0.7} onPress={() => {
                        navigation.navigate('NewsFeed')
                        dispatch({ type: 'UPDATE_FEATURE', payload: 1 })
                        }}>
                    <View style={{ padding: 10, justifyContent: 'space-evenly', alignItems: 'center',flexDirection:'row' }}>
                    <Ionicons name="ios-newspaper" size={24} color="black" />
                        <Text style={styles.itemFeature}>New Feed</Text>
                    </View>
                </TouchableOpacity> 
                :
                 <TouchableOpacity
                 style={{...styles.frameFeature, backgroundColor: 'black'}}
                 activeOpacity={0.7} >
                 <View style={{ padding: 10, justifyContent: 'space-evenly', alignItems: 'center',flexDirection:'row' }}>
                 <Text style={{...styles.itemFeature, color: 'white'}}>New Feed</Text>
                 <Ionicons name="ios-newspaper" size={24} color="white" />
                   
                 </View>
             </TouchableOpacity>
                }
                { _chosen != 2 ? 
                <TouchableOpacity
                    style={styles.frameFeature}
                    activeOpacity={0.7} onPress={() => {
                        navigation.navigate('Notification')
                        dispatch({ type: 'UPDATE_FEATURE', payload: 2 })

                        }}>
                    <View style={{ padding: 10, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
                    <Ionicons name="notifications" size={24} color="black" />
                        <Text style = {styles.itemFeature}>Notification</Text>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity
                style={{...styles.frameFeature, backgroundColor: 'black'}}
                activeOpacity={0.7} >
                <View style={{ padding: 10, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
               

                    <Text style = {{...styles.itemFeature, color: 'white'}}>Notification</Text>
                    <Ionicons name="notifications" size={24} color="white" />
                </View>
            </TouchableOpacity>
                }
                {
                    _chosen != 3 ? 
                    <TouchableOpacity
                    style={styles.frameFeature}
                    activeOpacity={0.7} onPress={() => {
                        navigation.navigate('Flâner Chat')
                        dispatch({ type: 'UPDATE_FEATURE', payload: 3 })

                    }}>
                    <View style={{ padding: 10, justifyContent: 'space-around', alignItems: 'center',flexDirection:'row' }}>
                    <Ionicons name="chatbubble-ellipses" size={24} color="black" />
                        <Text style={styles.itemFeature}>Fess</Text>
                    </View>
                </TouchableOpacity> :
                    <TouchableOpacity
                    style={{...styles.frameFeature, backgroundColor: 'black'}}
                    activeOpacity={0.7} >
                    <View style={{ padding: 10, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
                   
    
                        <Text style = {{...styles.itemFeature, color: 'white'}}>Fess</Text>
                        <Ionicons name="chatbubble-ellipses" size={24} color="white" />

                    </View>
                </TouchableOpacity>

                }
              



                {/* <DrawerItemList {...props} /> */}
            </DrawerContentScrollView>
            <TouchableOpacity style={{
                position: 'absolute',
                right: 0,
                left: 0,
                bottom: 50,
                padding: 15,
                borderTopWidth: 1,
                shadowOffset: { width: 1, height: 1 },
                shadowColor: 'black',
                shadowOpacity: 0.1,
            }}>
                <Text style={{ ...styles.textstyle , color: 'black'}} >Log out</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 15,
        marginEnd: 10
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,
        paddingEnd: 10,
        paddingStart: 20,
        alignItems: 'center',


    },
    textstyle: {
        fontFamily: 'nunitobold',
        color: 'black',
        fontSize: 19
    },
    textstyle1: {
        fontFamily: 'nunitobold',
        color: 'lightslategrey'
    },
    appname: {
        fontFamily: 'nunitobold',
        fontSize: 25,
    },
    itemFeature: {
        fontFamily: 'nunitobold',
        color: 'black',
        fontSize: 17
    },
    frameFeature: {
        margin: 5,
        
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.1,
        
    }
})