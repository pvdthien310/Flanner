import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator, StyleSheet, Text, Pressable, TextInput, View, Image, TouchableOpacity, Dimensions, Button, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CommentAPI from '../../../API/CommentAPI';
import CommentMemberForSUser from '../../../components/UserInformation/StatusUserInfo/commentMember';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import NotificationApi from '../../../API/NotificationAPI';





const { height, width } = Dimensions.get("screen");

const logoHeight = height * 0.5;


const CommentScreenForSUser = ({ navigation, route }) => {

    const { item } = route.params
    const [listComment, setListComment] = useState(undefined)
    const { user } = useSelector(state => state.User)
    const [body, setBody] = useState('')
    const [loading, setLoading] = useState(false);

    const onValueChange = (text) => {
        setBody(text)
    }
    const pressgobackHandler = () => {
        navigation.goBack();
    }
    const FetchCommentList = () => {

        CommentAPI.getItembyPostID(item._id)
            .then(res => {
                if (res)
                    setListComment(res.reverse())
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

    const SendComment = () => {
        setLoading(true)
        const d = new Date();
        const newComment =
        {
            username: user.name,
            postID: item._id,
            userID: user.userID,
            body: body,
            posttime: d.toUTCString(),
            react: []
        }
        CommentAPI.AddComment(newComment)
            .then(res => {
                const newList = [res, ...listComment]
                setListComment(newList)
                setBody('')
                setLoading(false)
                if (item.userID != user.userID)
                    sendNotification()
            })
            .catch(err => console.log(err))
        
    }
    const sendNotification = () => {
        // const url = URL_local + 'notification/send-data'
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         userID: data.userID,
        //         message: ' liked your post ',
        //         postID: data._id,
        //         senderID: user.userID,
        //         type: '1',
        //         action: 'React'
        //     })
        // }).then(res => {
        //     if (!res.ok) {
        //         throw Error('Loi phat sinh')
        //     }
        //     else
        //         return res.json()
        // }).then(data => {
        //     // console.log(data)
        // }).catch(err => {
        //     console.log("error", err)
        // })
        NotificationApi.sendNoti({
            userID: item.userID,
            message: ' just commented your post ',
            postID: item._id,
            senderID: user.userID,
            type: item.title ? '1' : '2',
            action: 'Comment'
        }).then(res => {})
            .catch(err => console.log('Error send noti'))

    }

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

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.commentFrame}>
                    <TextInput style={styles.textInput}
                        placeholder="Write a comment..."
                        placeholderTextColor='dimgrey'
                        multiline={true}
                        showsVerticalScrollIndicator={false}
                        value={body}
                        onChangeText={onValueChange}



                    >
                    </TextInput>
                    {
                        loading && <ActivityIndicator style={{ position: 'absolute', marginTop: 25, start: width * 0.77 }} size="small" color="black" />
                    }
                    <TouchableOpacity
                        onPress={() => SendComment()}
                        style={{ position: 'absolute', margin: 10, start: width * 0.83 }}>
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
                                marginTop: 5,
                                marginStart: 15,
                                marginBottom: 5
                            }}>{listComment.length} COMMENTS TOTAL</Text>

                            <FlatList style={{ padding: 10, height: height * 0.6 }}
                                scrollEnabled={true}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                data={listComment}
                                renderItem={({ item }) => (
                                    <CommentMemberForSUser item={item} navigation = {navigation} ></CommentMemberForSUser>
                                )}
                                keyExtractor={item => item._id} />
                        </View>
                    }
                </View>
            </TouchableWithoutFeedback>

            <TouchableOpacity onPress={pressgobackHandler} style={{ alignItems: 'flex-start', position: 'absolute', padding: 10 }} >
                <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: 'white' }}>
                    <MaterialIcons name="keyboard-backspace" size={25} color="black" />
                    <Text style={{ color: 'black', fontSize: 15, fontFamily: 'nunitobold', margin: 5 }}>Back</Text>
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
        minHeight: 40,
        fontSize: 15,
        fontFamily: 'nunitobold',
        paddingHorizontal: 10,
        paddingEnd: 40,
        borderColor: 'black',
        borderWidth: 1,
        margin: 10,
        width: width * 0.9,
        alignSelf: 'center',

    }

});
export default CommentScreenForSUser;
