import React, { useState, useEffect, memo } from 'react';
import { Alert, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, } from 'react-native';
import Post, { PostImage, PostText, UserInfoText, ReactNumber } from '../../../shared/post'
import { UserInfo } from '../../../shared/post'
import { Poststyle } from '../../../styles/poststyle'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import react from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { URL_local } from '../../../constant';
import StatusApi from '../../../API/StatusAPI';
import NotificationApi from '../../../API/NotificationAPI';


const UserStatusMember = ({ item, navigation }) => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.User)
    const [pressed, setPressed] = useState(false)
    const [reactnumber, setReactnumber] = useState(parseInt(item.react.length))
    const imagenumber = item.listImage.length
    const [data,setData] = useState(item)

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
        // const url = URL_local + 'status/load-data/' + user.userID
        // console.log(url)
        // fetch(url)
        //     .then(res => res.json())
        //     .then(result => {
        //         dispatch({ type: 'ADD_USER_STATUS', payload: result })
        //     }).catch(err => console.log('Error'));
        StatusApi.getStatusUser(user.userID)
            .then(res => {
                dispatch({ type: 'ADD_USER_STATUS', payload: res })
            })
            .catch(err => console.log('Error Load User Status'))
    }
    const UpdatePublicMode = () => {
        StatusApi.UpdatePublic(data._id)
            .then(res => {
                setData(res)
                dispatch({ type: 'UPDATE_USER_STATUS_MEMBER', payload: res })
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
        StatusApi.UpdatePrivate(data._id)
            .then(res => {
                setData(res)
                dispatch({ type: 'UPDATE_USER_STATUS_MEMBER', payload: res })
                if (res.mode == 'private') {
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
        // const url = URL_local + 'status/delete'
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         id: item._id,
        //         username: user.username,
        //         userID: user.userID,
        //         body: item.body,
        //         avatar: user.avatar,
        //         posttime: item.posttime,
        //         listImage: item.listImage,
        //         reactNumber: '0',
        //         react: item.react
        //     })
        // }).then(res => {
        //     if (!res.ok) {             
        //         dispatch({ type: 'DELETE_USER_STATUS_MEMBER', payload: deletedObject })
        //         throw Error('Loi phat sinh')      
        //     }    
        // }).then(data => {                   
        // }).catch(err => {
        //     console.log("error", err)
        // })       

        StatusApi.Delete({
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
            .then(res => {
                dispatch({ type: 'DELETE_USER_STATUS_MEMBER', payload: deletedObject })
                fetchStatusData()
            })
            .catch(err => {
                console.log('Error Deletd Status')
            })
        fetchStatusData()

    }

    const LoadData = () => {
        // const url = URL_local +  'status/' + item._id.toString();
        // fetch(url)
        //     .then(res => res.json())
        //     .then(result => {
        //         if ((result.react).indexOf(user.userID) != -1)

        //             setPressed(true)
        //         else setPressed(false)
        //          setReactnumber(result.react.length)
        //     }).catch(err => console.log('Error'));

        StatusApi.getItem(item._id.toString())
            .then(res => {
                if ((res.react).indexOf(user.userID) != -1)

                    setPressed(true)
                else setPressed(false)
                setReactnumber(res.react.length)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        LoadData()
    }, [])

    const sendNotification = () => {
        // const url = URL_local + 'notification/send-data'
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         userID: item.userID,
        //         message: ' liked your status',
        //         postID: item._id,
        //         senderID: user.userID,
        //         type: '2',
        //         action: 'React'
        //     })
        // }).then(res => {
        //     if (!res.ok) {
        //         throw Error('Loi phat sinh')
        //     }
        //     else
        //         return res.json()
        // }).then(data => {
        //     // console.log(data)
        // }).catch(err => {
        //     console.log("error", err)
        // })

        NotificationApi.sendNoti({
            userID: item.userID,
            message: ' liked your status',
            postID: item._id,
            senderID: user.userID,
            type: '2',
            action: 'React'
        }).then(res => { })
            .catch(err => console.log('Error send noti'))

    }
    const removeNotification = () => {

        // const url = URL_local + 'notification/delete'
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         userID: item.userID,
        //         postID: item._id,
        //         senderID: user.userID,
        //         type: '2',
        //         action: 'React'
        //     })
        // }).then(res => {
        //     if (!res.ok) {
        //         throw Error('Loi phat sinh')
        //     }
        //     else
        //         return res.json()
        // }).then(data => {
        //     // console.log(data)
        // }).catch(err => {
        //     console.log("error", err)
        // })
        NotificationApi.removeNoti({
            userID: item.userID,
            postID: item._id,
            senderID: user.userID,
            type: '2',
            action: 'React'
        }).then(res => { })
            .catch(err => console.log('Error removed noti'))
    }

    const PressHandle = () => {
        // let numberReact = data.reactNumber;
        const url_true = URL_local + 'status/update/' + item._id.toString() + '/true/' + user.userID.toString();
        const url_false = URL_local + 'status/update/' + item._id.toString() + '/false/' + user.userID.toString();


        if (pressed == true) {
            // console.log(url_false)
            // fetch(url_false, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // }).then(res => {
            //     if (!res.ok) {
            //         throw Error('Loi phat sinh')
            //     }
            //     else {
            //         return res.json()
            //     }
            // }).then((result) => {
            //     //  console.log(result)
            //     // setData(result)
            //     console.log(result)
            //     removeNotification()

            //     dispatch({type: 'UPDATE_STATUS_MEMBER', payload: result})
            //     if ((result.react).indexOf(user.userID) != -1)
            //         setPressed(true)
            //     else setPressed(false)
            //     setReactnumber(result.react.length)

            // }).catch(err => {
            //     console.log("error", err)
            // })

            StatusApi.updateFalse(item._id.toString(), user.userID.toString())
                .then(res => {
                    removeNotification()
                    setReactnumber(res.react.length)
                    dispatch({ type: 'UPDATE_STATUS_MEMBER', payload: res })
                    if ((res.react).indexOf(user.userID) != -1)
                        setPressed(true)
                    else setPressed(false)
                })
                .catch(err => console.log('Error update false'))

        }
        else if (pressed == false) {
            // fetch(url_true, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // }).then(res => {
            //     if (!res.ok) {
            //         throw Error('Loi phat sinh')
            //     }
            //     else {
            //         return res.json()
            //     }
            // }).then(result => {
            //     // setData(result)
            //     console.log(result)
            //     sendNotification()
            //     dispatch({type: 'UPDATE_STATUS_MEMBER', payload: result})
            //     if ((result.react).indexOf(user.userID) != -1)
            //         setPressed(true)
            //     else setPressed(false)
            //     setReactnumber(result.react.length)

            // }).catch(err => {
            //     console.log("error", err)
            // })
            StatusApi.updateTrue(item._id.toString(), user.userID.toString())
                .then(res => {
                    sendNotification()

                    dispatch({ type: 'UPDATE_STATUS_MEMBER', payload: res })
                    if ((res.react).indexOf(user.userID) != -1)
                        setPressed(true)
                    else setPressed(false)
                    setReactnumber(res.react.length)

                })
                .catch(err => console.log('Error update true'))
        }
        // if (pressed == true) setReactnumber(reactnumber - 1);
        // else setReactnumber(reactnumber + 1)

    }

    return (
        <Post >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                alignContent: 'flex-end',
                borderRadius: 10,
                borderColor: 'black',
                borderWidth: 1,
                paddingStart: 5,
                paddingEnd: 5,
                marginBottom: 5,
                opacity: item.mode == 'limitary' ? '0.5' : 1
            }}>
                {
                    item.mode == 'public' &&
                    <TouchableOpacity onPress={
                        () => UpdatePrivateMode()
                    }
                        activeOpacity={1} style={{ justifyContent: 'center', alignItems: 'center', marginEnd: 5 }}>
                        <Ionicons name="ios-earth-sharp" size={24} color="black" />
                    </TouchableOpacity>
                }

                {
                    item.mode == 'private' &&
                    <TouchableOpacity onPress={
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
                <TouchableOpacity onPress={() => {
                    if (item.mode != 'limitary')
                        navigation.navigate('Status User Edit Status', { item: data })
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
            <UserInfo>
                <Image source={{ uri: user.avatar }} style={Poststyle.imageavatar} />
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
                        <Image style={Poststyle.imagepost} source={{ uri: item.url }} />

                    )}
                    keyExtractor={item => item.key}

                />
            </PostImage>
            <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.push('Status User Info Show React User', { data: item })}>
                <ReactNumber>
                    <Text style={Poststyle.reactnumber}>{reactnumber} Likes</Text>
                </ReactNumber>
            </TouchableOpacity>
            {/* <InteractionWrapper style={Poststyle.interactionwrapper}>
                <TouchableOpacity style={Poststyle.buttonpost}
                    onPress={PressHandle}>
                    <Ionicons style={pressed ? Poststyle.buttonicon1 : Poststyle.buttonicon} name="md-heart-sharp" size={20} />
                    <Text style={pressed ? Poststyle.buttontext1 : Poststyle.buttontext}>React</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Poststyle.buttonpost}>
                    <Octicons style={Poststyle.buttonicon} name="comment" size={20} color="black" />
                    <Text style={Poststyle.buttontext}>Comment</Text>
                </TouchableOpacity>
            </InteractionWrapper> */}

        </Post>
        // </TouchableOpacity>

    )

}
export default react.memo(UserStatusMember);