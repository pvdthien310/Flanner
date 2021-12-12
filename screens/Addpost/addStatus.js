import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Alert, Text, View, TouchableWithoutFeedback, ScrollView, SafeAreaView, Image, TextInput, Dimensions, Platform, Button, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import { images } from '../../styles/poststyle'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { URL_local } from '../../constant';
import StatusApi from '../../API/StatusAPI';
import Toast from 'react-native-root-toast';





const { height } = Dimensions.get("screen");



export default function AddStatus({ route, navigation }) {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.User)
    const [image, setImage] = useState([]);
    const [textinput, setTextinput] = useState('');
    const [loading, setLoading] = useState(false)
    const Add = (val) => {
        setTextinput(val);
    }
    const [picture, setPicture] = useState([]);


    const pressgobackHandler = () => {
        navigation.goBack();
    }
    const fetchStatusData = () => {
        // const url = URL_local + 'status/load-data/' + user.userID
        // console.log(url)
        // fetch(url)
        //     .then(res => res.json())
        //     .then(result => {
        //         dispatch({ type: 'ADD_USER_STATUS', payload: result })
        //     }).catch(err => console.log('Error'));
        StatusApi.getStatusUser(user.userID)
            .then(res => {
                dispatch({ type: 'ADD_USER_STATUS', payload: res })
            })
            .catch(err => console.log(err))
    }
    const HandleUpImages = (photo) => {
        setLoading(true)
        const data = new FormData();
        data.append("file", photo)
        data.append("upload_preset", "poster")
        data.append('folder', "Source/flaner")

        fetch("https://api.cloudinary.com/v1_1/flaner/image/upload", {
            method: 'POST',
            body: data,
            header: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.json())
            .then(data => {
                //console.log(data.url);
                setPicture((current) => {
                    return [...current, { url: data.url, key: Math.random().toString(), uri: photo.uri }]
                });
                // console.log(picture)
                setLoading(false)
            }).catch(err => {
                Alert.alert("Error While Uploading Image");
            })

    }
    const SendNewpost = () => {
        // setLoading(true)
        
        // const url = URL_local + 'status/send-data'
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: user.name,
        //         userID: user.userID,
        //         body: textinput,
        //         avatar: user.avatar,
        //         posttime: d.toUTCString(),
        //         listImage: picture,
        //         reactNumber: '0',
        //         react: [],
        //     })
        // }).then(res => {
        //     if (!res.ok) {
        //         throw Error('Loi phat sinh')
        //     }
        //     else
        //         return res.json()
        // }).then(data => {

        // }).catch(err => {
        //     console.log("error", err)
        // })
        const d = new Date();
        StatusApi.AddPost({
            username: user.name,
            userID: user.userID,
            body: textinput,
            avatar: user.avatar,
            posttime: d.toUTCString(),
            listImage: picture,
            react: [],
            mode: "public"
        })
            .then(res => {
                fetchStatusData() 
                let toast = Toast.show('Add post successful!', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
            })
            .catch(err => console.log('Error Add New Knowledge'))

        fetchStatusData()
        navigation.goBack();
        navigation.navigate('Knowledge');

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




        //console.log(result);

        if (!result.cancelled) {
            console.log(result);
            const uri = result.uri;
            const type = result.type;
            const name = Math.random().toString();
            const source = { uri, type, name }
            HandleUpImages(source)
            console.log(source)
            setImage((current) => {
                return [...current, { uri: result.uri, key: result.key = Math.random().toString() }]
            });

            //console.log(image)
        }
    };

    const DeleteImagelist = (key) => {
        setLoading(true)
        const deletedimg = image.filter(member => member.key == key)
        console.log(deletedimg)
        console.log(deletedimg[0].uri)
        setImage(() => {
            return image.filter(member => member.key != key)
        })
        setPicture(() => {
            return picture.filter(member => member.uri != deletedimg[0].uri)
        })
        setLoading(false)
    };

    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        //console.log(result);

        if (!result.cancelled) {
            setImage((current) => {
                return [...current, { uri: result.uri, key: result.key = Math.random().toString() }]
            });
            //console.log(result.uri);
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
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.namepage}> Add Status</Text>
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
                        clearButtonMode='always'
                        multiline={true}
                        style={styles.body}
                        onChangeText={Add}
                        placeholder="Write a caption..."
                    ></TextInput>
                    <View style={styles.bodytitle}>
                        <Text style={{ fontSize: 17, fontFamily: 'nunitoregular' }}>Share your experience.</Text>
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
                            <Image style={styles.image} source={{ uri: item.uri }} />
                            <TouchableOpacity style={{ position: 'absolute' }} onPress={() => {
                                //console.log(item.key)
                                DeleteImagelist(item.key)
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
                        <TouchableOpacity onPress={SendNewpost} >
                            <View style={styles.postbutton}
                            >
                                <Text style={{ fontFamily: 'nunitobold', fontSize: 15, color: 'white' }}>Post</Text>
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
        marginBottom: 110,
        padding: 12,
        flex: 1


    },
    namepage: {
        fontFamily: 'nunitobold',
        fontSize: 20,
    },
    headerImage: {

        width: 35,
        height: 35,
        resizeMode: 'stretch'
    },
    imageavatar: {
        width: 65,
        height: 65,
        borderRadius: 15,
        alignItems: 'center',
    },
    username: {
        fontSize: 20,
        fontFamily: 'nunitobold',

    },
    title: {
        fontSize: 17,
        fontFamily: 'nunitobold',

    },
    userinfo: {
        padding: 10,
        flexDirection: 'row',
        margin: 10,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: { width: 1, height: 1 },
        borderRadius: 10,
        backgroundColor: 'ghostwhite'


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
        height: height * 0.25,
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
        margin: 10,
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