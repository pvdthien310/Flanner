import * as React from 'react';
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-root-toast';
import { URL_local } from '../../constant';

export default function SignUpScreen({ navigation }) {

    const _submitData = () => {
        const url = URL_local + 'user/send-data'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: 'IK1P3Y',
                phoneNumber: '0987634665',
                name: 'Linh Nguyen',
                doB: '15/07/2001',
                avatar: '',
                email: '19520145@gm.uit.edu.vn',
                friendArray: '',
                password: '123456',
                score: '0',
                address: 'Soc Trang',
                position: '0',
                reportedNum: '0',
            })
        }).then(res => res.json())
            .then(data => { })
            .catch(err => {
                console.log("error", err)
            })
    }

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        showPassword: false,
        showConfirm: false,
        checkUser: false,
    });

    const EmailChange = (val) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(val) === false) {
            setData({
                ...data,
                email: val,
                checkUser: false
            })
        }
        else {
            setData({
                ...data,
                email: val,
                checkUser: true
            })
        }


    }

    const PasswordChange = (val) => {
        setData({
            ...data,
            password: val
        })

    }
    const ConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm: val
        })
    }
    const NameChange = (val) => {
        setData({
            ...data,
            name: val
        })
    }

    const signInHandle = () => {
        if (data.name == "" || data.email == "" || data.password == "" || data.confirm == "") {
            let toast = Toast.show('Please fill out your information', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            return
        }
        if (!data.checkUser) {
            let toast = Toast.show('Email is incorrect', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            return
        }
        if (data.confirm != data.password) {
            let toast = Toast.show('Confirm password is incorrect', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            return
        }
        navigation.navigate('ConfirmEmail')
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
                    <Text style={styles.accountTxt}> Name</Text>
                    <View style={styles.accountView}>
                        <TextInput
                            style={styles.accountEdt}
                            placeholder='Type your name'
                            onChangeText={(val) => NameChange(val)}
                        />
                    </View>
                </View>

                <View>
                    <View style={styles.border}></View>
                    <Text style={styles.accountTxt}> Email</Text>
                    <View style={styles.accountView}>
                        <TextInput
                            style={styles.accountEdt}
                            placeholder='Type your email'
                            onChangeText={(val) => EmailChange(val)}
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
                            onChangeText={(val) => PasswordChange(val)}
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
                            onChangeText={(val) => ConfirmPasswordChange(val)}
                        />
                        <Ionicons
                            name={data.showConfirm ? "eye-outline" : "eye-off-outline"}
                            size={24}
                            color="black"
                            onPress={() => setData({ ...data, showConfirm: !data.showConfirm })}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.signInBtn} onPress={(_submitData)}>
                    <LinearGradient
                        colors={['black', 'dimgray']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Sign Up</Text>
                    </LinearGradient>
                </TouchableOpacity>


                <TouchableOpacity
                    style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 120 }}
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