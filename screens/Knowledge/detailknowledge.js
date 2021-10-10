import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../styles/global';
import Post, { PostText, UserInfo, UserInfoText } from '../../shared/post';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Poststyle_Status, images, Poststyle } from '../../styles/poststyle';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


const DetailKnowledge = ({ route, navigation }) => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.User)
    const { item } = route.params;
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    // const [reactnumber, setReactnumber] = useState(null)
    const [pressed, setPressed] = useState(false)

    const fetchData = () => {
        const url = 'http://192.168.0.106:3000/api/knowledge/' + item._id.toString();
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

    useEffect(() => {
        fetchData();
    }, [])
    

    const pressgobackHandler = () => {
        navigation.goBack();
    }

    const PressHandle1 = () => {
        let numberReact = data.reactNumber;
        const url_true = 'http://192.168.0.106:3000/api/knowledge/update/' + item._id.toString() + '/true/' + user.userID.toString();
        const url_false = 'http://192.168.0.106:3000/api/knowledge/update/' + item._id.toString() + '/false/' + user.userID.toString();


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
                setData(result)
                dispatch({type: 'UPDATE_KNOWLEDGE_MEMBER', payload: result})
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
                setData(result)
                dispatch({type: 'UPDATE_KNOWLEDGE_MEMBER', payload: result})
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



    const PressHandle = () => {
        let numberReact = data.reactNumber;
        const url_true = 'http://192.168.0.106:3000/api/knowledge/update/' + item._id.toString() + '/' + numberReact.toString() + '/true/' + user.userID.toString();
        const url_false = 'http://192.168.0.106:3000/api/knowledge/update/' + item._id.toString() + '/' + numberReact.toString() + '/false/' + user.userID.toString();


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
                setData(result)
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
                setData(result)
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
    return (
        <View >
            {
                loading ? <ActivityIndicator size="small" color="#0000ff" />
                    :
                    <SafeAreaView style={styles.post}>

                        <View style={{ flexDirection: 'row', alignItems:'center' }}>
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

                        <ScrollView style={{ margin: 10, marginBottom: 50 }} showsVerticalScrollIndicator={false}>

                            <View style={{ alignItems: 'flex-start', marginTop: 5 }}>
                                <FlatList

                                    scrollEnabled={true}
                                    horizontal={true}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    data={data.listImage}
                                    renderItem={({ item }) => (
                                        <View>
                                            <Image style={Poststyle.imagepost} source={{ uri: item.uri }} />

                                        </View>


                                    )}
                                    keyExtractor={item => item.key} />
                            </View>



                            <PostText>
                                <Text style={Poststyle_Status.posttime_detail}>{data.posttime}</Text>

                                <Text style={Poststyle_Status.title_detail}>{data.title}</Text>
                                <Text style={Poststyle_Status.description_detail}>{data.description}</Text>
                                <View style={{ borderRadius: 10, backgroundColor: 'lightgray', padding: 5, marginTop: 10, marginStart: 10 }}>
                                    <Text style={Poststyle_Status.body_detail}>{data.body}</Text>
                                </View>


                            </PostText>

                            <Text style={Poststyle_Status.reactnumber_detail}>{data.react.length} Likes</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 10 }}>
                                <TouchableOpacity onPress={PressHandle1} >
                                    <Ionicons name="heart" size={35} style={pressed ? Poststyle_Status.like_button : Poststyle_Status._like_button} />
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <MaterialCommunityIcons name="comment-multiple" size={30} color="black" />
                                </TouchableOpacity>
                            </View>


                            <View
                                style={{
                                    borderBottomColor: 'lightslategrey',
                                    borderBottomWidth: 1,
                                    marginBottom: 10,
                                    marginStart: 10,
                                    marginEnd: 10
                                }}
                            />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                backgroundColor: 'dimgrey',
                                shadowOffset: { width: 1, height: 1 },
                                shadowColor: 'black',
                                shadowOpacity: 0.2,
                                shadowRadius: 2,
                                borderRadius: 10,
                                padding: 10
                            }}>
                                <Image source={images.avatars[item.avatar]} style={Poststyle_Status.imageavatar_detai} />
                                <UserInfoText>
                                    <Text style={Poststyle_Status._name_detail}> {item.username}</Text>
                                    <Text style={{
                                        fontFamily: 'nunitobold',
                                        fontSize: 12,
                                        marginStart: 5,
                                        marginTop: 5,
                                        color: 'white'
                                    }}> Author</Text>

                                </UserInfoText>

                            </View>

                        </ScrollView>


                    </SafeAreaView>
            }

        </View>
    )

}

export default DetailKnowledge;

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
