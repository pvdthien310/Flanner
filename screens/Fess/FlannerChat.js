import React, { useState, useEffect, useRef, useContext } from "react";
import {
  LogBox,
  ActivityIndicator,
  ScrollView,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useChatContext,
  OverlayProvider,
  ChannelList,
  useChannelsContext,
  ChannelPreview,
} from "stream-chat-expo";
import { LinearGradient } from "expo-linear-gradient";
import UserListItemInFessScr from "./../../components/Fess/ChannelList/UserListItemInFessScr";
import { SafeAreaView } from "react-native-safe-area-context";

LogBox.ignoreAllLogs(true);
const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  header: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  proContainer: {
    padding: 10,
    maxHeight: "auto",
    height: "auto",
    display: "flex",
    flexDirection: "row",
  },
});

const sort = { last_message_at: -1 };

const Fess = ({ navigation }) => {
  const { user } = useSelector((state) => {
    return state.User;
  });
  const [isReady, setIsReady] = useState(false);
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const pan = useRef(new Animated.ValueXY()).current;
  const list = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    const connectUser = async () => {
      await client.connectUser(
        {
          id: user.userID,
          name: user.name,
          image: user.avatar,
        },
        client.devToken(user.userID)
      );
      setIsReady(true);
    };
    const fetchUsers = async () => {
      const resp = await client.queryUsers({});
      setUsers(resp.users);
      setLoading(false);
    };
    connectUser();
    fetchUsers();
    return () => client.disconnectUser();
  }, []);

  const filters = {
    members: {
      $in: [user.userID],
    },
  };

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  const onChannelPressed = (channel) => {
    navigation.navigate("Channel", { channel });
  };
  const flatListProps = { bounces: true };

  console.log(isReady);
  if (!isReady) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <View style={{ maxHeight: 100, flex: 1, padding: 5 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {users.map((item) => (
              <UserListItemInFessScr
                tempUser={item}
                keyExtractor={(item) => item.id.toString()}
                key={item.id.toString()}
              />
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "gray",
            width: "100%",
          }}
        ></View>
        <OverlayProvider>
          <ChannelList
            additionalFlatListProps={flatListProps}
            onSelect={onChannelPressed}
            filters={filters}
            sort={sort}
          />
        </OverlayProvider>
      </SafeAreaProvider>
    );
  }
};
export default Fess;
