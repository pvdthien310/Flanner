import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { globalStyles } from '../../styles/global';
import StatusMember from '../../components/statusMember';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';


const { height } = Dimensions.get("screen");
const logoHeight = height * 0.5;


const MainInfor = ({ navigation, item }) => {

    const pressgobackHandler = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Image style={{
                        height: logoHeight, width: '100%',
                        borderTopLeftRadius: 10, borderTopRightRadius: 10,
                        borderBottomRightRadius: 50,
                        borderBottomLeftRadius: 50,
                        shadowOffset: { width: 1, height: 1 },
                        shadowColor: 'black',
                        shadowOpacity: 0.5,
                    }} source={require('../../assets/test3.jpg')} ></Image>
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
                            height: logoHeight * 0.2,
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
                                <Text style={{ fontFamily: 'nunitobold', fontSize: 18, color: 'black' }}>60</Text>
                                <Text style={{ fontFamily: 'nunitobold', fontSize: 15, color: 'dimgrey' }}>Post</Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'nunitobold', fontSize: 18, color: 'black' }}>118k</Text>
                                <Text style={{ fontFamily: 'nunitobold', fontSize: 15, color: 'dimgrey' }}>Following</Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'nunitobold', fontSize: 18, color: 'black' }}>540</Text>
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
                                <TouchableOpacity >
                                    <View style={styles.button1}>
                                        <Text style={{ color: 'white', fontSize: 15, paddingStart: 10, paddingEnd: 10, fontFamily: 'nunitobold' }}>Knowledge</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <View style={styles.button2}>
                                        <Text style={{ color: 'white', fontSize: 15, paddingStart: 15, paddingEnd: 15, fontFamily: 'nunitobold' }}>Status</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <View style={styles.button3}>
                                        <Text style={{ color: 'white', fontSize: 15, paddingStart: 15, paddingEnd: 15, fontFamily: 'nunitobold' }}>Saved</Text>
                                    </View>
                                </TouchableOpacity>




                            </View>
                        </View>
                    </View>

                    <View style={{
                        position: 'absolute',
                        backgroundColor: 'white',
                        width: '90%',
                        height: logoHeight * 0.17,
                        marginTop: height * 0.4,
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
                                <Text style={{ fontSize: 20, fontFamily: 'nunitobold', marginEnd: 5 }}> Jessica Pham</Text>
                                <Image source={require('../../assets/overrall.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }
                                    }
                                />

                            </View>
                            <Text style={{ fontFamily: 'nunitobold', color: 'dimgrey' }}> Fashion Model</Text>
                        </View>
                        <TouchableOpacity >
                            <View style={{
                                borderRadius: 20,
                                padding: 7,
                                backgroundColor: 'teal',
                                shadowOffset: { width: 1, height: 1 },
                                shadowColor: 'black',
                                shadowOpacity: 0.5,
                            }}>
                                <Text style={{ color: 'white', fontSize: 17, paddingStart: 15, paddingEnd: 15, fontFamily: 'nunitobold' }}>Follow</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ position: 'absolute', marginTop: 5, marginStart: 5 }} onPress={pressgobackHandler}>
                        <View style={{ flexDirection: 'row', marginBottom: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="chevron-back" size={30} color="white" />
                            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'nunitobold' }}>Jessica Pham</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        backgroundColor: 'maroon'
    }

});
export default MainInfor;
