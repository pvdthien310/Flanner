import React, { useState, useEffect, memo } from "react";
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import react from "react";
import Api from "../../API/UserAPI";
import { useSelector, useDispatch } from "react-redux";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import NewCommentAPI from "../../API/NewCommentAPI";
import { SimpleLineIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("screen");

const CommentMember = ({
  item,
  navigation,
  nextScreen,
  route,
  reload,
  setFocusOnReply,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state.User;
  });
  //item is surely level 0
  const [host, setHost] = useState(undefined);
  const [isLike, SetisLike] = useState(false);
  const [data, setData] = useState(item);
  const [listLevel, setListLevel] = useState([]);
  const [notShowList, setNotShowList] = useState(true);

  const createTwoButtonAlert = () =>
    Alert.alert("Notification", "Do you want to navigate your profile?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      { text: "OK", onPress: () => NavigateToCurrentUserProfile() },
    ]);

  const confirmDelete = () => {
    Alert.alert("Delete", "Do you want to delete this comment?", [
      {
        text: "Cancel",
        onPress: () => console.log(""),
      },
      { text: "OK", onPress: () => deleteComment() },
    ]);
  };

  const NavigateToCurrentUserProfile = () => {
    navigation.navigate("User Information", {
      screen: "User Dashboard",
      params: { user: "" },
    });
    dispatch({ type: "UPDATE_FEATURE", payload: 0 });
  };

  const fetchLevel = async () => {
    let tempList = [];
    await NewCommentAPI.getByDirectParent(item._id)
      .then((res) => {
        res.map((i) => {
          tempList.push({
            ...i,
            createdAt: i.createdAt.substring(0, 10),
          });
        });
        setListLevel(tempList);
      })
      .catch((err) => console.log("Error to get level 1 comment"));
  };

  const fetchHostData = async () => {
    await Api.getUserItem(item.userId)
      .then((res) => {
        console.log(res[0]);
        setHost(res[0]);
        if (item.reactUsers.indexOf(res.userID) == -1) SetisLike(false);
        else {
          SetisLike(true);
        }
      })
      .catch((err) => console.log("Loi set user by id", err));
  };

  const ReactActionHandler = async () => {
    await NewCommentAPI.reactComment(item._id, user.userID)
      .then((res) => {
        if (res.reactUsers.indexOf(user.userID) === -1) {
          SetisLike(false);
        } else {
          SetisLike(true);
        }
        setData(res);
      })
      .catch((err) => console.log(err));
  };

  const editComment = async () => {
    await NewCommentAPI.update(data)
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  const deleteComment = async () => {
    await NewCommentAPI.delete({
      id: item._id.toString(),
      level: item.level,
    })
      .then((res) => {
        console.log(res);
        reload();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchHostData();
    fetchLevel();
  }, []);

  const [visibleMenu, setVisibleMenu] = useState(false);

  const hideMenu = () => setVisibleMenu(false);

  const showMenu = () => setVisibleMenu(true);

  return (
    <View style={styles.bigContainer}>
      <View style={styles.wholeComment}>
        <View style={styles.container}></View>
        {host && (
          <Image
            style={{
              height: 25,
              width: 25,
              borderRadius: 30,
              marginRight: 10,
            }}
            source={{ uri: host.avatar }}
          ></Image>
        )}
        <View style={styles.contentContainer}>
          <View style={styles.bodyContainer}>
            <View style={styles.title}>
              {host ? (
                <TouchableOpacity
                  onPress={() => {
                    if (host.email != user.email) {
                      navigation.push(nextScreen, { item: [host] });
                    } else {
                      createTwoButtonAlert();
                    }
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "robotoregular",
                      fontWeight: "bold",
                      fontSize: 13,
                      color: "black",
                      marginStart: 2,
                    }}
                  >
                    {host.name}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: "robotoregular",
                      fontWeight: "bold",
                      fontSize: 13,
                      color: "white",
                    }}
                  >
                    {item.userName}
                  </Text>
                </TouchableOpacity>
              )}
              <Text
                style={{
                  fontFamily: "robotoregular",
                  fontSize: 12,
                  color: "gray",
                  opacity: 0.5,
                }}
              >
                {data.createdAt}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "nunitoregular",
                fontSize: 13,
                color: "black",
                marginStart: 2,
                opacity: 1,
              }}
            >
              {item.body}
            </Text>
          </View>
          <View style={styles.footerComment}>
            <View style={{ marginTop: 3 }}>
              {!notShowList ? (
                <TouchableOpacity onPress={() => setNotShowList(true)}>
                  <Text
                    style={{ fontSize: 11, fontStyle: "italic", opacity: 0.5 }}
                  >
                    Hide
                  </Text>
                </TouchableOpacity>
              ) : null}
              {listLevel.length != 0 && notShowList ? (
                <TouchableOpacity onPress={() => setNotShowList(false)}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontStyle: "italic",
                      opacity: 0.5,
                    }}
                  >
                    Show more replies
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => setFocusOnReply(item)}
                style={{ marginRight: 5, marginTop: 3 }}
              >
                <Text style={{ fontSize: 11 }}>Reply</Text>
              </TouchableOpacity>
              {isLike === false && data ? (
                <>
                  <TouchableOpacity onPress={() => ReactActionHandler()}>
                    <Ionicons name="ios-heart" size={20} color="black" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: "nunitobold",
                      fontSize: 11,
                      marginTop: 3,
                    }}
                  >
                    {data.reactUsers.length}
                  </Text>
                </>
              ) : (
                <>
                  <TouchableOpacity onPress={() => ReactActionHandler()}>
                    <Ionicons name="ios-heart" size={20} color="maroon" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: "nunitobold",
                      fontSize: 15,
                      color: "maroon",
                    }}
                  >
                    {data.reactUsers.length}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
        {(user.userID === item.userId ||
          user.userID === item.userId ||
          user.userID === item.userID) && (
          <View style={styles.menu}>
            <Menu
              visible={visibleMenu}
              anchor={
                <SimpleLineIcons
                  name="options-vertical"
                  size={18}
                  color="gray"
                  onPress={showMenu}
                />
              }
              onRequestClose={hideMenu}
            >
              {user.userID === item.userId && (
                <MenuItem
                  onPress={() => {
                    hideMenu;
                    editComment;
                  }}
                >
                  Edit
                </MenuItem>
              )}
              <MenuDivider />
              {(user.userID === item.userId || user.userID === item.userID) && (
                <MenuItem
                  onPress={() => {
                    hideMenu();
                    confirmDelete();
                  }}
                >
                  <Text style={{ color: "#800000" }}>Delete</Text>
                </MenuItem>
              )}
            </Menu>
          </View>
        )}
      </View>
      {!notShowList ? (
        <View>
          <FlatList
            style={{
              marginLeft: 20,
              overflow: "scroll",
            }}
            data={listLevel}
            renderItem={({ item }) => (
              <CommentMember
                route={route}
                item={item}
                navigation={navigation}
                nextScreen={route.friendInfo}
              ></CommentMember>
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  bigContainer: {
    display: "flex",
    height: "auto",
    flexDirection: "column",
    marginBottom: 7,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    width: "auto",
    maxWidth: "75%",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 2,
    width: "90%",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#DADDE1",
    borderRadius: 16,
    padding: 10,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerComment: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 3,
  },
  wholeComment: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "80%",
  },
  menu: {
    width: 30,
    height: 30,
    marginVertical: 15,
    marginHorizontal: 10,
  },
});
export default react.memo(CommentMember);
