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

    title:{
        paddingTop: 10,
        textAlign:'center',
        fontFamily: 'nunitobold',
        fontSize: 20,
        fontWeight: 'bold'
    },

    caption: {
        padding: 10,
        fontFamily: 'nunito',
        fontSize: 15,
        
    },

    image: {
            
    }

})

export default aboutScreen
