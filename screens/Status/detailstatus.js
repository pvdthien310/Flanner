import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/global';
import Post, { PostText, UserInfo, UserInfoText } from '../../shared/post';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Poststyle_Knowledge, images, Poststyle,Poststyle_Status } from '../../styles/poststyle';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { URL_local } from '../../constant';
import NotificationApi from '../../API/NotificationAPI';
import StatusApi from '../../API/StatusAPI';




const DetailStatus = ({ route, navigation }) => {


    const dispatch = useDispatch();
    const { user } = useSelector(state => state.User)
    const { item } = route.params;
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    // const [reactnumber, setReactnumber] = useState(null)
    const [pressed, setPressed] = useState(false)
    const [isNull, setIsNull] = useState(false)


    const fetchData = () => {

        // const url = URL_local + 'status/' + item._id.toString();
        // console.log(url)
        // fetch(url)
        //     .then(res => res.json())
        //     .then(result => {
               
        //         setData(result)
        //         setLoading(false)
        //         // console.log(result)
        //         if ((result.react).indexOf(user.userID) != -1)
        //             setPressed(true)
        //         else setPressed(false)
        //     }).catch(err =>
        //         {
        //             setIsNull(true)
        //             console.log('Error')
        //         } );
                StatusApi.getItem(item._id.toString())
                .then(res => {
                    setData(res)
                    setLoading(false)
                    if ((res.react).indexOf(user.userID) != -1)
                        setPressed(true)
                    else setPressed(false)
                })
                .catch(err => console.log(err))
    }
    const sendNotification = () => {

        // const url = URL_local + 'notification/send-data'
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         userID: data.userID,
        //         message: ' liked your status',
        //         postID: data._id,
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
            userID: data.userID,
            message: ' liked your post ',
            postID: data._id,
            senderID: user.userID,
            type: '2',
            action: 'React'
        }).then(res => {})
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
        //         userID: data.userID,
        //         postID: data._id,
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
            userID: data.userID,
            postID: data._id,
            senderID: user.userID,
            type: '2',
            action: 'React'
        }).then(res => { })
            .catch(err => console.log('Error removed noti'))
    }

    const PressHandle = () => {
        // let numberReact = data.reactNumber;
        // const url_true = URL_local + 'status/update/' + item._id.toString() + '/true/' + user.userID.toString();
        // const url_false = URL_local +  'status/update/' + item._id.toString() + '/false/' + user.userID.toString();

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
            //     removeNotification()
            //     setData(result)
            //     dispatch({type: 'UPDATE_STATUS_MEMBER', payload: result})
            //     if ((result.react).indexOf(user.userID) != -1)
            //         setPressed(true)
            //     else setPressed(false)
            // }).catch(err => {
            //     console.log("error", err)
            // })
            StatusApi.updateFalse(item._id.toString(), user.userID.toString())
            .then(res => {
                removeNotification()
                setData(res)
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
            //     sendNotification()
            //     setData(result)
            //     dispatch({type: 'UPDATE_STATUS_MEMBER', payload: result})
            //     if ((result.react).indexOf(user.userID) != -1)
            //         setPressed(true)
            //     else setPressed(false)
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
            })
            .catch(err => console.log('Error update true'))
        }
    }

    useEffect(() => {
        fetchData();
    }, [])


    const pressgobackHandler = () => {
        navigation.goBack();
    }

    return (

        <View >
            {
                loading ? <ActivityIndicator size="small" color="#0000ff" />
                    :
                    <SafeAreaView style ={styles.post}>
                    
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

                        <ScrollView style ={{padding:10}}>
                            <UserInfo >
                                <Image source={{uri: user.avatar}} style={Poststyle_Knowledge.imageavatar} />
                                <UserInfoText>
                                    <Text style={Poststyle_Knowledge.name}> {user.name}</Text>
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
                                    <Image style={Poststyle.imagepost_detailstatus} source={{ uri: item.uri }} />

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

                    
                    </SafeAreaView>
            }
              {
                isNull == false ? null :
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignSelf: 'center',
                        marginTop: 80
                    }}>

                        <Image source={require('../../assets/icon/error.png')}
                            resizeMode='contain'
                            style={{
                                width: 80,
                                height: 80,
                                marginBottom: 5,
                            }
                            }
                        />
                        <Text style={{ fontFamily: 'nunitobold', fontSize: 17, marginBottom: 10 }}>The Post Does Not Exist !</Text>
                        <TouchableOpacity style={{ width: 100, backgroundColor: 'wheat', borderRadius: 10 }} onPress={pressgobackHandler}>
                            <View style={{ flexDirection: 'row', margin: 10, width: 80, alignItems: 'center', alignSelf: 'center', justifyContent: 'space-between' }}>
                                <MaterialIcons name="keyboard-backspace" size={30} color="black" />
                                <Text style={{ fontFamily: 'nunitobold', fontSize: 17 }}>Back</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
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

    },
    post: {
        borderRadius: 0,
        elevation: 3,
        backgroundColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 0,
        marginBottom: 120,
        margin: 5
    },
})