import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../styles/global';
import Post, { PostText, UserInfo, UserInfoText } from '../../shared/post';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Poststyle_Knowledge, images, Poststyle } from '../../styles/poststyle';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';



const DetailStatus = ({ route, navigation }) => {


    const dispatch = useDispatch();
    const { user } = useSelector(state => state.User)
    const { item } = route.params;
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    // const [reactnumber, setReactnumber] = useState(null)
    const [pressed, setPressed] = useState(false)

    const fetchData = () => {

        const url = 'http://192.168.0.106:3000/api/status/' + item._id.toString();
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(result => {

                setData(result)
                setLoading(false)
                // console.log(result)
                if ((result.react).indexOf(user.userID) != -1)
                    setPressed(true)
                else setPressed(false)
            }).catch(err => console.log('Error'));
    }

    useEffect(() => {
        fetchData();
    }, [])


    const pressgobackHandler = () => {
        navigation.goBack();
    }

    return (

        <View style={globalStyles.container}>
            {
                loading ? <ActivityIndicator size="small" color="#0000ff" />
                    :
                    <Post>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ width: 45 }} onPress={pressgobackHandler}>
                                <View style={{ flexDirection: 'row', margin: 10, width: 40 }}>
                                    <MaterialIcons name="keyboard-backspace" size={30} color="black" />
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{
                                    fontFamily: 'nunitobold',
                                    fontSize: 25,
                                }}> Detail </Text>
                            </View>
                        </View>

                        <ScrollView>
                            <UserInfo>
                                <Image source={images.avatars[item.avatar]} style={Poststyle_Knowledge.imageavatar} />
                                <UserInfoText>
                                    <Text style={Poststyle_Knowledge.name}> {data.username}</Text>
                                    <Text style={Poststyle_Knowledge.posttime}> {data.posttime}</Text>
                                </UserInfoText>
                            </UserInfo>
                            <PostText>
                                <Text style={Poststyle_Knowledge.body_detail}>{data.body}</Text>
                            </PostText>
                            <FlatList
                                scrollEnabled={true}
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                data={data.listImage}
                                renderItem={({ item }) => (
                                    // <Image style={Poststyle.imagepost} source={imagespost.imagepost[item.image]} />
                                    <Image style={Poststyle.imagepost} source={{ uri: item.uri }} />

                                )}
                                keyExtractor={item => item.key} />
                            <Text style={Poststyle_Knowledge.reactnumber_detail}>{data.react.length} Likes</Text>
                        </ScrollView>

                    </Post>
            }
        </View>



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

    }
})