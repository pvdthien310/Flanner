import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/global';
import Post, { PostText, UserInfo, UserInfoText } from '../../shared/post';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Poststyle_Status, images, Poststyle } from '../../styles/poststyle';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

const DetailStatus = ({ route, navigation }) => {

    const { item } = route.params;
    const [reactnumber, setReactnumber] = useState(parseInt(item.reactNumber))
    const [pressed, setPressed] = useState(item.react)

    const pressgobackHandler = () => {
        navigation.goBack();
        console.log('aaaaaaaaaaaaaaaaaaaaa')
    }

    const PressHandle = () => {
    
        if (pressed == true) setReactnumber(reactnumber - 1);
        else setReactnumber(reactnumber + 1)

        fetch("http://192.168.0.103:3000/api/status/update", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: item._id,
                username: item.username,
                body: item.body,
                title:item.title,
                description: item.description,
                avatar: item.avatar,
                posttime: item.posttime,
                listImage: item.listImage,
                react: pressed,
                reactNumber: reactnumber.toString()
            })
        }).then(res => {
            if (!res.ok) {
                throw Error('Loi phat sinh')
            }
            else
                return res.json()
        }).then(data => {
            console.log(data)
        }).catch(err => {
            console.log("error", err)
        })
       
    }
    return (
        <SafeAreaView style={styles.post}>


            <TouchableOpacity onPress={pressgobackHandler}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    {/* <Ionicons name="chevron-back" size={30} color="black" /> */}
                    <MaterialIcons name="keyboard-backspace" size={35} color="black" />
                </View>
            </TouchableOpacity>

            <ScrollView style={{ margin: 10, marginBottom: 50 }} showsVerticalScrollIndicator={false}>

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

                    <Text style={Poststyle_Status.title_detail}>{item.title}</Text>
                    <Text style={Poststyle_Status.description_detail}>{item.description}</Text>
                    <View style={{ borderRadius: 10, backgroundColor: 'lightgray', padding: 5, marginTop: 10, marginStart: 10 }}>
                        <Text style={Poststyle_Status.body_detail}>{item.body}</Text>
                    </View>


                </PostText>

                <Text style={Poststyle_Status.reactnumber_detail}>{reactnumber} Likes</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent: 'space-around', margin: 10}}>
                    <TouchableOpacity onPress= {async () => {
                        await setPressed(!pressed)
                        PressHandle()
                    }} >
                        <Ionicons  name="heart" size={35} style = { pressed? Poststyle_Status.like_button : Poststyle_Status._like_button} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <MaterialCommunityIcons  name="comment-multiple" size={30} color="black" />
                    </TouchableOpacity>
                </View>


                <View
                    style={{
                        borderBottomColor: 'lightslategrey',
                        borderBottomWidth: 1,
                        marginBottom: 10,
                        marginStart: 10,
                        marginEnd : 10
                    }}
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    backgroundColor: 'dimgrey',
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    borderRadius: 10,
                    padding: 10
                }}>
                    <Image source={images.avatars[item.avatar]} style={Poststyle_Status.imageavatar_detai} />
                    <UserInfoText>
                        <Text style={Poststyle_Status._name_detail}> {item.username}</Text>
                        <Text style={{
                            fontFamily: 'nunitobold',
                            fontSize: 12,
                            marginStart: 5,
                            marginTop: 5,
                            color: 'white'
                        }}> Author</Text>

                    </UserInfoText>

                </View>

            </ScrollView>


        </SafeAreaView>

    )

}

export default DetailStatus;

const styles = StyleSheet.create({
    rating: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 16,
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',

    },
    post: {
        borderRadius: 0,
        elevation: 3,
        backgroundColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 0,
        marginBottom: 120,
        margin: 5





    },
})
