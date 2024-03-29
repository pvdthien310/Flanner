import React, { useState, useEffect, memo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import react from 'react';
import { useSelector, useDispatch } from 'react-redux';
import KnowLedgeApi from '../../API/KnowledgeAPI';
import StatusApi from '../../API/StatusAPI';
import { Ionicons } from '@expo/vector-icons';
import Api from '../../API/UserAPI';
import ReportApi from '../../API/ReportAPI';
import Toast from 'react-native-root-toast';
import NotificationApi from '../../API/NotificationAPI';



const { height, width } = Dimensions.get("screen");
const logoHeight = height * 0.5;


const ReportMember = ({ item, navigation }) => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => { return state.User })
    const [knowledge, SetKnowledge] = useState(undefined)
    const [status, SetStatus] = useState(undefined)
    const [poster, SetPoster] = useState(undefined)
    const [resultchecking, SetResultChecking] = useState(false)
    const [loading, setLoading] = useState(false)


    const FetchData = () => {
        
        ReportApi.getAll()
            .then(res => {
                console.log(res)
                // console.log(reportList)
                dispatch({ type: 'ADD_DATA_REPORT', payload: res })

            })
            .catch(err => console.log('Error Report'))
    }
    const AcceptReport = () => {
        ReportApi.UpdateTrue(item.postID, user.userID)
            .then(res => {
                if (res == 'This post has been processed by another censor!') {
                    let toast = Toast.show('This post has been processed by another censor!', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                    FetchData()
                }
                else {
                    let number = (parseInt(poster.reportedNum) + 1).toString()
                    Api.updateReportNumber(item.posterID, number)
                        .then(res => {
                            NotificationApi.sendNoti({
                                userID: item.posterID,
                                message: ' Your post has been restricted due to a rule violation!',
                                postID: item.postID,
                                senderID: user.userID,
                                type: '3',
                                action: 'Warnning'
                            })
                                .then(res => {
                                    let toast = Toast.show('Process successful!', {
                                        duration: Toast.durations.SHORT,
                                        position: Toast.positions.CENTER,
                                        shadow: true,
                                        animation: true,
                                        hideOnPress: true,
                                    });
                                    FetchData()
                                })
                                .catch(err => console.log('Error Send Noti', err))
                        })
                        .catch(err => {
                            console.log('Update User Failed')
                        })
                }

            })
            .catch(err => console.log(err))
    }

    const DeclineReport = () => {
        ReportApi.UpdateFalse(item.postID, user.userID)
            .then(res => {
                if (res == 'This post has been processed by another censor!') {
                    let toast = Toast.show('This post has been processed by another censor!', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                    FetchData()
                }
                else {

                    let toast = Toast.show('Process successful!', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                    FetchData()

                }
            })
            .catch(err => console.log(err))
    }




    const fetchKnowledgeData = () => {
        KnowLedgeApi.getItem(item.postID)
            .then(res => {
                if (res != 'No Exist') {
                    SetKnowledge(res)
                    SetResultChecking(CheckObseneWord(res.title + ' ' + res.body + ' ' + res.description))
                }
            })
            .catch(err => console.log('Error'))
    }

    const fetchStatusData = () => {
        StatusApi.getItem(item.postID)
            .then(res => {
                if (res != 'No Exist') {
                    SetStatus(res)
                    SetResultChecking(CheckObseneWord(res.body))
                }
            })
            .catch(err => console.log('Error'))
    }
    const fetchHostData = () => {
        Api.getUserItem(item.posterID)
            .then(res => {
                SetPoster(res[0])
            })
            .catch(err => console.log('Error'))
    }
    const CheckObseneWord = (str) => {
        var ObseneWord = [
            "đụ", "Đụ", "duma", "dume", "ditconmem", "dkm", "vcl", "cdmm", "dmm", "cdm", "clm", "cl", 'cc', "cặc", "cu", "lồn", "loz",
            "cak", "đỉ", "đĩ", "fucking", "asshole", "motherfucker", "dick", "cock", "bitch", "chó đẻ", "cho de", "địt", "dit"];
        let arrayChar = str.toLowerCase().split(' ');
        for (var i = 0; i < ObseneWord.length; i++) {
            if (arrayChar.indexOf(ObseneWord[i]) != -1) return true
        }
        return false;
    }

    useEffect(() => {
        if (item.type == 1)
            fetchKnowledgeData();
        else
            fetchStatusData();
        fetchHostData()
    }, [])
    return (
        <TouchableOpacity onPress={() => {
            if (item.type == 1)
                navigation.navigate('Detail Report Screen', { item: knowledge, poster: poster })
            else
                navigation.navigate('Detail Report Screen', { item: status, poster: poster })

        }}
            style={{

                padding: 5
            }}
            key={item._id}>
            <View style={{ flexDirection: 'column' }}>
                <View style={{ borderRadius: 5, justifyContent: 'space-between', backgroundColor: 'black', padding: 10, flexDirection: 'row' }}>
                    {item.type == 1 ?
                        <Text style={{ fontFamily: 'nunitobold', color: 'white', fontSize: 14 }}>Knowledge</Text>
                        :
                        <Text style={{ fontFamily: 'nunitobold', color: 'white', fontSize: 14 }}>Status</Text>

                    }
                    <Text style={{ fontFamily: 'nunitobold', color: 'white', alignSelf: 'flex-end', fontSize: 14 }}>{item.reason}</Text>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, borderBottomWidth: 1, borderBottomColor: 'black' }}>
                    <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                        <View style={{
                            flexDirection: 'column',
                            alignSelf: 'flex-start',
                            justifyContent: 'flex-start',
                            alignContent: 'space-around'
                        }}>
                            {
                                knowledge ?
                                    <View>
                                        <Text style={{
                                            fontSize: 12,
                                            marginStart: 10,
                                            padding: 4,
                                            color: 'gray',

                                        }}
                                        >{item.postID}</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            marginStart: 10,
                                            padding: 4,

                                            color: 'black',
                                            fontWeight: 'bold'
                                        }}
                                        >{knowledge.title}</Text>
                                    </View>
                                    :
                                    <Text style={{
                                        fontSize: 14,
                                        marginStart: 10,
                                        padding: 4,
                                        color: 'black',
                                        fontWeight: 'bold'
                                    }}

                                    >{item.postID}</Text>
                            }
                            <Text style={{
                                fontSize: 12,
                                padding: 4,
                                marginStart: 15,
                                color: 'black'
                            }}
                            >PosterID: {item.posterID}</Text>
                            <Text style={{
                                fontSize: 12,
                                padding: 4,
                                marginStart: 15,
                                color: 'dimgray'
                            }}
                            >reporterID: {item.reporterID}</Text>
                            {
                                resultchecking ?
                                    <Text style={{
                                        fontSize: 14,
                                        padding: 5,
                                        color: 'maroon',
                                        fontFamily: 'nunitobold'
                                    }}
                                    >Checking OW Result: {resultchecking.toString()} </Text>
                                    :
                                    <Text style={{
                                        fontSize: 14,
                                        padding: 5,
                                        color: 'teal',
                                        fontFamily: 'nunitobold'
                                    }}
                                    >Checking OW Result: {resultchecking.toString()} </Text>
                            }
                            {
                                item.censor != '' ?


                                    <View style={{
                                        backgroundColor: item.result == 'true' ? 'teal' : 'maroon',
                                        alignSelf: 'flex-start',
                                        padding: 5,
                                        borderRadius: 5
                                    }}>
                                        {
                                            item.result == 'true' ?

                                                <Text style={{
                                                    fontSize: 14,
                                                    padding: 4,
                                                    color: 'white',
                                                    fontWeight: 'bold'
                                                }}
                                                >Censor: {item.censor}</Text>
                                                :
                                                <Text style={{
                                                    fontSize: 14,
                                                    padding: 4,
                                                    color: 'white',
                                                    fontWeight: 'bold'
                                                }}
                                                >Censor: {item.censor}</Text>
                                        }


                                    </View>


                                    : null

                            }
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: -30, }}>

                            <TouchableOpacity
                                onPress={() => AcceptReport()}
                                style={{ borderRadius: 5, marginStart: 5, backgroundColor: 'lightpink', padding: 5 }}>
                                <Ionicons name="ios-warning" size={24} color="maroon" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => DeclineReport()}
                                style={{ borderRadius: 5, marginStart: 5, backgroundColor: 'teal', padding: 5 }}>
                                <Ionicons name="checkmark" size={24} color="white" />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

            </View>
        </TouchableOpacity >

    )

}
export default react.memo(ReportMember);

const styles = StyleSheet.create({
    frame_1: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        backgroundColor: 'lightslategrey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    frame_2: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        backgroundColor: 'dimgrey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'

    },
    frame_3: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        backgroundColor: 'maroon',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'

    },

})


