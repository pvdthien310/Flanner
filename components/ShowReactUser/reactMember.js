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
    const fetchData = () => {

        const url = URL_local +'user/load-user-by-userID/' + item.toString();
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(result => {      
                console.log(result)      
            }).catch(err => {
                console.log('Error')
            });
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
       <View>
        <Text>{item}</Text>
        
       </View>

    )

}
export default react.memo(ReactMember);