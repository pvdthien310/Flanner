import React, { useState, useEffect, memo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, } from 'react-native';
import Post, { InteractionWrapper, PostImage, PostText, UserImage, UserInfoText, ReactNumber1 } from '../shared/post'
import { UserInfo } from '../shared/post'
import { images, imagespost, Poststyle, Poststyle_Status } from '../styles/poststyle'
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import react from 'react';
import { useSelector, useDispatch } from 'react-redux';




const NotificationMember = ({ item, navigation }) => {

    const dispatch = useDispatch()
    const user_data = useSelector(state => { return state.User })
    const knowledge_data = useSelector(state => { return state.Knowledge })
    const status_data = useSelector(state => { return state.Status })
    const sender = user_data.data.filter(member => member.userID == item.senderID)
    let post;
    if (item.type == 1)
     post = knowledge_data.user_knowledge.filter(member => member._id == item.postID)
    else if (item.type == 2)
     post = status_data.user_status.filter(member => member._id == item.postID)
    
    console.log(sender[0])
    console.log('postID :',item.postID)
    knowledge_data.user_knowledge.forEach(Element => console.log(Element._id))
    console.log(post)
    
    const HandelOpenPost = () => {
        if (item.type == '2')
            navigation.navigate('Status Detail Notification', { item: { _id: item.postID } });
        else if (item.type == '1')
            navigation.navigate('Knowledge Detail Notification', { item: { _id: item.postID } });
    }

    return (
        <TouchableOpacity activeOpacity={item.type == '3' ? 1 : 0.7} onPress={() => HandelOpenPost()}>
            <View style={item.type == '1' ? styles.frame_1 : item.type == '2' ? styles.frame_2 : styles.frame_3} >
            {/* <Text style={styles.body}> {item.message}</Text> */}

                {
                    sender[0].avatar ? 
                  
                    
                <Image source={{ uri: sender[0].avatar }}
                    resizeMode='stretch'
                    style={{
                        width: 50,
                        height: 50,
                        marginBottom: 5,
                        borderRadius: 10
                    }
                    }
                />
                :
                <Image source={require('../assets/icon/userPhoto.png')}
                resizeMode='contain'
                style={{
                    width: 50,
                    height: 50,
                    marginBottom: 5,
                    borderRadius:10
                }
                }
            />
                } 
                <View style ={{ padding: 10, flexShrink: 1}}>
                    <Text style={styles.body}><Text style={{ color: 'black', fontFamily: 'nunitobold' }}>{sender[0].name}</Text> {item.message}</Text>
                </View>
                
                {
                    post[0].listImage ? 
                 <Image source={{ uri: post[0].listImage[0].url }}
                    resizeMode='stretch'
                    style={{
                        width: 50,
                        height: 50,
                        marginBottom: 5,
                        borderRadius: 10
                    }
                    }
                />
                :
                <Image source={require('../assets/icon/postPhoto.png')}
                resizeMode='contain'
                style={{
                    width: 50,
                    height: 50,
                    marginBottom: 5,
                    borderRadius:10
                }
                }
            />
             }
             </View > 
        </TouchableOpacity>

    )

}
export default react.memo(NotificationMember);

const styles = StyleSheet.create({
    frame_1: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        backgroundColor: 'lightslategrey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    frame_2: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        backgroundColor: 'dimgrey',
        flexDirection: 'row'


    },
    frame_3: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        backgroundColor: 'maroon',
        flexDirection: 'row'

    },
    body: {
        fontFamily: 'nunitoregular',
        fontSize: 15,
        color: 'white'
    },
    imagepost: {
        height: 50,
        width: 50,
        resizeMode: 'stretch'
    }
})