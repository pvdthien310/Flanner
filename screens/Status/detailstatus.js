import * as React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { globalStyles } from '../../styles/global';
import Post, { PostText, UserInfo, UserInfoText } from '../../shared/post';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Poststyle_Status,images } from '../../styles/poststyle';
import { Ionicons } from '@expo/vector-icons';

const DetailStatus = ({ route, navigation }) => {

    const {item} = route.params;

    const pressgobackHandler = () => {
        navigation.goBack();
    }
    return (
        <View style = {globalStyles.container}>
        <Post>
            <TouchableOpacity onPress={pressgobackHandler}>
                <View style = {{ flexDirection : 'row'}}>
                <Ionicons style={{marginBottom: 15}} name="chevron-back" size={30} color="black" />
                </View>
                
                
            </TouchableOpacity>
            
            <ScrollView>
            <UserInfo>
                <Image source={images.avatars[item.avatar]} style={Poststyle_Status.imageavatar} />
                <UserInfoText>
                    <Text style={Poststyle_Status.name}> {item.name}</Text>
                    <Text style={Poststyle_Status.posttime}> {item.posttime}</Text>
                </UserInfoText>

            </UserInfo>

            <PostText>    
            <Text style={Poststyle_Status.body_detail}>{item.title}</Text>
                    <Text style={Poststyle_Status.body_detail}>{item.body}</Text>
            </PostText>
            <Text style={Poststyle_Status.reactnumber_detail}>{item.reactnumber} Likes</Text>
            </ScrollView>
               
        </Post>
        </View>
       
    )
    
}

export default DetailStatus;

const styles = StyleSheet.create({
    rating:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 16,
        marginTop: 16,
        borderTopWidth:1,
        borderTopColor: '#eee',
    
    }
})
