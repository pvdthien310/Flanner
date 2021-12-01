import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { URL_local } from '../../../constant';
import KnowLedgeApi from '../../../API/KnowledgeAPI';
import StatusApi from '../../../API/StatusAPI';


const { height } = Dimensions.get("screen");
const logoHeight = height * 0.5;


const FriendInfoForStatus = ({ navigation, route }) => {

    const { item } = route.params;


    const dispatch = useDispatch()
    const { user } = useSelector(state => state.User)
    const [knowledge, setKnowledge] = useState([])
    const [status, setStatus] = useState([])
    const [postNumber, setPostNumber] = useState(knowledge.length + status.length);

    useEffect(() =>
        CountPost()
        , [knowledge, status])

    useEffect(() =>
        CountPost
        , [])
    const fetchKnowledgeData = () => {
        // const url = URL_local + 'knowledge/load-data/' + item[0].userID
        // console.log(url)
        // fetch(url)
        //     .then(res => res.json())
        //     .then(result => {
        //         setKnowledge(result)
        //         console.log('bbb')
        //     }).catch(err => console.log('Error'));
        KnowLedgeApi.getKnowledgeUser(item[0].userID)
            .then(result => {
                setKnowledge(result)
            }).catch(err => console.log('Error'));
    }
    const fetchStatusData = () => {
        // const url = URL_local + 'status/load-data/' + item[0].userID
        // console.log(url)
        // fetch(url)
        //     .then(res => res.json())
        //     .then(result => {
        //         console.log('aaa')
        //         setStatus(result)
        //         CountPost()
        //     }).catch(err => console.log('Error'));
        StatusApi.getStatusUser(item[0].userID)
            .then(result => {
                setStatus(result)
                CountPost()
            }).catch(err => console.log('Error'));
    }
    useEffect(() => {
        // fetchData();
        fetchKnowledgeData();
        fetchStatusData();
    }, [])

    const CountPost = () => {
        setPostNumber(knowledge.length + status.length)
    }
    const pressgobackHandler = () => {
        navigation.goBack();
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>

                    <Image style={{
                        height: height * 0.58, width: '100%',
                        borderTopLeftRadius: 10, borderTopRightRadius: 10,
                        borderBottomRightRadius: 50,
                        borderBottomLeftRadius: 50,
                        shadowOffset: { width: 1, height: 1 },
                        shadowColor: 'black',
                        shadowOpacity: 0.5,
                    }} source={{ uri: item[0].avatar }} ></Image>
                    <View style={{
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        width: '95%',
                        height: '100%',
                        borderRadius: 10,
                        flexDirection: 'column',
                        shadowOffset: { width: 1, height: 1 },
                        shadowColor: 'black',
                        shadowOpacity: 0.5,
                        marginTop: 5
                    }}>
                        <View style={{ width: '100%', height: logoHeight * 0.05 }}></View>
                        <View style={{
                            backgroundColor: 'whitesmoke',
                            alignSelf: 'center',
                            width: '90%',
                            height: logoHeight * 0.17,
                            borderRadius: 10,
                            flexDirection: 'row',
                            shadowOffset: { width: 1, height: 1 },
                            shadowColor: 'black',
                            shadowOpacity: 0.5,
                            justifyContent: 'space-around',
                            paddingStart: 10,
                            paddingEnd: 10,
                        }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'nunitobold', fontSize: 18, color: 'black' }}>{postNumber}</Text>
                                <Text style={{ fontFamily: 'nunitobold', fontSize: 15, color: 'dimgrey' }}>Post</Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'nunitobold', fontSize: 18, color: 'black' }}>{item[0].friendArray.length}</Text>
                                <Text style={{ fontFamily: 'nunitobold', fontSize: 15, color: 'dimgrey' }}>Following</Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'nunitobold', fontSize: 18, color: 'black' }}>{item[0].score}</Text>
                                <Text style={{ fontFamily: 'nunitobold', fontSize: 15, color: 'dimgrey' }}>Score</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', padding: 10 }}>
                            <Text style={{
                                paddingStart: 15,
                                paddingEnd: 15,
                                fontFamily: 'nunitobold',
                                fontSize: 15,
                                color: 'dimgrey',
                                marginBottom: 10
                            }}>
                                Sometimes I want to treat people how they treat me But I don’t because It’s out of my character.</Text>
                            <View
                                style={{
                                    borderBottomColor: 'dimgrey',
                                    borderBottomWidth: 0.7,
                                    marginBottom: 15,
                                    marginTop: 10
                                }}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.push('Status Friend Knowledge', { user: item[0], knowledge: knowledge })} >
                                    <View style={styles.button1}>
                                        <Text style={{ color: 'white', fontSize: 15, paddingStart: 10, paddingEnd: 10, fontFamily: 'nunitobold' }}>Knowledge</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.push('Status Friend Status', { user: item[0], status: status })}  >
                                    <View style={styles.button2}>
                                        <Text style={{ color: 'white', fontSize: 15, paddingStart: 15, paddingEnd: 15, fontFamily: 'nunitobold' }}>Status</Text>
                                    </View>
                                </TouchableOpacity>





                            </View>
                        </View>
                    </View>
                    <View style={{
                        marginTop: height * 0.38,
                        position: 'absolute',
                        flexDirection: 'column',
                        width: '90%',
                        alignSelf: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <View style={{
                            borderRadius: 20,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            padding: 15,
                            shadowOffset: { width: 1, height: 1 },
                            shadowColor: 'black',
                            shadowOpacity: 0.3,
                            marginStart: 10
                        }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons style={{ marginEnd: 10 }} name="location" size={24} color="white" />
                                <Text style={{ color: 'white', fontSize: 20, fontFamily: 'nunitobold' }}>{item[0].address}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome5 style={{ marginEnd: 10 }} name="birthday-cake" size={22} color="white" />
                                <Text style={{ color: 'white', fontSize: 20, fontFamily: 'nunitobold' }}>{item[0].doB}</Text>
                            </View>


                        </View>


                        <View style={{
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            width: '100%',
                            height: logoHeight * 0.17,
                            borderRadius: 20,
                            alignSelf: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 15,
                            shadowOffset: { width: 1, height: 1 },
                            shadowColor: 'black',
                            shadowOpacity: 0.3,

                        }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'nunitobold', marginEnd: 5 }}>{item[0].name}</Text>
                                    {
                                        item.length > 0 ?

                                            <View>
                                                {
                                                    item[0].score > 100 ?
                                                        <Image source={require('../../../assets/overrall.png')}
                                                            resizeMode='contain'
                                                            style={{
                                                                width: 25,
                                                                height: 25,
                                                            }
                                                            }
                                                        />
                                                        :
                                                        null
                                                }
                                            </View>

                                            :
                                            null
                                    }


                                </View>
                                <Text style={{ fontFamily: 'nunitobold', color: 'dimgrey' }}> Fashion Model</Text>
                            </View>
                            <TouchableOpacity >
                                <View style={{
                                    borderRadius: 20,
                                    padding: 7,
                                    backgroundColor: 'black',
                                    shadowOffset: { width: 1, height: 1 },
                                    shadowColor: 'black',
                                    shadowOpacity: 0.5,
                                }}>
                                    {/* <Text style={{ color: 'white', fontSize: 17, paddingStart: 15, paddingEnd: 15, fontFamily: 'nunitobold' }}>Follow</Text> */}
                                    <Text style={{ color: 'white', fontSize: 17, paddingStart: 15, paddingEnd: 15, fontFamily: 'nunitobold' }}>Follow</Text>

                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/* <TouchableOpacity style={{ position: 'absolute', marginTop: 5, marginStart: 15 }} onPress = {CountPost} >
                        <View style={{ flexDirection: 'row', marginBottom: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'nunitobold' }}>Thien Pham</Text>
                        </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={pressgobackHandler} style={{ alignItems: 'flex-start', position: 'absolute', padding: 10 }} >
                        <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                            <MaterialIcons name="keyboard-backspace" size={30} color="black" />
                            <Text style={{ color: 'black', fontSize: 20, fontFamily: 'nunitobold', margin: 5 }}>{item[0].name}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
    container: {
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 5,
        marginBottom: 90,
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
export default FriendInfoForStatus;
