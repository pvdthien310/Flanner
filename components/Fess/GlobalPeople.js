import React, {useEffect, useState, useRef} from 'react';
import {useChatContext} from "stream-chat-expo";
import UserListItem from "./UserListItem";
import { ActivityIndicator, ScrollView, Animated, StyleSheet, Text, Pressable, View, Modal, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FAB} from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';



const GlobalPeople = ({navigation}) => {

    const[users, setUsers] = useState([]);
    const[isLoading, setIsLoading] = useState(false);

    const {client} = useChatContext();

    const pan = useRef(new Animated.ValueXY()).current;
    const list = useRef(new Animated.ValueXY()).current;

    //for Fab group
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });

    //For Modal
   const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');


    const { open } = state;

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
   
    const onCreateFessGo = () => {
        setModalVisible(!modalVisible),
        navigation.navigate('CreateFess',{fessName: text})
        setText('')
    }

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
                                        keyExtractor={item => item.id.toString()}
                                        key={item.id.toString()}
                                    />
                                ))
                            }
                        </Animated.View>
                    )
                }
           </ScrollView>

         <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
      >
        <View style={styles.centeredView}>
            <View style={{width: "70%", 
                          padding: 10,
                          backgroundColor: "white",
                          borderWidth: 1, 
                          borderRadius: 10}}>
                <TextInput style={{width: "100%", 
                                   borderWidth: 1, 
                                   borderRadius: 10,
                                   height: 50,
                                   fontSize: 15,
                                   textAlign: "center"}}
                           onChangeText={setText}
                           value={text}
                           placeholder="Type Fess name..." ></TextInput>
                
                <AntDesign name="rightcircle" 
                           size={26} 
                           color="#313149"
                           style={{alignSelf: 'center', marginTop: 10}} 
                           onPress={onCreateFessGo} />
            </View>
        </View>
      </Modal>

        <FAB.Group
          style={{marginBottom: '19%', marginEnd: '0%'}}
          open={open}
          icon={open ? {uri: "https://img.icons8.com/ios-filled/100/000000/expand-arrow.png"} : {uri: 'https://img.icons8.com/ios-filled/100/000000/collapse-arrow.png'}}
          actions={[
            {
              icon : {uri: "https://img.icons8.com/ios/50/000000/search-client.png"},
              label: 'Search',
              labelTextColor: 'black',
              style: {backgroundColor: '#313149'},
              onPress: () => console.log("Press search part")
            },
            {
              icon: 'plus',
              label: 'New Fess',
              labelTextColor: 'black',
              style: {backgroundColor: '#313149'},
              onPress: () => setModalVisible(true),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
    
   
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
    centeredView: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
    }
  
})