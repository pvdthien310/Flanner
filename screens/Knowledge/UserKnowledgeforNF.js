import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import KnowledgeMember from "../../components/Knowledge/knowledgeMember";
import KnowLedgeApi from "../../API/KnowledgeAPI";

const UserKnowledgeForNF = ({ navigation, route }) => {
  const [, forceRerender] = useState();
  const { user, knowledge, routes } = route.params;
  const [user_knowledge, setUserKnowledge] = useState(knowledge);
  const [loading, Setloading] = useState(false);
  const pressgobackHandler = () => {
    navigation.goBack();
  };

  useEffect(() => {}, [user_knowledge]);
  useEffect(() => {
    fetchKnowledgeData();
  }, []);
  const fetchKnowledgeData = async () => {
    await KnowLedgeApi.getKnowledgeUserForFriend(user.userID)
      .then((res) => {
        setUserKnowledge(res);
        Setloading(false);
        forceRerender();
      })
      .catch((err) => console.log("Error Load User Knowledge"));
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={pressgobackHandler}
        style={{ alignItems: "flex-start" }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="keyboard-backspace" size={30} color="black" />
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontFamily: "nunitobold",
              margin: 5,
            }}
          >
            {user.name}
          </Text>
        </View>
      </TouchableOpacity>
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
          {user_knowledge.length == 0 ? (
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
                There's no post to display !
              </Text>
              <TouchableOpacity
                style={{ marginBottom: 10 }}
                onPress={() => fetchKnowledgeData()}
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
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={user_knowledge}
              renderItem={({ item }) => (
                <KnowledgeMember
                  item={item}
                  navigation={navigation}
                  nextScreen={routes.detail}
                />
              )}
              keyExtractor={(item) => item._id}
              onRefresh={() => fetchKnowledgeData()}
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
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 5,
    flex: 1,
    backgroundColor: "whitesmoke",
    flexDirection: "column",
    marginBottom: 90,
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
export default UserKnowledgeForNF;
