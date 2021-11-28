import React, {useEffect, useState} from 'react';
import {View,Text,StyleSheet, FlatList} from 'react-native';
import {useChatContext} from "stream-chat-expo";
import UserListItem from "./UserListItem";


const GlobalPeople = () => {

    const[users, setUsers] = useState([]);
    const[isLoading, setIsLoading] = useState(false);

    const {client} = useChatContext();

     const fetchUsers = async () =>{
            setIsLoading(true);
            const response = await client.queryUsers({});
            setUsers(response.users);
            setIsLoading(false);
        };

    useEffect(() =>{
        fetchUsers();
    },[])
   
    return (
        <View style={styles.container}>
            <FlatList 
                data={users} 
                renderItem={({ item }) => <UserListItem tempUser={item} />}
                refreshing={isLoading}
                onRefresh={fetchUsers} 
                />
        </View>
    )
}
export default GlobalPeople;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
})