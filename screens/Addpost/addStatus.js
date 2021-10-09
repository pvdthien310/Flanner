import * as React from 'react';
import { useState, useEffect} from 'react';
import { StyleSheet, Alert, Text, View, ScrollView, SafeAreaView, Image, TextInput, Dimensions, Platform, Button, FlatList, TouchableOpacity } from 'react-native';
import { images } from '../../styles/poststyle'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';



const { height } = Dimensions.get("screen");



export default function AddKnowledge({ route, navigation }) {

    const { name, age, avatar } = {name : 'Thien Pham', age : '20', avatar : '1'};
    let temp = 0;
    const [image, setImage] = useState([]);
    const [textinput, setTextinput] = useState('');
    const Add = (val) => {
        setTextinput(val);

    }
    const array = [];
    const [picture, setPicture] = useState([]);
    const HandleUpImages = (photo) => {
        console.log('In here !!!')
        const data = new FormData();
        data.append("file", photo)
        data.append("upload_preset", "fyjwewqj")
        data.append('folder', "Source/avatar")

        fetch("https://api.cloudinary.com/v1_1/dithiencloud/image/upload", {
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
                    return [...current, { uri: data.url, key: Math.random().toString() }]
                });
                console.log(picture)
            }).catch(err => {
                Alert.alert("Error While Uploading Image");
            })

    }
    const SendNewpost = () => {
        // temp = Math.random();
        const d = new Date();

        fetch("http://localhost:3000/api/knowledge/send-data", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                userID: name,
                body: textinput,
                avatar: avatar,
                posttime: d.toUTCString(),
                listImage: picture,
                reactNumber: '0'
            })
        }).then(res => {
            if (!res.ok) {
                throw Error('Loi phat sinh')
            }
            else
                return res.json()
        }).then(data => {
            // console.log(data)
        }).catch(err => {
            console.log("error", err)
        })

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
        setImage(() => {
            return image.filter(member => member.key != key)

        });
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
            <View style={styles.userinfo} >
                <Image source={images.avatars[avatar]} style={styles.imageavatar} />
                <View style={{ margin: 7 }}>
                    <Text style={styles.username} > Hello {name} , </Text>
                    <Text style={styles.title} > What do you want to share ?</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ flexDirection: 'column', flex: 1, marginTop: -5 }}>
                    <TextInput
                        multiline={true}
                        style={styles.body}
                        onChangeText={Add}
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
                <TouchableOpacity onPress={SendNewpost}>
                    <View style={styles.postbutton}
                    >
                        <Text style={{ fontFamily: 'nunitobold', fontSize: 15 }}>Post</Text>
                        <Ionicons name="ios-send" size={24} color="black" style={{ marginStart: 10 }} />
                    </View>
                </TouchableOpacity>
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
        marginBottom: 120,
        padding: 12,
        flex: 1


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
        height: height * 0.3,
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
        margin: 10,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        padding: 10,
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
        alignItems: 'center',

        alignSelf: 'flex-end'


    }


})