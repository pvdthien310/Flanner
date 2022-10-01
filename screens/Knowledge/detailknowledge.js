import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Post, { PostText, UserInfo, UserInfoText } from "../../shared/post";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Poststyle_Status, images, Poststyle } from "../../styles/poststyle";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { URL_local } from "../../constant";
import KnowLedgeApi from "../../API/KnowledgeAPI";
import NotificationApi from "../../API/NotificationAPI";
import Api from "../../API/UserAPI";

const DetailKnowledge = ({ route, navigation }) => {
  console.log(route);
  const [, forceRerender] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);
  const { item, routes } = route.params;
  const [data, setData] = useState(route.params.item);
  const [host, setHost] = useState({});
  const [loading, setLoading] = useState(true);
  const [isNull, setIsNull] = useState(false);

  const createTwoButtonAlert = () =>
    Alert.alert("Notification", "Do you want to navigate your profile?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: "OK",
        onPress: () => NavigateToCurrentUserProfile(),
      },
    ]);

  const NavigateToCurrentUserProfile = () => {
    navigation.navigate("User Information", {
      screen: "User Dashboard",
      params: { user: "" },
    });
    dispatch({ type: "UPDATE_FEATURE", payload: 0 });
  };

  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    forceRerender;
  }, [item]);

  const sendNotification = () => {
    NotificationApi.sendNoti({
      userID: data.userID,
      message: " liked your post ",
      postID: data._id,
      senderID: user.userID,
      type: "1",
      action: "React",
    })
      .then((res) => {})
      .catch((err) => console.log("Error send noti"));
  };
  const removeNotification = () => {
    NotificationApi.removeNoti({
      userID: data.userID,
      postID: data._id,
      senderID: user.userID,
      type: "1",
      action: "React",
    })
      .then((res) => {})
      .catch((err) => console.log("Error removed noti"));
  };

  const fetchData = () => {
    KnowLedgeApi.getItem(item._id.toString())
      .then((res) => {
        setData(res);
        setLoading(false);
        if (res.react.indexOf(user.userID) != -1) setPressed(true);
        else setPressed(false);
      })
      .catch((err) => {
        setIsNull(true);
        console.log(err);
      });
  };
  const fetchHostData = () => {
    Api.getUserItem(item.userID.toString())
      .then((res) => {
        setHost(res);
      })
      .catch((err) => console.log("Loi set user by id", err));
  };

  useEffect(() => {
    fetchData();
    fetchHostData();
  }, []);

  const pressgobackHandler = () => {
    navigation.goBack();
  };

  const PressHandle = () => {
    let numberReact = data.reactNumber;
    const url_true =
      URL_local +
      "knowledge/update/" +
      item._id.toString() +
      "/true/" +
      user.userID.toString();
    const url_false =
      URL_local +
      "knowledge/update/" +
      item._id.toString() +
      "/false/" +
      user.userID.toString();

    if (pressed == true) {
      KnowLedgeApi.updateFalse(item._id.toString(), user.userID.toString())
        .then((res) => {
          removeNotification();
          setData(res);
          dispatch({ type: "UPDATE_KNOWLEDGE_MEMBER", payload: res });
          if (res.react.indexOf(user.userID) != -1) setPressed(true);
          else setPressed(false);
        })
        .catch((err) => console.log("Error update false"));
    } else if (pressed == false) {
      KnowLedgeApi.updateTrue(item._id.toString(), user.userID.toString())
        .then((res) => {
          sendNotification();
          setData(res);
          dispatch({ type: "UPDATE_KNOWLEDGE_MEMBER", payload: res });
          if (res.react.indexOf(user.userID) != -1) setPressed(true);
          else setPressed(false);
        })
        .catch((err) => console.log("Error update true"));
    }
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator marginTop={80} size="small" color="#0000ff" />
      ) : (
        <SafeAreaView style={styles.post}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{ width: 45 }}
              onPress={pressgobackHandler}
            >
              <View style={{ flexDirection: "row", margin: 10, width: 40 }}>
                <MaterialIcons
                  name="keyboard-backspace"
                  size={30}
                  color="black"
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "robotobold",
                  fontSize: 25,
                }}
              >
                {" "}
                Detail{" "}
              </Text>
            </View>
          </View>

          <ScrollView
            style={{ margin: 10, marginBottom: 60 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ alignItems: "flex-start", marginTop: 5 }}>
              <FlatList
                scrollEnabled={true}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={data.listImage}
                renderItem={({ item }) => (
                  <View>
                    <Image
                      style={Poststyle.imagepost}
                      source={{ uri: item.url }}
                    />
                  </View>
                )}
                keyExtractor={(item) => item.key}
              />
            </View>

            <PostText>
              <Text style={Poststyle_Status.posttime_detail}>
                {data.posttime}
              </Text>

              <Text style={Poststyle_Status.title_detail}>{data.title}</Text>
              <Text style={Poststyle_Status.description_detail}>
                {data.description}
              </Text>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "lightgray",
                  padding: 5,
                  marginTop: 10,
                  marginStart: 10,
                }}
              >
                <Text style={Poststyle_Status.body_detail}>{data.body}</Text>
              </View>
            </PostText>
            <TouchableOpacity
              onPress={() => navigation.push(routes.showReactInfo, { data })}
            >
              <Text style={Poststyle_Status.reactnumber_detail}>
                {data.react.length} likes
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                margin: 10,
              }}
            >
              <TouchableOpacity onPress={PressHandle}>
                <Ionicons
                  name="heart"
                  size={35}
                  style={
                    pressed
                      ? Poststyle_Status.like_button
                      : Poststyle_Status._like_button
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.push(routes.comment, { item: data })}
              >
                <MaterialCommunityIcons
                  name="comment-multiple"
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderBottomColor: "lightslategrey",
                borderBottomWidth: 1,
                marginBottom: 10,
                marginStart: 10,
                marginEnd: 10,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if (host.length > 0) {
                  if (host[0].email != user.email) {
                    navigation.push(routes.friendInfo, {
                      item: host,
                      nextScreen: [
                        "Knowledge Friend Knowledge",
                        "Knowledge Friend Status",
                      ],
                    });
                  } else {
                    createTwoButtonAlert();
                  }
                }
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  backgroundColor: "#272727",
                  shadowOffset: { width: 1, height: 1 },
                  shadowColor: "black",
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                {host.length > 0 ? (
                  <Image
                    source={{ uri: host[0].avatar }}
                    style={Poststyle_Status.imageavatar_detai}
                  />
                ) : (
                  <Image
                    source={require("../../assets/icon/userPhoto.png")}
                    style={Poststyle_Status.imageavatar_detai}
                  />
                )}

                <UserInfoText>
                  <Text style={Poststyle_Status._name_detail}>
                    {" "}
                    {host[0] ? host[0].name : item.username}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "nunitobold",
                      fontSize: 12,
                      marginStart: 5,
                      marginTop: 5,
                      color: "white",
                    }}
                  >
                    {" "}
                    Author
                  </Text>
                </UserInfoText>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      )}
      {isNull == false ? null : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            alignSelf: "center",
            marginTop: 80,
          }}
        >
          <Image
            source={require("../../assets/icon/error.png")}
            resizeMode="contain"
            style={{
              width: 80,
              height: 80,
              marginBottom: 5,
            }}
          />
          <Text
            style={{ fontFamily: "nunitobold", fontSize: 17, marginBottom: 10 }}
          >
            The Post Does Not Exist !
          </Text>
          <TouchableOpacity
            style={{ width: 100, backgroundColor: "wheat", borderRadius: 10 }}
            onPress={pressgobackHandler}
          >
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                width: 80,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "space-between",
              }}
            >
              <MaterialIcons
                name="keyboard-backspace"
                size={30}
                color="black"
              />
              <Text style={{ fontFamily: "nunitobold", fontSize: 17 }}>
                Back
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default DetailKnowledge;

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  post: {
    borderRadius: 0,
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 0,
    marginBottom: 120,
    margin: 5,
  },
});
