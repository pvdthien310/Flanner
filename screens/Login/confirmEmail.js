import * as React from 'react';
import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';

export default function ConfirmEmail({ navigation }) {

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
                onSubmit={values => console.log(values)}
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