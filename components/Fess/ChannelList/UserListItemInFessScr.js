import React from 'react'
import { Image, Text, StyleSheet, Pressable, Alert, View} from 'react-native'
import {useChatContext} from "stream-chat-expo"
import { useSelector, useDispatch } from 'react-redux';
import {useNavigation} from '@react-navigation/core'

const UserListItemInFessScr = ({tempUser}) => {

    const {client} = useChatContext();
    const { user } = useSelector(state => { return state.User })

    const navigation = useNavigation();

     const createOneButtonAlert = () =>
        Alert.alert(
            "Impossible!",
            "Can not create talk to yourself",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
          style: "cancel"
        },
      ]
    );

    const onPress = async () => {
        if(!tempUser.id || !user.userID)
        {
            return;
        }
        else
        {
            if(tempUser.id === user.userID)
            {
                createOneButtonAlert();
            }else{
                const channel = client.channel("messaging", 
                {
                    members: [tempUser.id, user.userID],
                })
                await channel.watch();
                navigation.navigate("Channel", {channel: channel});
            }
        }  
    }

    return (
        <Pressable onPress={onPress} style={styles.root}>
            <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
            <Image style={styles.image} source={{uri: tempUser.image}} />
                {
                    tempUser.online && 
                    <View style={{height: 15, width: 15, 
                                  borderRadius: 7, 
                                  backgroundColor: '#31cb00', 
                                  position: 'absolute', 
                                  alignItems: 'flex-end'}}></View>
                }
            </View>

            <Text style={{
                marginTop:5,
                fontSize:12,
                color:'white',
            }} > {tempUser.name}</Text>
        </Pressable>
    )
}

export default UserListItemInFessScr;

const styles = StyleSheet.create({
    root:{
        height: '50%',
         alignItems:'center',
         marginTop: 15,
        marginRight:17
    },
    image:{
        width:50,
        height:50,
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1
    },
})