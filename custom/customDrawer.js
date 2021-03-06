import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Image, Text, TouchableOpacity, AppState, AsyncStorage } from 'react-native'
import { images, Poststyle } from '../styles/poststyle'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Api from '../API/UserAPI';
import JWTApi from '../API/JWTAPI';



export const CustomDrawer = (props) => {
    const dispatch = useDispatch();
    const { _chosen } = useSelector(state => state.DrawerController)
    const { user } = useSelector(state => state.User)
   
    const { navigation } = props
    const [, forceRerender] = useState();
    useEffect(() => {
        console.log('re render')
        forceRerender
    }, [_chosen])
    useEffect(() => {
        forceRerender
    }, [user.avatar])

    const Logout = async () => {
        let token = await AsyncStorage.getItem('refreshToken');
        await JWTApi.logout(token)
            .then(res => {
                navigation.navigate('SignInScreen');
            })
            .catch(err => console.log('Error Log out'))
    }

    return (
        <View style={{ flex: 1 }}>
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
                        <Text style={styles.appname}>Flâner</Text>
                    </View>
                </TouchableOpacity>

                <View>
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
                                    <Text style={styles.textstyle}>{user.name}</Text>
                                    <Text style={styles.textstyle1}>{user.email}</Text>
                                </View>
                                <Image source={{
                                    uri: user.avatar
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
                                    <Text style={{ ...styles.textstyle, color: 'white' }}>{user.name}</Text>
                                    <Text style={styles.textstyle1}>{user.email}</Text>
                                </View>
                                <Image source={{
                                    uri: user.avatar
                                }}
                                    style={styles.avatar}
                                />
                            </View>
                        </TouchableOpacity>
                    }
                </View>
                {
                    user.position == '2' &&
                    <View>
                        {_chosen != 1 ?
                            <TouchableOpacity
                                style={styles.frameFeature}
                                activeOpacity={0.7} onPress={() => {
                                    navigation.navigate('NewsFeed')
                                    dispatch({ type: 'UPDATE_FEATURE', payload: 1 })
                                }}>
                                <View style={{ padding: 10, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
                                    <Ionicons name="ios-newspaper" size={24} color="black" />
                                    <Text style={styles.itemFeature}>New Feed</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={{ ...styles.frameFeature, backgroundColor: 'black' }}
                                activeOpacity={0.7} >
                                <View style={{ padding: 10, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ ...styles.itemFeature, color: 'white' }}>New Feed</Text>
                                    <Ionicons name="ios-newspaper" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                }
                {
                    user.position == '2' &&
                    <View>
                        {_chosen != 4 ?
                            <TouchableOpacity
                                style={styles.frameFeature}
                                activeOpacity={0.7}
                                onPress={() => {
                                    navigation.navigate('Search')
                                    dispatch({ type: 'UPDATE_FEATURE', payload: 4 })
                                }}
                            >
                                <View style={{ padding: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                                    <Ionicons name="search-circle-sharp" size={27} color="black" />
                                    <Text style={styles.itemFeature}>Search</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={{ ...styles.frameFeature, backgroundColor: 'black' }}
                                activeOpacity={0.7} >
                                <View style={{ padding: 10, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ ...styles.itemFeature, color: 'white' }}>Search</Text>
                                    <Ionicons name="search-circle-sharp" size={27} color="white" />

                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                }
                {
                    user.position == '2' &&
                    <View>
                        {_chosen != 2 ?
                            <TouchableOpacity
                                style={styles.frameFeature}
                                activeOpacity={0.7} onPress={() => {
                                    navigation.navigate('Notification')
                                    dispatch({ type: 'UPDATE_FEATURE', payload: 2 })

                                }}>
                                <View style={{ padding: 10, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
                                    <Ionicons name="notifications" size={24} color="black" />
                                    <Text style={styles.itemFeature}>Notification</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={{ ...styles.frameFeature, backgroundColor: 'black' }}
                                activeOpacity={0.7} >
                                <View style={{ padding: 10, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>


                                    <Text style={{ ...styles.itemFeature, color: 'white' }}>Notification</Text>
                                    <Ionicons name="notifications" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                }
                {
                    user.position == '2' &&
                    <View>
                        {
                            _chosen != 3 ?
                                <TouchableOpacity
                                    style={styles.frameFeature}
                                    activeOpacity={0.7} onPress={() => {
                                        navigation.navigate('Flâner Chat')
                                        dispatch({ type: 'UPDATE_FEATURE', payload: 3 })

                                    }}>
                                    <View style={{ padding: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                                        <Ionicons style={{ marginEnd: 2 }} name="chatbubble-ellipses" size={24} color="black" />
                                        <Text style={styles.itemFeature}>Fess</Text>
                                    </View>
                                </TouchableOpacity> :
                                <TouchableOpacity
                                    style={{ ...styles.frameFeature, backgroundColor: 'black' }}
                                    activeOpacity={0.7} >
                                    <View style={{ padding: 10, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>


                                        <Text style={{ ...styles.itemFeature, color: 'white' }}>Fess</Text>
                                        <Ionicons name="chatbubble-ellipses" size={24} color="white" />

                                    </View>
                                </TouchableOpacity>

                        }
                    </View>
                }
                {
                    user.position == '0' &&
                    <View>
                        {
                            _chosen != 5 ?
                                <TouchableOpacity
                                    style={styles.frameFeature}
                                    activeOpacity={0.7} onPress={() => {
                                        navigation.navigate('Staff')
                                        dispatch({ type: 'UPDATE_FEATURE', payload: 5 })

                                    }}>
                                    <View style={{ padding: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                                        <Ionicons name="person-add" size={24} color="black" />
                                        <Text style={styles.itemFeature}>Manager</Text>
                                    </View>
                                </TouchableOpacity> :
                                <TouchableOpacity
                                    style={{ ...styles.frameFeature, backgroundColor: 'black' }}
                                    activeOpacity={0.7} >
                                    <View style={{ padding: 10, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
                                        <Text style={{ ...styles.itemFeature, color: 'white' }}>Manager</Text>
                                        <Ionicons name="person-add" size={24} color="white" />

                                    </View>
                                </TouchableOpacity>
                        }
                    </View>
                }
                {
                    user.position == '0' || user.position == '1' &&
                    <View>
                        {
                            _chosen != 6 ?
                                <TouchableOpacity
                                    style={styles.frameFeature}
                                    activeOpacity={0.7} onPress={() => {
                                        navigation.navigate('Censor')
                                        dispatch({ type: 'UPDATE_FEATURE', payload: 6 })
                                    }}>
                                    <View style={{ padding: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                                        <MaterialIcons name="report" size={24} color="black" />
                                        <Text style={styles.itemFeature}>Report</Text>
                                    </View>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    style={{ ...styles.frameFeature, backgroundColor: 'black' }}
                                    activeOpacity={0.7} >
                                    <View style={{ padding: 10, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
                                        <Text style={{ ...styles.itemFeature, color: 'white' }}>Report</Text>
                                        <MaterialIcons name="report" size={24} color="white" />
                                    </View>
                                </TouchableOpacity>

                        }
                    </View>
                }
                {
                    _chosen != 7 ?
                        <TouchableOpacity
                            style={styles.frameFeature}
                            activeOpacity={0.7} onPress={() => {
                                navigation.navigate('About')
                                dispatch({ type: 'UPDATE_FEATURE', payload: 7 })
                            }}>
                            <View style={{ padding: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                                <Ionicons name="information-circle" size={24} color="black" />
                                <Text style={styles.itemFeature}>About</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={{ ...styles.frameFeature, backgroundColor: 'black' }}
                            activeOpacity={0.7} >
                            <View style={{ padding: 10, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={{ ...styles.itemFeature, color: 'white' }}>About</Text>
                                <Ionicons name="information-circle" size={24} color="white" />
                            </View>
                        </TouchableOpacity>

                }


                {/* <DrawerItemList {...props} /> */}
            </DrawerContentScrollView>

            <TouchableOpacity onPress={() => Logout()}
                style={{
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
                <Text style={{ ...styles.textstyle, color: 'black' }} >Log out</Text>
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
        color: 'lightslategrey',
        fontSize: 12
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