import React, {useState, useEffect, useRef} from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Animated, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import Profiles from '../../components/Fess/Profiles'
import Messages from '../../components/Fess/Messages'

const Chat = (props) => {
    const URL = `https://api.github.com/users`;  //Tap cac user 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    
    const pan = useRef(new Animated.ValueXY()).current;
    const list = useRef(new Animated.ValueXY()).current;

    useEffect(function() {
        const getData = async () => {
            const resp = await fetch(URL);
            const data = await resp.json();
            setData(data);
            setLoading(false);
        };
        getData();

        Animated.timing(pan, {
            toValue:{x:-400,y:0},
            delay:1000,
            useNativeDriver:false
        }).start();

        Animated.timing(list, {
            toValue:{x:0,y:-300},
            delay:2000,
            useNativeDriver:false
        }).start();

    }, [])

    console.log(data.login)

    return(
       <LinearGradient
        colors={['black', 'black', 'black']}
        style={styles.gradient}
       >
           <View style={styles.headerContainer}>
                <Text style={styles.header}>Fess</Text>
                <MaterialIcons name="add" color='#fff' size={35}/>
           </View>
           <ScrollView
                horizontal
                style={styles.proContainer}
                showsHorizontalScrollIndicator={false}
           >
                {loading ? 
                    (
                        <ActivityIndicator size='small' color='#FFF'/>
                    ):(
                        <Animated.View style={[pan.getLayout(),styles.card]}>
                            {
                                data.map((item, index) => (
                                    <Profiles
                                        key={item.id}
                                        username={item.login}
                                        uri={item.avatar_url}
                                    />
                                ))
                            }
                        </Animated.View>
                    )
                }
           </ScrollView>
           <View style={styles.ops}>
                <View style={styles.col}>
                    <Text style={styles.day}>Sunday</Text>
                    <Entypo name='dots-three-horizontal' color='#000119' size={30}/>
                </View>
                <ScrollView>
                    {
                        loading ? 
                        (
                            <ActivityIndicator size='large' color='#f20042'/>
                        ):(
                            <Animated.View style={[list.getLayout(), styles.list]}>
                                {
                                    data.map((item, index) => (
                                            <Messages
                                                key={item.id}
                                                username={item.login}
                                                uri={item.avatar_url}
                                                count={Math.floor(Math.random() * 3)}
                                                onPress={()=>{
                                                    props.navigation.navigate('Discussion',{
                                                        itemId:item.id,
                                                        itemName:item.login,
                                                        itemPic:item.avatar_url
                                                    });
                                                }}
                                            />
                                    ))}
                            </Animated.View>
                        )}
                </ScrollView>
           </View>
       </LinearGradient>
    )
}
export default Chat;

const styles = StyleSheet.create({
    list:{
        marginTop:300,
    },
    card:{
        marginLeft:400,
        width:400,
        flexDirection:'row'
    },
    gradient:{
        height:'100%',
        position:"absolute",
        left:0,
        right:0,
        top:0,
        paddingHorizontal:20,
        paddingTop:50
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    header:{
        fontFamily:'nunitobold',
        color:'#FFF',
        flex:1,
        fontSize:30,
        
    },
    proContainer:{
        marginRight:-20,
        alignSelf:'center'
    },
    ops:{
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        height: 580,
        backgroundColor:'#FFF',
        marginHorizontal:-20
    },
    col:{
        flexDirection:'row',
        marginTop:25,
        marginHorizontal:20,
        alignItems:'center'
    },
    day:{
        fontFamily:'nunitobold',
        color:'#000119',
        flex:1,
        fontSize:25
    }
})
