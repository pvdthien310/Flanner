import React, { useState, useEffect, memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  InteractionManager,
  Alert,
} from "react-native";
import react from "react";
import { useSelector, useDispatch } from "react-redux";
import KnowLedgeApi from "../../../API/KnowledgeAPI";
import StatusApi from "../../../API/StatusAPI";
import Api from "../../../API/UserAPI";
import { Poststyle_Status } from "../../../styles/poststyle";
import Toast from "react-native-root-toast";
import SavedPostApi from "../../../API/SavedPostAPI";

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");

const SavedPostMember = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state.User;
  });
  const [data, SetData] = useState(undefined);
  const [type, SetType] = useState(undefined);
  const [host, setHost] = useState(undefined);

  const createTwoButtonAlert = () =>
    Alert.alert("Notification", "Do you want to deleted this post?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: "OK",
        onPress: () => RemovePost(),
      },
    ]);
  const RemovePost = () => {
    SavedPostApi.UpdateFalse(user.userID, item)
      .then((res) => {
        console.log(res);
        if (res) {
          dispatch({ type: "ADD_SAVED_POST_USER", payload: res });
          let toast = Toast.show("Delete successful!", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        let toast = Toast.show("Delete failed, please try again!", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      });
  };
  const fetchKnowledgeItem = () => {
    KnowLedgeApi.getItem(item)
      .then((res) => {
        if (res != "No Exist") {
          SetData(res);
          SetType(1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchHostData = () => {
    Api.getUserItem(data.userID)
      .then((res) => {
        setHost(res);
      })
      .catch((err) => console.log("Loi set user by id", err));
  };

  const fetchStatusItem = () => {
    StatusApi.getItem(item)
      .then((res) => {
        if (res != "No Exist") {
          SetData(res);
          SetType(2);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchStatusItem();
    fetchKnowledgeItem();
  }, []);
  useEffect(() => {
    if (data) fetchHostData();
  }, [data]);

  return (
    <TouchableOpacity
      activeOpacity={type == 1 ? 0.5 : 1}
      onPress={() => {
        if (data.mode == "public") {
          if (type == 1)
            navigation.navigate("Detail Saved Post Screen", {
              item: data,
              poster: host[0],
            });
          else if (type == 2) {
            let toast = Toast.show("Status has no details!", {
              duration: Toast.durations.SHORT,
              position: Toast.positions.CENTER,
              shadow: true,
              animation: true,
              hideOnPress: true,
            });
          }
        } else {
          let toast = Toast.show("This post does not exists anymore!", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
          });
        }
      }}
      onLongPress={() => {
        createTwoButtonAlert();
      }}
    >
      <View
        style={{
          borderRadius: 10,
          backgroundColor: "white",
          marginTop: 10,
          padding: 10,
        }}
      >
        {type == 1 && (
          <View
            style={{
              padding: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "black",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "space-between",
                padding: 5,
                marginBottom: 5,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunitobold",
                  fontSize: 14,

                  color: "white",
                  alignSelf: "center",
                }}
              >
                Knowledge
              </Text>
              {host && (
                <View>
                  {host.length > 0 ? (
                    <Text
                      style={{
                        fontFamily: "nunitobold",
                        fontSize: 15,
                        marginStart: 5,
                        color: "white",
                      }}
                    >
                      {host[0].name}
                    </Text>
                  ) : (
                    <Text>{data.username}</Text>
                  )}
                </View>
              )}
            </View>
            <View
              style={{
                backgroundColor: "black",
                height: 2,
              }}
            ></View>
            <Text
              style={{
                fontFamily: "robotobold",
                fontSize: 18,
              }}
            >
              {data.title}
            </Text>
            <Text
              style={{
                fontFamily: "robotoregular",
              }}
            >
              {data.description}
            </Text>
          </View>
        )}
        {type == 2 && (
          <View
            style={{
              padding: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "black",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "space-between",
                padding: 5,
                marginBottom: 5,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunitobold",
                  fontSize: 14,

                  color: "white",
                }}
              >
                Status
              </Text>
              {host && (
                <View>
                  {host.length > 0 ? (
                    <Text
                      style={{
                        fontFamily: "nunitobold",
                        fontSize: 15,
                        marginStart: 5,
                        color: "white",
                      }}
                    >
                      {host[0].name}
                    </Text>
                  ) : (
                    <Text>{data.username}</Text>
                  )}
                </View>
              )}
            </View>
            <View
              style={{
                backgroundColor: "black",
                height: 2,
                marginBottom: 5,
              }}
            ></View>
            <Text
              style={{
                fontFamily: "nunitoregular",
              }}
            >
              {data.body}
            </Text>
          </View>
        )}
        {data && (
          <View>
            {data.listImage.length > 0 ? (
              <Image
                source={{ uri: data.listImage[0].url }}
                resizeMode="contain"
                style={{
                  minHeight: 300,
                  minWidth: 400,
                }}
              />
            ) : (
              <Image
                source={require("../../../assets/icon/postPhoto.png")}
                resizeMode="contain"
                style={{
                  width: 100,
                  height: 100,
                  marginBottom: 5,
                  borderRadius: 10,
                  alignSelf: "center",
                }}
              />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default react.memo(SavedPostMember);

const styles = StyleSheet.create({
  frame_1: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    borderRadius: 5,
    padding: 10,
    margin: 5,
    backgroundColor: "lightslategrey",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  frame_2: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    borderRadius: 5,
    padding: 10,
    margin: 5,
    backgroundColor: "dimgrey",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  frame_3: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    borderRadius: 5,
    padding: 10,
    margin: 5,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  body: {
    fontFamily: "nunitoregular",
    fontSize: 17,
    color: "white",
    alignSelf: "center",
  },
  imagepost: {
    height: 50,
    width: 50,
    resizeMode: "stretch",
  },
});
