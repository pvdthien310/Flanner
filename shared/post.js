import React from 'react'
import { StyleSheet, View } from 'react-native'
import { max } from 'react-native-reanimated'
import { Poststyle } from '../styles/poststyle'

export default function Post(props) {
    return (
        <View style={styles.post}>
            <View style={styles.cardcontent}>
                {props.children}
            </View>
        </View>
    )
}

export function UserInfo(props) {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                backgroundColor: 'ghostwhite',
                shadowOffset: { width: 1, height: 1 },
                shadowColor: 'black',
                shadowOpacity: 0.2,
                shadowRadius: 2,
                borderRadius: 10,
                padding: 10


            }}>
            {props.children}

        </View>
    )
}
export function UserInfoText(props) {
    return (
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }}>
            {props.children}

        </View>
    )
}

export function PostText(props) {
    return (
        <View style={{
            marginBottom: 10,
            padding: 10,
            marginTop: -10
        }}>
            {props.children}
        </View>
    )
}
export function PostImage(props) {
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        }}>
            {props.children}
        </View>
    )
}
export function ReactNumber(props) {
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            shadowOffset: { width: 1, height: 1 },
            shadowColor: 'black',
            shadowOpacity: 0.3,
            shadowRadius: 2,
            marginTop: 5,
            marginEnd: 10,
            marginStart: 13,
            borderRadius: 2,
            padding: 6,
            borderWidth: 1,
            backgroundColor: 'black',




        }}>
            {props.children}
        </View>
    )
}

export function ReactNumber1(props) {
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            shadowOffset: { width: 1, height: 1 },
            shadowColor: '',
            shadowOpacity: 0.1,
            shadowRadius: 2,
            marginTop: 5,
            marginEnd: 10,
            marginStart: 13,
            borderRadius: 2,
            padding: 6,
            backgroundColor: 'lightslategrey',
        }}>
            {props.children}
        </View>
    )
}
export function InteractionWrapper(props) {
    return (
        <View style={Poststyle.interactionwrapper}>
            {props.children}
        </View>
    )
}



const styles = StyleSheet.create({
    post: {
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,

    },
    cardcontent: {
        marginHorizontal: 18,
        marginVertical: 14,
    }
})