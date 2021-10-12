import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';
import StatusMember from '../../components/statusMember';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import NotificationMember from '../../components/notificationMember'




const KnowledgeNotification = ({ navigation }) => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.User)
    // const [,forceRerender] = useState();
    const { user_knowledge_notification, loading } = useSelector(state => { return state.Notification })
    // console.log(data)
    const url = 'http://192.168.0.106:3000/api/notification/load-data/' + user.userID + '/knowledge';
    const fetchData = () => {
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(result => {
                dispatch({ type: 'ADD_USER_KNOWLEDGE_NOTIFICATION', payload: result })
                dispatch({ type: 'SET_LOADING_NOTIFICATION', payload: false })
            }).catch(err => console.log('Error'));
    }
    useEffect(() => {
        fetchData();
    }
        , [])

    // useEffect(() => {
    //     forceRerender}, [user_knowledge_notification])

    return (
        <View style={styles.container}>
            {
                loading ? <ActivityIndicator size="small" color="#0000ff" />
                    :
                    <View style={{flex: 1, justifyContent: 'center',backgroundColor: 'white'}}>
                        {user_knowledge_notification.length == 0 ?
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center', flexDirection: 'column'
                            }}>
                                <Image source={require('../../assets/icon/NoNotification2.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 80,
                                        height: 80,
                                        marginBottom: 5,
                                    }
                                    }
                                />
                                <Text style ={{fontFamily: 'nunitobold', fontSize: 17}}>Tích cực đăng bài để nhận thông báo bạn nhé !</Text>
                                <TouchableOpacity>
                                    <View>
                                        <Text>Refresh</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={user_knowledge_notification}
                                renderItem={({ item }) => (
                                    <NotificationMember item={item} navigation={navigation} />
                                )}
                                keyExtractor={item => item._id}
                                onRefresh={() => fetchData()}
                                refreshing={loading}
                            />
                        }
                    </View>
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        flex: 1
        // backgroundColor: 'black'

    },

});
export default KnowledgeNotification;
