import React, {useEffect, useState, useRef} from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity, FlatList, Pressable, Image } from 'react-native'
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import {AntDesign} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useChatContext} from "stream-chat-expo";
import { MaterialIcons } from '@expo/vector-icons';



const CreateFessScreen = ({navigation, route}) => {

    const text = route.params.fessName;
    const { user } = useSelector(state => { return state.User })

    const {client} = useChatContext();
    const[users, setUsers] = useState([]);

    const[members, setMembers] = useState([]);
    const[memberID, setMemberID] = useState([]);
    

    const fetchUsers = async () =>{
            const response = await client.queryUsers({});
            setUsers(response.users);
        };

    useEffect(() =>{
        fetchUsers();
    },[])

    const createOneButtonAlert = () =>
        Alert.alert(
            "Limited!",
            "This one has already been a member",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    const createAlert = () =>
        Alert.alert(
            "Note!",
            "You has been creator",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        ); 
        
    function memberExists(id) {
        return members.some(function(el) {
        return el.id === id;
     }); 
    }

    function rapeMember(item) {
            // var i;
            // for(i = 0; i < members.length; i++) {
            // if(members[i].id.toString() === item.id.toString())
            // {
            //     members.splice(i, 1);
            //     const newmembers = [...members]
            //     // setMembers(newmembers)

            // }
            // }
            memberList = memberList(item => {
                if (item.id.toString() != item.id.toString()) return item
            })
        }

    
        let memberList =[]
     const onPressHandler1 = (item) => {
        if(item.id.toString() === user.userID.toString())
        {
            createAlert();
        } else if(memberExists(item.id)) {
            createOneButtonAlert();
        }else{
            // setMembers([...members, item]);
            memberList = [...memberList, item]
        }
    }

    const onPressHandler2 = (item) => {
        rapeMember(item);
    }

    function getMembersID (){
        // setMemberID([...memberID, user.userID.toString()]);
        
        var i;
        let newList = [...memberID]
        for(i = 0; i < members.length; i++)
        {
            //setMemberID([...memberID, members[i].id.toString()])
             newList = [...newList, members[i].id.toString()]
        }
        setMemberID(newList);
        
    
    }
 useEffect(() => {
        if (memberID.length != 0)
       { const channel = client.channel("messaging", 
                {
                    members: [...memberID, user.userID],
                    name: text,
                })
                 channel.watch();
                navigation.push("Channel", {channel});
            }
    }, [memberID])

     useEffect(() => {
    getMembersID();
    }, [members])


    const CreateFess = () => {
        setMembers(memberList)  
         
    }
    return (
        <LinearGradient colors={["#313149", "#313149", "#313149"]}
                        style={styles.container}>
            <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.goBack()}
                               style={{marginLeft: 10}}>
                 <AntDesign name="leftcircle" size={30} color="white" />
            </TouchableOpacity>
            <Text style={{color: 'white', 
                          fontSize: 20, 
                          fontWeight: 'bold',
                          marginLeft: '28%'}}>
                  Add some members
            </Text>
            <FlatList
                data={users}
                keyExtractor={item => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.root} onPress={() => onPressHandler1(item)}>
                        <Image style={styles.image} source={{uri: item.image}} />
                        <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}} > {item.name}</Text>
                    </TouchableOpacity>
            )}
            />
            <Text style={{color: 'white', 
                          fontSize: 15, 
                          fontWeight: 'bold',
                          alignSelf: 'center',
                          marginLeft: 20,
                          marginTop: 10}}>{ text}</Text>
            <FlatList
                horizontal={true}
                data={members}
                style={{marginTop: 10}}
                keyExtractor={item => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.root2} onPress={() => onPressHandler2(item)}>
                        <Image style={styles.image} source={{uri: item.image}} />
                        <Text style={{color: 'pink', fontSize: 15, fontWeight: 'bold'}} > {item.name}</Text>
                    </TouchableOpacity>
            )}
            />
            <TouchableOpacity style={{ alignItems: 'center', marginVertical: 35}} onPress={CreateFess}>
                <MaterialIcons name="group-add" size={50} color="white" />
            </TouchableOpacity> 
           </SafeAreaView>
        </LinearGradient>
    )
}
   

export default CreateFessScreen;

const styles = StyleSheet.create({
     container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
     root:{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
     root2:{
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10,
    },
    list: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
    },
     root:{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    image:{
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'white'
    },
})