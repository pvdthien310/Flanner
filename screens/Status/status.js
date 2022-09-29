import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { globalStyles } from "../../styles/global";
import StatusMember from "../../components/Status/statusMember";
import { useSelector, useDispatch } from "react-redux";
import { URL_local } from "../../constant";
import StatusApi from "../../API/StatusAPI";
const Status = ({ navigation }) => {
  const [, forceRerender] = useState();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => {
    return state.Status;
  });
  const { user } = useSelector((state) => {
    return state.User;
  });

  const fetchData = () => {
    StatusApi.getRandom(user.userID)
      .then((res) => {
        dispatch({ type: "ADD_DATA_STATUS", payload: res });
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
                "Status Friend Profile",
                "Status Show React User",
                "Status Comment",
              ]}
            />
          )}
          keyExtractor={(item) => item._id}
          onRefresh={() => fetchData()}
          refreshing={loading}
        />
      )}
    </View>
  );
};
export default Status;
