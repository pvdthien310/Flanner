import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  ActivityIndicator,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CommentAPI from "../../API/CommentAPI";
import Api from "../../API/UserAPI";
import CommentMember from "../../components/Knowledge/commentMember";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import NotificationApi from "../../API/NotificationAPI";
import NewCommentAPI from "./../../API/NewCommentAPI";

const { height, width } = Dimensions.get("screen");

const logoHeight = height * 0.5;

const CommentScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { item, routes } = route.params;
  const [listComment, setListComment] = useState(undefined);
  const { user } = useSelector((state) => state.User);
  const [body, setBody] = useState("");
  const [totalComment, setTotalComment] = useState(0);
  const [totalLevel0, setTotalLevel0] = useState(0);
  const { nextCursor, loading } = useSelector((state) => {
    return state.Comment;
  });
  const inputsRef = useRef(null);
  const [loadingAddCmt, setLoadingAddCmt] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  const onValueChange = (text) => {
    setBody(text);
  };
  const pressgobackHandler = () => {
    navigation.goBack();
  };
  const FetchCommentList = () => {
    let listTemp = [];
    NewCommentAPI.loadByPostLevel(item._id, 0)
      .then((res) => {
        res.map((i) => {
          listTemp.push({ ...i, createdAt: i.createdAt.substring(0, 10) });
        });
        setListComment(listTemp);
        setTotalLevel0(listTemp.length);
      })
      .catch((err) => console.log("Error Load Comment List"));

    NewCommentAPI.countCommentsByPostId(item._id)
      .then((res) => {
        setTotalComment(res);
      })
      .catch((err) => {
        console.log(err);
      });

    countCommentLevel0();
  };

  const createTwoButtonAlert = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const SendComment = () => {
    if (!isReplying) {
      setLoadingAddCmt(true);
      const d = new Date();
      const newRootComment = {
        postId: item._id,
        userId: user.userID,
        userName: user.name,
        childCmtId: [],
        reactUsers: [],
        body,
        isPositive: "null",
        parentCmtId: "null",
        level: 0,
      };

      CommentAPI.AddRootComment(newRootComment)
        .then((res) => {
          const newList = [res, ...listComment];
          setListComment(newList);
          setBody("");
          setLoadingAddCmt(false);
          if (item.userID != user.userID) sendNotification();
        })
        .catch((err) => console.log(err));
    } else {
      setIsReplying(false);
      setLoadingAddCmt(true);
      const newReplyComment = {
        postId: item._id,
        userId: user.userID,
        userName: user.name,
        reactUsers: [],
        body,
        isPositive: "null",
        parentCmtId: replyTo._id,
        level: replyTo.level + 1,
      };
      NewCommentAPI.addReply(newReplyComment)
        .then((res) => {
          FetchCommentList();
          setBody("");
          setReplyTo(null);
          setLoadingAddCmt(false);
          refresh();
          if (item.userID != user.userID) sendNotification();
        })
        .catch((err) => console.log(err));
    }
  };

  const sendNotification = () => {
    NotificationApi.sendNoti({
      userID: item.userID,
      message: " just commented your post ",
      postID: item._id,
      senderID: user.userID,
      type: item.title ? "1" : "2",
      action: "Comment",
    })
      .then((res) => {
        setTotalComment(totalComment + 1);
      })
      .catch((err) => console.log("Error send noti"));
  };

  const countComment = async () => {
    await NewCommentAPI.countCommentsByPostId(item._id)
      .then((res) => {
        setTotalComment(res);
        dispatch({ type: "SET_LOADING_COMMENT", payload: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const countCommentLevel0 = async () => {
    let listTemp = [];
    await NewCommentAPI.loadByPostLevel(item._id, 0)
      .then((res) => {
        setTotalLevel0(res.length);
        dispatch({ type: "SET_LOADING_COMMENT", payload: false });
      })
      .catch((err) => console.log(err));
  };

  const LoadComment = () => {
    loadMoreComment();
    countComment();
    countCommentLevel0();
  };

  const setFocusReply = (replyToCmt) => {
    setIsReplying(true);
    inputsRef.current.focus();
    setReplyTo(replyToCmt);
  };

  const handleCloseReply = () => {
    setIsReplying(false);
    setReplyTo(null);
  };

  useEffect(() => {
    setListComment([]);
    LoadComment();
    //refresh();
  }, []);

  const loadMoreComment = async () => {
    if (listComment == undefined || listComment.length === 0) {
      dispatch({
        type: "SET_CURSOR_COMMENT",
        payload: 0,
      });
    }
    await NewCommentAPI.getPagination(nextCursor, item._id)
      .then((res) => {
        let listTemp = [];
        res.data.forEach((element) => {
          listTemp.push(element);
        });
        if (listComment === undefined) {
          setListComment(listTemp);
        } else {
          setListComment([...listComment, ...listTemp]);
        }
        dispatch({ type: "SET_CURSOR_COMMENT", payload: res.cursor });
        dispatch({ type: "SET_LOADING_COMMENT", payload: false });
      })
      .catch((err) => console.log(err));
  };

  const refresh = async () => {
    setListComment([]);
    countComment();
    countCommentLevel0();
    NewCommentAPI.reload(item._id, nextCursor)
      .then((data) => {
        dispatch({ type: "SET_LOADING_COMMENT", payload: false });
        setListComment(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      {item.listImage.length > 0 ? (
        <Image
          style={{
            height: height * 0.3,
            width: "100%",

            shadowOffset: { width: 1, height: 1 },
            shadowColor: "black",
            shadowOpacity: 0.5,
          }}
          source={{ uri: item.listImage[0].url }}
        ></Image>
      ) : (
        <Image
          style={{
            height: height * 0.3,
            width: "100%",

            shadowOffset: { width: 1, height: 1 },
            shadowColor: "black",
            shadowOpacity: 0.5,
          }}
          source={{
            uri: "https://images.unsplash.com/photo-1637832282945-093d74a8a0bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
          }}
        ></Image>
      )}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.commentFrame}>
          <TextInput
            style={styles.textInput}
            placeholder="Write a comment..."
            placeholderTextColor="dimgrey"
            multiline={true}
            showsVerticalScrollIndicator={false}
            value={body}
            onChangeText={onValueChange}
            ref={inputsRef}
          ></TextInput>
          {loadingAddCmt && (
            <ActivityIndicator
              style={{
                position: "absolute",
                marginTop: 25,
                start: width * 0.77,
              }}
              size="small"
              color="black"
            />
          )}
          {isReplying && (
            <TouchableOpacity
              style={{
                position: "absolute",
                marginTop: 25,
                start: width * 0.77,
              }}
              onPress={handleCloseReply}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => SendComment()}
            style={{
              position: "absolute",
              margin: 10,
              start: width * 0.83,
            }}
          >
            <Ionicons
              style={{ marginTop: "30%" }}
              name="md-send-sharp"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          {isReplying && (
            <Text
              style={{
                fontFamily: "robotoregular",
                padding: 5,
                fontSize: 11,
                marginTop: -15,
                marginStart: 15,
                marginBottom: 5,
                color: "gray",
                opacity: 0.5,
                fontStyle: "italic",
              }}
            >
              Replying to {replyTo?.userName}
            </Text>
          )}
          {loading ? (
            <ActivityIndicator
              style={{
                position: "absolute",
                marginTop: 25,
                start: width * 0.77,
              }}
              size="large"
              color="black"
            />
          ) : (
            listComment !== undefined &&
            listComment.length > 0 && (
              <View>
                <Text
                  style={{
                    fontFamily: "robotoregular",
                    fontWeight: "bold",
                    padding: 5,
                    fontSize: 14,
                    marginTop: 5,
                    marginStart: 15,
                    marginBottom: 5,
                  }}
                >
                  {totalComment} COMMENTS TOTAL
                </Text>

                <FlatList
                  style={{
                    padding: 10,
                    maxHeight: height * 0.6,
                    height: "auto",
                    overflow: "scroll",
                  }}
                  data={listComment}
                  renderItem={({ item }) => (
                    <CommentMember
                      route={routes}
                      item={item}
                      navigation={navigation}
                      nextScreen={routes.friendInfo}
                      reload={refresh}
                      setFocusOnReply={(replyToCmt) =>
                        setFocusReply(replyToCmt)
                      }
                    ></CommentMember>
                  )}
                  keyExtractor={(item) => item._id}
                />
                {listComment.length < totalLevel0 && (
                  <Text style={styles.viewMore} onPress={LoadComment}>
                    View more comments...
                  </Text>
                )}
              </View>
            )
          )}
        </View>
      </TouchableWithoutFeedback>

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
            padding: 5,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: "white",
          }}
        >
          <MaterialIcons name="keyboard-backspace" size={25} color="black" />
          <Text
            style={{
              color: "black",
              fontSize: 15,
              fontFamily: "nunitobold",
              margin: 5,
            }}
          >
            Back
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  commentFrame: {
    height: height,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowColor: "black",
    paddingTop: 5,
    backgroundColor: "white",
    position: "absolute",
    top: height * 0.1,
    alignSelf: "center",
  },
  textInput: {
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    minHeight: 40,
    fontSize: 15,
    fontFamily: "nunitobold",
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 1,
    margin: 10,
    width: width * 0.9,
    alignSelf: "center",
  },
  viewMore: {
    marginLeft: 20,
    fontWeight: "bold",
    fontSize: 15,
  },
});
export default CommentScreen;
