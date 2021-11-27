import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Profile = ({username,uri, onPress}) => {
    return(
        <TouchableOpacity onPress = {onPress}>
        <View style={styles.container}>
            <Image source={{uri:uri}} style={styles.avatarStyle}/>
            <Text style={styles.nameStyle}>{username}</Text>
        </View>
        </TouchableOpacity>
    )
}
export default Profile;
const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        marginTop:20,
        marginRight:17
    },
    avatarStyle:{
        width:60,
        height:60,
        borderRadius: 10
    },
    nameStyle:{
        marginTop:10,
        fontSize:11,
        color:'#fff',
        fontFamily:'nunitobold'
    }
})