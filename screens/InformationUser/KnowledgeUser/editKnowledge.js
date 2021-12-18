import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Alert, Text, View, ScrollView, SafeAreaView, TouchableWithoutFeedback, Image, TextInput, Dimensions, Platform, Button, FlatList, TouchableOpacity, Keyboard, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons';
import { setEnabled } from 'react-native/Libraries/Performance/Systrace';
import { URL_local } from '../../../constant';
import KnowLedgeApi from '../../../API/KnowledgeAPI';
import Toast from 'react-native-root-toast';






const { height } = Dimensions.get("screen");
export default function EditKnowledge({ route, navigation }) {

    const GetDetail = (type) => {
        if (route.params) {
            switch (type) {
                case 'title':
                    return data ? data.title : route.params.item.title
                case 'description':
                    return data ? data.description : route.params.item.description
                case 'body':
                    return data ? data.body : route.params.item.body
                case 'image':
                    return data ? data.listImage : route.params.item.listImage
            }
        }
    }

    const { user } = useSelector(state => state.User)
    const [image, setImage] = useState(GetDetail('image'));
    const [title, setTitle] = useState(GetDetail('title'));
    const [description, setDescription] = useState(GetDetail('description'));
    const [body, setBody] = useState(GetDetail('body'));
    const [loading, setLoading] = useState(false);
    const [data, SetData] = useState(undefined)
    const dispatch = useDispatch()

    const fetchData = () => {
        KnowLedgeApi.getItem(route.params.item._id)
            .then(res => {
                SetData(res)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        if (data) {
            setTitle(data.title)
            setDescription(data.description)
            setBody(data.body)
            setImage(data.listImage)
        }
    }, [data])

    const pressgobackHandler = () => {
        navigation.goBack();
    }

    const AddTitle = (val) => {
        setTitle(val);

    }
    const AddDescription = (val) => {
        setDescription(val);

    }
    const AddBody = (val) => {
        setBody(val);

    }
    const [picture, setPicture] = useState(GetDetail('image'));
    const HandleUpImages = (photo) => {
        setLoading(true)
        const data = new FormData();
        data.append("file", photo)
        data.append("upload_preset", "poster")
        data.append('folder', "Source/avatar")

        fetch("https://api.cloudinary.com/v1_1/flaner/image/upload", {
            method: 'POST',
            body: data,
            header: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.json())
            .then(data => {
                setPicture((current) => {
                    return [...current, { url: data.url, key: Math.random().toString(), uri: photo.uri }]
                });
                setLoading(false)
            }).catch(err => {
                Alert.alert("Error While Uploading Image");
            })

    }
    const fetchKnowledgeData = () => {
        // const url = URL_local + 'knowledge/load-data/' + user.userID
        // console.log(url)
        // fetch(url)
        //     .then(res => res.json())
        //     .then(result => {
        //         dispatch({ type: 'ADD_USER_KNOWLEDGE', payload: result })
        //     }).catch(err => console.log('Error'));
        KnowLedgeApi.getKnowledgeUser(user.userID)
            .then(res => {
                dispatch({ type: 'ADD_USER_KNOWLEDGE', payload: res })
            })
            .catch(err => console.log('Error Load User Knowledge'))
    }
 
    const EditPost = () => {
        // const d = new Date();
        const updateditem = {
            _id: route.params.item._id,
            username: user.name,
            body: body,
            userID: user.userID,
            title: title,
            description: description,
            avatar: user.avatar,
            posttime: route.params.item.posttime,
            listImage: picture,
            react: route.params.item.react,
            reactNumber: '0',
            mide: route.params.item.mode
        }

        // const url = URL_local + 'knowledge/update'
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         id: route.params.item._id,
        //         username: user.name,
        //         body: body,
        //         userID: user.userID,
        //         title: title,
        //         description: description,
        //         avatar: user.avatar,
        //         posttime: route.params.item.posttime,
        //         listImage: picture,
        //         react: route.params.item.react,
        //         reactNumber: '0'
        //     })
        // }).then(res => {
        //     if (!res.ok) {
        //         throw Error('Loi phat sinh')
        //     }
        //     else {
        //         return res.json()
        //     }
        // }).then(data => {

        // }).catch(err => {
        //     console.log("error", err)
        // })
        KnowLedgeApi.getItem(route.params.item._id.toString())
        .then(res => {
            
           if (res.mode == 'limitary')
           {
            fetchKnowledgeData()
            dispatch({ type: 'UPDATE_USER_KNOWLEDGE_MEMBER', payload: res })
            let toast = Toast.show('Add post failed, please try again!', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
           }
           else
           {
            KnowLedgeApi.UpdateItem({
                id: route.params.item._id,
                username: user.name,
                body: body,
                userID: user.userID,
                title: title,
                description: description,
                avatar: user.avatar,
                posttime: route.params.item.posttime,
                listImage: picture,
                react: route.params.item.react,
                reactNumber: '0',
                
            })
                .then(res => {
                    dispatch({ type: 'UPDATE_USER_KNOWLEDGE_MEMBER', payload: res })
                    fetchKnowledgeData()
                    let toast = Toast.show('Edit post successful!', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                })
                .catch(err => {
                    console.log('Error Edit Knowledge')
                    let toast = Toast.show('Add post failed, please try again!', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                })
           }
        })
        .catch(err => {
            setIsNull(true)
            console.log(err)
        })
        // KnowLedgeApi.UpdateItem({
        //     id: route.params.item._id,
        //     username: user.name,
        //     body: body,
        //     userID: user.userID,
        //     title: title,
        //     description: description,
        //     avatar: user.avatar,
        //     posttime: route.params.item.posttime,
        //     listImage: picture,
        //     react: route.params.item.react,
        //     reactNumber: '0',
            
        // })
        //     .then(res => {
        //         fetchKnowledgeData()
        //         let toast = Toast.show('Edit post successful!', {
        //             duration: Toast.durations.SHORT,
        //             position: Toast.positions.BOTTOM,
        //             shadow: true,
        //             animation: true,
        //             hideOnPress: true,
        //         });
        //     })
        //     .catch(err => {
        //         console.log('Error Edit Knowledge')
        //         let toast = Toast.show('Add post failed, please try again!', {
        //             duration: Toast.durations.SHORT,
        //             position: Toast.positions.BOTTOM,
        //             shadow: true,
        //             animation: true,
        //             hideOnPress: true,
        //         });
        //     })
      
        navigation.goBack();
    }



    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            allowsEditing: true,
            aspect: [4, 10],
            quality: 1,

        });


        if (!result.cancelled) {
            const uri = result.uri;
            const type = result.type;
            const name = Math.random().toString();
            const source = { uri, type, name }
            HandleUpImages(source)
            setImage((current) => {
                return [...current, { uri: result.uri, key: result.key = Math.random().toString() }]
            });
        }
    };

    const DeleteImagelist = (uri) => {
        setLoading(true)
        setImage(() => {
            return image.filter(member => member.uri != uri)
        })
        setPicture(() => {
            return picture.filter(member => member.uri != uri)
        })
        setLoading(false)
    };


    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();
        if (!result.cancelled) {
            console.log(result);
            const uri = result.uri;
            const type = result.type;
            const name = Math.random().toString();
            const source = { uri, type, name }
            HandleUpImages(source)
            setImage((current) => {
                return [...current, { uri: result.uri, key: result.key = Math.random().toString() }]
            });
        }
    }







    return (

        <SafeAreaView style={styles.post} >

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: 45 }} onPress={pressgobackHandler}>
                    <View style={{ flexDirection: 'row', margin: 10, width: 40 }}>
                        <MaterialIcons name="keyboard-backspace" size={30} color="black" />
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginEnd: 10 }}>
                    <Text style={styles.namepage}> Edit Knowledge</Text>
                </View>

            </View>
            <View style={styles.userinfo} >
                <Image source={{ uri: user.avatar }} style={styles.imageavatar} />
                <View style={{ margin: 7 }}>
                    <Text style={styles.username} > Hello {user.name} , </Text>
                    <Text style={styles.title} > What do you want to share ?</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>



                <View style={{ flexDirection: 'column', flex: 1, marginTop: -5 }}>
                    <TextInput
                        multiline={true}
                        style={styles.title_topic}
                        onChangeText={AddTitle}
                        value={title}


                    ></TextInput>
                    <View style={styles.bodytitle}>
                        <Text style={{ fontSize: 17, fontFamily: 'nunitoregular' }}>What is your title.</Text>
                    </View>


                </View>


                <View style={{ flexDirection: 'column', flex: 1, marginTop: 5 }}>

                    <TextInput
                        multiline={true}
                        style={styles.description}
                        onChangeText={AddDescription}
                        value={description}



                    ></TextInput>
                    <View style={styles.bodytitle}>
                        <Text style={{ fontSize: 17, fontFamily: 'nunitoregular' }}>Descript about your topic.</Text>
                    </View>


                </View>

                <View style={{ flexDirection: 'column', flex: 1, marginTop: 5 }}>
                    <TextInput
                        multiline={true}
                        style={styles.body}
                        onChangeText={AddBody}
                        value={body}



                    ></TextInput>
                    <View style={styles.bodytitle}>
                        <Text style={{ fontSize: 17, fontFamily: 'nunitoregular' }}>Topic body.</Text>
                    </View>


                </View>
                <View style={styles.imageoptionsbar}>
                    <TouchableOpacity onPress={openCamera}>
                        <Ionicons name="ios-camera-sharp" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickImage}>
                        <Ionicons name="image-sharp" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickImage}>
                        <Ionicons name="pricetag" size={24} color="black" />
                    </TouchableOpacity>

                </View>

                {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
                <FlatList
                    style={{ margin: 10 }}
                    scrollEnabled={true}
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={image}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'column' }}>
                            <Image style={styles.image} source={{ uri: item.url ? item.url : item.uri }} />
                            <TouchableOpacity style={{ position: 'absolute' }} onPress={() => {
                                DeleteImagelist(item.uri)
                            }}>
                                <Ionicons name="close-circle" size={24} color="black" style={{ margin: 5 }} />

                            </TouchableOpacity>
                        </View>
                    )}


                />
                {loading ?
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>

                        <ActivityIndicator size="small" color="black" />
                        <TouchableOpacity activeOpacity={1}>
                            <View style={styles.postbutton1}
                            >
                                <Text style={{ fontFamily: 'nunitobold', fontSize: 15, color: 'white' }}>Post</Text>
                                <Ionicons name="ios-send" size={24} color="white" style={{ marginStart: 10 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity onPress={EditPost} >
                            <View style={styles.postbutton}
                            >
                                <Text style={{ fontFamily: 'nunitobold', fontSize: 15, color: 'white' }}>Saved</Text>
                                <Ionicons name="ios-send" size={24} color="white" style={{ marginStart: 10 }} />
                            </View>
                        </TouchableOpacity>
                    </View>}


            </ScrollView>


        </SafeAreaView>



    )

}
const styles = StyleSheet.create({
    post: {
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginHorizontal: 10,
        marginVertical: 10,
        marginBottom: 0,
        padding: 12,
        flex: 1


    },
    namepage: {
        fontSize: 20,
        fontFamily: 'nunitobold'
    },
    headerImage: {

        width: 35,
        height: 35,
        resizeMode: 'stretch'
    },
    imageavatar: {
        width: 45,
        height: 45,
        borderRadius: 15,
        alignItems: 'center',
    },
    username: {
        fontSize: 15,
        fontFamily: 'nunitobold',

    },
    title: {
        fontSize: 12,
        fontFamily: 'nunitobold',

    },
    userinfo: {
        padding: 5,
        flexDirection: 'row',
        margin: 5,
        marginBottom: 10,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: { width: 1, height: 1 },
        borderRadius: 10,
        backgroundColor: 'ghostwhite',
        justifyContent: 'center',
        alignSelf: 'center'



    },
    bodytitle: {
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: { width: 1, height: 1 },
        borderRadius: 10,
        marginTop: 5,
        marginStart: 15,
        position: 'absolute',
        backgroundColor: 'lightgrey',
        paddingTop: 5,
        paddingBottom: 5,
        paddingStart: 10,
        paddingEnd: 10

    },
    body: {
        backgroundColor: 'ghostwhite',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: { width: 1, height: 1 },
        borderRadius: 10,
        flex: 1,
        height: height * 0.2,
        marginTop: 30,
        marginStart: 10,
        marginEnd: 10,
        paddingTop: 20,
        paddingStart: 20,
        paddingEnd: 20,
        fontFamily: 'nunitoregular',
        fontSize: 15,
        borderWidth: 0.3
    },
    description: {
        backgroundColor: 'ghostwhite',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: { width: 1, height: 1 },
        borderRadius: 10,
        flex: 1,
        height: height * 0.1,
        marginTop: 30,
        marginStart: 10,
        marginEnd: 10,
        paddingTop: 20,
        paddingStart: 20,
        paddingEnd: 20,
        fontFamily: 'nunitoregular',
        fontSize: 15,
        borderWidth: 0.3
    },
    title_topic: {
        backgroundColor: 'ghostwhite',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: { width: 1, height: 1 },
        borderRadius: 10,
        flex: 1,
        height: height * 0.08,
        marginTop: 30,
        marginStart: 10,
        marginEnd: 10,
        paddingTop: 20,
        paddingStart: 20,
        paddingEnd: 20,
        fontFamily: 'nunitoregular',
        fontSize: 15,
        borderWidth: 0.3
    },
    imageoptionsbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 10,
        shadowOpacity: 0.2,
        shadowRadius: 10,
        marginTop: 10,
        marginStart: 10,
        marginEnd: 10,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        padding: 5,
        backgroundColor: 'ghostwhite'


    },
    buttondelete: {
        borderRadius: 10,
        shadowOpacity: 0.3,
        shadowRadius: 10,
        margin: 10,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        padding: 5,
        backgroundColor: 'lightgrey',
        height: 30,
        width: 30
    },
    image: {
        height: 120,
        width: 120,
        resizeMode: 'stretch',
        margin: 5,
        flex: 1,
    },
    postbutton: {
        borderRadius: 10,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginEnd: 10,
        marginStart: 10,
        marginBottom: 5,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        padding: 12,
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    postbutton1: {
        borderRadius: 10,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginEnd: 10,
        marginStart: 10,
        marginBottom: 5,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        padding: 12,
        backgroundColor: 'dimgrey',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end'
    }




})