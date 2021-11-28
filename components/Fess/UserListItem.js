import React from 'react'
import { Image, Text, StyleSheet, Pressable, Alert} from 'react-native'
import {useChatContext} from "stream-chat-expo"
import { useSelector, useDispatch } from 'react-redux';
import {useNavigation} from '@react-navigation/core'

const UserListItem = ({tempUser}) => {

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
            <Text > {tempUser.name}</Text>
        </Pressable>
    )
}

export default UserListItem;

const styles = StyleSheet.create({
    root:{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    image:{
        width: 50,
        height: 50,
        backgroundColor: "gray",
        borderRadius: 50,
        marginRight: 10
    },
})