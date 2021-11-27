import * as React from 'react';
import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import Toast from 'react-native-root-toast';
import base64 from 'react-native-base64'
import { useSelector, useDispatch } from 'react-redux';
import { URL_local } from '../../constant.js';

export default function ConfirmEmailForgot({ route, navigation }) {
    const dispatch = useDispatch()
    const { data, loading } = useSelector(state => { return state.User })

    const {
        email,
        password,
        showPassword,
        checkUser,
        verifyCode,
        confirm,
        checkPassword
    } = route.params.dataForgot

    const [user, setUser] = useState()

    useEffect(() => {
        data.forEach(element => {
            if (element.email === email) {
                setUser(element)
                return
            }
        });
    }
        , [])

    const _ResetData = () => {
        const url = URL_local + 'user/update'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: user._id,
                userID: user.userID,
                phoneNumber: user.phoneNumber,
                name: user.name,
                doB: user.doB,
                avatar: user.avatar,
                email: email,
                friendArray: user.friendArray,
                password: base64.encode(password),
                score: user.score,
                address: user.address,
                position: user.position,
                reportedNum: user.reportedNum,
            })
        }).then(res => res.json())
            .then(data => { })
            .catch(err => {
                console.log("error", err)
            })
    }

    const confirmHandle = (value) => {
        let result = ''
        result += value.key1
        result += value.key2
        result += value.key3
        result += value.key4
        result += value.key5
        result += value.key6

        if (result != verifyCode) {
            let toast = Toast.show('Incorrect verify code', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
        }
        else {
            _ResetData()
            let toast = Toast.show('Reset successfully', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            console.log(password)
            navigation.navigate('SignInScreen')
        }
    }
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/flaner.png')}
                resizeMode='stretch'
            />

            <Text style={styles.text}>
                Your verify code
            </Text>
            <Formik
                initialValues={{ key1: '', key2: '', key3: '', key4: '', key5: '', key6: '' }}
                onSubmit={values => {
                    console.log(values)
                    confirmHandle(values)
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={styles.input}
                                maxLength={1}
                                textAlign={'center'}
                                onChangeText={handleChange('key1')}
                                onBlur={handleBlur('key1')}
                                value={values.key1} />
                            <TextInput
                                style={styles.input}
                                maxLength={1}
                                textAlign={'center'}
                                onChangeText={handleChange('key2')}
                                onBlur={handleBlur('key2')}
                                value={values.key2} />
                            <TextInput
                                style={styles.input}
                                maxLength={1}
                                textAlign={'center'}
                                onChangeText={handleChange('key3')}
                                onBlur={handleBlur('key3')}
                                value={values.key3} />
                            <TextInput
                                style={styles.input}
                                maxLength={1}
                                textAlign={'center'}
                                onChangeText={handleChange('key4')}
                                onBlur={handleBlur('key4')}
                                value={values.key4} />
                            <TextInput
                                style={styles.input}
                                maxLength={1}
                                textAlign={'center'}
                                onChangeText={handleChange('key5')}
                                onBlur={handleBlur('key5')}
                                value={values.key5} />
                            <TextInput
                                style={styles.input}
                                maxLength={1}
                                textAlign={'center'}
                                onChangeText={handleChange('key6')}
                                onBlur={handleBlur('key6')}
                                value={values.key6} />
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <LinearGradient
                                colors={['black', 'dimgray']}
                                style={styles.gradient}>
                                <Text style={styles.textConfirm}>Confirm</Text>
                            </LinearGradient>

                        </TouchableOpacity>
                    </View>

                )}
            </Formik>



        </View>

    )
}
const { height } = Dimensions.get("screen");
const logoHeight = height * 0.2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        margin: 8,
        paddingVertical: 5,
        paddingHorizontal: 8
    },
    text: {
        alignSelf: 'flex-end',
        marginRight: 20,
        fontSize: 15,
        fontFamily: 'nunitobold'
    },
    logo: {
        height: logoHeight,
        width: logoHeight,
        marginBottom: 70
    },
    button: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 10
    },
    textConfirm: {
        color: 'white',
        fontFamily: 'nunitobold'
    },
    gradient: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20
    }
})