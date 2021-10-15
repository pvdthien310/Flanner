import React from 'react';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        padding: 12,
        marginBottom: 80,
        backgroundColor: 'white'

    },
    container2: {
        padding: 12
    },
    tittleText: {
        fontFamily: 'nunitobold',
        fontSize: 25
    },
    textinside: {
        fontSize: 15,
        fontFamily: 'nunitobold',
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

