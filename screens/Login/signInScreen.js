import * as React from 'react';
import { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, CheckBox } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-root-toast';
import { AsyncStorage } from 'react-native';
import base64 from 'react-native-base64'

export default function SignInScreen({ navigation }) {
    // const [data1, setData1] = useState([])
    // const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const { data, loading, user } = useSelector(state => { return state.User })
    const fetchData = () => {
        fetch('http://192.168.0.102:3000/api/user')
            .then(res => res.json())
            .then(result => {
                dispatch({ type: 'ADD_DATA_USER', payload: result })
                dispatch({ type: 'SET_LOADING_USER', payload: false })
              
            }).catch(err => console.log('Error'));
    }
    // const fetchKnowledgeData = () => {
    //     const url = 'http://192.168.0.106:3000/api/knowledge/load-data/' + user.userID
    //     console.log(url)
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(result => {
    //             dispatch({ type: 'ADD_USER_KNOWLEDGE', payload: result })
    //         }).catch(err => console.log('Error'));
    // }
    // const fetchStatusData = () => {
    //     const url = 'http://192.168.0.106:3000/api/status/load-data/' + user.userID
    //     console.log(url)
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(result => {
    //             dispatch({ type: 'ADD_USER_STATUS', payload: result })
    //         }).catch(err => console.log('Error'));
    // }

    _storeData = async () => {
        try {
            await AsyncStorage.setItem('email', 'a');
        } catch (error) {
            console.log(error);
        }
    };
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('saveAccount');
            if (value !== null) {
                console.log(value);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        _storeData();
        _retrieveData();
    }
        , [])


    const [dataTemp, setData] = useState({
        email: '',
        password: '',
        showPassword: false,
        checkUser: false,
        checkPassword: false
    });

    const EmailChange = (val) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(val) === false) {
            setData({
                ...dataTemp,
                email: val,
                checkUser: false
            })
        }
        else {
            setData({
                ...dataTemp,
                email: val,
                checkUser: true
            })
        }
    }
    const PasswordChange = (val) => {
        if (val.length < 6) {
            setData({
                ...dataTemp,
                password: val,
                checkPassword: false
            })
        }
        else {
            setData({
                ...dataTemp,
                password: val,
                checkPassword: true
            })
        }
    }

    const _submit = () => {
        if (!dataTemp.checkUser) {
            let toast = Toast.show('Email invalid', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            return
        }
        else if (!dataTemp.checkPassword) {
            let toast = Toast.show('Password must be more than 5 characters', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            return
        }

        let flag = false;
        data.forEach(element => {
            if (element.email === dataTemp.email) {
                flag = true;
                console.log(dataTemp.email + '  ' + element.email)
                console.log(dataTemp.password + '  ' + element.password)
                if (element.password == base64.encode(dataTemp.password)) {
                    dispatch({ type: 'ADD_USER', payload: element })
                    
                        // fetchKnowledgeData()
                        // fetchStatusData()                      
                     navigation.navigate('DrawerStack')
                }
                else {
                    let toast = Toast.show('Password is incorrect', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });

                    return
                }
            }

        });
        if (!flag) {
            let toast = Toast.show('Email is not registered', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
        }

    }
    return (
        <View style={styles.container}>
            <Animatable.View style={styles.header} animation='zoomInRight' >
                <Text style={styles.welcome}>Welcome to, </Text>
                <Text style={styles.flanner}>Flâner</Text>
            </Animatable.View>

            <Animatable.View style={styles.footer} animation='fadeInUpBig' easing='ease-out-back'>
                <Text style={styles.signInTxt}>Sign In</Text>

                <View>
                    <View style={styles.border}></View>
                    <Text style={styles.accountTxt}> Account</Text>
                    <View style={styles.accountView}>
                        <TextInput
                            style={styles.accountEdt}
                            placeholder='Type your account'
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
                            secureTextEntry={!data.showPassword}
                            onChangeText={(val) => PasswordChange(val)}
                        />
                        <Ionicons
                            name={dataTemp.showPassword ? "eye-outline" : "eye-off-outline"}
                            size={24}
                            color="black"
                            onPress={() => setData({ ...dataTemp, showPassword: !dataTemp.showPassword })}
                        />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CheckBox />
                        <Text>Remember me</Text>
                    </View>

                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                        <Text style={styles.forgot} >Forgot password?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.signInBtn} onPress={_submit}>
                    <Text style={styles.textSign}>SIGN IN</Text>
                </TouchableOpacity>

                <View style={{ marginTop: 20 }}>
                    <View style={{ borderBottomColor: 'grey', borderWidth: 0.3, opacity: 0.5, marginTop: 11 }}></View>
                    <Text style={{ backgroundColor: 'white', position: 'absolute', alignSelf: 'center' }}> or </Text>
                </View>

                <TouchableOpacity style={styles.facebookGoogleBtn}>
                    <AntDesign name="google" size={24} color="black" />
                    <Text style={styles.googleTxt}>Login with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 110 }}
                    onPress={() => navigation.navigate('SignUpScreen')}
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
        alignItems: 'flex-start'
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
        width: 65,
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
        width: 75,
        zIndex: 1,
        marginTop: 15
    },
    passwordEdt: {
        paddingLeft: 13,
        flex: 1
    },
    signInBtn: {
        backgroundColor: 'black',
        marginTop: 15,
        borderRadius: 50,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signIn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    forgot: {
        fontStyle: 'italic',
    },
    facebookGoogleBtn: {
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 15,
        borderRadius: 50,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    googleTxt: {
        color: 'black',
        marginLeft: 8,
        marginRight: 10
    },
    signUpTxt: {
        fontWeight: 'bold'
    },
})