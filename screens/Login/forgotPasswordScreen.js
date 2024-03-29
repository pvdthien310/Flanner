import * as React from "react";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-root-toast";
import { URL_local } from "../../constant.js";
import Api from "../../API/UserAPI";
import EmailApi from "../../API/EmailAPI";

export default function ForgotPasswordScreen({ navigation }) {
  function makeId() {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const [dataForgot, setDataForgot] = useState({
    email: "",
    password: "",
    showPassword: false,
    showConfirmPassword: false,
    checkUser: false,
    verifyCode: makeId(),
    password: "",
    confirm: "",
    checkPassword: false,
  });

  const sendEmail = () => {
    console.log("a", dataForgot);
    EmailApi.sendEmail({
      to: dataForgot.email,
      subject: "Verify code",
      text: "Your verify code is: " + dataForgot.verifyCode,
    })
      .then((res) => console.log("res", "Send ok"))
      .catch((err) => {
        console.log("error", err);
      });
  };

  const EmailChange = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(val) === false) {
      setDataForgot({
        ...dataForgot,
        email: val,
        checkUser: false,
      });
    } else {
      setDataForgot({
        ...dataForgot,
        email: val,
        checkUser: true,
      });
    }
  };
  const PasswordChange = (val) => {
    if (val.length < 6)
      setDataForgot({
        ...dataForgot,
        password: val,
        checkPassword: false,
      });
    else
      setDataForgot({
        ...dataForgot,
        password: val,
        checkPassword: true,
      });
  };
  const ConfirmPasswordChange = (val) => {
    setDataForgot({
      ...dataForgot,
      confirm: val,
    });
  };

  const _resetHandle = async () => {
    if (
      dataForgot.email == "" ||
      dataForgot.password == "" ||
      dataForgot.confirm == ""
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
    if (!dataForgot.checkPassword) {
      let toast = Toast.show("Password must be more than 5 characters", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return;
    }

    if (dataForgot.confirm != dataForgot.password) {
      let toast = Toast.show("Confirm password is incorrect", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return;
    }

    let flag = false;
    Api.getUserByEmail(dataForgot.email).then((res) => {
      if (!res) {
        console.log("null");
        let toast = Toast.show("Email is not registered", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
        return;
      } else {
        if (res.reportedNum == "3") {
          let toast = Toast.show(
            "Account was blocked. Please contact with us to get more information!",
            {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
            }
          );
          return;
        }
        setDataForgot({
          ...dataForgot,
          verifyCode: makeId(),
        });
        sendEmail();
        let toast = Toast.show("We just sent you a verify code", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
        navigation.navigate("ConfirmEmailForgot", { dataForgot });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Animatable.View style={styles.header} animation="zoomInRight">
        {/* <Text style={styles.welcome}>Create your </Text>
                <Text style={styles.flanner}>Flânner</Text> */}
      </Animatable.View>

      <Animatable.View
        style={styles.footer}
        animation="fadeInUpBig"
        easing="ease-out-back"
      >
        <Text style={styles.signInTxt}>Reset Password</Text>
        <View style={{ marginTop: 20 }}>
          {/* <View style={styles.border}></View>
                    <Text style={styles.accountTxt}> Email</Text> */}
          <View style={styles.accountView}>
            <TextInput
              style={styles.accountEdt}
              placeholder="Type your email"
              onChangeText={(val) => EmailChange(val)}
            />
            {dataForgot.checkUser ? (
              <Ionicons
                style={{ marginEnd: 10 }}
                name="checkmark-circle-outline"
                size={24}
                color="black"
              />
            ) : (
              <View style={{ width: 24, height: 24 }}></View>
            )}
          </View>
        </View>

        <View style={{ marginTop: 5 }}>
          {/* <View style={styles.border}></View>
                    <Text style={styles.newTxt}> New password</Text> */}
          <View style={styles.passwordView}>
            <TextInput
              style={styles.passwordEdt}
              secureTextEntry={!dataForgot.showPassword}
              placeholder="Type new password"
              onChangeText={(val) => PasswordChange(val)}
            />
            <Ionicons
              name={dataForgot.showPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              style={{ marginEnd: 10 }}
              color="black"
              onPress={() =>
                setDataForgot({
                  ...dataForgot,
                  showPassword: !dataForgot.showPassword,
                })
              }
            />
          </View>
        </View>

        <View style={{ marginTop: 5 }}>
          {/* <View style={styles.border}></View>
                    <Text style={styles.confirmTxt}> Confirm password </Text> */}
          <View style={styles.passwordView}>
            <TextInput
              style={styles.passwordEdt}
              placeholder="Confirm your password"
              secureTextEntry={!dataForgot.showConfirmPassword}
              onChangeText={(val) => ConfirmPasswordChange(val)}
            />
            <Ionicons
              style={{ marginEnd: 10 }}
              name={
                dataForgot.showConfirmPassword
                  ? "eye-outline"
                  : "eye-off-outline"
              }
              size={24}
              color="black"
              onPress={() =>
                setDataForgot({
                  ...dataForgot,
                  showConfirmPassword: !dataForgot.showConfirmPassword,
                })
              }
            />
          </View>
        </View>

        <TouchableOpacity style={styles.signInBtn} onPress={_resetHandle}>
          <Text style={styles.textSign}>Reset password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: height * 0.32,
          }}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          <Text style={{ fontStyle: "italic" }}>You don't have account? </Text>
          <Text style={styles.signUpTxt}>Sign Up</Text>
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
    fontSize: 30,
    marginLeft: 20,
  },
  header: {
    height: height * 0.15,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  footer: {
    height: 700,
    backgroundColor: "white",
    borderTopRightRadius: 70,
    paddingVertical: 40,
    paddingHorizontal: 30,
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
    marginTop: 25,
    position: "absolute",
    top: 0,
    height: height * 0.06,
    width: width * 0.85,
  },
  accountTxt: {
    fontWeight: "bold",
    marginLeft: 30,
    backgroundColor: "white",
    width: 42,
    zIndex: 1,
    marginTop: 17,
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
  verifyTxt: {
    fontWeight: "bold",
    marginLeft: 30,
    backgroundColor: "white",
    width: 82,
    marginTop: 15,
  },
  newTxt: {
    fontWeight: "bold",
    marginLeft: 30,
    backgroundColor: "white",
    width: 110,
    marginTop: 17,
  },
  confirmTxt: {
    fontWeight: "bold",
    marginLeft: 30,
    backgroundColor: "white",
    width: 130,
    marginTop: 15,
  },
  passwordEdt: {
    paddingLeft: 13,
    flex: 1,
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
