import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, Dimensions,FlatList, SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/global';
import StatusMember from '../../components/statusMember';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import ReactMember from '../../components/ShowReactUser/reactMember';


const { height } = Dimensions.get("screen");
const logoHeight = height * 0.5;


const ShowReactInfo = ({ route, navigation }) => {
    const { data } = route.params;
    const pressgobackHandler = () => {
        navigation.goBack();
    }
   
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ width: 45 }} onPress={pressgobackHandler}>
                                <View style={{ flexDirection: 'row', margin: 10, width: 40 }}>
                                    <MaterialIcons name="keyboard-backspace" size={30} color="black" />
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{
                                    fontFamily: 'robotobold',
                                    fontSize: 25,
                                }}> Likes </Text>
                            </View>
                        </View>
            <FlatList

                scrollEnabled={true}
                
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={data.react}
                renderItem={({ item }) => (
                  <ReactMember item = {item} navigation = {navigation}></ReactMember>
                )}
                keyExtractor={item => item} />
            
        </SafeAreaView>

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
    }

});
export default ShowReactInfo;
