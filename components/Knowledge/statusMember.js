import React, { useState, useEffect, memo } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, Image, } from 'react-native';
import Post, { InteractionWrapper, PostImage, PostText, UserImage, UserInfoText, ReactNumber } from '../../shared/post'
import { UserInfo } from '../../shared/post'
import { Poststyle } from '../../styles/poststyle'
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import react from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../constant.js'
import { URL_local } from '../../constant.js';
import StatusApi from '../../API/StatusAPI';
import NotificationApi from '../../API/NotificationAPI';


const KnowledgeStatusMember = ({ item, navigation }) => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.User)
    const [pressed, setPressed] = useState(false)
    const [reactnumber, setReactnumber] = useState(parseInt(item.react.length))
    const imagenumber = item.listImage.length
    const [data, setData] = useState(item)

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
        //         message: ' liked your post',
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
        .then(res => {})
        .catch(err => console.log('Error Send Noti',err))

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

            //     dispatch({ type: 'UPDATE_STATUS_MEMBER', payload: result })
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
                setData(res)
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
            //     dispatch({ type: 'UPDATE_STATUS_MEMBER', payload: result })
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
    }




    useEffect(() => {
        console.log('render post')

    })

    return (
        <Post >
            <UserInfo>
                <Image source={{ uri: item.avatar }} style={Poststyle.imageavatar} />
                <UserInfoText>
                    <Text style={Poststyle.name}> {data.username}</Text>
                    <Text style={Poststyle.posttime}> {data.posttime}</Text>
                </UserInfoText>
            </UserInfo>
            <PostText>
                {/* <TouchableOpacity onPress={() => navigation.navigate('Status Detail', { item })}> */}
                <Text style={Poststyle.body}>{data.body}</Text>

                {/* </TouchableOpacity> */}
            </PostText>
            <PostImage>
                <Text style={imagenumber == 1 || imagenumber == 0 ? Poststyle.imagenumber1 : Poststyle.imagenumber}>{imagenumber} pics</Text>
                <FlatList
                    scrollEnabled={true}
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={data.listImage}
                    renderItem={({ item }) => (
                        <Image style={Poststyle.imagepost} source={{ uri: item.uri }} />

                    )}
                    keyExtractor={item => item.key}

                />
            </PostImage>
            <TouchableOpacity onPress={() => navigation.push('Knowledge Show React User', { data: item })}>
                <ReactNumber>
                    <Text style={Poststyle.reactnumber}>{reactnumber} Likes</Text>
                </ReactNumber>
            </TouchableOpacity>
            <InteractionWrapper style={Poststyle.interactionwrapper}>
                <TouchableOpacity style={Poststyle.buttonpost}
                    onPress={PressHandle1}>
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
export default react.memo(KnowledgeStatusMember);