import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, Dimensions } from 'react-native';


const { height } = Dimensions.get("screen");
const logoHeight = height * 0.5;


const AboutScreen = ({ navigation }) => {

    
    return (
        <View style={styles.container}>
            
          <Text>About</Text>
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
   

});
export default AboutScreen;
