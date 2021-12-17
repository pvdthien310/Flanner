import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { URL_local } from '../../constant';
import Api from '../../API/UserAPI';
import Toast from 'react-native-root-toast';

const { height } = Dimensions.get("screen");
const logoHeight = height * 0.5;


const EditProFile = ({ navigation }) => {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.User)
  const [loading, SetLoading] = useState(false)
  const [image, setImage] = useState(user.avatar)
  const [picture, setPicture] = useState(undefined)
  const [name, setName] = useState(user.name)
  const [bio, setBio] = useState(user.bio)
  const [contact, setContact] = useState(user.phoneNumber)
  const [birthday, setBirthday] = useState(user.doB)
  const [job, setJob] = useState(user.job)
  const [address, setAddress] = useState(user.address)
  let url;


  const changeName = (val) => {
    setName(val);
  }
  const changeBio = (val) => {
    setBio(val);
  }
  const changeContact = (val) => {
    setContact(val);
  }
  const changeJob = (val) => {
    setJob(val);
  }
  const changeAddress = (val) => {
    setAddress(val);
  }


  const pressgobackHandler = () => {
    navigation.goBack();
  }
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  const createThreeButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setBirthday(date.getMonth().toString() + '/' + date.getDay().toString() + '/' + date.getFullYear().toString())
    hideDatePicker();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri)
    }

  };

  useEffect(() => {
    if (picture)
      _submitData()
  }, [picture])


  const HandleUpImages = () => {
    const uri = image;
    const type = 'image';
    const name = Math.random().toString();
    const photo = { uri, type, name }
    SetLoading(true)
    const data = new FormData();
    data.append("file", photo)
    data.append("upload_preset", "fyjwewqj")
    data.append('folder', "Source/avatar")

    fetch("https://api.cloudinary.com/v1_1/dithiencloud/image/upload", {
      method: 'POST',
      body: data,
      header: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.json())
      .then(data => {
        setPicture(data.url)
      }).catch(err => {
        Alert.alert("Error While Uploading Image");
        console.log(err)
      })

  }
  const fetchUserData = () => {
    Api.getUserItem(user.userID)
      .then(res => {

        dispatch({ type: 'ADD_USER', payload: res[0] })
        dispatch({ type: 'UPDATE_USER', payload: res[0] })
      })
      .catch(err => console.log('Error Load User'))
  }
  const checkContact = (val) => {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(val)
  }
  const _submitData = () => {

    // const url = URL_local + 'user/send-data'
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     userID: user.userID,
    //     phoneNumber: contact,
    //     name: name,
    //     doB: birthday,
    //     avatar: picture.uir,
    //     email: user.email,
    //     friendArray: user.friendArray,
    //     password: user.password,
    //     score: user.score,
    //     address: address,
    //     position: user.position,
    //     reportedNum: user.reportedNum,
    //     following: user.following,
    //     followed: user.followed,
    //     bio: bio,
    //     job: job
    //   })
    // }).then(res => res.json())
    //   .then(data => { fetchUserData() })
    //   .catch(err => {
    //     console.log("error", err)
    //   })

    SetLoading(true)
    Api.updateUser({
      userID: user.userID,
      phoneNumber: contact,
      name: name,
      doB: birthday,
      avatar: picture,
      email: user.email,
      password: user.password,
      address: address,
      position: user.position,
      reportedNum: user.reportedNum,
      following: user.following,
      followed: user.followed,
      bio: bio,
      job: job
    }).then(res => {
      SetLoading(false)
      fetchUserData();
      let toast = Toast.show('Update your profile successful!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });

    }).catch(err => {
      let toast = Toast.show('Update your profile failed, Please try again!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      console.log(err)
    })
  }
  const saveHandle = async () => {
    if (!checkContact(contact)) {
      let toast = Toast.show('Phone number invalid', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return
    }

    let toast = Toast.show('The system is processing, please wait!', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
    });
    await HandleUpImages()

  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={{
          height: height * 0.58, width: '100%',
          borderTopLeftRadius: 10, borderTopRightRadius: 10,
          borderBottomRightRadius: 50,
          borderBottomLeftRadius: 50,
          shadowOffset: { width: 1, height: 1 },
          shadowColor: 'black',
          shadowOpacity: 0.5,
          opacity: 0.7
        }} source={{ uri: image }} />


        <TouchableOpacity onPress={pickImage}
          style={{
            height: 100,
            width: 100,
            top: height * 0.2,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            borderRadius: 20,
            alignSelf: 'center',
            margin: 10,

          }}>
          <Ionicons name="images-outline" size={70} style={{ alignSelf: 'center' }} color="dimgray" />
        </TouchableOpacity>

        <TouchableOpacity style={{ width: 45, position: 'absolute' }} onPress={pressgobackHandler}>
          <View style={{ flexDirection: 'row', margin: 10, width: 40 }}>
            <MaterialIcons name="keyboard-backspace" size={30} color="black" />
          </View>
        </TouchableOpacity>

        <View style={{ marginLeft: 20, marginRight: 30, marginTop: 10 }}>
          <Text style={styles.title}>Email Address</Text>
          <Text style={{ fontFamily: 'nunitobold' }}>{user.email}</Text>

          <Text style={styles.title}>Name</Text>
          <TextInput style={styles.info} onChangeText={changeName} value={name} />

          <Text style={styles.title}>Bio</Text>
          <View style={styles.info}>
            <TextInput multiline={true} textAlignVertical='bottom' style={{ ...styles.info }} onChangeText={changeBio} value={bio} />
          </View>
          <Text style={styles.title}>Contact</Text>
          <TextInput style={styles.info} onChangeText={changeContact} value={contact} />

          <Text style={styles.title} >Birthday</Text>
          <Text style={styles.info} onPress={showDatePicker}>{birthday}</Text>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Text style={styles.title}>Job</Text>
          <TextInput style={styles.info} onChangeText={changeJob} value={job} />

          <Text style={styles.title}>Address</Text>
          <TextInput style={styles.info} onChangeText={changeAddress} value={address} />
          {
            loading == true ?
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}>
                <TouchableOpacity activeOpacity={1} >
                  <View style={{
                    borderRadius: 15,
                    padding: 7,
                    backgroundColor: 'gray',
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                    marginTop: 20,
                    marginLeft: 0,
                    marginRight: 30,
                    marginBottom: 20,
                    width: 100,
                    justifyContent: 'center',

                  }}>
                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: 15, fontFamily: 'nunitobold' }}>Save</Text>
                  </View>
                </TouchableOpacity>

                <ActivityIndicator size="small" color="black" />

              </View>
              :
              <TouchableOpacity onPress={saveHandle} >
                <View style={{
                  borderRadius: 15,
                  padding: 7,
                  backgroundColor: 'black',
                  shadowOffset: { width: 1, height: 1 },
                  shadowColor: 'black',
                  shadowOpacity: 0.5,
                  marginTop: 20,
                  marginLeft: 0,
                  marginBottom: 20,
                  width: 100,
                  justifyContent: 'center',

                }}>
                  <Text style={{ alignSelf: 'center', color: 'white', fontSize: 15, fontFamily: 'nunitobold' }}>Save</Text>
                </View>
              </TouchableOpacity>

          }
        </View>
      </ScrollView>
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
  title: {
    fontFamily: 'nunitoregular',
    marginTop: 15
  },
  info: {
    fontFamily: 'nunitobold',
    borderBottomWidth: 1,
    borderBottomColor: '#CFCFCF',
    fontSize: 15
  },
  saveBtn: {
    backgroundColor: '#272727',
    color: 'white',
    fontWeight: 'bold'
  },


});
export default EditProFile;
