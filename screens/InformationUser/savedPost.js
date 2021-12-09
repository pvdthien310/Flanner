import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import SavedPostApi from '../../API/SavedPostAPI';
import { useSelector, useDispatch } from 'react-redux';



const { height } = Dimensions.get("screen");
const logoHeight = height * 0.5;


const SavedPost = ({ navigation }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.User)
    const [data, SetData] = useState(undefined);
    const [loading,SetLoading] = useState(false)
    const pressgobackHandler = () => {
        navigation.goBack();
    }
    const fetchData = () => {
        // const url = URL_local + 'knowledge/load-data/' + user.userID
        // console.log(url)
        // fetch(url)
        //     .then(res => res.json())
        //     .then(result => {
        //         // console.log(result)
        //         dispatch({ type: 'ADD_USER_KNOWLEDGE', payload: result })
        //     }).catch(err => console.log('Error'));

        SavedPostApi.GetByUserID(user.userID)
            .then(res => {
                console.log('vao day')
                SetData(res.postIDList)
                SetLoading(false)
            })
            .catch(err => console.log(err))

    }
    useEffect(() => {
       fetchData()
    }, [])
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pressgobackHandler}>
                <Text> Back </Text>
            </TouchableOpacity>
            {
                data &&
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={({ item }) => (
                        <Text>{item}</Text>
                    )}
                    keyExtractor={item => item}
                    onRefresh={() => fetchData()}
                    refreshing={loading}
                />
            }
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
        backgroundColor: 'dimgrey'
    }

});
export default SavedPost;
