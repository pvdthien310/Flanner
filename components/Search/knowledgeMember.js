import React, { useState, useEffect, memo } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, DatePickerIOS, Alert } from 'react-native';
import Post, { PostImage, PostText } from '../../shared/post'
import { Poststyle, Poststyle_Status } from '../../styles/poststyle'
import react from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import ReportApi from '../../API/ReportAPI';
import { useSelector,useDispatch } from 'react-redux';
import Toast from 'react-native-root-toast';
import SavedPostApi from '../../API/SavedPostAPI';

const KnowledgeMemberForSearch = ({ item, navigation }) => {
    const dispatch = useDispatch()
    const [reactnumber, setReactnumber] = useState(parseInt(item.react.length))
    const imagenumber = item.listImage.length
    const { user } = useSelector(state => { return state.User })
    useEffect(() => {
        CheckNew()
        setReactnumber(item.react.length)
    }, [item])
    const createTwoButtonAlert = () =>
        Alert.alert(
            "Notification",
            "Do you want to save this post?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
                {
                    text: "OK", onPress: () => AddSavedPost()
                }
            ]
        );
    const AddSavedPost = () => {
        SavedPostApi.UpdateTrue(user.userID, item._id)
            .then(res => {
                if (res) {
                    dispatch({ type: 'ADD_SAVED_POST_USER', payload: res })
                    let toast = Toast.show('Save successful!', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                }

            })
            .catch(err => {
                console.log(err)
                let toast = Toast.show('Save failed, please try again!', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
            })
    }
    const createThreeButtonAlert = () =>
        Alert.alert(
            "Report Request:",
            "Why do you want to report this article?",
            [
                {
                    text: "Plagiarism",
                    onPress: () => ReportPost('Plagiarism'),
                },
                {
                    text: "Inappropriate Content",
                    onPress: () => ReportPost('Inappropriate Content'),
                },
                {
                    text: "Trouble",
                    onPress: () => ReportPost('Trouble'),
                },
                {
                    text: "Other",
                    onPress: () => ReportPost('Other'),
                },
                {
                    text: "Cancel",
                    onPress: () => console.log('Cancel'),
                    style: "cancel"
                },

            ]
        );


    const CheckNew = () => {
        var postDate = new Date(item.posttime)
        var currentDate = new Date()
        var difference = Math.abs(currentDate - postDate);
        let days = difference / (1000 * 3600 * 24)
        if (days >= 10) return true;
        return false
    }

    const ReportPost = (reason) => {
        ReportApi.AddPost({
            postID: item._id,
            reason: reason,
            posterID: item.userID,
            reporterID: user.userID,
            censor: '',
            isSeen: 'false',
            type: '1'
        })
            .then(res => {
                if (res == 'Duplicate') {
                    let toast = Toast.show('You reported this post! Please do not duplicate', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                }
                else {
                    let toast = Toast.show('Report successful! Thanks for your supporting', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                }


            })
            .catch(err => console.log(err))
    }

    return (
        <Post >
            <PostImage>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', alignSelf: 'stretch' }}>
                    <Text style={Poststyle_Status.posttime}>{item.posttime}</Text>
                    <TouchableOpacity onPress={() => createThreeButtonAlert()}>
                        <MaterialIcons style={{ alignSelf: 'flex-end' }} name="report" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    scrollEnabled={true}
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={item.listImage}
                    renderItem={({ item }) => (
                        <View>
                            <Image style={Poststyle.imagepost} source={{ uri: item.uri }} />
                            <View style={{ position: 'absolute', top: 20, left: 10 }}>
                                <Text style={imagenumber == 1 || imagenumber == 0 ? Poststyle.imagenumber1 : Poststyle.imagenumber}>{imagenumber} pics</Text>
                            </View>

                        </View>

                    )}
                    keyExtractor={item => item.key}

                />
            </PostImage>

            <PostText>
                <TouchableOpacity onLongPress={() => createTwoButtonAlert()}
                onPress={() => navigation.push('Search Detail Knowledge', { item })} >
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            {CheckNew() == true ? null :
                                <View style={{ borderRadius: 5, backgroundColor: 'teal', padding: 5, alignSelf: 'flex-start', marginStart: 20 }}>
                                    <Text style={{ color: 'white', fontFamily: 'nunitobold' }}>New</Text>
                                </View>
                            }
                            {
                                (item.react.length > 3) ?

                                    <View style={{ borderRadius: 5, backgroundColor: 'maroon', padding: 5, alignSelf: 'flex-start', marginStart: 10 }}>
                                        <Text style={{ color: 'white', fontFamily: 'nunitobold' }}>Hot</Text>
                                    </View>
                                    :
                                    null
                            }
                        </View>

                        <Text style={Poststyle_Status.title}>{item.title}</Text>
                    </View>

                    <Text style={Poststyle_Status.description}>{item.description}</Text>
                </TouchableOpacity>
            </PostText>
            <View
                style={{
                    borderBottomColor: 'lightslategrey',
                    borderBottomWidth: 1,
                    marginBottom: 10
                }}
            />

            <View style={{ flexDirection: 'row', marginStart: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: item.avatar }} style={Poststyle_Status.imageavatar} />

                    <Text style={Poststyle_Status._name}> {item.username}</Text>
                </View>
                <Text style={Poststyle_Status.reactnumber}>{reactnumber} Likes</Text>
            </View>
        </Post>
        // </TouchableOpacity>

    )

}
export default react.memo(KnowledgeMemberForSearch);