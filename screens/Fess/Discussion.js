import React, {
    useState,
    useEffect,
    useCallback
} from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
    Clipboard,
} from 'react-native';

import {
    FontAwesome,
    Feather
} from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

import {
    ScrollView,
    TouchableOpacity
} from 'react-native-gesture-handler';

import Icon from '@expo/vector-icons/AntDesign';
import LastWatch from './../../components/Fess/LastWatch';
import Received from './../../components/Fess/Received';
import Sent from './../../components/Fess/Sent';
import Data from '../Fess/TestData/dummy/Data.json';
import Input from './../../components/Fess/LastWatch';
import * as ImagePicker from 'expo-image-picker';

import { messageData, Linh1, Linh2 } from './TestData/data';

import {
    renderAvatar,
    renderBubble,
    renderChatEmpty,
    renderMessageText,
    renderTime,
    renderInputToolbar,
    renderSend,
    scrollToBottomComponent,
    renderDay

} from './renderComponent'

import { GiftedChat } from "react-native-gifted-chat";
import { db } from '../../firebase/firebase';
import { addDoc, collection, setDoc, doc } from "firebase/firestore/lite"; 

const Discussion = ({ route, navigation }) => {
    // const { itemName, itemPic } = route.params;
    // const [inputMessage, setMessage] = useState('');

    // const send = () => {
    //     Data.push({ id: inputMessage, message: inputMessage });
    //     setMessage('');
    // };

    // var txt = []
    // for (var i = 5; i < Data.length; i++) {
    //     txt.push(<Sent key={Data[i].id} message={Data[i].message} />);
    // }
    // console.log(Data)

    // return (
    //     <LinearGradient
    //         colors={["black", "black", "black"]}
    //         style={styles.container}
    //     >
    //         <View style={styles.main}>
    //             <View style={styles.headerContainer}>
    //                 <TouchableOpacity
    //                     onPress={() => navigation.goBack()}
    //                 >
    //                     <Icon name='left' color='#000119' size={24} />
    //                 </TouchableOpacity>
    //                 <Text style={styles.username}>{itemName}</Text>
    //                 <Image source={{ uri: itemPic }} style={styles.avatar} />
    //             </View>
    //             <ScrollView showsVerticalScrollIndicator={false}>
    //                 <LastWatch checkedOn='Yesterday' />
    //                 <Received
    //                     image={itemPic}
    //                     message={Data[0].message}
    //                 />
    //                 <Sent
    //                     message={Data[1].message}
    //                 />
    //                 <Received
    //                     image={itemPic}
    //                     message={Data[2].message}
    //                 />
    //                 <Sent
    //                     message={Data[3].message}
    //                 />
    //                 <LastWatch checkedOn='Today' />
    //                 <Received
    //                     image={itemPic}
    //                     message={Data[4].message}
    //                 />
    //                 <View>
    //                     {txt}
    //                 </View>
    //             </ScrollView>
    //         </View>
    //         <Input
    //             inputMessage={inputMessage}
    //             setMessage={(inputMessage) => setMessage(inputMessage)}
    //             onSendPress={send}
    //         />
    //     </LinearGradient>
    // )

    const [messages, setMessages] = useState();

    useEffect(() => { messages }, [])

    const openCameraPicker = async () => {
        permission = await ImagePicker.requestCameraPermissionsAsync();

        if (permission.granted === false) {
            alert("Flâner requires permission to access your camera roll.")
            return;
        }

        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            
        });

        if (pickerResult.cancelled === true) {
            return;
        }

        onSend({
            _id: Math.floor(Math.random() * 10000000000000000000),
            image: pickerResult.uri,
            user: Linh1,
        });
    }

    const openPhotoLibary = async () => {
        permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permission.granted === false) {
            alert("Flâner requires permission to access your libary.")
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            
        });

        if (pickerResult.cancelled === true) {
            return;
        }

        onSend({
            _id: Math.floor(Math.random() * 10000000000000000000),
            image: pickerResult.uri,
            user: Linh1
        });        
    };

    const renderActions = () => {
        return (
            <View style={{ flexDirection: "row", marginLeft: 15, marginBottom: 8 }}>
                <TouchableOpacity onPress={openCameraPicker}>
                    <Feather name="camera" size={25} color='black' style={{ marginLeft: 2, marginRight: 5 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={openPhotoLibary}>
                    <FontAwesome name="photo" size={24} color='black' style={{ marginLeft: 8, marginRight: 5, marginBottom: 1}} />
                </TouchableOpacity>
            </View>
        );
    };

    const onDelete = (message) =>{
        console.log(message)
        setMessages(previousMessages => previousMessages.filter(mess => mess._id !== message._id))
    }

    const onLongPress = (context, message) => {
        console.log(context, message);
        const options = ['Copy', 'Delete Message', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        context.actionSheet().showActionSheetWithOptions({
            options,
            cancelButtonIndex
        }, (buttonIndex) => {
            switch (buttonIndex) {
                case 0:
                    console.log(message);
                    Clipboard.setString(message.text);
                    break;
                case 1:
                    onDelete(message);
                    break;
            }
        });
    }

    const addNewDoc = async ()=>{
        const collectionRef = doc(db, "users","con2");
        const payload = {name:"lady", email: "@@@@@@@@laydyyyyyyy"}
        await setDoc(collectionRef, payload);
    }

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        addNewDoc()
        
      }, [])

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon name='left'
                        //color='#000119'
                        color='white'
                        size={24} />
                </TouchableOpacity>
                <Text style={styles.username}>{Linh2.name}</Text>
                <Image source={Linh2.avatar}
                    style={styles.avatar} />
            </View>

            <GiftedChat 
                messages={messages}
                user={Linh1}

                alwaysShowSend
                onSend={messages => onSend(messages)}
                onLongPress={onLongPress}

                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}

                renderBubble={renderBubble}
                renderSend={renderSend}
                renderActions={renderActions}
                renderInputToolbar={renderInputToolbar}
                renderTime={renderTime}
                renderDay = {renderDay}
                renderAvatar={renderAvatar}
                renderUsernameOnMessage={true}
                renderChatEmpty={renderChatEmpty}
                renderMessageText={renderMessageText}
            />

        </View>
    )
}
export default Discussion;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
    main: {
        backgroundColor: '#FFF',
        height: '88%',
        paddingHorizontal: 20,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        paddingTop: 40
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop: 10,
        paddingBottom: 10,
    },
    username: {
        //color: "#000119",
        color: 'white',
        fontFamily: 'Montserrat_700Bold',
        fontSize: 20,
        flex: 1,
        textAlign: 'center'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 2,
    }

})