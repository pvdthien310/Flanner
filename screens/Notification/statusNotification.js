import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import NotificationApi from "../../API/NotificationAPI";
import NotificationMember from "../../components/notificationMember";
import { URL_local } from "../../constant";

const StatusNotification = ({ route, navigation }) => {
  const { routes } = route.params;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);
  const { user_status_notification, loading } = useSelector((state) => {
    return state.Notification;
  });
  const [loading2, setLoading2] = useState(false);
  const url = URL_local + "/notification/load-data/" + user.userID + "/status";
  const fetchData = () => {
    console.log(url);
    setLoading2(true);
    NotificationApi.getStatus(user.userID)
      .then((res) => {
        dispatch({
          type: "ADD_USER_STATUS_NOTIFICATION",
          payload: res.reverse(),
        });
        dispatch({ type: "SET_LOADING_NOTIFICATION", payload: false });
        setLoading2(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          {user_status_notification.length == 0 ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Image
                source={require("../../assets/icon/NoNotification2.png")}
                resizeMode="contain"
                style={{
                  width: 80,
                  height: 80,
                  marginBottom: 5,
                }}
              />
              <Text
                style={{
                  fontFamily: "nunitobold",
                  fontSize: 17,
                  marginBottom: 10,
                }}
              >
                Tích cực đăng bài để nhận thông báo bạn nhé !
              </Text>
              <TouchableOpacity
                style={{ marginBottom: 10 }}
                onPress={() => fetchData()}
              >
                <View
                  style={{
                    backgroundColor: "teal",
                    borderRadius: 5,
                    padding: 5,
                    paddingStart: 10,
                    paddingEnd: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "nunitobold",
                      fontSize: 17,
                      color: "white",
                    }}
                  >
                    Refresh
                  </Text>
                </View>
              </TouchableOpacity>
              {loading2 ? (
                <ActivityIndicator size="small" color="#000000" />
              ) : null}
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={user_status_notification}
              renderItem={({ item }) => (
                <NotificationMember
                  item={item}
                  navigation={navigation}
                  nextScreen={routes}
                />
              )}
              keyExtractor={(item) => item._id}
              onRefresh={() => fetchData()}
              refreshing={loading}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
  },
});
export default StatusNotification;
