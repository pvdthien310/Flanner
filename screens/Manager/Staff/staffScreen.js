import * as React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, Dimensions, Picker } from 'react-native';
import Api from '../../../API/UserAPI';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';


const { height } = Dimensions.get("screen");
const logoHeight = height * 0.5;

const StaffScreen = ({ navigation }) => {
    const { data } = useSelector(state => state.User)
    const [admins, setAdmins] = useState([])
    const [censors, setCensors] = useState([])
    const [users, setUsers] = useState([])
    const [blocked, setBlock] = useState([])
    const [selectedList, setSelectedList] = useState([])

    const pressgobackHandler = () => {
        navigation.goBack();
    }
    const [selectedValue, setSelectedValue] = useState("all");

    const classify = () => {
        let ar0 = data.filter(item => {
            if (item.position == '0') return item
        })
        setAdmins(ar0)

        let ar1 = data.filter(item => {
            if (item.position == '1') return item
        })
        setCensors(ar1)

        let ar2 = data.filter(item => {
            if (item.position == '2') return item
        })
        setUsers(ar2)

        let ar3 = data.filter(item => {
            if (item.reportedNum == '3') return item
        })
        setBlock(ar3)

    }

    useEffect(() => {
        classify()
    }, [])

    useEffect(() => {
        pickerChange()
    }, [selectedValue])

    const pickerChange = () => {
        if (selectedValue == 'all') {
            setSelectedList(data)
        }
        else if (selectedValue == 'admin') {
            setSelectedList(admins)
        }
        else if (selectedValue == 'censor') {
            setSelectedList(censors)
        }
        else if (selectedValue == 'user') {
            setSelectedList(users)
        }
        else if (selectedValue == 'blocked') {
            setSelectedList(blocked)
        }

    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 130, }}

                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedValue(itemValue)
                    }}
                >
                    <Picker.Item label="All" value="all" />
                    <Picker.Item label="Admin" value="admin" />
                    <Picker.Item label="Censor" value="censor" />
                    <Picker.Item label="User" value="user" />
                    <Picker.Item label="Blocked" value="blocked" />
                </Picker>

                <TouchableOpacity style={{ alignContent: 'flex-end' }}>
                    <Entypo name="plus" size={24} color="black" />
                </TouchableOpacity>


            </View>


            <FlatList
                style={{ backgroundColor: 'white' }}
                data={selectedList}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.flatlist}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={styles.img} source={{ uri: item.avatar }} />
                                <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                                    <Text style={styles.info}>{item.name}</Text>
                                    <Text style={styles.title}>{item.email}</Text>
                                </View>

                            </View>
                            <View style={{ position: 'absolute', alignSelf: 'flex-end' }}>
                                {item.position == '0' && <Text style={{ fontFamily: 'nunitobold', color: 'darkcyan', }}>Admin</Text>}
                                {item.position == '1' && <Text style={{ fontFamily: 'nunitobold', color: 'black', }}>Censor</Text>}
                                {item.reportedNum == '3' && <Text style={{ fontFamily: 'nunitobold', color: 'firebrick', }}>Blocked</Text>}
                            </View>

                        </View>
                    )
                }}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 5,
        flex: 1,
        backgroundColor: 'white',

    },
    button1: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 10,
        padding: 7,
        backgroundColor: 'lightslategrey'
    },
    button2: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 10,
        padding: 7,
        backgroundColor: 'black'
    },
    button3: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 10,
        padding: 7,
        backgroundColor: 'dimgrey'
    },
    title: {
        fontFamily: 'nunitoregular',
    },
    info: {
        fontFamily: 'nunitobold',
        fontSize: 15
    },
    img: {
        height: 70,
        width: 70,
        borderRadius: 35
    },
    flatlist: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        margin: 10,
        borderRadius: 20,
    }

});
export default StaffScreen;
