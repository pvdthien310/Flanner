import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



const SystemNotification = ({ navigation }) => {
   
    return (
        <View style={styles.container}>
            
          <Text>System Notification</Text>
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
export default SystemNotification;
