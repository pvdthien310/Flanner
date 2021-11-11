import React, { useState, useEffect } from 'react';
import { Alert, Modal, FlatList, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../styles/global';
import StatusMember from '../../components/statusMember';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import UserStatusMember from '../../components/UserInformation/userStatusMember';
import { MaterialIcons } from '@expo/vector-icons';




const { height } = Dimensions.get("screen");
const logoHeight = height * 0.5;


const UserStatus = ({ navigation }) => {
    const dispatch = useDispatch()
    const { user_status, data, loading } = useSelector(state => { return state.Status })
    const {user} = useSelector(state => {return state.User})

    const pressgobackHandler = () => {
        console.log(user_status)
        navigation.goBack();
    }
    const fetchStatusData = () => {
        const url = 'http://192.168.0.105:3000/api/status/load-data/' + user.userID
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(result => {
                dispatch({ type: 'ADD_USER_STATUS', payload: result })
                dispatch({ type: 'SET_LOADING_STATUS', payload: false })

            }).catch(err => console.log('Error'));
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pressgobackHandler} style={{ alignItems: 'flex-start' }} >
                <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialIcons name="keyboard-backspace" size={30} color="black" />
                    <Text style={{ color: 'black', fontSize: 20, fontFamily: 'nunitobold', margin: 5 }}>{user.name}</Text>
                </View>
            </TouchableOpacity>
            {
                loading ? <ActivityIndicator size="small" color="#0000ff" />
                    :
                    <View  style={{flex: 1, justifyContent: 'center',backgroundColor: 'white'}}>
                    {
                        user_status.length == 0 ? 
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
                           <Text style ={{fontFamily: 'nunitobold', fontSize: 17, marginBottom: 10}}>There's no post to display !</Text>
                        <TouchableOpacity style= {{marginBottom: 10}} onPress = {() => fetchKnowledgeData()}>
                                <View style ={{backgroundColor: 'teal', borderRadius: 5,padding: 5, paddingStart: 10, paddingEnd: 10}}>
                                    <Text style ={{fontFamily: 'nunitobold', fontSize: 17,color:'white'}} >Refresh</Text>
                                </View>
                            </TouchableOpacity>
                           
                        </View>
                        :
                    
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={user_status}
                        renderItem={({ item }) => (
                            <UserStatusMember item={item} navigation={navigation} />
                        )}
                        keyExtractor={item => item._id}
                        onRefresh={() => fetchStatusData}
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
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 5,
        flex: 1,
        backgroundColor: 'whitesmoke'

    },
    button1: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 10,
        padding: 7,
        backgroundColor: 'lightslategrey'
    },
    button2: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 10,
        padding: 7,
        backgroundColor: 'black'
    },
    button3: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 10,
        padding: 7,
        backgroundColor: 'dimgrey'
    }

});
export default UserStatus;