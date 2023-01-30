import * as React from "react";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-root-toast";
import { useSelector, useDispatch } from "react-redux";
import { URL_local } from "../../constant";
import Api from "../../API/UserAPI";
import EmailApi from "../../API/EmailAPI";

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();

  const makeId = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const [dataTemp, setDataTemp] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    confirm: "",
    showPassword: false,
    showConfirm: false,
    checkUser: false,
    checkPassword: false,
    verifyCode: makeId(6),
  });

  const sendEmail = () => {
    EmailApi.sendEmail({
      to: dataTemp.email,
      subject: "Verify code",
      text: "Your verify code is: " + dataTemp.verifyCode,
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => {
        console.log("error", err);
      });
  };

  const EmailChange = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(val) === false) {
      setDataTemp({
        ...dataTemp,
        email: val,
        checkUser: false,
      });
    } else {
      setDataTemp({
        ...dataTemp,
        email: val,
        checkUser: true,
      });
    }
  };

  const PasswordChange = (val) => {
    if (val.length < 6)
      setDataTemp({
        ...dataTemp,
        password: val,
        checkPassword: false,
      });
    else
      setDataTemp({
        ...dataTemp,
        password: val,
        checkPassword: true,
      });
  };
  const ConfirmPasswordChange = (val) => {
    setDataTemp({
      ...dataTemp,
      confirm: val,
    });
  };
  const NameChange = (val) => {
    setDataTemp({
      ...dataTemp,
      name: val,
    });
  };
  const ContactChange = (val) => {
    setDataTemp({
      ...dataTemp,
      contact: val,
    });
  };
  const checkContact = (val) => {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(val);
  };
  const signInHandle = async () => {
    if (
      dataTemp.name == "" ||
      dataTemp.email == "" ||
      dataTemp.password == "" ||
      dataTemp.confirm == ""
    ) {
      let toast = Toast.show("Please fill out your information", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return;
    }
    if (!checkContact(dataTemp.contact)) {
      let toast = Toast.show("Phone number invalid", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return;
    }

    if (!dataTemp.checkUser) {
      let toast = Toast.show("Invalid email", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return;
    }

    if (!dataTemp.checkPassword) {
      let toast = Toast.show("Password must be more than 5 characters", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return;
    }

    if (dataTemp.confirm != dataTemp.password) {
      let toast = Toast.show("Confirm password is incorrect", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return;
    }

    await Api.checkEmail(dataTemp.email).then((res) => {
      if (res != "Email already exists") {
        sendEmail();
        let toast = Toast.show("We just sent you a verify code", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
        navigation.navigate("ConfirmEmail", { dataTemp });
      } else {
        let toast = Toast.show(res, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      }
    });
  };
  const valueMail = {
    from: "flanerapplication <trithuc23232@gmail.com>",
    to: "trithuc23232@gmail.com",
    subject: "hello",
    text: "thuc ne",
    html: "<h1>thuc ne html</h1>",
  };

  return (
    <View style={styles.container}>
      <Animatable.View style={styles.header} animation="zoomInRight">
        <View
          style={{
            flexDirection: "row",
            alignSelf: "stretch",
            justifyContent: "flex-start",
            alignItems: "center",
            marginStart: 20,
            marginTop: 10,
          }}
        >
          <Image
            source={require("../../assets/flaner.png")}
            style={{ height: 80, width: 80 }}
          ></Image>
          <View>
            <Text style={styles.welcome}>Create Your, </Text>
            <Text style={styles.flanner}>Flâner</Text>
          </View>
        </View>
      </Animatable.View>

      <Animatable.View
        style={styles.footer}
        animation="fadeInUpBig"
        easing="ease-out-back"
      >
        <Text style={styles.signInTxt}>Sign Up</Text>
        <View style={{ marginTop: 15 }}>
          {/* <View style={styles.border}></View>
                    <Text style={styles.accountTxt}> Name</Text> */}
          <View style={styles.passwordView}>
            <TextInput
              style={styles.accountEdt}
              placeholder="Type your name"
              onChangeText={(val) => NameChange(val)}
            />
            <View style={{ width: 24, height: 24 }}></View>
          </View>
        </View>

        <View>
          {/* <View style={styles.border}></View>
                    <Text style={styles.accountTxt}> Name</Text> */}
          <View style={styles.passwordView}>
            <TextInput
              style={styles.accountEdt}
              placeholder="Type your contact"
              onChangeText={(val) => ContactChange(val)}
            />
            <View style={{ width: 24, height: 24 }}></View>
          </View>
        </View>

        <View>
          {/* <View style={styles.border}></View>
                    <Text style={styles.accountTxt}> Email</Text> */}
          <View style={styles.passwordView}>
            <TextInput
              style={styles.accountEdt}
              placeholder="Type your email"
              onChangeText={(val) => EmailChange(val)}
            />
            {dataTemp.checkUser ? (
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color="black"
              />
            ) : (
              <View style={{ width: 24, height: 24 }}></View>
            )}
          </View>
        </View>

        <View>
          {/* <View style={styles.border}></View>
                    <Text style={styles.passwordTxt}> Password</Text> */}
          <View style={styles.passwordView}>
            <TextInput
              style={styles.passwordEdt}
              placeholder="Type your password"
              secureTextEntry={!dataTemp.showPassword}
              onChangeText={(val) => PasswordChange(val)}
            />
            <Ionicons
              style={{ alignSelf: "center", marginEnd: 10 }}
              name={dataTemp.showPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="black"
              onPress={() =>
                setDataTemp({
                  ...dataTemp,
                  showPassword: !dataTemp.showPassword,
                })
              }
            />
          </View>
        </View>

        <View>
          {/* <View style={styles.border}></View>
                    <Text style={styles.confirmPasswordTxt}> Confirm password </Text> */}
          <View style={styles.passwordView}>
            <TextInput
              style={styles.passwordEdt}
              placeholder="Confirm your password"
              secureTextEntry={!dataTemp.showConfirm}
              onChangeText={(val) => ConfirmPasswordChange(val)}
            />
            <Ionicons
              style={{ alignSelf: "center", marginEnd: 10 }}
              name={dataTemp.showConfirm ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="black"
              onPress={() =>
                setDataTemp({ ...dataTemp, showConfirm: !dataTemp.showConfirm })
              }
            />
          </View>
        </View>

        <TouchableOpacity style={styles.signInBtn} onPress={signInHandle}>
          <Text style={styles.textSign}>SIGN UP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: height * 0.23,
          }}
          onPress={() => navigation.navigate("SignInScreen")}
        >
          <Text style={{ fontStyle: "italic" }}>
            Have you already had an account?{" "}
          </Text>
          <Text style={styles.signUpTxt}>Sign In</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFCFCF",
  },
  signInTxt: {
    fontSize: 30,
    fontWeight: "bold",
  },
  flanner: {
    fontSize: 30,
    fontFamily: "capricaScript",
    marginLeft: 20,
  },
  welcome: {
    marginTop: 10,
    fontSize: 20,
    marginLeft: 20,
    fontFamily: "nunitobold",
  },
  header: {
    height: height * 0.25,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  footer: {
    height: 700,
    backgroundColor: "white",
    //borderTopLeftRadius: 30,
    borderTopRightRadius: 70,
    paddingVertical: 40,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  accountView: {
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 10,
  },
  border: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    position: "absolute",
    top: 0,
    height: height * 0.06,
    width: width * 0.85,
  },
  accountTxt: {
    fontWeight: "bold",
    marginLeft: 25,
    backgroundColor: "white",
    width: 41,
    zIndex: 1,
    marginTop: 15,
  },
  accountEdt: {
    paddingLeft: 13,
    flex: 1,
  },
  passwordView: {
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 10,
  },
  passwordTxt: {
    fontWeight: "bold",
    marginLeft: 25,
    backgroundColor: "white",
    width: 70,
  },
  passwordEdt: {
    paddingLeft: 13,
    flex: 1,
  },
  confirmPasswordTxt: {
    fontWeight: "bold",
    marginLeft: 25,
    backgroundColor: "white",
    width: 135,
    marginTop: 15,
  },
  signInBtn: {
    backgroundColor: "black",
    marginTop: 25,
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signIn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  forgot: {
    fontStyle: "italic",
  },
  signUpTxt: {
    fontWeight: "bold",
  },
});
