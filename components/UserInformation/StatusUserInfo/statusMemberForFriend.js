import React, { useState, useEffect, memo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, } from 'react-native';
import Post, { InteractionWrapper, PostImage, PostText, UserImage, UserInfoText, ReactNumber } from '../../../shared/post'
import { UserInfo } from '../../../shared/post'
import { images, imagespost, Poststyle } from '../../../styles/poststyle'
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import react from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { URL_local } from '../../../constant';


const StatusMemberForSUser = ({ item, navigation }) => {

    const dispatch = useDispatch();
    const {user}  = useSelector(state => state.User)
    const [pressed, setPressed] = useState(false)
    const [reactnumber, setReactnumber] = useState(parseInt(item.react.length))
    const imagenumber = item.listImage.length
    const [data, setData] = useState(item)

    const LoadData = () => {
       
        const url =  URL_local+ 'status/' + item._id.toString();
        fetch(url)
            .then(res => res.json())
            .then(result => {
                if ((result.react).indexOf(user.userID) != -1)
                
                    setPressed(true)
                else setPressed(false)
                 setReactnumber(result.react.length)
                 setData(result)
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
                message: 'Đã thích bài viết của bạn',
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

    const PressHandle1 = () => {
        // let numberReact = data.reactNumber;
        
        const url_true =  URL_local + 'status/update/' + item._id.toString() + '/true/' + user.userID.toString();
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

    
        const PressHandle = () => {
            //let numberReact = item.reactNumber;
            const url_true = 'http://192.168.0.105:3000/api/status/update/' + item._id.toString() + '/' + reactnumber.toString() + '/true/' + user.userID.toString();
            const url_false = 'http://192.168.0.105:3000/api/status/update/' + item._id.toString() + '/' + reactnumber.toString() + '/false/'  + user.userID.toString();
    
    
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
                    if ((result.react).indexOf(user.userID) != -1)
                    setPressed(true)
                else setPressed(false)
                setReactnumber(result.reactNumber)

                }).catch(err => {
                    console.log("error", err)
                })
            }
            else if (pressed == false) {
                console.log(url_true)

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
                    if ((result.react).indexOf(user.userID) != -1)
                    setPressed(true)
                else setPressed(false)
                setReactnumber(result.reactNumber)

                }).catch(err => {
                    console.log("error", err)
                })
            }
    }

    useEffect(() => {
        console.log('render post')
       
    })

    return (
        <Post >
            <UserInfo>
                <Image source={{uri: item.avatar}} style={Poststyle.imageavatar} />
                <UserInfoText>
                    <Text style={Poststyle.name}> {item.username}</Text>
                    <Text style={Poststyle.posttime}> {item.posttime}</Text>
                </UserInfoText>
            </UserInfo>
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
                        <Image style={Poststyle.imagepost} source={{ uri: item.uri }} />

                    )}
                    keyExtractor={item => item.key}

                />
            </PostImage>
            <TouchableOpacity onPress ={() => navigation.push('Status User Info Show React User', { data: item })}>
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
                <TouchableOpacity style={Poststyle.buttonpost}>
                    <Octicons style={Poststyle.buttonicon} name="comment" size={20} color="black" />
                    <Text style={Poststyle.buttontext}>Comment</Text>
                </TouchableOpacity>
            </InteractionWrapper>

        </Post>
        // </TouchableOpacity>

    )

}
export default react.memo(StatusMemberForSUser);