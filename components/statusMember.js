import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity,Image } from 'react-native';
import Post, { InteractionWrapper, PostImage, PostText, ReactNumber_Status, UserImage, UserInfoText } from '../shared/post'
import {UserInfo} from '../shared/post'
import {images, imagespost, Poststyle_Status} from '../styles/poststyle'



const StatusMember = ({item , navigation  }) => {
    const [pressed, setPressed] = useState(item.react)
    const [reactnumber, setReactnumber] = useState(item.reactNumber)
    const imagenumber = item.listImage.length
    return (
       
        <Post >
            <UserInfo>
                <Image source={images.avatars[item.avatar]} style={Poststyle_Status.imageavatar} />
                <UserInfoText>
                    <Text style={Poststyle_Status.name}> {item.name}</Text>
                    <Text style={Poststyle_Status.posttime}> {item.posttime}</Text>
                </UserInfoText>
            </UserInfo>
            <PostText>
                <TouchableOpacity onPress = {() => navigation.navigate('Status Detail', {item})}>
                    <Text style={Poststyle_Status.title}>{item.title}</Text>
                    <Text style={Poststyle_Status.description}>{item.description}</Text>
                </TouchableOpacity>
            </PostText>
            <FlatList
                    scrollEnabled={true}
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={item.listImage}
                    renderItem={({ item }) => (
                        <Image style={Poststyle_Status.imagepost} source={{ uri: item.uri }} />

                    )}
                    keyExtractor={item => item.key}

                />
            <ReactNumber_Status>
                <Text style={Poststyle_Status.reactnumber}>{reactnumber} Likes</Text>
            </ReactNumber_Status>
          

        </Post>
        

    )
}
export default StatusMember;
