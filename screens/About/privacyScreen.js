import React, {
    useState,
    useEffect
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    FlatList,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';


const PrivacyScreen = ({ navigation }) => {
    const pressgobackHandler = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TouchableOpacity style={{
                    width: 45
                }} onPress={pressgobackHandler}>
                    <View style={{
                        flexDirection: 'row',
                        margin: 10,
                        width: 40
                    }}>
                        <MaterialIcons name="keyboard-backspace" size={30} color="black" />
                    </View>
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: 'robotobold',
                        fontSize: 25,
                    }}>Flâner Privacy</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 5,
        flex: 1,
        backgroundColor: 'whitesmoke',
        marginBottom: 10
    }
})
export default PrivacyScreen