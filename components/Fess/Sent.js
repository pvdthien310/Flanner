import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Sent = ({message}) => {
    return(
        <View style={styles.container}>
            <LinearGradient
                colors={['#252933','#252933']}
                style={styles.gradient}
            >
                <Text style={styles.text}>Hello mother fucker</Text> 
            </LinearGradient>
            <Text style={styles.duration}>12:34 AM</Text>
        </View>
    )
}
export default Sent;
//Tại chỗ message thay bằng variable message dc khai báo trong hàm Sent

const styles = StyleSheet.create({
    container:{
        marginVertical:25,
        alignSelf:'flex-end'
    },
    duration:{
        color:'#252933',
        fontSize:11,
        marginTop:5,
        fontFamily:'nunitobold',
        alignSelf:'flex-end'
    },
    gradient:{
        maxWidth:220,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:20,
        paddingVertical:10,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        borderBottomLeftRadius:25,
    },
    text:{
        color:'#fff',
        fontFamily:'nunitoregular'
    }
})