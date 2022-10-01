// import React, { useEffect, useState, useRef } from 'react';
// import { View, Alert, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Pressable, Image, ScrollView } from 'react-native'
// import { useSelector } from 'react-redux';
// import { LinearGradient } from 'expo-linear-gradient';
// import { AntDesign, Ionicons } from '@expo/vector-icons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useChatContext } from "stream-chat-expo";
// import { MaterialIcons } from '@expo/vector-icons';

// const CreateFessScreen = ({ navigation, route }) => {

//     const text = route.params.fessName;
//     const { user } = useSelector(state => { return state.User })

//     const { client } = useChatContext();
//     const [users, setUsers] = useState([]);
//     const [masterData, setmasterData] = useState([]);
//     const [search, setSearch] = useState('');

//     const [membersList, setMembersList] = useState([]);

//     const [membersIDList, setMembersIDList] = useState([]);

//     const fetchUsers = async () => {
//         const response = await client.queryUsers({});
//         setUsers(response.users);
//         setmasterData(response.users);
//     };
//     function getMembersID() {
//         var i;
//         let newList = [...membersIDList]
//         for (i = 0; i < membersList.length; i++) {
//             newList = [...newList, membersList[i].id.toString()]
//         }
//         setMembersIDList(newList);
//     }
//     useEffect(() => {
//         fetchUsers();
//     }, [])

//     useEffect(() => {
//         console.log(membersList)
//     }, [membersList]);

//     useEffect(() => {
//         console.log(membersIDList)
//         if (membersIDList.length != 0) {
//             createFessChannel();
//         }
//     }, [membersIDList]);

//     const searchFilter = (text) => {
//         if (text) {
//             const newData = masterData.filter((item) => {
//                 const itemData = item.name ?
//                     item.name.toUpperCase()
//                     : ''.toUpperCase();
//                 const textData = text.toUpperCase();
//                 return itemData.indexOf(textData) > -1;
//             });
//             setUsers(newData);
//             setSearch(text);
//         } else {
//             setUsers(masterData);
//             setSearch(text);
//         }
//     }

//     const createAlert = () =>
//         Alert.alert(
//             "Note!",
//             "You has been creator",
//             [
//                 { text: "OK", onPress: () => console.log("OK Pressed") }
//             ]
//         );

//     const createAlertSub = () =>
//         Alert.alert(
//             "Note!",
//             "Members count should be 3 mates or more",
//             [
//                 { text: "OK", onPress: () => console.log("OK Pressed") }
//             ]
//         );

//     const createOneButtonAlert = () =>
//         Alert.alert(
//             "Limited!",
//             "This one has already been a member",
//             [
//                 { text: "OK", onPress: () => console.log("OK Pressed") }
//             ]
//         );
//     function memberExists(id) {
//         return membersList.some(function (el) {
//             return el.id.toString() === id.toString();
//         });
//     }

//     const createFessChannel = () => {
//         //console.log(membersIDList)
//         const channel = client.channel("messaging",
//             {
//                 members: [...membersIDList, user.userID],
//                 name: text,
//             })
//         channel.watch();
//         navigation.push("Channel", { channel });
//     };

//     function rapeMember(item) {
//         var i;
//         for (i = 0; i < membersList.length; i++) {
//             if (membersList[i].id.toString() === item.id.toString()) {
//                 membersList.splice(i, 1);
//                 const newmembers = [...membersList]
//                 setMembersList(newmembers)
//             }
//         }
//     }

//     const onPressHandler1 = (item) => {
//         if (item.id.toString() === user.userID.toString()) {
//             createAlert();
//         } else if (memberExists(item.id)) {
//             createOneButtonAlert();
//         } else {
//             setMembersList([...membersList, item])
//         }
//     }

//     const onPressHandler2 = (item) => {
//         rapeMember(item);
//     }

//     const CreateFess = () => {
//         if (membersList.length >= 2) {
//             getMembersID();
//         } else {
//             createAlertSub();
//         }
//     }

