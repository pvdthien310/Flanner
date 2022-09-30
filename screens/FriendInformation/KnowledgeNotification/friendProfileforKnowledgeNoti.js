import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import KnowLedgeApi from "../../../API/KnowledgeAPI";
import StatusApi from "../../../API/StatusAPI";
import Api from "../../../API/UserAPI";

const { height } = Dimensions.get("screen");
const logoHeight = height * 0.5;

const FriendInfoForKnowledgeNoti = ({ navigation, route }) => {
  const { item } = route.params;

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);
  const [knowledge, setKnowledge] = useState([]);
  const [status, setStatus] = useState([]);
  const [postNumber, setPostNumber] = useState(
    knowledge.length + status.length
  );

  const [isfollowing, Setisfollowing] = useState(false);
  const [isfollowed, Setisfollowed] = useState(false);
  const [friendInfo, SetfriendInfo] = useState(item[0]);

  const CheckFollowStatus = () => {
    if (friendInfo.following.indexOf(user.userID) != -1) Setisfollowing(true);
    if (friendInfo.followed.indexOf(user.userID) != -1) Setisfollowed(true);
  };

  const FetchFriendInfo = () => {
    Api.getUserItem(friendInfo.userID)
      .then((res) => {
        SetfriendInfo(res[0]);
        CheckFollowStatus();
        fetchKnowledgeData();
        fetchStatusData();
      })
      .catch((err) => console.log("error load user by id"));
  };

  const FollowButtonHandler = async () => {
    await Api.addFollowing(friendInfo.userID, user.userID).then(async (res) => {
      dispatch({ type: "ADD_USER", payload: res });
      await Api.addFollowed(user.userID, friendInfo.userID).then((res) => {
        SetfriendInfo(res);
        Setisfollowed(true);
      });
    });
  };
  const FollowingButtonHandler = async () => {
    await Api.removeFollowing(friendInfo.userID, user.userID).then(
      async (res) => {
        dispatch({ type: "ADD_USER", payload: res });
        await Api.removeFollowed(user.userID, friendInfo.userID).then((res) => {
          SetfriendInfo(res);
          Setisfollowed(false);
        });
      }
    );
  };
  const AcceptButtonHandler = async () => {
    await Api.addFollowing(friendInfo.userID, user.userID).then(async (res) => {
      dispatch({ type: "ADD_USER", payload: res });
      await Api.addFollowed(user.userID, friendInfo.userID).then((res) => {
        SetfriendInfo(res);
        Setisfollowed(true);
      });
    });
  };
  const FriendButtonHandler = async () => {
    await Api.removeFollowing(friendInfo.userID, user.userID).then(
      async (res) => {
        dispatch({ type: "ADD_USER", payload: res });
        await Api.removeFollowed(user.userID, friendInfo.userID).then((res) => {
          SetfriendInfo(res);
          Setisfollowed(false);
        });
      }
    );
  };

  useEffect(() => {
    CountPost();
    CheckFollowStatus();
  }, [knowledge, status]);

  const fetchKnowledgeData = () => {
    KnowLedgeApi.getKnowledgeUser(friendInfo.userID)
      .then((result) => {
        setKnowledge(result);
      })
      .catch((err) => console.log("Error"));
  };
  const fetchStatusData = () => {
    StatusApi.getStatusUser(friendInfo.userID)
      .then((result) => {
        setStatus(result);
        CountPost();
      })
      .catch((err) => console.log("Error"));
  };
  useEffect(() => {
    FetchFriendInfo();
  }, []);

  const CountPost = () => {
    setPostNumber(knowledge.length + status.length);
  };
  const pressgobackHandler = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            style={{
              height: height * 0.58,
              width: "100%",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
              shadowOffset: { width: 1, height: 1 },
              shadowColor: "black",
              shadowOpacity: 0.5,
            }}
            source={{ uri: friendInfo.avatar }}
          ></Image>
          <View
            style={{
              backgroundColor: "white",
              alignSelf: "center",
              width: "95%",
              height: "100%",
              borderRadius: 10,
              flexDirection: "column",
              shadowOffset: { width: 1, height: 1 },
              shadowColor: "black",
              shadowOpacity: 0.5,
              marginTop: 5,
            }}
          >
            <View style={{ width: "100%", height: logoHeight * 0.05 }}></View>
            <View
              style={{
                backgroundColor: "whitesmoke",
                alignSelf: "center",
                width: "90%",
                height: logoHeight * 0.17,
                borderRadius: 10,
                flexDirection: "row",
                shadowOffset: { width: 1, height: 1 },
                shadowColor: "black",
                shadowOpacity: 0.5,
                justifyContent: "space-around",
                paddingStart: 10,
                paddingEnd: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginEnd: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "nunitobold",
                    fontSize: 18,
                    color: "black",
                  }}
                >
                  {postNumber}
                </Text>
                <Text
                  style={{
                    fontFamily: "nunitobold",
                    fontSize: 15,
                    color: "dimgrey",
                  }}
                >
                  Post
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "nunitobold",
                    fontSize: 18,
                    color: "black",
                  }}
                >
                  {friendInfo.following.length}
                </Text>
                <Text
                  style={{
                    fontFamily: "nunitobold",
                    fontSize: 15,
                    color: "dimgrey",
                  }}
                >
                  Following
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "nunitobold",
                    fontSize: 18,
                    color: "black",
                  }}
                >
                  {friendInfo.followed.length}
                </Text>
                <Text
                  style={{
                    fontFamily: "nunitobold",
                    fontSize: 15,
                    color: "dimgrey",
                  }}
                >
                  Followers
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "column", padding: 10 }}>
              <Text
                style={{
                  paddingStart: 10,
                  paddingEnd: 10,
                  fontFamily: "nunitobold",
                  fontSize: 15,
                  color: "dimgrey",
                  marginBottom: 10,
                  alignSelf: "center",
                }}
              >
                {friendInfo.bio}
              </Text>
              <View
                style={{
                  borderBottomColor: "dimgrey",
                  borderBottomWidth: 0.7,
                  marginBottom: 15,
                  marginTop: 10,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.push("Knowledge Notification Friend Knowledge", {
                      user: friendInfo,
                      knowledge: knowledge,
                    })
                  }
                >
                  <View style={styles.button1}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        paddingStart: 10,
                        paddingEnd: 10,
                        fontFamily: "nunitobold",
                      }}
                    >
                      Knowledge
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.push("Knowledge Notification Friend Status", {
                      user: friendInfo,
                      status: status,
                    })
                  }
                >
                  <View style={styles.button2}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        paddingStart: 15,
                        paddingEnd: 15,
                        fontFamily: "nunitobold",
                      }}
                    >
                      Status
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: height * 0.38,
              position: "absolute",
              flexDirection: "column",
              width: "90%",
              alignSelf: "center",
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                borderRadius: 20,
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: 15,
                shadowOffset: { width: 1, height: 1 },
                shadowColor: "black",
                shadowOpacity: 0.3,
                marginStart: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  style={{ marginEnd: 10 }}
                  name="location"
                  size={24}
                  color="white"
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontFamily: "nunitobold",
                  }}
                >
                  {friendInfo.address}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome5
                  style={{ marginEnd: 10 }}
                  name="birthday-cake"
                  size={22}
                  color="white"
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontFamily: "nunitobold",
                  }}
                >
                  {friendInfo.doB}
                </Text>
              </View>
            </View>

            <View
              style={{
                alignSelf: "center",
                backgroundColor: "white",
                width: "100%",
                height: logoHeight * 0.17,
                borderRadius: 20,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 15,
                shadowOffset: { width: 1, height: 1 },
                shadowColor: "black",
                shadowOpacity: 0.3,
              }}
            >
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "nunitobold",
                      marginEnd: 5,
                    }}
                  >
                    {friendInfo.name}
                  </Text>
                  {friendInfo ? (
                    <View>
                      {friendInfo.followed.length > 0 ? (
                        <Image
                          source={require("../../../assets/overrall.png")}
                          resizeMode="contain"
                          style={{
                            width: 25,
                            height: 25,
                          }}
                        />
                      ) : null}
                    </View>
                  ) : null}
                </View>
                <Text style={{ fontFamily: "nunitobold", color: "dimgrey" }}>
                  {" "}
                  {friendInfo.job}
                </Text>
              </View>

              {isfollowing === false && isfollowed === false && (
                <TouchableOpacity onPress={() => FollowButtonHandler()}>
                  <View
                    style={{
                      ...styles.buttonFriendstatus,
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 17,
                        paddingStart: 15,
                        paddingEnd: 15,
                        fontFamily: "nunitobold",
                      }}
                    >
                      Follow
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {isfollowing === true && isfollowed === false && (
                <TouchableOpacity onPress={() => AcceptButtonHandler()}>
                  <View
                    style={{
                      ...styles.buttonFriendstatus,
                      flexDirection: "row",
                      backgroundColor: "maroon",
                    }}
                  >
                    <Ionicons name="checkmark-circle" size={24} color="white" />
                    <Text
                      style={{
                        color: "white",
                        alignSelf: "center",
                        fontSize: 17,
                        paddingStart: 5,
                        paddingEnd: 15,
                        fontFamily: "nunitobold",
                      }}
                    >
                      Accept
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {isfollowing === false && isfollowed === true && (
                <TouchableOpacity onPress={() => FollowingButtonHandler()}>
                  <View
                    style={{
                      ...styles.buttonFriendstatus,
                      backgroundColor: "teal",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 17,
                        paddingStart: 15,
                        paddingEnd: 15,
                        fontFamily: "nunitobold",
                      }}
                    >
                      Following
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {isfollowing === true && isfollowed === true && (
                <TouchableOpacity onPress={() => FriendButtonHandler()}>
                  <View
                    style={{
                      ...styles.buttonFriendstatus,
                      backgroundColor: "teal",
                      flexDirection: "row",
                    }}
                  >
                    <Ionicons name="checkmark-circle" size={24} color="white" />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 17,
                        alignSelf: "center",
                        paddingStart: 5,
                        paddingEnd: 15,
                        fontFamily: "nunitobold",
                      }}
                    >
                      Friend
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* <TouchableOpacity style={{ position: 'absolute', marginTop: 5, marginStart: 15 }} onPress = {CountPost} >
                        <View style={{ flexDirection: 'row', marginBottom: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'nunitobold' }}>Thien Pham</Text>
                        </View>
                    </TouchableOpacity> */}
          <TouchableOpacity
            onPress={pressgobackHandler}
            style={{
              alignItems: "flex-start",
              position: "absolute",
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: 5,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <MaterialIcons
                name="keyboard-backspace"
                size={30}
                color="black"
              />
              <Text
                style={{
                  color: "black",
                  fontSize: 20,
                  fontFamily: "nunitobold",
                  margin: 5,
                }}
              >
                {friendInfo.name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 5,
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  button1: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    borderRadius: 10,
    padding: 7,
    backgroundColor: "lightslategrey",
  },
  button2: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    borderRadius: 10,
    padding: 7,
    backgroundColor: "black",
  },
  button3: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    borderRadius: 10,
    padding: 7,
    backgroundColor: "dimgrey",
  },
  buttonFriendstatus: {
    borderRadius: 20,
    padding: 7,
    backgroundColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.5,
  },
});
export default FriendInfoForKnowledgeNoti;
