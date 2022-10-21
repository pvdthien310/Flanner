import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Button,
  Dimensions,
} from "react-native";
import { globalStyles } from "../../styles/global";

import KnowledgeMember from "../../components/Knowledge/knowledgeMember";
import { useSelector, useDispatch } from "react-redux";
import "../../constant.js";
import { URL_local } from "../../constant.js";
import KnowLedgeApi from "../../API/KnowledgeAPI";
import StatusApi from "../../API/StatusAPI";
import NotificationApi from "../../API/NotificationAPI";

const { height } = Dimensions.get("screen");
const logoHeight = height * 0.5;

const Knowledge = ({ navigation }) => {
  const [, forceRerender] = useState();
  const [cursor, setCursor] = useState();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => {
    return state.Knowledge;
  });
  const { user } = useSelector((state) => {
    return state.User;
  });
  const fetchKnowledgeData = () => {
    KnowLedgeApi.getKnowledgeUser(user.userID)
      .then((res) => {
        dispatch({ type: "ADD_USER_KNOWLEDGE", payload: res });
      })
      .catch((err) => console.log(err));
  };
  const fetchStatusData = () => {
    StatusApi.getStatusUser(user.userID)
      .then((res) => {
        dispatch({ type: "ADD_USER_STATUS", payload: res });
        dispatch({ type: "SET_LOADING_STATUS", payload: false });
      })
      .catch((err) => console.log(err));
  };

  const fetchNewData = () => {
    KnowLedgeApi.getPagination()
      .then((res) => {
        setCursor(res.cursor);
        dispatch({ type: "ADD_DATA_KNOWLEDGE", payload: res.data });
        dispatch({ type: "SET_LOADING_KNOWLEDGE", payload: false });
      })
      .catch((err) => console.log(err));
  };

  const fetchMoreData = () => {
    KnowLedgeApi.getPagination(cursor)
      .then((res) => {
        setCursor(res.cursor);
        const payload = [...data, ...res.data];
        dispatch({ type: "ADD_DATA_KNOWLEDGE", payload });
        dispatch({ type: "SET_LOADING_KNOWLEDGE", payload: false });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchKnowledgeData();
    fetchNewData();
    fetchStatusData();
  }, []);

  useEffect(() => {
    forceRerender;
  }, [data]);

  return (
    <View style={globalStyles.container}>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <KnowledgeMember item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id}
          onRefresh={fetchNewData}
          refreshing={loading}
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};
export default Knowledge;
