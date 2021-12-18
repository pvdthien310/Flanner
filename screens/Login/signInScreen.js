import * as React from 'react';
import { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, AppRegistry, TouchableWithoutFeedback, Keyboard, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-root-toast';
import { AsyncStorage } from 'react-native';
import base64 from 'react-native-base64'
import { URL_local, URL_local_user } from '../../constant.js';
import Api from '../../API/UserAPI'
import JWTApi from '../../API/JWTAPI'
import DatabaseClient from '../../API/DatabaseAPI.js';
import KnowLedgeApi from '../../API/KnowledgeAPI.js';
import { Checkbox } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';









export default function SignInScreen({ navigation }) {
    // const [data1, setData1] = useState([])
    // const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const { data, loading, user } = useSelector(state => { return state.User })
    const { accessToken, refreshToken } = useSelector(state => { return state.JWT })

    // const fetchData = async () => {
    //     // const url = URL_local_user + 'user'
    //     // fetch(url)
    //     //     .then(res => res.json())
    //     //     .then(result => {
    //     //         dispatch({ type: 'ADD_DATA_USER', payload: result })
    //     //         dispatch({ type: 'SET_LOADING_USER', payload: false })

    //     //     }).catch(err => console.log('Error'));
    //     await Api.getAll().then(result => {
    //         dispatch({ type: 'ADD_DATA_USER', payload: result })
    //         dispatch({ type: 'SET_LOADING_USER', payload: false })
    //     })
    // }


    _storeData = async () => {
        try {
            await AsyncStorage.setItem('email', dataTemp.email);
            await AsyncStorage.setItem('password', dataTemp.password);
            if (isSelected)
                await AsyncStorage.setItem('remember', 'true');
            else
                await AsyncStorage.setItem('remember', 'false');
        } catch (error) {
            console.log(error);
        }
    };
    const [saveData, setSaveData] = useState({
        email: '',
        password: '',
    })
    const [isSelected, setSelection] = useState(false);
    _retrieveData = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const password = await AsyncStorage.getItem('password');
            const remember = await AsyncStorage.getItem('remember');
            if (email !== null && password !== null && remember === 'true') {
                setSaveData({
                    email: email,
                    password: password,
                })
                if (remember === 'true')
                    setSelection(true)
                else
                    setSelection(false)

                setData({
                    ...dataTemp,
                    email: email,
                    password: password,
                    checkUser: true,
                    checkPassword: true
                })
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // fetchData();
        _retrieveData();
    }
        , [])


    const [dataTemp, setData] = useState({
        email: '',
        password: '',
        showPassword: false,
        checkUser: false,
        checkPassword: false,
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



    const _submit = async () => {

        // if (!dataTemp.checkUser) {
        //     let toast = Toast.show('Email invalid', {
        //         duration: Toast.durations.SHORT,
        //         position: Toast.positions.BOTTOM,
        //         shadow: true,
        //         animation: true,
        //         hideOnPress: true,
        //     });
        //     return
        // }
        // else if (!dataTemp.checkPassword) {
        //     let toast = Toast.show('Password must be more than 5 characters', {
        //         duration: Toast.durations.SHORT,
        //         position: Toast.positions.BOTTOM,
        //         shadow: true,
        //         animation: true,
        //         hideOnPress: true,
        //     });
        //     return
        // }

        let flag = false;

        await Api.checkLogin(dataTemp.email, dataTemp.password)
            .then(res => {
                if (res != 'Invalid Password!' && res != 'Login failed! Account was not registered!') {
                    res.forEach(async element => {
                        if (element.email === dataTemp.email) {
                            if (element.reportedNum == "3") {
                                let toast = Toast.show('Account was blocked. Please contact with us to get more information!', {
                                    duration: Toast.durations.SHORT,
                                    position: Toast.positions.BOTTOM,
                                    shadow: true,
                                    animation: true,
                                    hideOnPress: true,
                                });
                                return;
                            }
                            flag = true;
                            dispatch({ type: 'ADD_DATA_USER', payload: res })
                            dispatch({ type: 'SET_LOADING_USER', payload: false })
                            dispatch({ type: 'ADD_USER', payload: element })
                            _storeData()

                            await JWTApi.getToken(element.userID).then(
                                res => {
                                    // console.log(element.position)
                                    // console.log(res)
                                    if (element.position == '2') {
                                        navigation.navigate('DrawerStack', {
                                            screen: 'NewsFeed',
                                            params: {},
                                        })
                                        dispatch({ type: 'UPDATE_FEATURE', payload: 1 })
                                        let toast = Toast.show('Login Successful', {
                                            duration: Toast.durations.SHORT,
                                            position: Toast.positions.BOTTOM,
                                            shadow: true,
                                            animation: true,
                                            hideOnPress: true,
                                        });
                                    }
                                    else if (element.position == '0' || element.position == '1') {
                                        navigation.navigate('DrawerStack', {
                                            screen: 'User Information',
                                            params: {},
                                        })
                                        dispatch({ type: 'UPDATE_FEATURE', payload: 0 })
                                        let toast = Toast.show('Login Successful', {
                                            duration: Toast.durations.SHORT,
                                            position: Toast.positions.BOTTOM,
                                            shadow: true,
                                            animation: true,
                                            hideOnPress: true,
                                        });
                                    }
                                }
                            )
                        }
                    });
                }
                else {
                    let toast = Toast.show(res, {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                    return
                }
            })

        // data.forEach(async element => {
        //     if (element.email === dataTemp.email) {
        //         flag = true;
        //         if (element.password == base64.encode(dataTemp.password)) {
        //             dispatch({ type: 'ADD_USER', payload: element })
        //             _storeData()
        //             await JWTApi.getToken(element.userID).then(
        //                 res => {
        //                     if (element.position == '2') {
        //                         navigation.navigate('DrawerStack', {
        //                             screen: 'NewsFeed',
        //                             params: {},
        //                         })
        //                         dispatch({ type: 'UPDATE_FEATURE', payload: 1 })
        //                     }
        //                     else if (element.position == '0' || element.position == '1') {
        //                         navigation.navigate('DrawerStack', {
        //                             screen: 'User Information',
        //                             params: {},
        //                         })
        //                         dispatch({ type: 'UPDATE_FEATURE', payload: 0 })
        //                     }


        //                 }
        //             )




        //         }
        //         else {
        //             let toast = Toast.show('Password is incorrect', {
        //                 duration: Toast.durations.SHORT,
        //                 position: Toast.positions.BOTTOM,
        //                 shadow: true,
        //                 animation: true,
        //                 hideOnPress: true,
        //             });
        //             return
        //         }
        //     }

        // });
        // if (!flag) {
        //     let toast = Toast.show('Email is not registered', {
        //         duration: Toast.durations.SHORT,
        //         position: Toast.positions.BOTTOM,
        //         shadow: true,
        //         animation: true,
        //         hideOnPress: true,
        //     });
        // }

    }
    return (
        <View style={styles.container}>
            <Animatable.View style={styles.header} animation='zoomInRight' >
                <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', marginStart: 20, marginTop: 10 }}>
                    <Image source={require('../../assets/flaner.png')} style={{ height: 80, width: 80 }}></Image>
                    <View>
                        <Text style={styles.welcome}>Welcome to, </Text>
                        <Text style={styles.flanner}>Flâner</Text>
                    </View>

                </View>
            </Animatable.View>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Animatable.View style={styles.footer} animation='fadeInUpBig' easing='ease-out-back'>
                    <Text style={styles.signInTxt}>Sign In</Text>

                    <View>
                        {/* <View style={styles.border}></View> */}
                        {/* <Text style={styles.accountTxt}> Account</Text> */}
                        <View style={styles.accountView}>
                            <TextInput
                                style={styles.accountEdt}
                                placeholder='Type your account'
                                onChangeText={(val) => EmailChange(val)}
                                defaultValue={saveData.email}
                            />
                            {dataTemp.checkUser ? <Ionicons style={{ marginEnd: 10 }} name="checkmark-circle-outline" size={24} color="black" /> : <View style={{ width: 24, height: 24 }}></View>}

                        </View>
                    </View>

                    <View style={{ marginTop: 5 }}>
                        {/* <View style={styles.border}></View>
                    <Text style={styles.passwordTxt}> Password</Text> */}
                        <View style={styles.passwordView}>
                            <TextInput
                                style={styles.passwordEdt}
                                placeholder='Type your password'
                                secureTextEntry={!dataTemp.showPassword}
                                onChangeText={(val) => PasswordChange(val)}
                                defaultValue={saveData.password}
                            />
                            <Ionicons
                                style={{ alignSelf: 'center', marginEnd: 10 }}
                                name={dataTemp.showPassword ? "eye-outline" : "eye-off-outline"}
                                size={24}
                                color="black"
                                onPress={() => setData({ ...dataTemp, showPassword: !dataTemp.showPassword })}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* <Checkbox
                           style= {{alignSelf:'center', height: 10, width: 10, marginEnd: 10, backgroundColor:'red'}}
                            value={isSelected}
                            onValueChange={(value) => setSelection}
                            tintColors={{ true: 'black', false: 'black' }}
                        /> */}
                            <Checkbox
                                color='#000000'
                                uncheckedColor='#000000'
                                status={isSelected ? 'checked' : 'unchecked'}
                                onPress={() => setSelection(!isSelected)}
                            />
                            <Text>Remember me</Text>
                        </View>

                        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                            <Text style={styles.forgot} >Forgot password?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.signInBtn} onPress={_submit}>
                        <Text style={styles.textSign}>SIGN IN</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: height * 0.2 }}>
                        <View style={{ borderBottomColor: 'grey', borderWidth: 1, opacity: 0.5, marginTop: 11 }}></View>
                        <Text style={{ backgroundColor: 'white', position: 'absolute', alignSelf: 'center' }}> or </Text>
                    </View>

                    {/* <TouchableOpacity style={styles.facebookGoogleBtn}>
                    <AntDesign name="google" size={24} color="black" />
                    <Text style={styles.googleTxt}>Login with Google</Text>
                </TouchableOpacity> */}

                    <TouchableOpacity
                        style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, alignItems: 'flex-end', }}
                        onPress={() => navigation.navigate('SignUpScreen')}
                    >
                        <Text style={{ fontStyle: 'italic' }}>You don't have account? </Text>
                        <Text style={styles.signUpTxt}>Sign Up</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </TouchableWithoutFeedback>
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
        fontFamily: 'nunitobold',
        fontSize: 20,
        marginLeft: 20
    },
    header: {
        height: height * 0.25,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    footer: {
        height: height * 0.9,
        backgroundColor: 'white',
        //borderTopLeftRadius: 30,
        borderTopRightRadius: 70,
        paddingVertical: 40,
        paddingHorizontal: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
    },
    accountView: {
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        marginTop: 20
    },
    border: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 25,
        position: 'absolute',
        top: 0,
        height: height * 0.05,
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
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        marginTop: 20
    },
    passwordTxt: {
        fontWeight: 'bold',
        marginLeft: 25,
        backgroundColor: 'white',
        width: 75,
        zIndex: 1,
        marginTop: 17
    },
    passwordEdt: {
        paddingLeft: 13,
        flex: 1
    },
    signInBtn: {
        backgroundColor: 'black',
        marginTop: 15,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signIn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
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