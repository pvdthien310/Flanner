import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, Dimensions, ActivityIndicator, Picker } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from 'react-native-root-toast';
import { MaterialIcons } from '@expo/vector-icons';
import Api from '../../../API/UserAPI';

const { height } = Dimensions.get("screen");
const logoHeight = height * 0.5;

const EditStaffScreen = ({ navigation, route }) => {
    const { item, poster } = route.params

    const dispatch = useDispatch()

    const [loading, SetLoading] = useState(false)
    const [name, setName] = useState(item.name)
    const [contact, setContact] = useState(item.phoneNumber)
    const [birthday, setBirthday] = useState(item.doB)
    const [address, setAddress] = useState(item.address)
    const [position, setPosition] = useState(item.position)

    const pressgobackHandler = () => {
        navigation.goBack();
    }
    const [selectedValue, setSelectedValue] = useState(item.position);

    const changeName = (val) => {
        setName(val);
    }
    const changeContact = (val) => {
        setContact(val);
    }
    const changeAddress = (val) => {
        setAddress(val);
    }
    const changePosition = (val) => {
        setPosition(val);
    }
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setBirthday(date.getMonth().toString() + '/' + date.getDay().toString() + '/' + date.getFullYear().toString())
        hideDatePicker();
    };



    const unlockData = () => {
        SetLoading(true)
        Api.updateUser({
            userID: item.userID,
            phoneNumber: item.contact,
            name: item.name,
            doB: item.birthday,
            avatar: item.avatar,
            email: item.email,
            password: item.password,
            address: item.address,
            position: item.position,
            reportedNum: '0',
            following: item.following,
            followed: item.followed,
            bio: item.bio,
            job: item.job
        }).then(res => {
            SetLoading(false)
            fetchUserData();
            let toast = Toast.show('Unlock successfully', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            navigation.navigate('Staff Screen')
        }).catch(err => {
            let toast = Toast.show('Unlock failed, please try again', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
        })
    }
    const fetchUserData = async () => {
        await Api.getAll().then(result => {
            dispatch({ type: 'ADD_DATA_USER', payload: result })

        })
    }

    const unLockHandle = () => {
        Alert.alert(
            "Unlock confirmation",
            "Are you sure to unlock this account?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },

                {
                    text: "Confirm",
                    onPress: () => { unlockData() }
                },

            ]
        );
    }


    const LockHandle = () => {
        Alert.alert(
            "Lock confirmation",
            "Are you sure to lock this account?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },

                {
                    text: "Confirm",
                    onPress: () => { lockData() }
                },

            ]
        );
    }
    const lockData = () => {
        SetLoading(true)
        Api.updateUser({
            userID: item.userID,
            phoneNumber: item.contact,
            name: item.name,
            doB: item.birthday,
            avatar: item.avatar,
            email: item.email,
            password: item.password,
            address: item.address,
            position: item.position,
            reportedNum: '3',
            following: item.following,
            followed: item.followed,
            bio: item.bio,
            job: item.job
        }).then(res => {
            SetLoading(false)
            fetchUserData();
            let toast = Toast.show('Lock successfully', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            navigation.navigate('Staff Screen')
        }).catch(err => {
            let toast = Toast.show('Lock failed, please try again', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image style={{
                    height: height * 0.58, width: '100%',
                    borderTopLeftRadius: 10, borderTopRightRadius: 10,
                    borderBottomRightRadius: 50,
                    borderBottomLeftRadius: 50,
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                }} source={{ uri: item.avatar }} />


                <TouchableOpacity style={{ width: 45, position: 'absolute' }} onPress={pressgobackHandler}>
                    <View style={{ flexDirection: 'row', margin: 10, width: 40 }}>
                        <MaterialIcons name="keyboard-backspace" size={30} color="black" />
                    </View>
                </TouchableOpacity>

                <View style={{ marginLeft: 20, marginRight: 10, marginTop: 10 }}>
                    <View >
                        <Text style={styles.title}>Email Address</Text>
                        <Text style={{ fontFamily: 'nunitobold', }}>{item.email}</Text>

                        {item.reportedNum == '3' &&
                            <TouchableOpacity style={styles.lockBtn} onPress={unLockHandle}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'nunitobold', color: 'white', marginRight: 5 }}>Locked</Text>
                                    <MaterialIcons name="block" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                        }
                        {item.reportedNum != '3' && item.position == '1' &&
                            <TouchableOpacity style={styles.unLockBtn} onPress={LockHandle}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'nunitobold', color: 'white', marginRight: 5, marginLeft: 3 }}>Active</Text>
                                    <MaterialIcons name="check-circle-outline" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                        }
                    </View>


                    <Text style={styles.title}>Name</Text>
                    <Text style={{ fontFamily: 'nunitobold', }}>{item.name}</Text>

                    {/* {item.position != "2" ?
                        <TextInput style={styles.info} onChangeText={changeName} value={name} /> : <Text style={{ fontFamily: 'nunitobold', }}>{item.name}</Text>} */}


                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Position</Text>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 20, width: 130, alignSelf: 'flex-end', fontFamily: 'nunitobold', fontWeight: 'bold', fontSize: 15 }}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedValue(itemValue)
                                setPosition(itemValue)
                            }}
                        >
                            <Picker.Item label="Admin" value="0" />
                            <Picker.Item label="Censor" value="1" />
                            <Picker.Item label="User" value="2" />

                        </Picker>
                    </View> */}

                    <Text style={styles.title}>Contact</Text>
                    <Text style={{ fontFamily: 'nunitobold', }}>{item.contact}</Text>
                    {/* {item.position != "2" ?
                        <TextInput style={styles.info} onChangeText={changeContact} value={contact} /> : <Text style={{ fontFamily: 'nunitobold', }}>{item.contact}</Text>} */}

                    <Text style={styles.title} >Birthday</Text>
                    <Text style={{ fontFamily: 'nunitobold', }}>{item.birthday}</Text>
                    {/* {item.position != "2" ?
                        <View>
                            <Text style={styles.info} onPress={showDatePicker}>{birthday}</Text>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </View>
                        :
                        <Text style={{ fontFamily: 'nunitobold', }}>{item.birthday}</Text>} */}


                    <Text style={styles.title}>Address</Text>
                    <Text style={{ fontFamily: 'nunitobold', marginBottom: 20 }}>{item.address}</Text>
                    {/* {item.position != "2" ?
                        <TextInput style={styles.info} onChangeText={changeAddress} value={address} /> : <Text style={{ fontFamily: 'nunitobold', }}>{item.address}</Text>} */}


                    {/* {
                        loading == true ?
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start'
                            }}>
                                <TouchableOpacity activeOpacity={1} >
                                    <View style={{
                                        borderRadius: 15,
                                        padding: 7,
                                        backgroundColor: 'gray',
                                        shadowOffset: { width: 1, height: 1 },
                                        shadowColor: 'black',
                                        shadowOpacity: 0.5,
                                        marginTop: 20,
                                        marginLeft: 0,
                                        marginRight: 30,
                                        marginBottom: 20,
                                        width: 100,
                                        justifyContent: 'center',

                                    }}>
                                        <Text style={{ alignSelf: 'center', color: 'white', fontSize: 15, fontFamily: 'nunitobold' }}>Save</Text>
                                    </View>
                                </TouchableOpacity>

                                <ActivityIndicator size="small" color="black" />

                            </View>
                            :
                            <TouchableOpacity onPress={_submitData} >
                                <View style={{
                                    borderRadius: 15,
                                    padding: 7,
                                    backgroundColor: 'black',
                                    shadowOffset: { width: 1, height: 1 },
                                    shadowColor: 'black',
                                    shadowOpacity: 0.5,
                                    marginTop: 20,
                                    marginLeft: 0,
                                    marginBottom: 20,
                                    width: 100,
                                    justifyContent: 'center',

                                }}>
                                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: 15, fontFamily: 'nunitobold' }}>Save</Text>
                                </View>
                            </TouchableOpacity>
                    } */}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 5,
        flex: 1,
        backgroundColor: 'whitesmoke'
    },
    title: {
        fontFamily: 'nunitoregular',
        marginTop: 15
    },
    info: {
        fontFamily: 'nunitobold',
        borderBottomWidth: 1,
        borderBottomColor: '#CFCFCF',
        fontSize: 15
    },
    saveBtn: {
        backgroundColor: '#272727',
        color: 'white',
        fontWeight: 'bold'
    },
    lockBtn: {
        marginTop: 15,
        position: 'absolute',
        alignSelf: 'flex-end',
        backgroundColor: 'maroon',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20
    },
    unLockBtn: {
        marginTop: 15,
        position: 'absolute',
        alignSelf: 'flex-end',
        backgroundColor: 'teal',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20
    }
});

export default EditStaffScreen