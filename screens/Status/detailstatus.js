import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';
import Post, { PostText, UserInfo, UserInfoText } from '../../shared/post';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Poststyle_Knowledge, images, Poststyle } from '../../styles/poststyle';
import { Ionicons } from '@expo/vector-icons';

const DetailStatus = ({ route, navigation }) => {
    

    const { item } = route.params;

    const pressgobackHandler = () => {
        navigation.goBack();
    }
    return (
        <View style={globalStyles.container}>
            <Post>
                <TouchableOpacity onPress={pressgobackHandler}>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons style={{ marginBottom: 15 }} name="chevron-back" size={30} color="black" />
                    </View>


                </TouchableOpacity>

                <ScrollView>
                    <UserInfo>
                        <Image source={images.avatars[item.avatar]} style={Poststyle_Knowledge.imageavatar} />
                        <UserInfoText>
                            <Text style={Poststyle_Knowledge.name}> {item.username}</Text>
                            <Text style={Poststyle_Knowledge.posttime}> {item.posttime}</Text>
                        </UserInfoText>
                    </UserInfo>
                    <PostText>
                        <Text style={Poststyle_Knowledge.body_detail}>{item.body}</Text>
                    </PostText>
                    <FlatList
                        scrollEnabled={true}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={item.listImage}
                        renderItem={({ item }) => (
                            // <Image style={Poststyle.imagepost} source={imagespost.imagepost[item.image]} />
                            <Image style={Poststyle.imagepost} source={{ uri: item.uri }} />

                        )}
                        keyExtractor={item => item.key} />
                    <Text style={Poststyle_Knowledge.reactnumber_detail}>{item.reactnumber} Likes</Text>
                </ScrollView>

            </Post>
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