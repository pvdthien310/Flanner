import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import {
  Channel,
  MessageList,
  MessageInput,
  OverlayProvider,
  AutoCompleteSuggestionItem,
} from "stream-chat-react-native-core";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  LogBox,
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ChannelAvatar } from "stream-chat-expo";

// Ignore log notification by message
LogBox.ignoreLogs([
  "Warning: ...",
  "Non-serializable values were found in the navigation state",
  "VirtualizedLists should never be nested",
  "source.uri should not be an empty string",
]);

//Ignore all log notifications
LogBox.ignoreAllLogs();

const ChannelScreen = ({ navigation, route }) => {
  const channel = route.params.channel;

  const { user } = useSelector((state) => {
    return state.User;
  });

  const [members, setMembers] = useState([]);

  const [nameHeader, setNameHeader] = useState("");

  const [imgHeader, setImgHeader] = useState("");

  const fetchMembers = async () => {
    const response = await channel.queryMembers({});
    console.log(members);
    setMembers(response.members);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (members.length === 2) {
      var i;
      for (i = 0; i < 2; i++) {
        if (members[i].user.id != user.userID) {
          setNameHeader(members[i].user.name);
          break;
        }
      }
    } else {
      setNameHeader(channel.data.name);
    }
  });

  useEffect(() => {
    if (members.length === 2) {
      var i;
      for (i = 0; i < 2; i++) {
        if (members[i].user.id != user.userID) {
          setImgHeader(members[i].user.image);
          break;
        }
      }
    } else {
      setImgHeader(
        "https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-communication-communication-kiranshastry-lineal-kiranshastry.png"
      );
    }
  });

  const createOneButtonAlert = () =>
    Alert.alert("From Flâner team", "Sorry! Fess-calling is in developement", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  const onDoubleTapMessage = ({ actionHandlers }) => {
    actionHandlers?.toggleReaction("love");
  };

  return (
    <SafeAreaProvider>
      <OverlayProvider>
        <Channel
          AutoCompleteSuggestionItem={() => <AutoCompleteSuggestionItem />}
          channel={channel}
          onDoubleTapMessage={onDoubleTapMessage}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={{ alignSelf: "center", marginLeft: 2 }}
              onPress={() => navigation.navigate("Fess")}
            >
              <Ionicons name="arrow-back-outline" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.avt}>
              <ChannelAvatar channel={channel} />
              <Text style={styles.username}>{nameHeader}</Text>
            </View>
          </View>
          <MessageList />
          <MessageInput />
        </Channel>
      </OverlayProvider>
    </SafeAreaProvider>
  );
};

export default ChannelScreen;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  main: {
    backgroundColor: "#FFF",
    height: "88%",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingTop: 40,
  },
  avt: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignContent: "flex-start",
    marginLeft: 5,
  },
  headerContainer: {
    width: "95%",
    borderRadius: 15,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "flex-start",
    padding: 10,
    backgroundColor: "#3C3B36",
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
    alignSelf: "center",
    marginLeft: 10,
    fontFamily: "nunitobold",
  },
});
