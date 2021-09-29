import React, { useState, useEffect, memo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, } from 'react-native';
import Post, { InteractionWrapper, PostImage, PostText, UserImage, UserInfoText, ReactNumber } from '../shared/post'
import { UserInfo } from '../shared/post'
import { images, imagespost, Poststyle } from '../styles/poststyle'
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import react from 'react';

const KnowledgeMember = ({ item, navigation }) => {
    const [pressed, setPressed] = useState(item.react)
    const [reactnumber, setReactnumber] = useState(parseInt(item.reactNumber))
    const imagenumber = item.listImage.length

    const reactPressHandle = () => {
        console.log(item)
        if (pressed == true) setReactnumber(reactnumber - 1);
        else setReactnumber(reactnumber + 1)

        fetch("http://192.168.0.106:3000/api/knowledge/update", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: item._id,
                username: item.username,
                body: item.body,
                avatar: item.avatar,
                posttime: item.posttime,
                listImage: item.listImage,
                react: pressed,
                reactNumber: reactnumber.toString()
            })
        }).then(res => {
            if (!res.ok) {
                throw Error('Loi phat sinh')
            }
            else
                return res.json()
        }).then(data => {
            console.log(data)
        }).catch(err => {
            console.log("error", err)
        })
    }

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
                <TouchableOpacity onPress={() => navigation.navigate('KnowLedge Detail', { item })}>
                    <Text style={Poststyle.body}>{item.body}</Text>
                  
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
            <ReactNumber>
                <Text style={Poststyle.reactnumber}>{reactnumber} Likes</Text>
            </ReactNumber>
            <InteractionWrapper style={Poststyle.interactionwrapper}>
                <TouchableOpacity style={Poststyle.buttonpost}
                    onPress={() => {
                        setPressed(!pressed)
                        reactPressHandle();
                        if (pressed == false)
                            setReactnumber(reactnumber + 1)
                        else setReactnumber(reactnumber - 1)
                    }}>
                    <Ionicons style={pressed ? Poststyle.buttonicon1 : Poststyle.buttonicon} name="md-heart-sharp" size={20} />
                    <Text style={pressed ? Poststyle.buttontext1 : Poststyle.buttontext}>React</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Poststyle.buttonpost}>
                    <Octicons style={Poststyle.buttonicon} name="comment" size={20} color="black" />
                    <Text style={Poststyle.buttontext}>Comment</Text>
                </TouchableOpacity>
            </InteractionWrapper>

        </Post>
        // </TouchableOpacity>

    )

}
export default react.memo(KnowledgeMember);