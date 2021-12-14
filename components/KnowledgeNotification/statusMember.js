import React, { useState, useEffect, memo } from 'react';
import { Alert, StyleSheet, Text, View, FlatList,Image, } from 'react-native';
import Post, { InteractionWrapper, PostImage, PostText, UserImage, UserInfoText, ReactNumber } from '../../shared/post'
import { UserInfo } from '../../shared/post'
import { Poststyle } from '../../styles/poststyle'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import react from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../constant.js'
import StatusApi from '../../API/StatusAPI';
import NotificationApi from '../../API/NotificationAPI';
import ReportApi from '../../API/ReportAPI';
import Toast from 'react-native-root-toast';
import Api from '../../API/UserAPI';
import { TouchableOpacity } from 'react-native-gesture-handler';



const StatusMemberForKnowledgeNoti = ({ item, navigation }) => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.User)
    const [pressed, setPressed] = useState(false)
    const [reactnumber, setReactnumber] = useState(parseInt(item.react.length))
    const imagenumber = item.listImage.length
    const [data, setData] = useState(item)
    const [host, setHost] = useState(undefined)

    const createTwoButtonAlert1 = () =>
        Alert.alert(
            "Notification",
            "Do you want to save this post?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
                {
                    text: "OK", onPress: () => AddSavedPost()
                }
            ]
        );
    const AddSavedPost = () => {
        SavedPostApi.UpdateTrue(user.userID, item._id)
            .then(res => {
                if (res) {
                    dispatch({ type: 'ADD_SAVED_POST_USER', payload: res })
                    let toast = Toast.show('Save successful!', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                }

            })
            .catch(err => {
                console.log(err)
                let toast = Toast.show('Save failed, please try again!', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
            })
    }

    const createTwoButtonAlert = () =>
        Alert.alert(
            "Notification",
            "Do you want to navigate your profile?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
                {
                    text: "OK", onPress: () => NavigateToCurrentUserProfile()
                }
            ]
        );

    const fetchHostData = async () => {
        await Api.getUserItem(item.userID)
            .then(res => {
                setHost(res[0])
            })
            .catch(err => console.log('Loi set user by id', err))
    }

    const NavigateToCurrentUserProfile = () => {
        navigation.navigate('User Information', {
            screen: 'User Dashboard',
            params: { user: '' },
        })
        dispatch({ type: 'UPDATE_FEATURE', payload: 0 })
    }

    const createThreeButtonAlert = () =>
        Alert.alert(
            "Report Request:",
            "Why do you want to report this article?",
            [
                {
                    text: "Plagiarism",
                    onPress: () => ReportPost('Plagiarism'),
                },
                {
                    text: "Inappropriate Content",
                    onPress: () => ReportPost('Inappropriate Content'),
                },
                {
                    text: "Trouble",
                    onPress: () => ReportPost('Trouble'),
                },
                {
                    text: "Other",
                    onPress: () => ReportPost('Other'),
                },
                {
                    text: "Cancel",
                    onPress: () => console.log('Cancel'),
                    style: "cancel"
                },

            ],
            {
                cancelable:true
            }
        );

    const ReportPost = (reason) => {
        ReportApi.AddPost({
            postID: item._id,
            reason: reason,
            posterID: item.userID,
            reporterID: user.userID,
            censor: '',
            isSeen: 'false',
            type: '2'
        })
            .then(res => {
                if (res == 'Duplicate') {
                    let toast = Toast.show('You reported this post! Please do not duplicate', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                }
                else {
                    let toast = Toast.show('Report successful! Thanks for your supporting', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                }


            })
            .catch(err => console.log(err))
    }

    const LoadData = () => {

        // const url = URL_local + 'status/' + item._id.toString();
        // fetch(url)
        //     .then(res => res.json())
        //     .then(result => {
        //         if ((result.react).indexOf(user.userID) != -1)

        //             setPressed(true)
        //         else setPressed(false)
        //          setReactnumber(result.react.length)
        //          setData(result)
        //     }).catch(err => console.log('Error'));
        StatusApi.getItem(item._id.toString())
            .then(res => {
                if ((res.react).indexOf(user.userID) != -1)
                    setPressed(true)
                else setPressed(false)
                setReactnumber(res.react.length)
                setData(res)
                
            })
            .catch(err => console.log('err'))
    }
    useEffect(() => {
        LoadData()
        fetchHostData()
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
        //         message: 'Đã thích bài viết của bạn',
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
            message: ' liked your post',
            postID: item._id,
            senderID: user.userID,
            type: '2',
            action: 'React'
        })
            .then(res => { })
            .catch(err => console.log('Error Send Noti', err))

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

    const PressHandle1 = () => {
        // let numberReact = data.reactNumber;

        // const url_true =  URL_local + 'status/update/' + item._id.toString() + '/true/' + user.userID.toString();
        // const url_false = URL_local + 'status/update/' + item._id.toString() + '/false/' + user.userID.toString();


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
                    // setData(res)
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
                    setData(res)
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
        <TouchableOpacity onLongPress={() => createTwoButtonAlert1()} 
        activeOpacity={1}>
        <Post >
            <TouchableOpacity onPress={() => createThreeButtonAlert()}>
                <MaterialIcons style={{ alignSelf: 'flex-end', marginBottom: 5 }} name="report" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {


                if (item.userID != user.userID) {
                    navigation.push(
                        'Knowledge Notification Friend Profile',
                        { item: [host] })
                }
                else {
                    createTwoButtonAlert()
                }

            }
            }>
                <UserInfo>
                    <Image source={{ uri: host ? host.avatar : item.avatar }} style={Poststyle.imageavatar} />
                    <UserInfoText>
                        <Text style={Poststyle.name}> {host ? host.name : item.username}</Text>
                        <Text style={Poststyle.posttime}> {item.posttime}</Text>
                    </UserInfoText>
                </UserInfo>
            </TouchableOpacity>
            <PostText>
                {/* <TouchableOpacity onPress={() => navigation.navigate('Status Detail', { item })}> */}
                <Text style={Poststyle.body}>{item.body}</Text>

                {/* </TouchableOpacity> */}
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
            <TouchableOpacity onPress={() => navigation.push('Knowledge Notification Show React User', { data: item })}>
                <ReactNumber  >
                    <Text style={Poststyle.reactnumber}>{reactnumber} Likes</Text>
                </ReactNumber>
            </TouchableOpacity>
            <InteractionWrapper style={Poststyle.interactionwrapper}>
                <TouchableOpacity style={Poststyle.buttonpost}
                    onPress={PressHandle1}>
                    <Ionicons style={pressed ? Poststyle.buttonicon1 : Poststyle.buttonicon} name="md-heart-sharp" size={20} />
                    <Text style={pressed ? Poststyle.buttontext1 : Poststyle.buttontext}>React</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.push('Knowledge Notification Comment', { item: data })}
                    style={Poststyle.buttonpost}>
                    <Octicons style={Poststyle.buttonicon} name="comment" size={20} color="black" />
                    <Text style={Poststyle.buttontext}>Comment</Text>
                </TouchableOpacity>
            </InteractionWrapper>

        </Post>
         </TouchableOpacity>

    )

}
export default react.memo(StatusMemberForKnowledgeNoti);