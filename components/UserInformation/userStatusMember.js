import React, { useState, useEffect, memo } from 'react';
import { Alert, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, } from 'react-native';
import Post, { InteractionWrapper, PostImage, PostText, UserImage, UserInfoText, ReactNumber } from '../../shared/post'
import { UserInfo } from '../../shared/post'
import { Poststyle } from '../../styles/poststyle'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { Octicons } from '@expo/vector-icons';
import react from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { URL_local } from '../../constant';


const UserStatusMember = ({ item, navigation }) => {

    const dispatch = useDispatch();
    const {user}  = useSelector(state => state.User)
    const [pressed, setPressed] = useState(false)
    const [reactnumber, setReactnumber] = useState(parseInt(item.react.length))
    const imagenumber = item.listImage.length

    const createTwoButtonAlert = () =>
    Alert.alert(
        
      "Notification",
      "Do you want to delete this post?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        
        },
        { text: "OK", onPress: () => DeleteStatus() }
      ]
    );
    const fetchStatusData = () => {
        const url = URL_local + 'status/load-data/' + user.userID
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(result => {
                dispatch({ type: 'ADD_USER_STATUS', payload: result })
            }).catch(err => console.log('Error'));
    }
    
    const DeleteStatus = () => {
        const deletedObject = {
                id: item._id,
                username: user.username,
                userID: user.userID,
                body: item.body,
                avatar: user.avatar,
                posttime: item.posttime,
                listImage: item.listImage,
                reactNumber: '0',
                react: item.react
        }
        const url = URL_local + 'status/delete'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: item._id,
                username: user.username,
                userID: user.userID,
                body: item.body,
                avatar: user.avatar,
                posttime: item.posttime,
                listImage: item.listImage,
                reactNumber: '0',
                react: item.react
            })
        }).then(res => {
            if (!res.ok) {             
                dispatch({ type: 'DELETE_USER_STATUS_MEMBER', payload: deletedObject })
                throw Error('Loi phat sinh')      
            }    
        }).then(data => {                   
        }).catch(err => {
            console.log("error", err)
        })       
        fetchStatusData()
       
    }
    
    const LoadData = () => {
        const url = URL_local +  'status/' + item._id.toString();
        fetch(url)
            .then(res => res.json())
            .then(result => {
                if ((result.react).indexOf(user.userID) != -1)
                
                    setPressed(true)
                else setPressed(false)
                 setReactnumber(result.react.length)
            }).catch(err => console.log('Error'));
    }
    useEffect(() => {
        LoadData()
    },[])

    const sendNotification = () => {
        const url = URL_local + 'notification/send-data'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: item.userID,
                message: ' liked your status',
                postID: item._id,
                senderID: user.userID,
                type: '2',
                action: 'React'
            })
        }).then(res => {
            if (!res.ok) {
                throw Error('Loi phat sinh')
            }
            else
                return res.json()
        }).then(data => {
            // console.log(data)
        }).catch(err => {
            console.log("error", err)
        })

    }
    const removeNotification = () => {
  
        const url = URL_local + 'notification/delete'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: item.userID,
                postID: item._id,
                senderID: user.userID,
                type: '2',
                action: 'React'
            })
        }).then(res => {
            if (!res.ok) {
                throw Error('Loi phat sinh')
            }
            else
                return res.json()
        }).then(data => {
            // console.log(data)
        }).catch(err => {
            console.log("error", err)
        })
    }

    const PressHandle = () => {
        // let numberReact = data.reactNumber;
        const url_true = URL_local + 'status/update/' + item._id.toString() + '/true/' + user.userID.toString();
        const url_false = URL_local + 'status/update/' + item._id.toString() + '/false/' + user.userID.toString();


        if (pressed == true) {
            console.log(url_false)
            fetch(url_false, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                if (!res.ok) {
                    throw Error('Loi phat sinh')
                }
                else {
                    return res.json()
                }
            }).then((result) => {
                //  console.log(result)
                // setData(result)
                console.log(result)
                removeNotification()

                dispatch({type: 'UPDATE_STATUS_MEMBER', payload: result})
                if ((result.react).indexOf(user.userID) != -1)
                    setPressed(true)
                else setPressed(false)
                setReactnumber(result.react.length)

            }).catch(err => {
                console.log("error", err)
            })
        }
        else if (pressed == false) {
            fetch(url_true, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (!res.ok) {
                    throw Error('Loi phat sinh')
                }
                else {
                    return res.json()
                }
            }).then(result => {
                // setData(result)
                console.log(result)
                sendNotification()
                dispatch({type: 'UPDATE_STATUS_MEMBER', payload: result})
                if ((result.react).indexOf(user.userID) != -1)
                    setPressed(true)
                else setPressed(false)
                setReactnumber(result.react.length)

            }).catch(err => {
                console.log("error", err)
            })
        }


        // if (pressed == true) setReactnumber(reactnumber - 1);
        // else setReactnumber(reactnumber + 1)

    }

    
    
    

    useEffect(() => {
        console.log('render post')
       
    })

    return (
        <Post >
             <View style={{ flexDirection: 'row',justifyContent:'flex-end',alignSelf:'flex-end' ,alignContent: 'flex-end',borderRadius:10, borderColor: 'black',borderWidth:1, paddingStart:5, paddingEnd:5,marginBottom:5 }}>
                        <TouchableOpacity onPress= {() => navigation.navigate('User Edit Status',{item})}  style={{ justifyContent: 'center', alignItems: 'center', marginEnd: 5 }}>
                            <MaterialIcons name="edit" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress= {createTwoButtonAlert} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="close" size={30} color="maroon" />
                        </TouchableOpacity>
                    </View>
            <UserInfo>
                <Image source={{uri: user.avatar}} style={Poststyle.imageavatar} />
                <UserInfoText>
                    <Text style={Poststyle.name}> {user.name}</Text>
                    <Text style={Poststyle.posttime}> {item.posttime}</Text>
                </UserInfoText>
               
            </UserInfo>
            <PostText>            
                    <Text style={Poststyle.body}>{item.body}</Text>
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
                    onPress={PressHandle}>
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
export default react.memo(UserStatusMember);