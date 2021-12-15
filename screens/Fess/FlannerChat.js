import React, {useState, useEffect, useRef, useContext} from 'react'
import { LogBox, RefreshControl, ActivityIndicator, ScrollView, Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {useChatContext, 
        OverlayProvider, 
        ChannelList, 
        useChannelsContext} from 'stream-chat-expo'
import {LinearGradient} from 'expo-linear-gradient';
import UserListItemInFessScr from './../../components/Fess/ChannelList/UserListItemInFessScr';
import {SafeAreaView} from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';


LogBox.ignoreAllLogs(true);
const styles = StyleSheet.create({
  gradient:{
        height:'100%',
        position:"absolute",
        backgroundColor: '#313149',
        paddingHorizontal:20,
        paddingTop:30
    },
    headerContainer:{
       // justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'stretch',
    },
    header:{
        color:'#FFF',
        flexDirection: 'row',
        flex: 1,
        fontSize:24,
        fontWeight:'bold',
        marginLeft: '35%'

    },
     proContainer:{
        marginRight:-20,
        alignSelf:'center',
      
        marginBottom: 0,
        height: "5%",
    },
    card:{
        marginLeft:400,
        width:"100%",
        height: "100%",
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
        color:'#000119',
        flex:1,
        fontSize:17,
        fontWeight:'bold'
    },
});

const sort = { last_message_at: -1 };

const Fess = ({navigation}) => {
   
 const { user } = useSelector(state => { return state.User })
 const[isReady, setIsReady] = useState(false);
 const{client} = useChatContext();
 const[users, setUsers] = useState([]);
 const [loading, setLoading] = useState(true)
 const[,reRender] = useState();
    
 const pan = useRef(new Animated.ValueXY()).current;
 const list = useRef(new Animated.ValueXY()).current;


 const fetchUsers = async () => {
            const resp = await client.queryUsers({});
            setUsers(resp.users);
            setLoading(false);
        };

    useEffect(() => {
        reRender();
    },[users])

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
         
        connectUser();
        fetchUsers();
        console.log(users);
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

    const openDrawer = () => {
        navigation.openDrawer();
    }

    console.log(isReady);
    if(!isReady)
    {
        return null;
    } else {
        return(
            <View style={styles.gradient}>
                <View style={styles.headerContainer}>
                    <Ionicons style={{alignSelf: 'flex-start', justifyContent: 'space-around'}} onPress={openDrawer} name="menu-outline" size={30} color="white" />
                    <Text style={styles.header}>Fess</Text>
                </View>
                <ScrollView
                horizontal
                style={styles.proContainer}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                <RefreshControl
                refreshing={loading}
                onRefresh={() => fetchUsers()}
          />
        }
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
                                        keyExtractor={item => item.id.toString()}
                                        key={item.id.toString()}
                                    />
                                ))
                            }
                        </Animated.View>
                    )
                }
                </ScrollView>
                <View style={{marginTop: "-270%" ,height: 1, borderWidth: 1, backgroundColor: 'black', width: '100%'}}></View>
                <SafeAreaProvider style={{ backgroundColor: '#313149',marginTop: "110%", marginBottom: '20%'}}>
                    <OverlayProvider>
                        <ChannelList onSelect={onChannelPressed} filters={filters} 
                                     sort={sort} />  
                    </OverlayProvider>
                </SafeAreaProvider>
         </View>   
    )
    }
   
}
export default Fess;



