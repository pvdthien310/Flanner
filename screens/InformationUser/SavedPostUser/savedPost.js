import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Pressable, View, Image, TouchableOpacity, Dimensions, FlatList, SafeAreaView } from 'react-native';
import SavedPostApi from '../../../API/SavedPostAPI';
import { useSelector, useDispatch } from 'react-redux';
import SavedPostMember from '../../../components/UserInformation/SavedPost/savedPostMember';
import { MaterialIcons } from '@expo/vector-icons';




const { height } = Dimensions.get("screen");
const logoHeight = height * 0.5;


const SavedPost = ({ navigation }) => {
    const [,forceRerender] = useState()
    const dispatch = useDispatch()
    const { user,saved_post } = useSelector(state => state.User)
    const [data, SetData] = useState(undefined);
    const [loading, SetLoading] = useState(false)
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
    useEffect(() => {
        fetchData()
    }, [saved_post])
    return (
        <SafeAreaView style={styles.container}>
            <View style = {{
                flexDirection: 'row',
                justifyContent:'space-between',alignItems:'center',
                paddingTop: 5
                
            }}>
                <TouchableOpacity style={{ width: 100, borderRadius: 10, }} onPress={pressgobackHandler}>
                    <View style={{ flexDirection: 'row', width: 80, alignItems: 'center' }}>
                        <MaterialIcons name="keyboard-backspace" size={25} color="black" />
                        
                    </View>
                </TouchableOpacity>
                <View style ={{
                    
                    borderRadius: 5,padding:5
                }}>
                <Text style ={{
                    fontFamily:'nunitobold',
                    fontSize:20,
                    
                }}>Saved Posts</Text>
                </View>
            </View>
            {
                data &&
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={({ item }) => (
                        <SavedPostMember item={item} navigation={navigation}></SavedPostMember>
                    )}
                    keyExtractor={item => item}
                    onRefresh={() => fetchData()}
                    refreshing={loading}
                />
            }
        </SafeAreaView>

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
});
export default SavedPost;
