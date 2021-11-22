import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, Dimensions,FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';
import StatusMember from '../../components/statusMember';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';


const { height } = Dimensions.get("screen");
const logoHeight = height * 0.5;


const ShowReactInfo = ({ route, navigation }) => {
    const { data } = route.params;
    const pressgobackHandler = () => {
        navigation.goBack();
    }
    console.log(data)
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pressgobackHandler}>
                <Text> Back </Text>
            </TouchableOpacity>
            <FlatList

                scrollEnabled={true}
                
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={data.react}
                renderItem={({ item }) => (
                    <View>
                       <Text>{item}</Text>
                    </View>
                )}
                keyExtractor={item => item} />
            <Text>React User</Text>
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
