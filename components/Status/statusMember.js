import React, { useState, useEffect, memo } from "react";
import { Text, View, FlatList, Image, Alert } from "react-native";
import Post, {
  InteractionWrapper,
  PostImage,
  PostText,
  UserInfoText,
  ReactNumber,
} from "../../shared/post";
import { UserInfo } from "../../shared/post";
import { Poststyle } from "../../styles/poststyle";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import react from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../constant.js";
import { URL_local } from "../../constant.js";
import StatusApi from "../../API/StatusAPI";
import NotificationApi from "../../API/NotificationAPI";
import ReportApi from "../../API/ReportAPI";
import Api from "../../API/UserAPI";
import Toast from "react-native-root-toast";
import SavedPostApi from "../../API/SavedPostAPI";
import { TouchableOpacity } from "react-native-gesture-handler";

const StatusMember = ({ item, navigation, nextScreen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);
  const [pressed, setPressed] = useState(false);
  const [reactnumber, setReactnumber] = useState(parseInt(item.react.length));
  const imagenumber = item.listImage.length;
  const [data, setData] = useState(item);
  const [host, setHost] = useState(undefined);

  const createTwoButtonAlert = () =>
    Alert.alert("Notification", "Do you want to save this post?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: "OK",
        onPress: () => AddSavedPost(),
      },
    ]);
  const AddSavedPost = () => {
    SavedPostApi.UpdateTrue(user.userID, item._id)
      .then((res) => {
        if (res) {
          dispatch({ type: "ADD_SAVED_POST_USER", payload: res });
          let toast = Toast.show("Save successful!", {
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
        let toast = Toast.show("Save failed, please try again!", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      });
  };
  const fetchHostData = async () => {
    await Api.getUserItem(item.userID)
      .then((res) => {
        setHost(res[0]);
      })
      .catch((err) => console.log("Loi set user by id", err));
  };

  const NavigateToCurrentUserProfile = () => {
    navigation.navigate("User Information", {
      screen: "User Dashboard",
      params: { user: "" },
    });
    dispatch({ type: "UPDATE_FEATURE", payload: 0 });
  };

  const createThreeButtonAlert = () =>
    Alert.alert(
      "Report Request:",
      "Why do you want to report this article?",
      [
        {
          text: "Plagiarism",
          onPress: () => ReportPost("Plagiarism"),
        },
        {
          text: "Inappropriate Content",
          onPress: () => ReportPost("Inappropriate Content"),
        },
        {
          text: "Trouble",
          onPress: () => ReportPost("Trouble"),
        },
        {
          text: "Other",
          onPress: () => ReportPost("Other"),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

  const ReportPost = (reason) => {
    ReportApi.AddPost({
      postID: item._id,
      reason: reason,
      posterID: item.userID,
      reporterID: user.userID,
      censor: "",
      isSeen: "false",
      type: "2",
    })
      .then((res) => {
        if (res == "Duplicate") {
          let toast = Toast.show(
            "You reported this post! Please do not duplicate",
            {
              duration: Toast.durations.SHORT,
              position: Toast.positions.CENTER,
              shadow: true,
              animation: true,
              hideOnPress: true,
            }
          );
        } else {
          let toast = Toast.show(
            "Report successful! Thanks for your supporting",
            {
              duration: Toast.durations.SHORT,
              position: Toast.positions.CENTER,
              shadow: true,
              animation: true,
              hideOnPress: true,
            }
          );
        }
      })
      .catch((err) => console.log(err));
  };

  const LoadData = () => {
    StatusApi.getItem(item._id.toString())
      .then((res) => {
        if (res.react.indexOf(user.userID) != -1) setPressed(true);
        else setPressed(false);
        setReactnumber(res.react.length);
        setData(res);
      })
      .catch((err) => console.log("err"));
  };
  useEffect(() => {
    LoadData();
    fetchHostData();
  }, []);

  const sendNotification = () => {
    NotificationApi.sendNoti({
      userID: item.userID,
      message: " liked your post",
      postID: item._id,
      senderID: user.userID,
      type: "2",
      action: "React",
    })
      .then((res) => {})
      .catch((err) => console.log("Error Send Noti", err));
  };
  const removeNotification = () => {
    NotificationApi.removeNoti({
      userID: item.userID,
      postID: item._id,
      senderID: user.userID,
      type: "2",
      action: "React",
    })
      .then((res) => {})
      .catch((err) => console.log("Error removed noti"));
  };

  const PressHandle1 = () => {
    // let numberReact = data.reactNumber;

    const url_true =
      URL_local +
      "status/update/" +
      item._id.toString() +
      "/true/" +
      user.userID.toString();
    const url_false =
      URL_local +
      "status/update/" +
      item._id.toString() +
      "/false/" +
      user.userID.toString();

    if (pressed == true) {
      StatusApi.updateFalse(item._id.toString(), user.userID.toString())
        .then((res) => {
          removeNotification();
          setData(res);
          setReactnumber(res.react.length);
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
          setReactnumber(res.react.length);
        })
        .catch((err) => console.log("Error update true"));
    }
  };

  useEffect(() => {
    // console.log('render post')
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onLongPress={() => createTwoButtonAlert()}
    >
      <Post>
        <TouchableOpacity onPress={() => createThreeButtonAlert()}>
          <MaterialIcons
            style={{ alignSelf: "flex-end", marginBottom: 5 }}
            name="report"
            size={24}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (item.userID != user.userID) {
              navigation.push(nextScreen[0], { item: [host] });
            } else {
              createTwoButtonAlert();
            }
          }}
        >
          <UserInfo>
            <Image
              source={{ uri: host ? host.avatar : item.avatar }}
              style={Poststyle.imageavatar}
            />
            <UserInfoText>
              <Text style={Poststyle.name}>
                {" "}
                {host ? host.name : item.username}
              </Text>
              <Text style={Poststyle.posttime}> {item.posttime}</Text>
            </UserInfoText>
          </UserInfo>
        </TouchableOpacity>
        <PostText>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Status Detail', { item })}> */}
          <Text style={Poststyle.body}>{item.body}</Text>

          {/* </TouchableOpacity> */}
        </PostText>

        <PostImage>
          <Text
            style={
              imagenumber == 1 || imagenumber == 0
                ? Poststyle.imagenumber1
                : Poststyle.imagenumber
            }
          >
            {imagenumber} pics
          </Text>
          <FlatList
            style={{}}
            scrollEnabled={true}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={item.listImage}
            renderItem={({ item }) => (
              <Image style={Poststyle.imagepost} source={{ uri: item.url }} />
            )}
            keyExtractor={(item) => item.key}
          />
        </PostImage>

        <TouchableOpacity
          onPress={() => navigation.push(nextScreen[1], { data: item })}
        >
          <ReactNumber>
            <Text style={Poststyle.reactnumber}>{reactnumber} Likes</Text>
          </ReactNumber>
        </TouchableOpacity>
        <InteractionWrapper style={Poststyle.interactionwrapper}>
          <TouchableOpacity style={Poststyle.buttonpost} onPress={PressHandle1}>
            <Ionicons
              style={pressed ? Poststyle.buttonicon1 : Poststyle.buttonicon}
              name="md-heart-sharp"
              size={20}
            />
            <Text
              style={pressed ? Poststyle.buttontext1 : Poststyle.buttontext}
            >
              React
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push(nextScreen[2], { item: data })}
            style={Poststyle.buttonpost}
          >
            <Octicons
              style={Poststyle.buttonicon}
              name="comment"
              size={20}
              color="black"
            />
            <Text style={Poststyle.buttontext}>Comment</Text>
          </TouchableOpacity>
        </InteractionWrapper>
      </Post>
    </TouchableOpacity>
  );
};
export default react.memo(StatusMember);
