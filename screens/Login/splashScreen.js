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
            photo: 'https://i.pinimg.com/736x/ac/94/bd/ac94bdf64801c47eaeb99e896d93dbe9.jpg',
            title: 'Sharing is Learning',
            description: 'Your knowledge sharing will be mapped out in Flâner. Significant worklet  for you not to chop and change. Be a great knowledge sharer.',
            avatar_url: `http://randomuser.me/api/portraits/women/${Math.floor(
                Math.random() * 40
            )}.jpg`
        },
        {
            key: "1",
            photo: 'https://images.unsplash.com/photo-1634938971687-1082b4cb018c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            title: 'Broaden Your World',
            description: 'Flâner will broadly your mind. All kinds of experience on one screen',
            avatar_url: `http://randomuser.me/api/portraits/women/${Math.floor(
                Math.random() * 40
            )}.jpg`
        },
        {
            key: "2",
            photo: 'https://i.pinimg.com/736x/64/97/8d/64978d041abc120be9bf7b0e0135ae02.jpg',
            title: 'Light Up Your Mind',
            description: 'Altschmerz?' +
                ' \nCome to Flâner where communications keep you company',
            avatar_url: `http://randomuser.me/api/portraits/women/${Math.floor(
                Math.random() * 40
            )}.jpg`
        },
        {
            key: "3",
            photo: 'https://i.pinimg.com/564x/5c/e1/ac/5ce1acd1f8777ddadd2bebaee750372d.jpg',
            title: 'Global Relationship',
            description: 'Flâner dictionary has no word like nodus tollen for you. Let make some friends',
            avatar_url: `http://randomuser.me/api/portraits/women/${Math.floor(
                Math.random() * 40
            )}.jpg`
        },
        {
            key: "4",
            photo: 'https://i.pinimg.com/564x/74/25/c0/7425c03a14e3a4e65bb35213cfeea89a.jpg',
            title: 'Quality Make Unique Experience',
            description: 'Flâner helps you ambedo. Not like chrysalism or flummoxed feeling, there is always a room for doubt. \nIt is Flâner! Best way to entertain',
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
                                    <Text style={{ color: 'white', fontFamily: 'nunitobold', fontWeight: 'bold', fontSize: 27 }}>{item.title}</Text>
                                    <Text style={{ color: 'white', fontFamily: 'nunitoregular', fontSize: 15, padding: 10 }}>{item.description}</Text>
                                </View>
                            </View>
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
                <Text style={{ fontStyle: 'italic', color: 'white', fontFamily: 'nunitobold', fontSize: 20 }}>Skip</Text>
                <EvilIcons style={{ alignSelf: 'center' }} name="chevron-right" size={35} color='white' />
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
        top: height * 0.05,
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
        alignItems: 'center',
        marginTop: 30,
        position: 'absolute',
        bottom: 80, right: 20,
        flexDirection: 'row',

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