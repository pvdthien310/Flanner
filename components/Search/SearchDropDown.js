import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image,Dimensions, TextInput, SafeAreaView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchDropDown(props) {
    const { dataSource } = props
    return (
        <View style={{
            // position: 'absolute',
            // top: '15%',
            backgroundColor: 'whitesmoke',
            opacity: 1,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            padding:5
        }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', alignSelf: 'flex-start' }}>Suggesstion</Text>
            <ScrollView> 
                {
                    dataSource.map(item => {
                        return (
                            <TouchableOpacity onPress={() => console.log(item.name)}>
                                <View style = {{ flexDirection: 'row',backgroundColor: 'lightslategrey', marginVertical: 5,padding:5, borderRadius: 5}}>
                                {
                                    item.avatar ?

                                        <Image source={{ uri: item.avatar }} 
                                        style ={{
                                            height: 30,
                                            width: 30,
                                            borderRadius:5,
                                            alignSelf:'center',
                                        }} />
                                        :
                                        <Image 
                                        source={require('../../assets/icon/userPhoto.png')} 
                                        style ={{
                                            height: 30,
                                            width: 30,
                                            borderRadius:5,
                                            alignSelf:'center'
                                        }}
                                         />
                                }
                                   <Image source = {{uri : item.avatar}} 
                                  
                                   ></Image>
                                    <Text style = {{
                                        fontSize: 15,
                                        padding:10,
                                        color:'white'
                                    }}
                                     key={item._id}
                                     >{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
            
            
        </View>
    )
}