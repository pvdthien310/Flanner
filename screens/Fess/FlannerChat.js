import React, {useState, useEffect, useRef, useContext} from 'react'
import { LogBox, RefreshControl, ActivityIndicator, ScrollView, FlatList, Animated, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {useChatContext, 
        OverlayProvider, 
        ChannelList} from 'stream-chat-expo'
import UserListItemInFessScr from './../../components/Fess/ChannelList/UserListItemInFessScr';
import { Ionicons } from '@expo/vector-icons';


LogBox.ignoreAllLogs(true);
const sort = { last_message_at: -1 };

const Fess = ({navigation}) => {
   
 const { user } = useSelector(state => { return state.User })
 const[isReady, setIsReady] = useState(false);
 const{client} = useChatContext();
 const[users, setUsers] = useState([]);
 const [loading, setLoading] = useState(true)
    
 const pan = useRef(new Animated.ValueXY()).current;
 const list = useRef(new Animated.ValueXY()).current;


 const fetchUsers = async () => {
            const resp = await client.queryUsers({});
            setUsers(resp.users);
            setLoading(false);
            console.log('fetsch users again')
        };

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
        return () => client.disconnectUser();
    },[]);

    const filters = {
        members: {
            $in: [user.userID]
        }
    }
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
                {
                    loading ?
                            <ActivityIndicator size='small' color='#FFF'/>
                            :
                            <FlatList 
                                horizontal
                                style={styles.proContainer}
                                showsHorizontalScrollIndicator={false}
                                data={users}
                                onRefresh={() => fetchUsers()}
                                refreshing={loading}
                                renderItem={({ item }) => (
                                    <UserListItemInFessScr
                                        tempUser={item}
                                        keyExtractor={item => item.id.toString()}
                                        key={item.id.toString()}
                                    />
                                )}
                            />
                } 
                <View style={{marginTop: "-270%" ,height: 1, borderWidth: 1, backgroundColor: 'black', width: '100%'}}></View>
                <SafeAreaProvider style={{ backgroundColor: '#313149',marginTop: "110%", marginBottom: '20%'}}>
                    <OverlayProvider>
                        <ChannelList
                        
                         onSelect={onChannelPressed} filters={filters} 
                                     sort={sort} />  
                    </OverlayProvider>
                </SafeAreaProvider>
         </View>   
    )
    }
   
}
export default Fess;

const styles = StyleSheet.create({
  gradient:{
        height:'100%',
        position:"absolute",
        backgroundColor: '#313149',
        paddingHorizontal:20,
        paddingTop:30
    },
    headerContainer:{
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
});



