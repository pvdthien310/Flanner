import React, { useState, useEffect, memo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, } from 'react-native';
import react from 'react';
import { useSelector, useDispatch } from 'react-redux';




const NotificationMember = ({ item, navigation }) => {

    const dispatch = useDispatch()
    const user_data = useSelector(state => { return state.User })
    const knowledge_data = useSelector(state => { return state.Knowledge })
    const status_data = useSelector(state => { return state.Status })
    const sender = user_data.data.filter(member => member.userID == item.senderID)
    if (sender.length == 0) {
        sender.push(undefined)
    }
    let post = undefined;
    if (item.type == 1)
        post = knowledge_data.user_knowledge.filter(member => member._id == item.postID)
    else if (item.type == 2)
        post = status_data.user_status.filter(member => member._id == item.postID)

    const HandelOpenPost = () => {
        if (item.type == '2')
            navigation.navigate('Status Detail Notification', { item: post[0] });
        else if (item.type == '1')
            navigation.navigate('Knowledge Detail Notification', { item: post[0] });
    }

    return (
        <TouchableOpacity activeOpacity={item.type == '3' ? 1 : 0.7} onPress={() => HandelOpenPost()}>
            <View style={item.type == '1' ? styles.frame_1 : item.type == '2' ? styles.frame_2 : styles.frame_3} >
                {
                    sender[0] ?
                        <Image source={{ uri: sender[0].avatar }}
                            resizeMode='center'
                            style={{
                                width: 50,
                                height: 50,
                                marginBottom: 5,
                                borderRadius: 10
                            }
                            }
                        />
                        :
                        <Image source={require('../assets/icon/userPhoto.png')}
                            resizeMode='stretch'
                            style={{
                                width: 50,
                                height: 50,
                                marginBottom: 5,
                                borderRadius: 10
                            }
                            }
                        />
                }
                {
                    sender[0] ?
                    <View style={{ padding: 10, flexShrink: 1 }}>
                        <Text style={styles.body}><Text style={{ color: 'black', fontFamily: 'nunitobold' }}>{sender[0].name}</Text> {item.message}</Text>
                    </View>:
                     <View style={{ padding: 10, flexShrink: 1 }}>
                     <Text style={styles.body}><Text style={{ color: 'black', fontFamily: 'nunitobold' }}>Flaner-er</Text> {item.message}</Text>
                 </View>
                }
                {
                    (post[0] != undefined) ?
                        <Image source={{ uri: post[0].listImage.length > 0 ? post[0].listImage[0].url : '../assets/icon/postPhoto.png' }}
                            resizeMode='contain'
                            style={{
                                width: post[0].listImage.length > 0 ? 50 : 0,
                                height: 50,
                                marginBottom: 5,
                                borderRadius: 10
                            }
                            }
                        />
                        :
                        <Image source={require('../assets/icon/postPhoto.png')}
                            resizeMode='contain'
                            style={{
                                width: 50,
                                height: 50,
                                marginBottom: 5,
                                borderRadius: 10
                            }
                            }
                        />
                }
            </View >
        </TouchableOpacity>

    )

}
export default react.memo(NotificationMember);

const styles = StyleSheet.create({
    frame_1: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        backgroundColor: 'lightslategrey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    frame_2: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        backgroundColor: 'dimgrey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'

    },
    frame_3: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        backgroundColor: 'maroon',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'

    },
    body: {
        fontFamily: 'nunitoregular',
        fontSize: 17,
        color: 'white',
        alignSelf: 'center',


    },
    imagepost: {
        height: 50,
        width: 50,
        resizeMode: 'stretch'
    }
})