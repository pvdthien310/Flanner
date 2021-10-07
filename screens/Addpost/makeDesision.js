import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';
import { globalStyles } from '../../styles/global';
import StatusMember from '../../components/statusMember';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/core';


const MakeDesision = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(true);


    useFocusEffect(
        React.useCallback(() => {
            setModalVisible(true);
        }, [modalVisible])
    );

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image source={require('../../assets/icon/rocket.png')}
                            resizeMode='contain'
                            style={{
                                marginBottom: 2,
                            }
                            }
                        />
                        <Text style={styles.modalText}>What do you want to post ? </Text>
                        <Pressable
                            style={[styles.button, styles.buttonStatus]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                navigation.navigate('Add Knowledge');
                            }}
                        >
                           <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingStart: 5, paddingEnd: 5 }}>
                                <Image source={require('../../assets/icon/status.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 28,
                                        height: 28,
                                        tintColor: 'white',
                                        margin: 5,
                                        marginEnd: 10
                                    }}
                                />
                                <Text style={styles.textStyle}> Status         </Text>
                            </View>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonKnowledge]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                navigation.navigate('Add Status');
                            }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingStart: 5, paddingEnd: 5 }}>
                                <Image source={require('../../assets/icon/knowledge.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 30,
                                        height: 30,
                                        tintColor: 'white',
                                        margin: 5,
                                        marginEnd: 10
                                    }}
                                />
                                <Text style={styles.textStyle}>Knowledge </Text>
                            </View>

                        </Pressable>

                        <Pressable
                            Text='Add New Knowledge'
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                navigation.goBack();

                            }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingStart: 5, paddingEnd: 5 }}>
                                <Ionicons name="close" size={24} color="white" />
                                <Text style={styles.textStyle}>Cancel </Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginBottom: 80,
        // backgroundColor: 'black'

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 5
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "maroon",
        marginTop: 15
    },
    buttonKnowledge: {
        backgroundColor: "teal",
    },
    buttonStatus: {
        backgroundColor: "teal",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15,
        textAlignVertical:'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: 'nunitobold',
        fontSize: 20
    }
});
export default MakeDesision;
