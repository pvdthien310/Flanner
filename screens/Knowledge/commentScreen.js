import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, TextInput, View, Image, TouchableOpacity, Dimensions, Button, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CommentAPI from '../../API/CommentAPI';
import Api from '../../API/UserAPI';
import CommentMember from '../../components/Knowledge/commentMember';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';





const { height, width } = Dimensions.get("screen");

const logoHeight = height * 0.5;


const CommentScreen = ({ navigation, route }) => {

    const { item } = route.params
    const [listComment, setListComment] = useState(undefined)
    const { user } = useSelector(state => state.User)
    const pressgobackHandler = () => {
        navigation.goBack();
    }
    const FetchCommentList = () => {
        console.log(item._id)
        CommentAPI.getItembyPostID(item._id)
            .then(res => {
                console.log(res)
                if (res)
                    setListComment(res)
            })
            .catch(err => console.log('Error Load Comment List'))
    }
    const createTwoButtonAlert = () =>
        Alert.alert(
            "Alert Title",
            "My Alert Msg",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    useEffect(() => {
        FetchCommentList();
    }, [])




    return (
        <View style={styles.container}>

            {
                item.listImage.length > 0 ?
                    <Image style={{
                        height: height * 0.3, width: '100%',

                        shadowOffset: { width: 1, height: 1 },
                        shadowColor: 'black',
                        shadowOpacity: 0.5,
                    }} source={{ uri: item.listImage[0].url }} ></Image>
                    : <Image style={{
                        height: height * 0.3, width: '100%',

                        shadowOffset: { width: 1, height: 1 },
                        shadowColor: 'black',
                        shadowOpacity: 0.5,
                    }} source={{ uri: 'https://images.unsplash.com/photo-1637832282945-093d74a8a0bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80' }} ></Image>


            }

            <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
                <View style = { styles.commentFrame}>
                    <TextInput style={styles.textInput}
                        placeholder="Write a comment..."
                        placeholderTextColor='dimgrey'

                    >
                    </TextInput>
                    <TouchableOpacity style={{ position: 'absolute', margin: 10, start: width * 0.83 }}>
                        <Ionicons style={{ marginTop: '30%' }} name="md-send-sharp" size={30} color="black" />
                    </TouchableOpacity>

                    {
                        listComment &&
                        <View>
                            <Text style={{
                                fontFamily: 'robotoregular',
                                fontWeight: 'bold',
                                padding: 5,
                                fontSize: 14,
                                marginTop: 10,
                                marginStart: 15,
                                marginBottom: 5
                            }}>{listComment.length} COMMENTS TOTAL</Text>

                            <FlatList style={{ padding: 10,height: height*0.6 }}
                                scrollEnabled={true}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                data={listComment}
                                renderItem={({ item }) => (
                                    <CommentMember item={item} ></CommentMember>
                                )}
                                keyExtractor={item => item._id} />
                        </View>
                    }
                </View>
            </TouchableWithoutFeedback>

            <TouchableOpacity onPress={pressgobackHandler} style={{ alignItems: 'flex-start', position: 'absolute', padding: 10 }} >
                <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                    <MaterialIcons name="keyboard-backspace" size={30} color="black" />
                    <Text style={{ color: 'black', fontSize: 20, fontFamily: 'nunitobold', margin: 5 }}>Back</Text>
                </View>
            </TouchableOpacity>


        </View>


    )

}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: 'white'

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
    },
    commentFrame:
    {
        height: height, width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowColor: 'black',
        paddingTop: 5,
        backgroundColor: 'white',
        position: 'absolute',
        top: height * 0.1,
        alignSelf: 'center'
    },
    textInput: {
        backgroundColor: 'whitesmoke',
        borderRadius: 10,
        height: 40,
        fontSize: 12,
        fontFamily: 'nunitobold',
        paddingHorizontal: 10,
        borderColor: 'black',
        borderWidth: 1,
        margin: 10,
        width: width * 0.9,
        alignSelf: 'center'
    }

});
export default CommentScreen;
