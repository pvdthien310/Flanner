import React, {useEffect, useState, useRef} from 'react';
import {useChatContext} from "stream-chat-expo";
import UserListItem from "./UserListItem";
import { LogBox, ActivityIndicator, ScrollView, Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



const GlobalPeople = () => {

    const[users, setUsers] = useState([]);
    const[isLoading, setIsLoading] = useState(false);

    const {client} = useChatContext();

    const pan = useRef(new Animated.ValueXY()).current;
    const list = useRef(new Animated.ValueXY()).current;

     const fetchUsers = async () =>{
            setIsLoading(true);
            const response = await client.queryUsers({});
            setUsers(response.users);
            setIsLoading(false);
        };

    useEffect(() =>{
        fetchUsers();
        Animated.timing(pan, {
            toValue:{x:-400,y:0},
            delay:1000,
            useNativeDriver:false
        }).start();

        Animated.timing(list, {
            toValue:{x:0,y:-300},
            delay:3000,
            useNativeDriver:false
        }).start();
    },[])
   
    return (
        <LinearGradient
            colors={['#313149', '#313149', '#313149']}
            style={styles.gradient}
        >
             <View style={styles.headerContainer}>
                <Text style={styles.header}>Fess people</Text>
             </View>
             <ScrollView
                style={styles.proContainer}
                showsHorizontalScrollIndicator={false}
                onRefresh={fetchUsers}
                refreshing={isLoading}
                >
                {isLoading ? 
                    (
                        <ActivityIndicator size='small' color='#FFF'/>
                    ):(
                        <Animated.View style={[list.getLayout(),styles.list]}>
                            {
                                users.map((item) => (
                                    <UserListItem
                                        tempUser={item}
                                    />
                                ))
                            }
                        </Animated.View>
                    )
                }
           </ScrollView>
        </LinearGradient>
    )
}
export default GlobalPeople;
const styles = StyleSheet.create({
     gradient:{
        height:'100%',
        position:"absolute",
        left:0,
        right:0,
        justifyContent: 'center',
        flex: 1,
        top:0,
        paddingHorizontal:20,
        paddingTop:30
    },
     headerContainer:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        alignSelf: 'center',
    },
    header:{
        color:'#FFF',
        fontSize:24,
        fontWeight:'bold',
        alignSelf: 'center',
    },
     proContainer:{
        marginTop: 15,
        marginRight:-20,
        alignSelf: 'flex-start'
    },
    list:{
        marginTop:0,
    },
})