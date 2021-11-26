import React, { useState, useEffect, memo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, DatePickerIOS, } from 'react-native';
import Post, { InteractionWrapper, PostImage, PostText, UserImage, UserInfoText, ReactNumber1 } from '../../shared/post'
import { images, imagespost, Poststyle, Poststyle_Status } from '../../styles/poststyle'
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import react from 'react';

const KnowledgeMemberForStatus = ({ item, navigation }) => {
     const [reactnumber, setReactnumber] = useState(parseInt(item.react.length))
    const imagenumber = item.listImage.length
    useEffect(() => {
        CheckNew()
        setReactnumber(item.react.length)
    },[item])
   
    const CheckNew = () => {
        var postDate = new Date(item.posttime)
        var currentDate = new Date()
        var difference= Math.abs(currentDate-postDate);
        let days = difference/(1000 * 3600 * 24)
        if (days >= 10) return true;
        return false
    }

    return (
        <Post >
        <PostImage>
            <Text style={Poststyle_Status.posttime}>{item.posttime}</Text>
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
            <TouchableOpacity  onPress={() => navigation.push('Status Knowledge Detail', { item })} >
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View style = {{ flexDirection: 'row'}}>
                        { CheckNew() == true ? null :
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
                <Image source={{ uri: item.avatar}} style={Poststyle_Status.imageavatar} />

                <Text style={Poststyle_Status._name}> {item.username}</Text>
            </View>
            <Text style={Poststyle_Status.reactnumber}>{reactnumber} Likes</Text>
        </View>
    </Post>
        // </TouchableOpacity>

    )

}
export default react.memo(KnowledgeMemberForStatus);