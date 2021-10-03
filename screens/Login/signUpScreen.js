import * as React from 'react';
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default function SignUpScreen({ navigation }) {

    const _submitData = () => {
        fetch("http://192.168.1.6:3000/api/user/send-data", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'thfrhg',
                password: '123',
                name: 'thuc ne',
                contact: '123456',
                address: 'soc trang',
                profilePic: 'dsgfh'
            })
        }).then(res => res.json())
            .then(data => {

            }).catch(err => {
                console.log("error", err)
            })
    }

    const [data, setData] = useState({
        user: '',
        password: '',
        confirm: '',
        showPassword: false,
        showConfirm: false,
        checkUser: false,
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
                <Text style={styles.welcome}>Create your </Text>
                <Text style={styles.flanner}>Flâner</Text>
            </Animatable.View>

            <Animatable.View style={styles.footer} animation='fadeInUpBig' easing='ease-out-back'>
                <Text style={styles.signInTxt}>Sign Up</Text>
                <View>
                    <View style={styles.border}></View>
                    <Text style={styles.accountTxt}> Email</Text>
                    <View style={styles.accountView}>
                        <TextInput
                            style={styles.accountEdt}
                            placeholder='Type your email'
                            onChangeText={(val) => TextInputChange(val)}
                        />
                        {data.checkUser ? <Ionicons name="checkmark-circle-outline" size={24} color="black" /> : <View style={{ width: 24, height: 24 }}></View>}
                    </View>
                </View>

                <View style={{ marginTop: 5 }}>
                    <View style={styles.border}></View>
                    <Text style={styles.passwordTxt}> Password</Text>
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
                </View>

                <View style={{ marginTop: 5 }}>
                    <View style={styles.border}></View>
                    <Text style={styles.confirmPasswordTxt}> Confirm password </Text>
                    <View style={styles.passwordView}>
                        <TextInput
                            style={styles.passwordEdt}
                            placeholder='Confirm your password'
                            secureTextEntry={!data.showConfirm}
                        />
                        <Ionicons
                            name={data.showConfirm ? "eye-outline" : "eye-off-outline"}
                            size={24}
                            color="black"
                            onPress={() => setData({ ...data, showConfirm: !data.showConfirm })}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.signInBtn} onPress={_submitData}>
                    <LinearGradient
                        colors={['black', 'dimgray']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Sign Up</Text>
                    </LinearGradient>
                </TouchableOpacity>


                <TouchableOpacity
                    style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 170 }}
                    onPress={() => navigation.navigate('SignInScreen')}
                >
                    <Text style={{ fontStyle: 'italic' }}>You don't have account? </Text>
                    <Text style={styles.signUpTxt}>Sign Up</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    )
}

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");

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
        marginTop: 10,
        fontSize: 30,
        marginLeft: 20
    },
    header: {
        height: height * 0.25,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    footer: {
        height: 700,
        backgroundColor: 'white',
        //borderTopLeftRadius: 30,
        borderTopRightRadius: 70,
        paddingVertical: 40,
        paddingHorizontal: 30
    },
    accountView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    border: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 25,
        position: 'absolute',
        top: 0,
        height: height * 0.06,
        width: width * 0.85
    },
    accountTxt: {
        fontWeight: 'bold',
        marginLeft: 25,
        backgroundColor: 'white',
        width: 41,
        zIndex: 1,
        marginTop: 15
    },
    accountEdt: {
        paddingLeft: 13,
        flex: 1
    },
    passwordView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    passwordTxt: {
        fontWeight: 'bold',
        marginLeft: 25,
        backgroundColor: 'white',
        width: 70,
        marginTop: 15
    },
    passwordEdt: {
        paddingLeft: 13,
        flex: 1
    },
    confirmPasswordTxt: {
        fontWeight: 'bold',
        marginLeft: 25,
        backgroundColor: 'white',
        width: 123,
        marginTop: 15
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
    forgot: {
        fontStyle: 'italic',
    },
    signUpTxt: {
        fontWeight: 'bold'
    },
})