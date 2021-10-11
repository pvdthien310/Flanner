import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image,TouchableOpacity,ActivityIndicator,FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import NotificationMember from '../../components/notificationMember';


const SystemNotification = ({ navigation }) => {
    
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.User)
    // const [,forceRerender] = useState();
    const { user_system_notification, loading } = useSelector(state => { return state.Notification })
    // console.log(data)
    const url = 'http://192.168.0.106:3000/api/notification/load-data/' + user.userID + '/system';
    const fetchData = () => {
        console.log(url)

        fetch(url)
            .then(res => res.json())
            .then(result => {             
                dispatch({ type: 'ADD_USER_SYSTEM_NOTIFICATION', payload: result })
                dispatch({ type: 'SET_LOADING_NOTIFICATION', payload: false })
            }).catch(err => console.log('Error'));
    }
    useEffect(() => {
        fetchData();}
        ,[])

    // useEffect(() => {
    //     forceRerender}, [user_knowledge_notification])
        
    return (
        <View style={globalStyles.container}>
            {
                loading ? <ActivityIndicator size="small" color="#0000ff" />
                    :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={user_system_notification}
                        renderItem={({ item }) => (
                            <NotificationMember item={item} navigation={navigation} />
                        )}
                        keyExtractor={item => item._id}
                        onRefresh={() => fetchData()}
                        refreshing={loading}
                    />
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginBottom: 80,
        // backgroundColor: 'black'

    },
   
});
export default SystemNotification;