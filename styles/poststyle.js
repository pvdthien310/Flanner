import React from 'react';
import { StyleSheet } from 'react-native';

export const images = {
    avatars: {
        '1': require('../assets/avatar/avatar1.jpg'),
        '2': require('../assets/avatar/avatar2.jpg'),
        '3': require('../assets/avatar/avatar1.jpg'),
        '4': require('../assets/avatar/avatar1.jpg'),
    }
}
export const imagespost = {
    imagepost: {
        '1': require('../assets/imagepost/imagepost1.jpg'),
        '2': require('../assets/imagepost/imagepost1.jpg'),
        '3': require('../assets/imagepost/imagepost1.jpg'),
        '4': require('../assets/imagepost/imagepost1.jpg'),
    }
}
export const Poststyle = StyleSheet.create({
    name: {
        fontFamily: 'nunitobold',
        fontSize: 15,
        marginStart: 5,
        marginTop: 5
    },
    posttime: {
        fontFamily: 'nunitoregular',
        fontSize: 10,
        marginStart: 8,
    },
    body: {
        fontFamily: 'nunitoregular',
        fontSize: 15,
        marginTop: 5
    },
    imageavatar: {
        width: 50,
        height: 50,
        borderRadius: 15
    },
    imagepost: {
        height: 300,
        width: 350,
        resizeMode: 'stretch',
        margin: 5,
        flex: 1

    },
    imagenumber: {
        textAlign: 'right',
        fontFamily: 'nunitobold',
        borderWidth: 1,
        borderRadius: 5,
        paddingStart: 2,
        paddingEnd: 2,
        borderColor: 'lightgrey',
        marginTop: -10,
        color: 'lightgrey',


    },
    imagenumber1: {
        height: 0
    }
    ,
    interactionwrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        marginTop: -5

    },
    buttonpost: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 2,

    },
    buttontext: {
        marginTop: 5,
        marginStart: 5,
        fontFamily: 'nunitobold',
        fontSize: 15,
        color: 'black'
    },
    reactnumber: {

        fontFamily: 'nunitobold',
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 1,

    },

    buttontext1: {
        marginTop: 5,
        marginStart: 5,
        fontFamily: 'nunitobold',
        fontSize: 15,
        color: 'firebrick'
    },
    buttonicon: {
        marginTop: 5,
        color: "black"
    },
    buttonicon1: {
        marginTop: 5,
        color: "firebrick"
    },
    buttonfavorite: {

        color: "black"
    },
    buttonfavorite1: {

        color: "yellow"
    }



})
export const Poststyle_Knowledge = StyleSheet.create({
    name: {
        fontFamily: 'nunitobold',
        fontSize: 15,
        marginStart: 5,
        marginTop: 5
    },
    posttime: {
        fontFamily: 'nunitoregular',
        fontSize: 10,
        marginStart: 8,
    },
    title: {
        fontFamily: 'nunitobold',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5,
    },
    description: {
        fontFamily: 'nunitoregular',
        fontSize: 15,
        marginTop: 5,
        color: 'dimgray'
    },
    body: {
        fontFamily: 'nunitoregular',
        fontSize: 15,
        marginTop: 5
    },
    body_detail: {
        fontFamily: 'nunitoregular',
        fontSize: 18,
        marginTop: 5
    },
    imageavatar: {
        width: 50,
        height: 50,
        borderRadius: 15
    },
    imagepost: {
        height: 250,
        width: 350,
        resizeMode: 'stretch',
        margin: 5,
        flex: 1

    },
    imagenumber: {
        textAlign: 'right',
        fontFamily: 'nunitobold',
        borderWidth: 1,
        borderRadius: 5,
        paddingStart: 2,
        paddingEnd: 2,
        borderColor: 'lightgrey',
        marginTop: -10,
        color: 'lightgrey',


    },
    imagenumber1: {
        height: 0
    }
    ,
    interactionwrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        marginTop: -5

    },
    buttonpost: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 2,

    },
    buttontext: {
        marginTop: 5,
        marginStart: 5,
        fontFamily: 'nunitobold',
        fontSize: 15,
        color: 'black'
    },
    reactnumber: {

        fontFamily: 'nunitobold',
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 1,

    },
    reactnumber_detail: {

        fontFamily: 'nunitobold',
        fontSize: 15,
        textAlign: 'center',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 1,

    },
    buttontext1: {
        marginTop: 5,
        marginStart: 5,
        fontFamily: 'nunitobold',
        fontSize: 15,
        color: 'firebrick'
    },
    buttonicon: {
        marginTop: 5,
        color: "black"
    },
    buttonicon1: {
        marginTop: 5,
        color: "firebrick"
    },
    buttonfavorite: {

        color: "black"
    },
    buttonfavorite1: {

        color: "yellow"
    }


})

export const Poststyle_Status = StyleSheet.create({
    name: {
        fontFamily: 'nunitobold',
        fontSize: 15,
        marginStart: 5,
        marginTop: 5
    },
    title_detail: {
        fontFamily: 'nunitobold',
        fontSize: 22,
        marginTop: 5
    },
    body_detail: {
        fontFamily: 'nunitoregular',
        fontSize: 18,
        marginTop: 5
    },
    posttime: {
        fontFamily: 'nunitoregular',
        fontSize: 10,
        marginStart: 8,
    },
    title: {
        fontFamily: 'nunitobold',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5,
    },
    description: {
        fontFamily: 'nunitoregular',
        fontSize: 15,
        marginTop: 5,
        color: 'dimgray'
    },
    body: {
        fontFamily: 'nunitoregular',
        fontSize: 15,
        marginTop: 5
    },
    imageavatar: {
        width: 50,
        height: 50,
        borderRadius: 15
    },
    imagepost: {
        height: 250,
        width: 350,
        resizeMode: 'stretch',
        margin: 5,
        flex: 1

    },
    imagenumber: {
        textAlign: 'right',
        fontFamily: 'nunitobold',
        borderWidth: 1,
        borderRadius: 5,
        paddingStart: 2,
        paddingEnd: 2,
        borderColor: 'lightgrey',
        marginTop: -10,
        color: 'lightgrey',


    },
    imagenumber1: {
        height: 0
    }
    ,
    interactionwrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        marginTop: -5

    },
    buttonpost: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 2,

    },
    buttontext: {
        marginTop: 5,
        marginStart: 5,
        fontFamily: 'nunitobold',
        fontSize: 15,
        color: 'black'
    },
    reactnumber: {

        fontFamily: 'nunitobold',
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 1,

    },
    buttontext1: {
        marginTop: 5,
        marginStart: 5,
        fontFamily: 'nunitobold',
        fontSize: 15,
        color: 'firebrick'
    },
    buttonicon: {
        marginTop: 5,
        color: "black"
    },
    buttonicon1: {
        marginTop: 5,
        color: "firebrick"
    },
    buttonfavorite: {

        color: "black"
    },
    buttonfavorite1: {

        color: "yellow"
    }


})