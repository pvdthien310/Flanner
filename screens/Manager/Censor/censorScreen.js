import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import ReportApi from "../../../API/ReportAPI";
import ReportMember from "../../../components/Manager/report";
import { Ionicons } from "@expo/vector-icons";
import { prepareDataForValidation } from "formik";

const { height, width } = Dimensions.get("screen");
const logoHeight = height * 0.5;

const CensorScreen = ({ navigation }) => {
  const [, forceRerender] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);
  const { data } = useSelector((state) => state.Report);

  const [reportList, SetReportList] = useState(undefined);
  let loading = false;

  const FetchData = () => {
    ReportApi.getAll()
      .then((res) => {
        SetReportList(res);
        // console.log(reportList)
        dispatch({ type: "ADD_DATA_REPORT", payload: res });
      })
      .catch((err) => console.log("Error Report"));
  };
  useEffect(() => {
    FetchData();
  }, []);

  useEffect(() => {
    SetReportList(data);
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "teal",
          borderRadius: 0,
          padding: 5,
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            color: "white",
            fontFamily: "nunitobold",
            fontSize: 20,
          }}
        >
          Report List
        </Text>
      </View>
      <View>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <View>
            {
              <FlatList
                showsVerticalScrollIndicator={false}
                data={reportList}
                renderItem={({ item }) => (
                  <ReportMember
                    item={item}
                    navigation={navigation}
                  ></ReportMember>
                )}
                keyExtractor={(item) => item._id}
                onRefresh={() => FetchData()}
                refreshing={loading}
              />
            }
          </View>
        )}
      </View>
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
});
export default CensorScreen;
