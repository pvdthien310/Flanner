import React, { useState, useEffect, memo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, } from 'react-native';
import Post, { InteractionWrapper, PostImage, PostText, UserImage, UserInfoText, ReactNumber1 } from '../shared/post'
import { UserInfo } from '../shared/post'
import { images, imagespost, Poststyle, Poststyle_Status } from '../styles/poststyle'
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import react from 'react';



const NotificationMember = ({ item, navigation }) => {
    const url_1 = 'http://192.168.0.106:3000/api/knowledge/' + item.postID;
    const url_2 = 'http://192.168.0.106:3000/api/knowledge/' + item.postID;
    const url_3 = 'http://192.168.0.106:3000/api/knowledge/' + item.postID;
    const user_url = 'http://192.168.0.106:3000/api/knowledge/' + item.postID;

    const fetchData = () => {
        console.log(url)

        fetch(url)
            .then(res => res.json())
            .then(result => {             
                dispatch({ type: 'ADD_USER_KNOWLEDGE_NOTIFICATION', payload: result })
                dispatch({ type: 'SET_LOADING_NOTIFICATION', payload: false })
            }).catch(err => console.log('Error'));
    }
    const HandelOpenPost = () => {
        if (item.type == '2')
            navigation.navigate('Status Detail Notification',{item :{_id: item.postID}});
        else if (item.type == '1') 
            navigation.navigate('Knowledge Detail Notification',{item :{_id: item.postID}});
    }

    return (
        <View style = {styles.frame} >
        <TouchableOpacity onPress={() => HandelOpenPost()}>
            <Text style ={styles.body}>{item.postID}</Text>
            <Text style ={styles.body}>{item.message}</Text>
            <Text style ={styles.body}>{item.senderID}</Text>
            <Text style ={styles.body}>{item.type}</Text>
        </TouchableOpacity>

        </View >

    )

}
export default react.memo(NotificationMember);

const styles = StyleSheet.create({
    frame: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        backgroundColor: 'teal'
    },
    body : {
        fontFamily: 'nunitoregular',
        fontSize: 15,
        color: 'white'
    }
})