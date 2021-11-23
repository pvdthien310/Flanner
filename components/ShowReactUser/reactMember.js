import React, { useState, useEffect, memo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, } from 'react-native';
import Post, { InteractionWrapper, PostImage, PostText, UserImage, UserInfoText, ReactNumber1 } from '../../shared/post'
import { UserInfo } from '../../shared/post'
import { images, imagespost, Poststyle, Poststyle_Status } from '../../styles/poststyle'
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import react from 'react';
import { URL_local } from '../../constant.js';

const ReactMember = ({ item, navigation }) => {
    const [user, setUser] = useState(item)
    const [, forceRerender] = useState();

    const fetchData = () => {
        const url = URL_local + 'user/load-user-by-userID/' + item.toString();
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setUser(result)
                console.log(result)
            }).catch(err => {
                console.log('Error')
            });
    }

    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
       forceRerender
       
    }, [user])
    return (
        <TouchableOpacity activeOpacity={1} onPress= {() => console.log(user)} >
           
            
            <View style={styles.frame_1} >
                {
                    user.length > 0 ?
                        <Image source={{ uri: user[0].avatar}}
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
                user.length > 0 ? 
                    <View style ={{ padding: 10, flexShrink: 1}}>
                    <Text style={styles.body}>{user[0].name} </Text>
                </View>
                :
                <View style ={{ padding: 10, flexShrink: 1}}>
                <Text style={styles.body}>{item} </Text>
                </View>
                }
                  
            </View >
            
        </TouchableOpacity>

    )

}
export default react.memo(ReactMember);
const styles = StyleSheet.create({
    frame_1: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
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
        alignSelf:'center', 
    },
    imagepost: {
        height: 50,
        width: 50,
        resizeMode: 'stretch'
    }
})