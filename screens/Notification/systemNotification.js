import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image,TouchableOpacity,ActivityIndicator,FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NotificationMember from '../../components/notificationMember';
import NotificationApi from '../../API/NotificationAPI';

const SystemNotification = ({ navigation }) => {
    
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.User)
    const { user_system_notification, loading } = useSelector(state => { return state.Notification })
    const [loading2, setLoading2] = useState(false)
    // const url = URL_local +'/notification/load-data/' + user.userID  + '/system';
    const fetchData = () => {
        
        setLoading2(true)
        // fetch(url)
        //     .then(res => res.json())
        //     .then(result => {             
        //         dispatch({ type: 'ADD_USER_SYSTEM_NOTIFICATION', payload: result })
        //         dispatch({ type: 'SET_LOADING_NOTIFICATION', payload: false })
        //         setLoading2(false)
        //     }).catch(err => console.log('Error'));

            NotificationApi.getSystem(user.userID)
            .then(res => {
                dispatch({ type: 'ADD_USER_SYSTEM_NOTIFICATION', payload: res.reverse() })
                dispatch({ type: 'SET_LOADING_NOTIFICATION', payload: false })
                setLoading2(false)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchData();}
        ,[])
  
    return (
        <View style={styles.container}>
            {
                 loading ? <ActivityIndicator size="small" color="#0000ff" />
                 :
                 <View style={{flex: 1, justifyContent: 'center',backgroundColor: 'white'}}>
                     {user_system_notification.length == 0 ?
                         <View style={{
                             alignItems: 'center',
                             justifyContent: 'center', flexDirection: 'column'
                         }}>
                             <Image source={require('../../assets/icon/NoError.png')}
                                 resizeMode='contain'
                                 style={{
                                     width: 80,
                                     height: 80,
                                     marginBottom: 5,
                                 }
                                 }
                             />
                             <Text style ={{fontFamily: 'nunitobold', fontSize: 17, marginBottom:10}}>No reports at all. You are awesome !</Text>
                             <TouchableOpacity style= {{marginBottom: 10}} onPress = {() => fetchData()}>
                                    <View style ={{backgroundColor: 'teal', borderRadius: 5,padding: 5, paddingStart: 10, paddingEnd: 10}}>
                                        <Text style ={{fontFamily: 'nunitobold', fontSize: 17,color:'white'}} >Refresh</Text>
                                    </View>
                                </TouchableOpacity>
                                {
                                    loading2 ?  <ActivityIndicator size="small" color="#000000" /> : null
                                }
                         </View>
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
export default SystemNotification;