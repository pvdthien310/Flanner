import React from 'react';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        padding: 12,
        marginBottom: 80

    },
    container2: {
        padding: 12
    },
    tittleText: {
        fontFamily: 'nunito-bold',
        fontSize: 25
    },
    textinside: {
        fontSize: 15,
        fontFamily: 'nunito-bold',
        margin: 10
    },
    input: {
        width: 200,
        height: 40,
        borderRadius: 5,
        marginTop: 10,
        borderWidth: 1,
        paddingStart: 10,
        fontSize: 25,
    },
    errorstyle: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center'
    }
})

export const images = {
    ratings: {
        '1': require('../assets/Picture/rating-1.png'),
        '2': require('../assets/Picture/rating-2.png'),
        '3': require('../assets/Picture/rating-3.png'),
        '4': require('../assets/Picture/rating-4.png'),
        '5': require('../assets/Picture/rating-5.png'),
    }
}