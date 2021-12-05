import React, { useState, useEffect, memo } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import react from 'react';
import Api from '../../API/UserAPI';
import { useSelector, useDispatch } from 'react-redux';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';



const CommentMember = ({ item, navigation }) => {
    const [reactnumber, setReactnumber] = useState(parseInt(item.react.length))
    const { user } = useSelector(state => { return state.User })
    const [host, setHost] = useState(undefined)
    const [isLike, SetisLike] = useState(false)
    const fetchHostData = async () => {
        await Api.getUserItem(item.userID)
            .then(res => {
                console.log(res[0])
                setHost(res[0])
            })
            .catch(err => console.log('Loi set user by id', err))
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
                                <TouchableOpacity>
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
                            fontSize: 14,
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
                    <TouchableOpacity>
                        {
                            isLike === false ?
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
                                    }}>{item.react.length}</Text>
                                </View> :
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
                                    }}>{item.react.length}</Text>
                                </View>
                        }
                    </TouchableOpacity>


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
export default react.memo(CommentMember);