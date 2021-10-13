import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../styles/global';
import Post, { PostText, UserInfo, UserInfoText } from '../../shared/post';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Poststyle_Knowledge, images, Poststyle,Poststyle_Status } from '../../styles/poststyle';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';




const DetailStatus = ({ route, navigation }) => {


    const dispatch = useDispatch();
    const { user } = useSelector(state => state.User)
    const { item } = route.params;
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    // const [reactnumber, setReactnumber] = useState(null)
    const [pressed, setPressed] = useState(false)

    const fetchData = () => {

        const url = 'http://192.168.0.106:3000/api/status/' + item._id.toString();
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(result => {

                setData(result)
                setLoading(false)
                // console.log(result)
                if ((result.react).indexOf(user.userID) != -1)
                    setPressed(true)
                else setPressed(false)
            }).catch(err => console.log('Error'));
    }
    const sendNotification = () => {

        fetch("http://192.168.0.106:3000/api/notification/send-data", {
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
  
        fetch("http://192.168.0.106:3000/api/notification/delete", {
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
        let numberReact = data.reactNumber;
        const url_true = 'http://192.168.0.106:3000/api/status/update/' + item._id.toString() + '/true/' + user.userID.toString();
        const url_false = 'http://192.168.0.106:3000/api/status/update/' + item._id.toString() + '/false/' + user.userID.toString();


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
                removeNotification()
                setData(result)
                dispatch({type: 'UPDATE_STATUS_MEMBER', payload: result})
                if ((result.react).indexOf(user.userID) != -1)
                    setPressed(true)
                else setPressed(false)
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
                sendNotification()
                setData(result)
                dispatch({type: 'UPDATE_STATUS_MEMBER', payload: result})
                if ((result.react).indexOf(user.userID) != -1)
                    setPressed(true)
                else setPressed(false)
            }).catch(err => {
                console.log("error", err)
            })
        }


        // if (pressed == true) setReactnumber(reactnumber - 1);
        // else setReactnumber(reactnumber + 1)

    }

    useEffect(() => {
        fetchData();
    }, [])


    const pressgobackHandler = () => {
        navigation.goBack();
    }

    return (

        <View style={globalStyles.container}>
            {
                loading ? <ActivityIndicator size="small" color="#0000ff" />
                    :
                    <Post>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ width: 45 }} onPress={pressgobackHandler}>
                                <View style={{ flexDirection: 'row', margin: 10, width: 40 }}>
                                    <MaterialIcons name="keyboard-backspace" size={30} color="black" />
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{
                                    fontFamily: 'nunitobold',
                                    fontSize: 25,
                                }}> Detail </Text>
                            </View>
                        </View>

                        <ScrollView>
                            <UserInfo>
                                <Image source={images.avatars[item.avatar]} style={Poststyle_Knowledge.imageavatar} />
                                <UserInfoText>
                                    <Text style={Poststyle_Knowledge.name}> {data.username}</Text>
                                    <Text style={Poststyle_Knowledge.posttime}> {data.posttime}</Text>
                                </UserInfoText>
                            </UserInfo>
                            <PostText>
                                <Text style={Poststyle_Knowledge.body_detail}>{data.body}</Text>
                            </PostText>
                            <FlatList
                                scrollEnabled={true}
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                data={data.listImage}
                                renderItem={({ item }) => (
                                    // <Image style={Poststyle.imagepost} source={imagespost.imagepost[item.image]} />
                                    <Image style={Poststyle.imagepost} source={{ uri: item.uri }} />

                                )}
                                keyExtractor={item => item.key} />
                            <Text style={Poststyle_Status.reactnumber_detail}>{data.react.length} Likes</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 10 }}>
                                <TouchableOpacity onPress={PressHandle}>
                                    <Ionicons name="heart" size={35} style={pressed ? Poststyle_Status.like_button : Poststyle_Status._like_button} />
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <MaterialCommunityIcons name="comment-multiple" size={30} color="black" />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>

                    </Post>
            }
        </View>



    )

}
export default DetailStatus;
const styles = StyleSheet.create({
    rating: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 16,
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',

    }
})