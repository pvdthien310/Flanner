import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { globalStyles } from "../../styles/global";
import StatusMember from "../../components/Status/statusMember";
import { useSelector, useDispatch } from "react-redux";
import StatusApi from "../../API/StatusAPI";
const Status = ({ navigation, route }) => {
  const { routes } = route.params;
  const [cursor, setCursor] = useState();
  const [, forceRerender] = useState();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => {
    return state.Status;
  });
  const { user } = useSelector((state) => {
    return state.User;
  });

  const fetchData = () => {
    StatusApi.getPagination(user.userID)
      .then((res) => {
        setCursor(res.cursor);
        dispatch({ type: "ADD_DATA_STATUS", payload: res.data });
        dispatch({ type: "SET_LOADING_STATUS", payload: false });
      })
      .catch((err) => console.log(err));
  };

  const fetchMoreData = () => {
    StatusApi.getPagination(user.userID, cursor)
      .then((res) => {
        setCursor(res.cursor);
        const payload = [...data, ...res.data];

        dispatch({ type: "ADD_DATA_STATUS", payload });
        dispatch({ type: "SET_LOADING_STATUS", payload: false });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={globalStyles.container}>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <StatusMember
              item={item}
              navigation={navigation}
              nextScreen={[
                routes.friendInfo,
                routes.showReactInfo,
                routes.comment,
              ]}
            />
          )}
          keyExtractor={(item) => item._id}
          onRefresh={() => fetchData()}
          refreshing={loading}
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};
export default Status;
