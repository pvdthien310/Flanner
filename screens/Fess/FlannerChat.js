import React, {useState, useEffect, useRef, useContext} from 'react'
import { LogBox, ActivityIndicator, ScrollView, Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {useChatContext, 
        OverlayProvider, 
        ChannelList, 
        useChannelsContext} from 'stream-chat-expo'
import {LinearGradient} from 'expo-linear-gradient';
import UserListItemInFessScr from './../../components/Fess/ChannelList/UserListItemInFessScr';


LogBox.ignoreAllLogs(true);
const styles = StyleSheet.create({
  gradient:{
        height:'100%',
        position:"absolute",
        left:0,
        right:0,
        top:0,
        paddingHorizontal:20,
        paddingTop:30
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    header:{
        color:'#FFF',
        flex:1,
        fontSize:24,
        fontWeight:'bold'
    },
     proContainer:{
        marginRight:-20,
        alignSelf:'center'
    },
    card:{
        marginLeft:400,
        width:400,
        flexDirection:'row'
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
        fontFamily:'Montserrat_800ExtraBold',
        color:'#000119',
        flex:1,
        fontSize:17,
        fontWeight:'bold'
    }
});

const sort = { last_message_at: -1 };

const Fess = ({navigation}) => {
   
 const { user } = useSelector(state => { return state.User })
 const[isReady, setIsReady] = useState(false);
 const{client} = useChatContext();
 const[users, setUsers] = useState([]);
 const [loading, setLoading] = useState(true)
    
 const pan = useRef(new Animated.ValueXY()).current;
 const list = useRef(new Animated.ValueXY()).current;


    useEffect( () =>
    {
        const connectUser = async () =>{
            await client.connectUser(
                {
                    id: user.userID,
                    name: user.name,
                    image: user.avatar,
                },
                client.devToken(user.userID)
            );
            setIsReady(true);
        };
         const fetchUsers = async () => {
            const resp = await client.queryUsers({});
            setUsers(resp.users);
            setLoading(false);
        };
        connectUser();
        fetchUsers();
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
        return () => client.disconnectUser();
    },[]);

    const filters = {
        members: {
            $in: [user.userID]
        }
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    const onChannelPressed = (channel) => {
        navigation.navigate("Channel", {channel});
    }

    console.log(isReady);
    if(!isReady)
    {
        return null;
    } else {
        return(
            <LinearGradient colors={['black', 'black', 'black']}
                            style={styles.gradient}>
                <View style={styles.headerContainer}>
                <Text style={styles.header}>Fess</Text>
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
                                users.map((item) => (
                                    <UserListItemInFessScr
                                        tempUser={item}
                                    />
                                ))
                            }
                        </Animated.View>
                    )
                }
           </ScrollView>
           <View style={styles.ops}>
                <View style={styles.col}>
                    <Text style={styles.day}>{today}</Text>
                </View>
                <ScrollView>
                    {
                        loading ? 
                        (
                            <ActivityIndicator size='large' color='#f20042'/>
                        ):(
                            <Animated.View style={[list.getLayout(), styles.list]}>
                                {
                                    <SafeAreaProvider style={{marginTop: 320, marginBottom: 25}}>
                                    <OverlayProvider>
                                        <ChannelList onSelect={onChannelPressed} filters={filters} 
                                                     sort={sort} />  
                                     </OverlayProvider>
                                    </SafeAreaProvider>
                                }
                            </Animated.View>
                        )}
                </ScrollView>
           </View>
                
            </LinearGradient>
            
    )
    }
   
}
export default Fess;



