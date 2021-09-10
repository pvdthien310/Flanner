import * as React from 'react';
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default function SignInScreen({ navigation }) {
    const [data, setData] = useState({
        user: '',
        password: '',
        showPassword: false,
        checkUser: false
    });

    const TextInputChange = (val) => {
        if (val.length != 0) {
            setData({
                ...data,
                email: val,
                checkUser: true
            })
        }
        else {
            setData({
                ...data,
                email: val,
                checkUser: false
            })
        }
    }
    return (
        <View style={styles.container}>
            <Animatable.View style={styles.header} animation='zoomInRight' >
                <Text style={styles.welcome}>Welcome to, </Text>
                <Text style={styles.flanner}>Flânner</Text>
            </Animatable.View>
            <Animatable.View style={styles.footer} animation='fadeInUpBig' easing='ease-out-back'>
                <Text style={styles.signInTxt}>Sign In</Text>
                <Text style={styles.accountTxt}>User</Text>
                <View style={styles.accountView}>
                    <TextInput
                        style={styles.accountEdt}
                        placeholder='Type your account'
                        onChangeText={(val) => TextInputChange(val)}
                    />
                    {data.checkUser ? <Ionicons name="checkmark-circle-outline" size={24} color="black" /> : <View style={{ width: 24, height: 24 }}></View>}

                </View>
                <Text style={styles.passwordTxt}>Password</Text>
                <View style={styles.passwordView}>
                    <TextInput
                        style={styles.passwordEdt}
                        placeholder='Type your password'
                        secureTextEntry={!data.showPassword}
                    />
                    <Ionicons
                        name={data.showPassword ? "eye-outline" : "eye-off-outline"}
                        size={24}
                        color="black"
                        onPress={() => setData({ ...data, showPassword: !data.showPassword })}
                    />
                </View>
                <TouchableOpacity style={styles.signInBtn} >
                    <LinearGradient
                        colors={['black', 'dimgray']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Sign In</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.signUpTxt}>Sign Up</Text>
            </Animatable.View>
        </View>
    )
}

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CFCFCF'
    },
    signInTxt: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    flanner: {
        fontSize: 30,
        fontFamily: 'capricaScript',
        marginLeft: 20
    },
    welcome: {
        fontSize: 30,
        marginLeft: 20
    },
    header: {
        height: height * 0.3,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    footer: {
        height: 700,
        backgroundColor: 'white',
        //borderTopLeftRadius: 30,
        borderTopRightRadius: 70,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    accountView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    accountTxt: {
        fontWeight: 'bold',
        marginTop: 20
    },
    accountEdt: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        padding: 5,
        flex: 1
    },
    passwordView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    passwordTxt: {
        fontWeight: 'bold',
        marginTop: 15
    },
    passwordEdt: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        padding: 5,
        flex: 1
    },
    signInBtn: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    },
    signUpTxt: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})