import * as React from 'react';
import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { EvilIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { AsyncStorage } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function SplashScreen({ navigation }) {
    _retrieveData = async () => {
        try {
            const temp = await AsyncStorage.getItem('newUser');

            // if (temp !== null) {
            //     navigation.navigate('SignInScreen')
            // }
        }
        catch (error) {
            console.log(error);
        }
    };
    _storeData = async () => {
        try {
            await AsyncStorage.setItem('newUser', 'true');

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        _retrieveData();
        _storeData();

    }, [])


    const data = [
        {
            key: "0",
            photo: 'https://images.unsplash.com/photo-1634954230878-4b0174e50a7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            title: 'Android launch screen',
            description: 'Splash screens (also known as launch screens) provide a simple initial experience while your mobile app loads.',
            avatar_url: `http://randomuser.me/api/portraits/women/${Math.floor(
                Math.random() * 40
            )}.jpg`
        },
        {
            key: "1",
            photo: 'https://images.unsplash.com/photo-1634938971687-1082b4cb018c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            title: 'Initializing the app',
            description: 'All apps submitted to the Apple App Store must use an Xcode storyboard to provide the app’s launch screen.',
            avatar_url: `http://randomuser.me/api/portraits/women/${Math.floor(
                Math.random() * 40
            )}.jpg`
        },
        {
            key: "2",
            photo: 'https://images.unsplash.com/photo-1634952597304-b5dde0c621ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80',
            title: 'Set up the FlutterActivity',
            description: 'Every Android app requires initialization time while the operating system sets up the app’s process.',
            avatar_url: `http://randomuser.me/api/portraits/women/${Math.floor(
                Math.random() * 40
            )}.jpg`
        },
        {
            key: "3",
            photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80',
            title: 'Android S',
            description: 'The Android app now displays the desired launch screen while the app initializes',
            avatar_url: `http://randomuser.me/api/portraits/women/${Math.floor(
                Math.random() * 40
            )}.jpg`
        },
        {
            key: "4",
            photo: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            title: 'Custom splash screens',
            description: 'See Android Splash Screens first on how to configure your splash screen on Android S.',
            avatar_url: `http://randomuser.me/api/portraits/women/${Math.floor(
                Math.random() * 40
            )}.jpg`
        },
    ]

    const scrollX = React.useRef(new Animated.Value(0)).current

    const Indicator = ({ scrollX }) => {
        return (
            <View style={{ position: 'absolute', bottom: 30, flexDirection: 'row', alignSelf: 'center' }}>
                {data.map((_, i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + i) * width];

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.8, 1.4, 0.8],
                        extrapolate: 'clamp'
                    })
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.4, 0.9, 0.4],
                        extrapolate: 'clamp'
                    })
                    return <Animated.View
                        key={`indicator-${i}`}
                        style={{
                            height: 8,
                            width: 8,
                            borderRadius: 4,
                            backgroundColor: '#fff',
                            opacity,
                            margin: 10,
                            transform: [
                                {
                                    scale,
                                },
                            ],
                        }}
                    />
                })}
            </View>
        )
    }
    return (
        <View style={styles.container}>

            <Animated.FlatList
                data={data}
                keyExtractor={item => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width
                    ]
                    const translateX = scrollX.interpolate({
                        inputRange,
                        outputRange: [-width * .7, 0, width * .7]
                    })

                    return (<View style={{ width: width, alignItems: 'center', marginTop: 0 }}>
                        <View
                            style={{
                                borderRadius: 20,
                                shadowColor: '#000000',
                                shadowOpacity: 1,
                                shadowRadius: 20,
                                shadowOffset: {
                                    width: 0,
                                    height: 0
                                },
                            }}
                        >

                            <View
                                style={{
                                    height: height,
                                    width: width,
                                    overflow: 'hidden',
                                    alignItems: 'center',
                                    borderRadius: 0
                                }}
                            >
                                <Animated.Image
                                    source={{ uri: item.photo }}
                                    style={{
                                        position: 'absolute',
                                        resizeMode: 'cover',
                                        height: height,
                                        width: width * 1.4,
                                        transform: [{
                                            translateX,
                                        }]
                                    }}
                                />
                                <View style={{ position: 'absolute', bottom: 180, paddingLeft: 20, paddingRight: 20 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>{item.title}</Text>
                                    <Text style={{ color: 'white' }}>{item.description}</Text>
                                </View>


                            </View>

                            <Image
                                source={{ uri: item.avatar_url }}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 60,
                                    position: 'absolute',
                                    bottom: -30,
                                    right: 40
                                }}
                            />
                        </View>

                    </View>
                    )
                }}
            />
            {/* <Animatable.View style={styles.footer} animation='fadeInUpBig' easing='ease-out-back'>
                <Text style={styles.title}>Stay connect with everyone!</Text>
                <Text style={styles.text}>Sign in with account</Text>
               
            </Animatable.View> */}
            <Indicator scrollX={scrollX} />

            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('SignInScreen') }}>
                <Text style={{ fontStyle: 'italic', color: 'white', fontSize: 18 }}>Skip</Text>
                <EvilIcons name="chevron-right" size={24} color='white' />
            </TouchableOpacity>

            <Animatable.Image
                animation={logoAnim}
                style={styles.logo}
                source={require('../../assets/flaner.png')}
                resizeMode='stretch'
                easing='ease-out-back' />
        </View>
    )
}

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
const logoHeight = height * 0.2;

const logoAnim = {
    from: {
        rotate: "0deg",
        scale: 0
    },
    to: {
        rotate: "360deg",
        scale: 1
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        height: height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        height: 500,
        backgroundColor: 'white',
        //borderTopLeftRadius: 30,
        borderTopRightRadius: 70,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        height: logoHeight * 0.4,
        width: logoHeight * 0.4,
        position: 'absolute',
        top: 40,
        left: 30

    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
    },
    text: {
        color: 'grey',
        marginTop: 5,
        color: 'lightslategrey',
        fontFamily: 'nunitoregular'

    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30,
        position: 'absolute',
        bottom: 80, right: 20,
        flexDirection: 'row'
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',

    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'nunitoregular'
    }
})