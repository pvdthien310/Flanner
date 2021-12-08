import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, ActivityIndicator, View, Image, TouchableOpacity, Dimensions, FlatList, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Poststyle, Poststyle_Status } from '../../../styles/poststyle';
import Post, { PostText, UserInfo, UserInfoText } from '../../../shared/post';




const { height, width } = Dimensions.get("screen");
const logoHeight = height * 0.5;


const DetailReport = ({ navigation, route }) => {

    const { user } = useSelector(state => state.User)
    const { item, poster } = route.params

    return (
        <View style={styles.container}>
            <View style = {{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems:'center',
                padding: 5
            }}>
            <TouchableOpacity style={{ width: 100, backgroundColor: 'white', borderRadius: 10 }} onPress={() => navigation.goBack()}>
                <View style={{ flexDirection: 'row', margin: 10, width: 80, alignItems: 'center', alignSelf: 'center', justifyContent: 'space-between' }}>
                    <MaterialIcons name="keyboard-backspace" size={30} color="black" />
                    <Text style={{ fontFamily: 'nunitobold', fontSize: 17 }}>Back</Text>
                </View>
            </TouchableOpacity>
            <Text style = {{
                fontFamily: 'nunitobold',
                fontSize: 25
            }}>Detail</Text>
            </View>
          
            <ScrollView style={{ margin: 10, marginBottom: 60 }} showsVerticalScrollIndicator={false}>

                <View style={{ alignItems: 'flex-start', marginTop: 5 }}>
                    <FlatList
                        scrollEnabled={true}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={item.listImage}
                        renderItem={({ item }) => (
                            <View>
                                <Image style={Poststyle.imagepost} source={{ uri: item.uri }} />
                            </View>
                        )}
                        keyExtractor={item => item.key} />
                </View>

                <PostText>

                    <Text style={Poststyle_Status.posttime_detail}>{item.posttime}</Text>

                    {
                        item.title &&
                        <Text style={Poststyle_Status.title_detail}>{item.title}</Text>

                    }
                    {
                        item.description && <Text style={Poststyle_Status.description_detail}>{item.description}</Text>

                    }
                    <View style={{ borderRadius: 10, backgroundColor: 'lightgray', padding: 5, marginTop: 10, marginStart: 10 }}>
                        <Text style={Poststyle_Status.body_detail}>{item.body}</Text>
                    </View>

                </PostText>
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
                    alignItems: 'center',
                    backgroundColor: 'black',
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    borderRadius: 10,
                    padding: 10
                }}>
                    {
                        poster ?

                            <Image source={{ uri: poster.avatar }} style={Poststyle_Status.imageavatar_detai} />
                            :
                            <Image source={require('../../../assets/icon/userPhoto.png')} style={Poststyle_Status.imageavatar_detai} />
                    }

                    <View style ={{
                        justifyContent: 'space-around',
                        alignItems:'flex-start',
                        marginStart: 5
                        
                    }}>
                        <Text style={Poststyle_Status._name_detail}>{poster ?poster.name :item.username}</Text>
                        <Text style={{
                            fontFamily: 'nunitobold',
                            fontSize: 15,
                            color: 'white'
                        }}> {poster.userID}</Text>
                        <Text style={{
                             fontFamily: 'nunitobold',
                             fontSize: 15,
                             color: 'lightslategrey'
                        }}> Reported Number: {poster.reportedNum}</Text>
                    </View>

                </View>

            </ScrollView>
        </View >

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
export default DetailReport;
