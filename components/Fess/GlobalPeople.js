import React, { useEffect, useState, useRef } from 'react';
import { useChatContext } from "stream-chat-expo";
import UserListItem from "./UserListItem";
import { Alert, ActivityIndicator, FlatList, Animated, StyleSheet, Text, Pressable, View, Modal, TextInput, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FAB } from 'react-native-paper';




const GlobalPeople = ({ navigation }) => {

    const [users, setUsers] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [search, setSearch] = useState('');

    const { client } = useChatContext();

    const pan = useRef(new Animated.ValueXY()).current;
    const list = useRef(new Animated.ValueXY()).current;

    //for Fab group
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });

    //For Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');


    const { open } = state;

    const fetchUsers = async () => {
        setIsLoading(true);
        const response = await client.queryUsers({});
        setUsers(response.users);
        setmasterData(response.users);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchUsers();
        Animated.timing(pan, {
            toValue: { x: -400, y: 0 },
            delay: 1000,
            useNativeDriver: false
        }).start();

        Animated.timing(list, {
            toValue: { x: 0, y: -300 },
            delay: 3000,
            useNativeDriver: false
        }).start();
    }, [])
    const createOneButtonAlert = () =>
        Alert.alert(
            "Sorry!",
            "Fess name need to be longer name",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    const onCreateFessGo = () => {
        setModalVisible(!modalVisible);
        if (text.length != 0 && text.length > 5) {
            navigation.navigate('CreateFess', { fessName: text })
            setText('')
        } else {
            createOneButtonAlert();
        }
    }

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.name ?
                    item.name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setUsers(newData);
            setSearch(text);
        } else {
            setUsers(masterData);
            setSearch(text);
        }
    }

    return (
        <LinearGradient
            colors={['#313149', '#313149', '#313149']}
            style={styles.gradient}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Fess people</Text>
            </View>
            <TextInput style={{ backgroundColor: 'whitesmoke', paddingLeft: 15, marginTop: 10, height: 40, borderRadius: 15, color: 'black', fontSize: 15 }}
                placeholder="Search here..."
                value={search}
                underlineColorAndroid="transparent"
                onChangeText={(text) => searchFilter(text)}

            />
            {
                isLoading ? 
                (
                    <ActivityIndicator size='small' color='#FFF' />
                ) : (
                    <FlatList
                        style={styles.proContainer}
                        showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator = {false}
                        onRefresh={fetchUsers}
                        refreshing={isLoading}
                        data={users} 
                        renderItem={({ item}) => (
                                    <UserListItem
                                        tempUser={item}
                                        keyExtractor={item => item.id.toString()}
                                        key={item.id.toString()}
                                    />
                        )}/>
                )
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                   
                    <View style={{
                        width: "70%",
                        padding: 10,
                        backgroundColor: "white",
                        borderWidth: 1,
                        borderRadius: 10
                    }}>
                         <Text style ={{
                             alignSelf:'center',
                             fontFamily:'nunitobold',
                             fontSize: 20,
                             marginBottom: 5
                         }}>Create Fess</Text>
                        <TextInput style={{
                            width: "100%",
                            borderWidth: 1,
                            borderRadius: 10,
                            height: 50,
                            fontSize: 15,
                            textAlign: "center",
                            fontFamily: 'nunitoregular'
                        }}
                            onChangeText={setText}
                            value={text}
                            placeholder="Type Fess name..."
                            placeholderTextColor='dimgrey' ></TextInput>
                        <View style={{
                            flexDirection: 'row',
                            padding: 10,
                            alignSelf: 'stretch',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 5,
                            
                        }}>
                            <TouchableOpacity 
                            style ={{
                               flex: 1,
                               marginEnd:5
                               
                            }}
                            onPress={onCreateFessGo}>
                                <View style={{
                                    borderRadius: 10,
                                    backgroundColor: 'teal',
                                    padding: 10,
                                   justifyContent:'center'
                                    
                                    
                                }}>
                                    <Text style={{
                                        fontFamily: 'nunitobold',
                                        fontSize: 15,
                                        color: 'white',
                                        alignSelf:'center'
                                        

                                    }}>Next</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style ={{
                                flex : 1
                            }} onPress={() => {
                                setModalVisible(!modalVisible)
                            }}>
                                <View style={{
                                    borderRadius: 10,
                                    backgroundColor: 'coral',
                                    padding: 10
                                }}>
                                    <Text style={{
                                        fontFamily: 'nunitobold',
                                        fontSize: 15,
                                        color: 'white',
                                        alignSelf:'center'
                                    }}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>
            </Modal>

            <FAB
                style={{
                    width: 60,
                    height: 60,
                    alignItems: 'center',
                    borderRadius: 30,
                    backgroundColor: '#ee6e73',
                    position: 'absolute',
                    backgroundColor: '#b7c3f3',
                    opacity: 50,
                    bottom: '10%',
                    right: '10%',
                }}
                icon="plus"
                big
                onPress={() => setModalVisible(true)}
            />
        </LinearGradient>
    )
}
export default GlobalPeople;
const styles = StyleSheet.create({
    gradient: {
        height: '100%',
        position: "absolute",
        left: 0,
        right: 0,
        justifyContent: 'center',
        flex: 1,
        top: 0,
        paddingHorizontal: 20,
        paddingTop: 30
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    header: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    proContainer: {
        marginTop: 15,
        marginRight: -20,
        alignSelf: 'flex-start',
        marginBottom:90,
        
        width: '100%'
        // position: 'absolute',
    },
    centeredView: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

})