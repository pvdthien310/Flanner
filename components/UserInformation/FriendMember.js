import React, { useState, useEffect, memo } from 'react';
import {Alert, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, } from 'react-native';
import react from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Api from '../../API/UserAPI';


const FriendMember = ({ item, navigation }) => {
    const [host, setHost] = useState(item)
    const [, forceRerender] = useState();
    const dispatch = useDispatch()
    const { user } = useSelector(state => { return state.User })
    const fetchData = () => {
        // const url = URL_local + 'user/load-user-by-userID/' + item.toString();
        // console.log(url)
        // fetch(url)
        //     .then(res => res.json())
        //     .then(result => {
        //         setHost(result)
        //         console.log(result)
        //     }).catch(err => {
        //         console.log('Error')
        //     });
        Api.getUserItem( item.toString())
        .then(res => {
            setHost(res)
        })
        .catch(err => console.log('error load user by id'))
    }

    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
        forceRerender
    }, [host])
    return (
        <View>
            <View style={styles.frame_1} >
                {
                    host.length > 0 ?
                        <Image source={{ uri: host[0].avatar }}
                            resizeMode='center'
                            style={{
                                width: 50,
                                height: 50,
                                marginBottom: 5,
                                borderRadius: 10
                            }
                            }
                        />
                        :
                        <Image source={require('../../assets/icon/userPhoto.png')}
                            resizeMode='stretch'
                            style={{
                                width: 50,
                                height: 50,
                                marginBottom: 5,
                                borderRadius: 10
                            }
                            }
                        />
                }
                {
                    host.length > 0 ?
                        <View style={{ padding: 10, flexShrink: 1 }}>
                            <Text style={styles.body}>{host[0].name} </Text>
                        </View>
                        :
                        <View style={{ padding: 10, flexShrink: 1 }}>
                            <Text style={styles.body}>{item} </Text>
                        </View>
                }

            </View >

        </View>

    )

}
export default react.memo(FriendMember);
const styles = StyleSheet.create({
    frame_1: {
       
        borderRadius: 5,
        padding: 10,
        margin: 5,
        backgroundColor: 'whitesmoke',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center'
    },
    body: {
        fontFamily: 'nunitobold',
        fontSize: 17,
        color: 'black',
        alignSelf: 'center',
    },
    imagepost: {
        height: 50,
        width: 50,
        resizeMode: 'stretch'
    }
})