import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, ActivityIndicator, View, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';


const { height, width } = Dimensions.get("screen");
const logoHeight = height * 0.5;


const DetailReport = ({ navigation, route }) => {

    const { user } = useSelector(state => state.User)
    const { item, poster } = route.params


    return (
        <View style={styles.container}>
            <View>
                
                {
                    item && <Text>{item.body }</Text>
                }
                {
                    poster && <Text>{poster.name}</Text>
                }

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
        backgroundColor: 'whitesmoke'

    },
    button1: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 10,
        padding: 7,
        backgroundColor: 'lightslategrey'
    },
    button2: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 10,
        padding: 7,
        backgroundColor: 'black'
    },
    button3: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 10,
        padding: 7,
        backgroundColor: 'dimgrey'
    }

});
export default DetailReport;
