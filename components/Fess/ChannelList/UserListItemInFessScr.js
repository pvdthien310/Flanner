import React from 'react'
import { Image, Text, StyleSheet, Pressable, Alert} from 'react-native'
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
                navigation.navigate("Channel", {channel});
            }
        }
        
    }

    return (
        <Pressable onPress={onPress} style={styles.root}>
            <Image style={styles.image} source={{uri: tempUser.image}} />
            <Text style={{
                marginTop:10,
                fontSize:13,
                color:'white',
            }} > {tempUser.name}</Text>
        </Pressable>
    )
}

export default UserListItemInFessScr;

const styles = StyleSheet.create({
    root:{
         alignItems:'center',
        marginTop:20,
        marginRight:17
    },
    image:{
        width:60,
        height:60,
        borderRadius: 30
    },
})