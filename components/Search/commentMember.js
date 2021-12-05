import React, { useState, useEffect, memo } from 'react';
import { Alert, Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import react from 'react';
import Api from '../../API/UserAPI';
import { useSelector, useDispatch } from 'react-redux';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CommentAPI from '../../API/CommentAPI';



const CommentMemberForSearch = ({ item, navigation }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => { return state.User })
    const [host, setHost] = useState(undefined)
    const [isLike, SetisLike] = useState(false)
    const [data, setData] = useState(item)
    
    
    const createTwoButtonAlert = () =>
    Alert.alert(
        "Notification",
      "Do you want to navigate your profile?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "OK", onPress: () => NavigateToCurrentUserProfile()         
        }
      ]
    );

    const NavigateToCurrentUserProfile = () => {
        navigation.navigate('User Information', {
            screen: 'User Dashboard',
            params: { user: '' },
        })
        dispatch({ type: 'UPDATE_FEATURE', payload: 0 })
    }

    const fetchHostData = async () => {
        await Api.getUserItem(item.userID)
            .then(res => {
                setHost(res[0])
                if (item.react.indexOf(user.userID) == -1)
                    SetisLike(false);
                else SetisLike(true);
               
            })
            .catch(err => console.log('Loi set user by id', err))
    }
    const LikeActionHandler = () => {
        CommentAPI.updateTrue(item._id, user.userID)
            .then(res => {
                if (res.react.indexOf(user.userID) == -1)
                    SetisLike(false);
                else SetisLike(true);
                setData(res)
            })
            .catch(err => console.log('Error Like Comment'))
    }
    const UnlikeActionHandler = () => {
        CommentAPI.updateFalse(item._id, user.userID)
            .then(res => {
                if (res.react.indexOf(user.userID) == -1)
                    SetisLike(false);
                else SetisLike(true);
                setData(res)
            })
            .catch(err => console.log('Error Like Comment'))
    }
    useEffect(() => {
        fetchHostData();
    }, [])

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row'
            }}>
                {
                    host &&
                    <Image style={{
                        height: 50,
                        width: 50,
                        borderRadius: 30
                    }}
                        source={{ uri: host.avatar }}></Image>
                }
                <View style={{
                    flexDirection: 'column',
                    flex: 1,
                    padding: 0,
                }}>
                    <View style={{

                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignSelf: 'stretch',
                        alignItems: 'center',
                        flex: 1,

                    }}>
                        {
                            host ?
                                <TouchableOpacity onPress = {() => {
                                  
                                        if (host.email != user.email) {
                                            navigation.push(
                                                'Search Friend Profile',
                                                { item: [host] })
                                           
                                        }
                                        else {
                                           createTwoButtonAlert()
                                        }
                                    
                                }}>
                                    <Text style={{
                                        fontFamily: 'robotoregular',
                                        fontWeight: 'bold',
                                        fontSize: 17,
                                        color: 'lightslategrey',
                                        marginStart: 10,
                                        marginBottom: 10
                                    }}>{host.name}</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity>
                                    <Text style={{
                                        fontFamily: 'robotoregular',
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        color: 'lightslategrey',
                                        marginStart: 10,
                                        marginBottom: 10
                                    }}>{item.username}</Text>
                                </TouchableOpacity>
                        }
                        <Text style={{
                            fontFamily: 'robotoregular',
                            fontWeight: 'bold',
                            fontSize: 11,
                            color: 'lightslategrey',
                            marginStart: 10,
                            opacity: 0.5,
                            marginBottom: 10
                        }}>{item.posttime}</Text>
                    </View>
                    <Text style={{
                        fontFamily: 'nunitoregular',
                        fontWeight: 'bold',
                        fontSize: 15,
                        color: 'black',
                        marginStart: 15,
                        opacity: 1
                    }}>{item.body}</Text>
                    {
                        isLike === false && data ?
                            <TouchableOpacity onPress={() => LikeActionHandler()}>
                                <View style={{
                                    marginBottom: 10,
                                    marginTop: 10,
                                    alignSelf: 'flex-end',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 5,
                                    borderRadius: 10,
                                    borderWidth: 1
                                }}>
                                    <Ionicons name="ios-heart" size={20} color="black" />
                                    <Text style={{
                                        fontFamily: 'nunitobold',
                                        fontSize: 15,
                                        marginStart: 5
                                    }}>{data.react.length}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => UnlikeActionHandler()}>
                                <View style={{
                                    marginBottom: 10,
                                    marginTop: 10,
                                    alignSelf: 'flex-end',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 5,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'maroon'
                                }}>
                                    <Ionicons name="ios-heart" size={20} color="maroon" />
                                    <Text style={{
                                        fontFamily: 'nunitobold',
                                        fontSize: 15,
                                        marginStart: 5,
                                        color: 'maroon'
                                    }}>{data.react.length}</Text>
                                </View>
                            </TouchableOpacity>
                    } 


                </View>

            </View>
            <View style={{
                height: 1,
                backgroundColor: 'lightslategrey',
                opacity: 0.5
            }}></View>
        </View>

    )

}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'center'
    },


});
export default react.memo(CommentMemberForSearch);