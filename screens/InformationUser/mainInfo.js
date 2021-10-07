import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image,TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global';
import StatusMember from '../../components/statusMember';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/core';


const MainInfor = ({ navigation }) => {

    const pressgobackHandler = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
          <Text>User Information</Text>
          <TouchableOpacity onPress={pressgobackHandler}>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons style={{ marginBottom: 15 }} name="chevron-back" size={30} color="black" />
                    </View>


                </TouchableOpacity>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginBottom: 80,
        // backgroundColor: 'black'

    },
   
});
export default MainInfor;