//     return (
//         <LinearGradient colors={["#313149", "#313149", "#313149"]}
//             style={styles.container}>
//             <SafeAreaView style={{
//                 flex: 1
//             }}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}
//                     style={{ marginLeft: 10, marginBottom: 10 }}>
//                     <Ionicons name="arrow-back-outline" size={25} color="white" />
//                 </TouchableOpacity>
//                 <Text style={{
//                     color: 'white',
//                     fontSize: 20,
//                     fontWeight: 'bold',
//                     alignSelf: 'center'
//                 }}>
//                     Create Fess
//                 </Text>
//                 <View style={{
//                     height: 1,
//                     backgroundColor: 'gray', marginTop: 5,
//                     marginBottom: 5
//                 }}></View>
//                 <TextInput style={{ backgroundColor: 'whitesmoke', paddingLeft: 15, padding:10, marginTop: 10, height: 40, borderRadius: 15, color: 'black', fontSize: 15 }}
//                     placeholder="Search here..."
//                     value={search}
//                     underlineColorAndroid="transparent"
//                     onChangeText={(text) => searchFilter(text)}
//                 />

//                 <ScrollView>
//                     <View>
//                         <Text style={{
//                             alignSelf: 'flex-start',
//                             fontFamily: 'nunitobold',
//                             color: 'white',
//                             fontSize: 17,
//                             padding: 10
//                         }}>Choose members to group</Text>

//                         <FlatList
//                             data={users}
//                             keyExtractor={item => item.id.toString()}
//                             showsHorizontalScrollIndicator={false}
//                             renderItem={({ item }) => (
//                                 <TouchableOpacity style={styles.root} onPress={() => onPressHandler1(item)}>
//                                     <Image style={styles.image} source={{ uri: item.image }} />
//                                     <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }} > {item.name}</Text>
//                                     <View style={{
//                                         height: 1,
//                                         backgroundColor: 'white', marginTop: 5,
//                                         marginBottom: 5
//                                     }}></View>
//                                 </TouchableOpacity>
//                             )}
//                         />
//                         <View style={{
//                             height: 1,
//                             backgroundColor: 'gray', marginTop: 5,
//                             marginBottom: 5
//                         }}></View>
//                         <View style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                             alignItems: 'center'
//                         }}>

//                             <Text style={{
//                                 color: 'gray',
//                                 fontSize: 14,
//                                 fontWeight: 'bold',
//                                 alignSelf: 'flex-start',
//                                 marginLeft: 20,

//                             }}>Fess Group: <Text style={{
//                                 fontFamily: 'nunitobold',
//                                 fontSize: 20,
//                                 color: 'white'
//                             }}> {text}</Text></Text>

//                             <TouchableOpacity style={{ alignItems: 'center' }} onPress={CreateFess}>
//                                 <View style={{
//                                     backgroundColor: 'teal',
//                                     borderRadius: 5,
//                                     padding: 10,
//                                     flexDirection: 'row',
//                                     justifyContent: 'center',
//                                     alignItems: 'center',
//                                     marginEnd: 5, marginBottom: 10
//                                 }}>
//                                     <MaterialIcons name="group-add" size={20} style={{ marginEnd: 10 }} color="white" />
//                                     <Text style={{
//                                         color: 'white',
//                                         fontFamily: 'nunitobold',
//                                         fontSize: 12,

//                                     }}>Create Group</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <FlatList
//                             horizontal={true}
//                             data={membersList}
//                             style={{ marginTop: 10 }}
//                             keyExtractor={item => item.id.toString()}
//                             showsHorizontalScrollIndicator={false}
//                             renderItem={({ item }) => (
//                                 <TouchableOpacity style={styles.root2} onPress={() => onPressHandler2(item)}>

//                                     <Image style={styles.image} source={{ uri: item.image }} />
//                                     <Text style={{ color: 'pink', fontSize: 15, fontWeight: 'bold',marginTop:10 }} > {item.name}</Text>

//                                 </TouchableOpacity>
//                             )}
//                         />

//                     </View>
//                 </ScrollView>
//             </SafeAreaView>
//         </LinearGradient>
//     )
// }

// export default CreateFessScreen;

// const styles = StyleSheet.create({
//     container: {
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         top: 0,
//         height: "100%",
//     },
//     root: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         margin: 10,
//     },
//     root2: {
//         flexDirection: 'column',
//         alignItems: 'center',
//         margin: 10,
//     },
//     list: {
//         padding: 10,
//         flex: 1,
//         flexDirection: 'row',
//     },
//     root: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         margin: 10,
//     },
//     image: {
//         width: 50,
//         height: 50,
//         borderRadius: 20,
//         marginRight: 10,

//         borderColor: 'white'
//     },
// })
