import React, { useState, useEffect, memo } from 'react';
import { Alert,StyleSheet, Text, View, FlatList, TouchableOpacity, Image, } from 'react-native';
import Post, { InteractionWrapper, PostImage, PostText, UserImage, UserInfoText, ReactNumber1 } from '../../shared/post'
import { UserInfo } from '../../shared/post'
import { Poststyle, Poststyle_Status } from '../../styles/poststyle'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';


import { Octicons } from '@expo/vector-icons';
import react from 'react';
import { URL_local } from '../../constant';

const UserKnowledgeMember = ({ item, navigation }) => {
    const [reactnumber, setReactnumber] = useState(parseInt(item.react.length))
    const imagenumber = item.listImage.length
    const {user}  = useSelector(state => state.User)
    const dispatch = useDispatch()

    const fetchKnowledgeData = () => {
        const url = URL_local + 'knowledge/load-data/' + user.userID
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(result => {
                dispatch({ type: 'ADD_USER_KNOWLEDGE', payload: result })
            }).catch(err => console.log('Error'));
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
        { text: "OK", onPress: () => DeleteKnowledge()         
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
        const url = URL_local + 'knowledge/delete'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
            })
        }).then(res => {
                console.log(res.ok)
                dispatch({ type: 'DELETE_USER_KNOWLEDGE_MEMBER', payload: deletedObject })
                throw Error('Loi phat sinh')      
               
        }).then(data => {                   
        }).catch(err => {
            console.log("error", err)
        })       
        fetchKnowledgeData()
       
    }

    // const DeleteNoti = () => {
    //     const url = 'http://192.168.0.102:3000/api/notification/deletebypostid/' + item._id
    //     fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: item
    //     }).then(res => {
    //         if (!res.ok) {
                
                
    //             dispatch({ type: 'DELETE_USER_KNOWLEDGE_MEMBER', payload: deletedObject })
    //             // fetchKnowledgeData()
    //             throw Error('Loi phat sinh')      
    //         }    
    //     }).then(data => {   
    //         DeleteNoti()                   
    //     }).catch(err => {
    //         console.log("error", err)
    //     })       
    // }
    
    useEffect(() => {
        setReactnumber(item.react.length)
    }, [item])

    return (
        <Post >
            <PostImage>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch'}}>
                    <Text style={{ ...Poststyle_Status.posttime, alignSelf: 'center' }}>{item.posttime}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center',borderRadius:10, borderColor: 'black',borderWidth:1, paddingStart:5, paddingEnd:5, }}>
                        <TouchableOpacity onPress= {() => navigation.navigate('User Edit Knowledge',{item})}  style={{ justifyContent: 'center', alignItems: 'center', marginEnd: 5 }}>
                            <MaterialIcons name="edit" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress= {createTwoButtonAlert} style={{ justifyContent: 'center', alignItems: 'center' }}>
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
                <TouchableOpacity onPress={() => navigation.navigate('User Detail Knowledge', { item })}>
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