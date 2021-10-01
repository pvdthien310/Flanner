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
            <PostImage>
                {/* <Text style={imagenumber == 1 || imagenumber == 0 ? Poststyle.imagenumber1 : Poststyle.imagenumber}>{imagenumber} pics</Text> */}
                <Text style={Poststyle_Status.posttime}>{item.posttime}</Text>
                <FlatList
                    scrollEnabled={true}
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={item.listImage}
                    renderItem={({ item }) => (
                        <View>
                            <Image style={Poststyle.imagepost} source={{ uri: item.uri }} />
                            <View style={{ position: 'absolute', top: 20, left: 10 }}>
                                <Text style={imagenumber == 1 || imagenumber == 0 ? Poststyle.imagenumber1 : Poststyle.imagenumber}>{imagenumber} pics</Text>
                            </View>

                        </View>

                    )}
                    keyExtractor={item => item.key}

                />
            </PostImage>

            <PostText>
                <TouchableOpacity onPress={() => navigation.navigate('Status Detail', { item })}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        <View style = {{ flexDirection: 'row'}}>
                            <View style={{ borderRadius: 5, backgroundColor: 'teal', padding: 5, alignSelf: 'flex-start', marginStart: 20 }}>
                                <Text style={{ color: 'white', fontFamily: 'nunitobold' }}>New</Text>
                            </View>
                            {
                                (reactnumber > 0) ?
                                    null :
                                    <View style={{ borderRadius: 5, backgroundColor: 'maroon', padding: 5, alignSelf: 'flex-start', marginStart: 10 }}>
                                        <Text style={{ color: 'white', fontFamily: 'nunitobold' }}>Hot</Text>
                                    </View>
                            }
                        </View>

                        <Text style={Poststyle_Status.title}>{item.title}</Text>
                    </View>

                    <Text style={Poststyle_Status.description}>{item.description}</Text>
                </TouchableOpacity>
            </PostText>
            <View
                style={{
                    borderBottomColor: 'lightslategrey',
                    borderBottomWidth: 1,
                    marginBottom: 10
                }}
            />

            <View style={{ flexDirection: 'row', marginStart: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={images.avatars[item.avatar]} style={Poststyle_Status.imageavatar} />

                    <Text style={Poststyle_Status._name}> {item.username}</Text>
                </View>
                <Text style={Poststyle_Status.reactnumber}>{reactnumber} Likes</Text>
            </View>
        </Post>
        // </TouchableOpacity>

    )

}
export default react.memo(StatusMember);