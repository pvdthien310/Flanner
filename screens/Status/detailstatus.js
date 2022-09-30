import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { PostText, UserInfo, UserInfoText } from "../../shared/post";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  Poststyle_Knowledge,
  Poststyle,
  Poststyle_Status,
} from "../../styles/poststyle";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StatusApi from "../../API/StatusAPI";
import NotificationApi from "../../API/NotificationAPI";

const DetailStatus = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);
  const { item, routes } = route.params;
  const [data, setData] = useState(route.params.item);
  const [loading, setLoading] = useState(true);
  const [pressed, setPressed] = useState(false);
  const [isNull, setIsNull] = useState(false);

  const fetchData = () => {
    StatusApi.getItem(data._id.toString())
      .then((res) => {
        setData(res);
        setLoading(false);
        if (res.react.indexOf(user.userID) != -1) setPressed(true);
        else setPressed(false);
      })
      .catch((err) => {
        setIsNull(true);
        console.log("Error");
      });
  };
  const sendNotification = () => {
    NotificationApi.sendNoti({
      userID: data.userID,
      message: " liked your post ",
      postID: data._id,
      senderID: user.userID,
      type: "2",
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
      type: "2",
      action: "React",
    })
      .then((res) => {})
      .catch((err) => console.log("Error removed noti"));
  };

  const PressHandle = () => {
    if (pressed == true) {
      StatusApi.updateFalse(item._id.toString(), user.userID.toString())
        .then((res) => {
          removeNotification();
          setData(res);
          dispatch({ type: "UPDATE_STATUS_MEMBER", payload: res });
          if (res.react.indexOf(user.userID) != -1) setPressed(true);
          else setPressed(false);
        })
        .catch((err) => console.log("Error update false"));
    } else if (pressed == false) {
      StatusApi.updateTrue(item._id.toString(), user.userID.toString())
        .then((res) => {
          sendNotification();
          setData(res);
          dispatch({ type: "UPDATE_STATUS_MEMBER", payload: res });
          if (res.react.indexOf(user.userID) != -1) setPressed(true);
          else setPressed(false);
        })
        .catch((err) => console.log("Error update true"));
    }
  };

  useEffect(() => {
    if (item) fetchData();
    else {
      setIsNull(true);
    }
  }, []);

  const pressgobackHandler = () => {
    navigation.goBack();
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
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
                  fontFamily: "nunitobold",
                  fontSize: 25,
                }}
              >
                {" "}
                Detail{" "}
              </Text>
            </View>
          </View>

          <ScrollView style={{ padding: 10 }}>
            <UserInfo>
              <Image
                source={{ uri: user.avatar }}
                style={Poststyle_Knowledge.imageavatar}
              />
              <UserInfoText>
                <Text style={Poststyle_Knowledge.name}> {user.name}</Text>
                <Text style={Poststyle_Knowledge.posttime}>
                  {" "}
                  {data.posttime}
                </Text>
              </UserInfoText>
            </UserInfo>
            <PostText>
              <Text style={Poststyle_Knowledge.body_detail}>{data.body}</Text>
            </PostText>
            <FlatList
              scrollEnabled={true}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={data.listImage}
              renderItem={({ item }) => (
                <Image
                  style={Poststyle.imagepost_detailstatus}
                  source={{ uri: item.url }}
                />
              )}
              keyExtractor={(item) => item.key}
            />
            <TouchableOpacity
              onPress={() => navigation.push(routes.showReactInfo, { data })}
            >
              <Text style={Poststyle_Status.reactnumber_detail}>
                {data.react.length} Likes
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
export default DetailStatus;
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
