import React, { useState, useEffect, memo } from 'react';
import { Alert, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, } from 'react-native';
import Post, { InteractionWrapper, PostImage, PostText, UserImage, UserInfoText, ReactNumber1 } from '../../../shared/post'
import { UserInfo } from '../../../shared/post'
import Toast from 'react-native-root-toast';
import { Poststyle, Poststyle_Status } from '../../../styles/poststyle'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';


import { Octicons } from '@expo/vector-icons';
import react from 'react';
import { URL_local } from '../../../constant';
import KnowLedgeApi from '../../../API/KnowledgeAPI';

const UserKnowledgeMember = ({ item, navigation }) => {
    const [reactnumber, setReactnumber] = useState(parseInt(item.react.length))
    const imagenumber = item.listImage.length
    const [data, setData] = useState(item)
    
    const { user } = useSelector(state => state.User)
    const dispatch = useDispatch()

    const fetchKnowledgeData = () => {
        // const url = URL_local + 'knowledge/load-data/' + user.userID
        // console.log(url)
        // fetch(url)
        //     .then(res => res.json())
        //     .then(result => {
        //         dispatch({ type: 'ADD_USER_KNOWLEDGE', payload: result })
        //     }).catch(err => console.log('Error'));
        KnowLedgeApi.getKnowledgeUser(user.userID)
            .then(res => {
                dispatch({ type: 'ADD_USER_KNOWLEDGE', payload: res })
            })
            .catch(err => console.log('Error Load User Knowledge'))


    }
 


    const UpdatePublicMode = () => {
        KnowLedgeApi.UpdatePublic(data._id)
            .then(res => {
                setData(res)
                dispatch({ type: 'UPDATE_USER_KNOWLEDGE_MEMBER', payload: res })
                if (res.mode == 'public') {
                    let toast = Toast.show('Set up successful public mode post', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                }
                else {
                    let toast = Toast.show('Set up failed public mode post', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                }
            }
            )
            .catch(err => console.log('Error Update Public Mode'))
    }
    const UpdatePrivateMode = () => {
        KnowLedgeApi.UpdatePrivate(data._id)
            .then(res => {

                setData(res)
                dispatch({ type: 'UPDATE_USER_KNOWLEDGE_MEMBER', payload: res })
                if (res.mode == 'private') {
                    let toast = Toast.show('Set up successful private mode post', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                }
                else {
                    let toast = Toast.show('Set up failed private mode post', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                }
            }
            )
            .catch(err => console.log('Error Update Public Mode'))
    }

    const createTwoButtonAlert = () =>
        Alert.alert(

            "Notification",
            "Do you want to delete this post?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),

                },
                {
                    text: "OK", onPress: () => DeleteKnowledge()
                }
            ]
        );

    const DeleteKnowledge = () => {
        const deletedObject = {
            id: item._id,
            username: user.username,
            body: item.body,
            userID: user.userID,
            title: item.title,
            description: item.description,
            avatar: user.avatar,
            posttime: item.posttime,
            listImage: item.listImage,
            react: item.react,
            reactNumber: '0'
        }
        // const url = URL_local + 'knowledge/delete'
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         id: item._id,
        //         username: user.username,
        //         body: item.body,
        //         userID: user.userID,
        //         title: item.title,
        //         description: item.description,
        //         avatar: user.avatar,
        //         posttime: item.posttime,
        //         listImage: item.listImage,
        //         react: item.react,
        //         reactNumber: '0'
        //     })
        // }).then(res => {
        //         console.log(res.ok)
        //         dispatch({ type: 'DELETE_USER_KNOWLEDGE_MEMBER', payload: deletedObject })
        //         throw Error('Loi phat sinh')      
        // }).then(data => {                   
        // }).catch(err => {
        //     console.log("error", err)
        // })       
        KnowLedgeApi.Delete({
            id: item._id,
            username: user.username,
            body: item.body,
            userID: user.userID,
            title: item.title,
            description: item.description,
            avatar: user.avatar,
            posttime: item.posttime,
            listImage: item.listImage,
            react: item.react,
            reactNumber: '0'
        }).then(res => {
            console.log('Delete successfully')
            dispatch({ type: 'DELETE_USER_KNOWLEDGE_MEMBER', payload: deletedObject })
            fetchKnowledgeData()
            let toast = Toast.show('Delete post successful!', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
        })
            .catch(err => {
                console.log('Error Delete Knowledge')
                let toast = Toast.show('Add post failed!', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
            })
        fetchKnowledgeData()

    }

    useEffect(() => {
        setReactnumber(data.react.length)
    }, [data])
    
   
    return (
        <Post >
            <PostImage>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch',
                    opacity: item.mode == 'limitary' ? '0.5' : 1
                }}>
                    <Text style={{ ...Poststyle_Status.posttime, alignSelf: 'center' }}>{item.posttime}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', borderRadius: 10, borderColor: 'black', borderWidth: 1, paddingStart: 5, paddingEnd: 5, }}>
                        {
                            item.mode == 'private' &&
                            <TouchableOpacity
                                onPress={
                                    () => UpdatePublicMode()
                                }
                                activeOpacity={1} style={{ justifyContent: 'center', alignItems: 'center', marginEnd: 5 }}>
                                <MaterialIcons name="person-outline" size={24} color="black" />
                            </TouchableOpacity>
                        }
                        {
                            item.mode == 'limitary' &&
                            <TouchableOpacity activeOpacity={1} style={{ justifyContent: 'center', alignItems: 'center', marginEnd: 5 }}>
                                <MaterialIcons name="privacy-tip" size={24} color="maroon" />
                            </TouchableOpacity>
                        }
                        {
                            item.mode == 'public' &&
                            <TouchableOpacity onPress={
                                () => UpdatePrivateMode()
                            }
                                activeOpacity={1} style={{ justifyContent: 'center', alignItems: 'center', marginEnd: 5 }}>
                                <Ionicons name="ios-earth-sharp" size={24} color="black" />
                            </TouchableOpacity>
                        }

                        <TouchableOpacity onPress={() => {
                            if (data.mode != 'limitary')
                                navigation.navigate('Knowledge User Edit Knowledge', { item: data })
                            else {
                                let toast = Toast.show('Sorry! Limitary post can not be edited.', {
                                    duration: Toast.durations.SHORT,
                                    position: Toast.positions.BOTTOM,
                                    shadow: true,
                                    animation: true,
                                    hideOnPress: true,
                                });
                            }
                        }} style={{ justifyContent: 'center', alignItems: 'center', marginEnd: 5 }}>
                            <MaterialIcons name="edit" size={24} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={createTwoButtonAlert} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="close" size={30} color="maroon" />
                        </TouchableOpacity>


                    </View>

                </View>
                <FlatList


                    scrollEnabled={true}
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={item.listImage}
                    renderItem={({ item }) => (
                        <View>
                            <Image style={Poststyle.imagepost} source={{ uri: item.url }} />
                            <View style={{ position: 'absolute', top: 20, left: 10 }}>
                                <Text style={imagenumber == 1 || imagenumber == 0 ? Poststyle.imagenumber1 : Poststyle.imagenumber}>{imagenumber} pics</Text>
                            </View>

                        </View>

                    )}
                    keyExtractor={item => item.key}

                />
            </PostImage>

            <PostText>
                <TouchableOpacity onPress={() => navigation.push('Knowledge User Detail Knowledge', { item })}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
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
                    <Image source={{ uri: item.avatar }} style={Poststyle_Status.imageavatar} />

                    <Text style={Poststyle_Status._name}> {item.username}</Text>
                </View>
                <Text style={Poststyle_Status.reactnumber}>{reactnumber} Likes</Text>
            </View>
        </Post>
        // </TouchableOpacity>

    )

}
export default react.memo(UserKnowledgeMember);