import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Picker,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from "react-native-root-toast";
import { MaterialIcons } from "@expo/vector-icons";
import Api from "../../../API/UserAPI";
import base64 from "react-native-base64";

const { height } = Dimensions.get("screen");
const logoHeight = height * 0.5;

const NewStaffScreen = ({ navigation }) => {
  const [loading, SetLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();

  const pressgobackHandler = () => {
    navigation.goBack();
  };

  const changeName = (val) => {
    setName(val);
  };
  const changeContact = (val) => {
    setContact(val);
  };
  const changeAddress = (val) => {
    setAddress(val);
  };
  const changeEmail = (val) => {
    setEmail(val);
  };
  const changePassword = (val) => {
    setPassword(val);
  };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setBirthday(
      date.getMonth().toString() +
        "/" +
        date.getDay().toString() +
        "/" +
        date.getFullYear().toString()
    );
    hideDatePicker();
  };

  const checkEmail = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(val);
  };
  const checkPassword = (val) => {
    return val.length >= 6;
  };
  const checkContact = (val) => {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(val);
  };

  const checkInfo = () => {
    if (!checkEmail(email)) {
      let toast = Toast.show("Email invalid", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return false;
    } else if (!checkPassword(password)) {
      let toast = Toast.show("Password has more than 6 charactor", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return false;
    } else if (name == "") {
      let toast = Toast.show("Please enter the name", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return false;
    } else if (!checkContact(contact)) {
      let toast = Toast.show("Contact consist of numeric and 10 characters", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return false;
    } else if (birthday == "") {
      let toast = Toast.show("Please enter the birthday", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return false;
    } else if (address == "") {
      let toast = Toast.show("Please enter the address", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return false;
    }

    return true;
  };
  const saveHandle = () => {
    if (checkInfo()) {
      _submitData();
    }
  };
  const _submitData = async () => {
    SetLoading(true);
    await Api.AddUser({
      phoneNumber: contact,
      name: name,
      doB: birthday,
      avatar:
        "https://i2.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png",
      email: email,
      password: password,
      address: address,
      position: "1",
      job: "Censor",
    })
      .then((res) => {
        SetLoading(false);
        let toast = Toast.show("Insert Censor account successful!", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });

        Api.getAll().then((result) => {
          dispatch({ type: "ADD_DATA_USER", payload: result });
          navigation.navigate("Staff Screen");
        });
      })
      .catch((err) => {
        let toast = Toast.show(
          "Update your profile failed, please try again!",
          {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
          }
        );
        console.log(err);
        SetLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={{
            height: height * 0.58,
            width: "100%",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 50,
            borderBottomLeftRadius: 50,
            shadowOffset: { width: 1, height: 1 },
            shadowColor: "black",
            shadowOpacity: 0.5,
          }}
          source={{
            uri: "https://i2.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png",
          }}
        />

        <Text style={{ fontFamily: "nunitobold", fontSize: 22 }}>
          New Censor
        </Text>
        <TouchableOpacity
          style={{ width: 45, position: "absolute" }}
          onPress={pressgobackHandler}
        >
          <View style={{ flexDirection: "row", margin: 10, width: 40 }}>
            <MaterialIcons name="keyboard-backspace" size={30} color="black" />
          </View>
        </TouchableOpacity>

        <View style={{ marginLeft: 20, marginRight: 30, marginTop: 10 }}>
          <Text style={styles.title}>Email Address</Text>
          <TextInput
            style={styles.info}
            onChangeText={changeEmail}
            value={email}
          />

          <Text style={styles.title}>Password</Text>
          <TextInput
            style={styles.info}
            onChangeText={changePassword}
            value={password}
          />

          <Text style={styles.title}>Name</Text>
          <TextInput
            style={styles.info}
            onChangeText={changeName}
            value={name}
          />

          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Position</Text>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 20, width: 130, alignSelf: 'flex-end', fontFamily: 'nunitobold', fontWeight: 'bold', fontSize: 15 }}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedValue(itemValue)
                                setPosition(itemValue)
                            }}
                        >
                            <Picker.Item label="Admin" value="0" />
                            <Picker.Item label="Censor" value="1" />
                            <Picker.Item label="User" value="2" />

                        </Picker>
                    </View> */}

          <Text style={styles.title}>Contact</Text>
          <TextInput
            style={styles.info}
            onChangeText={changeContact}
            value={contact}
          />

          <Text style={styles.title}>Birthday</Text>
          <Text style={styles.info} onPress={showDatePicker}>
            {birthday}
          </Text>
          <DateTimePickerModal
            textColor="black"
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Text style={styles.title}>Address</Text>
          <TextInput
            style={styles.info}
            onChangeText={changeAddress}
            value={address}
          />
          {loading == true ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <TouchableOpacity activeOpacity={1}>
                <View
                  style={{
                    borderRadius: 15,
                    padding: 7,
                    backgroundColor: "gray",
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: "black",
                    shadowOpacity: 0.5,
                    marginTop: 20,
                    marginLeft: 0,
                    marginRight: 30,
                    marginBottom: 20,
                    width: 100,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "white",
                      fontSize: 15,
                      fontFamily: "nunitobold",
                    }}
                  >
                    Save
                  </Text>
                </View>
              </TouchableOpacity>

              <ActivityIndicator size="small" color="black" />
            </View>
          ) : (
            <TouchableOpacity onPress={saveHandle}>
              <View
                style={{
                  borderRadius: 15,
                  padding: 7,
                  backgroundColor: "black",
                  shadowOffset: { width: 1, height: 1 },
                  shadowColor: "black",
                  shadowOpacity: 0.5,
                  marginTop: 20,
                  marginLeft: 0,
                  marginBottom: 20,
                  width: 100,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    color: "white",
                    fontSize: 15,
                    fontFamily: "nunitobold",
                  }}
                >
                  Save
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 5,
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "nunitoregular",
    marginTop: 15,
  },
  info: {
    fontFamily: "nunitobold",
    borderBottomWidth: 1,
    borderBottomColor: "#CFCFCF",
    fontSize: 15,
  },
  saveBtn: {
    backgroundColor: "#272727",
    color: "white",
    fontWeight: "bold",
  },
});

export default NewStaffScreen;
