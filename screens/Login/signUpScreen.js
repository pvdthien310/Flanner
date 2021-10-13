import * as React from 'react';
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-root-toast';
import { useSelector, useDispatch } from 'react-redux';

export default function SignUpScreen({ navigation }) {

    const dispatch = useDispatch()
    const { data, loading } = useSelector(state => { return state.User })

    const sendEmail = () => {
        fetch("http://192.168.1.9:3000/api/sendEmail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'flanerapplication<trithuc23232@gmail.com>',
                to: 'trithuc23232@gmail.com',
                subject: 'Verify code',
                html: 'Your verify code is: '
            })
        }).then(res => res.json())
            .then(data => { })
            .catch(err => {
                console.log("error", err)
            })
    }

    const [dataTemp, setDataTemp] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        showPassword: false,
        showConfirm: false,
        checkUser: false,
        checkPassword: false
    });

    const EmailChange = (val) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(val) === false) {
            setDataTemp({
                ...dataTemp,
                email: val,
                checkUser: false
            })
        }
        else {
            setDataTemp({
                ...dataTemp,
                email: val,
                checkUser: true
            })
        }
    }

    const PasswordChange = (val) => {
        if (val.length < 6)
            setDataTemp({
                ...dataTemp,
                password: val,
                checkPassword: false
            })
        else
            setDataTemp({
                ...dataTemp,
                password: val,
                checkPassword: true
            })

    }
    const ConfirmPasswordChange = (val) => {
        setDataTemp({
            ...dataTemp,
            confirm: val
        })
    }
    const NameChange = (val) => {
        setDataTemp({
            ...dataTemp,
            name: val
        })
    }

    const signInHandle = () => {
        if (dataTemp.name == "" || dataTemp.email == "" || dataTemp.password == "" || dataTemp.confirm == "") {
            let toast = Toast.show('Please fill out your information', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            return
        }
        if (!dataTemp.checkPassword) {
            let toast = Toast.show('Password must be more than 5 characters', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            return
        }

        if (dataTemp.confirm != dataTemp.password) {
            let toast = Toast.show('Confirm password is incorrect', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            return
        }
        let flag = false
        data.forEach(element => {
            if (element.email === dataTemp.email) {
                let toast = Toast.show('Email is already in use', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                flag = true
                return
            }
        });
        if (!flag) {
            navigation.navigate('ConfirmEmail')

        }

    }
    const valueMail = {
        from: 'flanerapplication <trithuc23232@gmail.com>',
        to: 'trithuc23232@gmail.com',
        subject: "hello",
        text: 'thuc ne',
        html: '<h1>thuc ne html</h1>'
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
                        {dataTemp.checkUser ? <Ionicons name="checkmark-circle-outline" size={24} color="black" /> : <View style={{ width: 24, height: 24 }}></View>}
                    </View>
                </View>

                <View style={{ marginTop: 5 }}>
                    <View style={styles.border}></View>
                    <Text style={styles.passwordTxt}> Password</Text>
                    <View style={styles.passwordView}>
                        <TextInput
                            style={styles.passwordEdt}
                            placeholder='Type your password'
                            secureTextEntry={!dataTemp.showPassword}
                            onChangeText={(val) => PasswordChange(val)}
                        />
                        <Ionicons
                            name={dataTemp.showPassword ? "eye-outline" : "eye-off-outline"}
                            size={24}
                            color="black"
                            onPress={() => setDataTemp({ ...dataTemp, showPassword: !dataTemp.showPassword })}
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
                            secureTextEntry={!dataTemp.showConfirm}
                            onChangeText={(val) => ConfirmPasswordChange(val)}
                        />
                        <Ionicons
                            name={dataTemp.showConfirm ? "eye-outline" : "eye-off-outline"}
                            size={24}
                            color="black"
                            onPress={() => setDataTemp({ ...dataTemp, showConfirm: !dataTemp.showConfirm })}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.signInBtn} onPress={(sendEmail)}>
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