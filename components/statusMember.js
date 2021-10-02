import React, { useState, useEffect, memo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, } from 'react-native';
import Post, { InteractionWrapper, PostImage, PostText, UserImage, UserInfoText, ReactNumber1 } from '../shared/post'
import { UserInfo } from '../shared/post'
import { images, imagespost, Poststyle, Poststyle_Status } from '../styles/poststyle'
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import react from 'react';

const StatusMember = ({ item, navigation }) => {
    const [reactnumber, setReactnumber] = useState(parseInt(item.reactNumber))
    const imagenumber = item.listImage.length



    useEffect(() => {
        console.log('render post')
        console.log(item.listImage.length)
    })

    return (
        <Post >
            <UserInfo>
                <Image source={images.avatars[item.avatar]} style={Poststyle.imageavatar} />
                <UserInfoText>
                    <Text style={Poststyle.name}> {item.username}</Text>
                    <Text style={Poststyle.posttime}> {item.posttime}</Text>
                </UserInfoText>
            </UserInfo>
            <PostText>
                <TouchableOpacity onPress={() => navigation.navigate('Status Detail', { item })}>
                <Text style={Poststyle_Status.title}>{item.title}</Text>
                    <Text style={Poststyle_Status.description}>{item.description}</Text>                  
                </TouchableOpacity>
            </PostText>
            <PostImage>
                <Text style={imagenumber == 1 || imagenumber == 0 ? Poststyle.imagenumber1 : Poststyle.imagenumber}>{imagenumber} pics</Text>
                <FlatList
                    scrollEnabled={true}
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={item.listImage}
                    renderItem={({ item }) => (
                        <Image style={Poststyle.imagepost} source={{ uri: item.uri }} />

                    )}
                    keyExtractor={item => item.key}

                />
            </PostImage>
            <ReactNumber1>
                <Text style={Poststyle_Status.reactnumber}>{reactnumber} Likes</Text>
            </ReactNumber1>
           
           

        </Post>
        // </TouchableOpacity>

    )

}
export default react.memo(StatusMember);