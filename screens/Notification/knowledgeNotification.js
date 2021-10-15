import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image,TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global';
import StatusMember from '../../components/statusMember';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/core';


const KnowledgeNotification = ({ navigation }) => {

    return (
        <View style={styles.container}>
            
          <Text>Notification</Text>
       
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
export default KnowledgeNotification;
