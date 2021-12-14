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
    FlatList
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import AboutMember from '../../components/About/AboutMember';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get("screen");
const logoHeight = height * 0.5;


const AboutScreen = ({ navigation }) => {

    const members = [
        {
            id: '19522267',
            name: 'Pham Vo Di Thien',
            email: '19522267@gm.uit.edu.vn'
        },
        {
            id: '19522321',
            name: 'Tran Tri Thuc',
            email: '19522321@gm.uit.edu.vn'
        },
        {
            id: '19521652',
            name: 'Vong Minh Huynh',
            email: '19521652@gm.uit.edu.vn'
        },
        {
            id: '19520145',
            name: 'Nguyen Khanh Linh',
            email: '19520145@gm.uit.edu.vn'
        },
    ]

    const aboutFlaner1 = "Your knowledge sharing will be mapped out in Flâner. Significant worklet  for you not to chop and change. Be a great knowledge sharer."

    const aboutFlaner2 = "\nFlâner will broadly your mind. All kinds of experience on one screen. " +
        "Flâner dictionary has no word like nodus tollen for you. Let make some friends!" +
        " Flâner helps you ambedo. Not like chrysalism or flummoxed feeling, there is always a room for doubt. "+
        "\n\nIt is Flâner! Best way to entertain!"

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                {/* About Flaner */}
                <View>
                    <View style={{
                        backgroundColor: 'black',
                        padding: 10,
                        borderRadius: 5

                    }}>
                        <Text style={styles.title}> Flâner</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        paddingBottom: 1,
                    }}>
                        <Text style={{
                            paddingLeft: 18,
                            paddingTop: 15,
                            paddingRight: 5,
                            fontFamily: 'nunitoregular',
                            fontSize: 15,
                            width: 290,
                            textAlign: 'auto',
                            marginBottom: -2,
                            ///   backgroundColor: 'blue',
                        }}>{aboutFlaner1} </Text>

                        <Image source={require('../../assets/logo/logo.png')}
                            style={{
                                width: 120,
                                paddingRight: 20,
                                height: 120,
                                paddingLeft: 20,
                                ///  backgroundColor: 'red',
                            }}>

                        </Image>

                    </View>

                    <Text style={{
                        paddingLeft: 18,
                        paddingRight: 15,
                        ///  paddingBottom: 5,
                        fontFamily: 'nunitoregular',
                        fontSize: 15,
                        paddingTop: 0,
                        textAlign: 'justify',

                        marginTop: -25,
                    }}> {aboutFlaner2} </Text>


                    <View style={{
                        ///  flexDirection: 'row'
                    }}>
                        <Text style={{
                            paddingLeft: 18,
                            // paddingRight: 15,
                            marginTop: -5,
                            fontFamily: 'nunitoregular',
                            fontSize: 15,
                            textAlign: 'auto',
                            marginBottom: -2,
                        }}>Have you just got Flâner? Don't worry, we've prepared something to help you improve your experience. For a rewarding community, please take a look at:</Text>


                        <View style={{
                            flexDirection: 'column'
                        }}>

                            <TouchableOpacity style={{
                                alignSelf: 'center',
                                paddingTop: 5
                            }}>
                                <Text style={{
                                    // paddingRight: 15,
                                    fontFamily: 'nunitobold',
                                    fontSize: 15,
                                    textAlign: 'auto',
                                    color: 'black',
                                    marginBottom: -2,
                                    textDecorationLine: 'underline'
                                }}>Flâner using instruction</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                alignSelf: 'center',
                                paddingTop: 8
                            }}>
                                <Text style={{
                                    // paddingRight: 15,
                                    fontFamily: 'nunitobold',
                                    fontSize: 15,
                                    color: 'black',
                                    textAlign: 'auto',
                                    marginBottom: -2,
                                    textDecorationLine: 'underline'
                                }}>Flâner privacy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>

                {/* About Team */}
                <View>
                    <Text style={{
                        ...styles.title,
                        color: 'black',
                        marginStart: 10,
                        marginTop: 20
                    }}>Our Team</Text>

                    <Text style={{
                        fontFamily: 'nunitoregular',
                        paddingLeft: 20,
                        paddingTop: 10
                    }}>Developer team information: </Text>

                    <FlatList data={members}
                        keyExtractor={members.id}
                        renderItem={({ item }) => (
                            <AboutMember item={item.id}></AboutMember>
                        )}
                    />

                    <View style={{
                        height: 1,
                        width: 300,
                        alignSelf: 'center',
                        backgroundColor: 'gray',
                        margin: 10
                    }}></View>

                    <Text style={{
                        fontFamily: 'nunitoregular',
                        paddingLeft: 20
                    }}>To further information, please contact: </Text>

                    <Text style={{
                        fontFamily: 'nunitoregular',
                        paddingLeft: 20,
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        paddingTop: 5,
                        paddingBottom: 5
                    }}>flannerapplication@gmail.com</Text>

                    <Text style={{
                        fontFamily: 'nunitoregular',
                        paddingLeft: 20,
                        marginBottom: 25
                    }}
                    >Don't hesitate to express your ideal. We are honored to hear your opinion. We will respond to all of your questions as quickly as possible.
                        Thank you for coming to Flâner!</Text>
                </View>

                {/* Software Information */}
                <View>
                    <Text style={{
                        ...styles.title,
                        color: 'black',
                        marginStart: 10
                    }}>Application Infomation </Text>

                    <View style={styles.softwareInfoView}>
                        <Text style={styles.infoCaption}
                        >Version: </Text>

                        <Text style={styles.infoContent}>1.0</Text>
                    </View>

                    <Text style={{
                        fontFamily: 'nunitoregular',
                        fontSize: 15,
                        paddingLeft: 25
                    }}>Application permission requirements: </Text>

                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            padding: 5,
                            marginLeft: 30
                        }}>
                            <AntDesign name="camera" size={23} color="dimgray"
                                style={{
                                    paddingTop: 3
                                }} />

                            <View style={{
                                flexDirection: 'column'
                            }}>
                                <Text style={styles.permissionTitle}>Camera: </Text>
                                <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                                    <Entypo name="dot-single" size={23} color="dimgray" />
                                    <Text style={styles.permissionContent}>Take photo </Text>
                                </View>

                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            padding: 5,
                            marginLeft: 30
                        }}>

                            <Ionicons name="library" size={23} color="gray"
                                style={{
                                    paddingTop: 3
                                }} />

                            <View style={{
                                flexDirection: 'column'
                            }}>
                                <Text style={styles.permissionTitle}>Library: </Text>
                                <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                                    <Entypo name="dot-single" size={23} color="dimgray" />
                                    <Text style={styles.permissionContent}>Get photo in your library</Text>
                                </View>

                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            padding: 5,
                            marginLeft: 30
                        }}>
                            <MaterialIcons name="storage" size={24} color="dimgray"
                                style={{
                                    paddingTop: 3
                                }} />

                            <View style={{
                                flexDirection: 'column'
                            }}>
                                <Text style={styles.permissionTitle}>Storage: </Text>
                                <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                                    <Entypo name="dot-single" size={23} color="dimgray" />
                                    <Text style={styles.permissionContent}>Read data in storage</Text>
                                </View>

                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            padding: 5,
                            marginLeft: 30
                        }}>
                            <MaterialIcons name="devices-other" size={24} color="dimgray"
                                style={{
                                    paddingTop: 3
                                }} />

                            <View style={{
                                flexDirection: 'column'
                            }}>
                                <Text style={styles.permissionTitle}>Others: </Text>

                                <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                                    <Entypo name="dot-single" size={23} color="dimgray" />
                                    <Text style={styles.permissionContent}>Wifi connection</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                                    <Entypo name="dot-single" size={23} color="dimgray" />
                                    <Text style={styles.permissionContent}>Fetch data from the Internet</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>


            </View>
        </ScrollView>


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
    },

    title: {

        textAlign: 'left',
        fontFamily: 'nunitobold',
        fontSize: 20,
        color: 'white'
        //fontWeight: 'bold'
    },

    memberList: {
        padding: 10,
        backgroundColor: 'whitesmoke',
        paddingLeft: 15,
        paddingRight: 20,
        paddingBottom: 10,
        flexDirection: 'row',
        width: 300,
        alignSelf: 'center',
        marginBottom: 5
    },

    softwareInfoView: {
        flexDirection: 'row',
        margin: 15,
    },

    infoCaption: {
        fontFamily: 'nunitoregular',
        fontSize: 15,
        paddingLeft: 10
    },

    infoContent: {
        ///  fontStyle: 'italic',
        fontFamily: 'nunitoregular',
        fontSize: 15,
    },

    permissionTitle: {
        fontSize: 15,
        fontFamily: 'nunitoregular',
        paddingLeft: 10,
        fontWeight: 'bold',
        paddingVertical: 5
    },

    permissionContent: {
        fontStyle: 'italic'
    }
})

export default AboutScreen
