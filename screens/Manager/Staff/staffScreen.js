import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";

import { Picker } from "@react-native-picker/picker";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import GenreApi from "../../../API/Genres";

const { height } = Dimensions.get("screen");

const StaffScreen = ({ navigation }) => {
  const { data } = useSelector((state) => state.User);
  const [admins, setAdmins] = useState([]);
  const [censors, setCensors] = useState([]);
  const [users, setUsers] = useState([]);
  const [blocked, setBlock] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  const [, resetForm] = useState();
  useEffect(() => {
    resetForm();
    classify();
    setSelectedList(data);
  }, [data]);

  const [genres, setGenres] = useState(false);
  const [newGenre, setNewGenre] = useState();
  const [selectedGenre, setSelectedGenre] = useState();

  const fetchGenres = async () => {
    const _genres = await GenreApi.getAll();
    const genresData = _genres.data.map((e) => ({
      title: e.title,
      value: e,
    }));
    setGenres(genresData);
  };
  useEffect(() => {
    fetchGenres();
  }, []);

  const [selectedValue, setSelectedValue] = useState("all");

  const classify = () => {
    let ar0 = data.filter((item) => {
      if (item.position == "0") return item;
    });
    setAdmins(ar0);

    let ar1 = data.filter((item) => {
      if (item.position == "1") return item;
    });
    setCensors(ar1);

    let ar2 = data.filter((item) => {
      if (item.position == "2") return item;
    });
    setUsers(ar2);

    let ar3 = data.filter((item) => {
      if (item.reportedNum == "3") return item;
    });
    setBlock(ar3);
  };

  useEffect(() => {
    classify();
  }, []);

  useEffect(() => {
    pickerChange();
  }, [selectedValue]);

  const pickerChange = () => {
    if (selectedValue == "all") {
      setSelectedList(data);
    } else if (selectedValue == "admin") {
      setSelectedList(admins);
    } else if (selectedValue == "censor") {
      setSelectedList(censors);
    } else if (selectedValue == "user") {
      setSelectedList(users);
    } else if (selectedValue == "blocked") {
      setSelectedList(blocked);
    }
  };

  const createGenre = async () => {
    if (!newGenre) {
      Toast.show("Please enter genre title!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return;
    }

    const res = await GenreApi.create({
      title: newGenre,
    });
    if (res.data == "Successful") {
      fetchGenres();
      setNewGenre("");
      Toast.show("Create genre successfully!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
  };

  const deleteGenreHandle = async () => {
    const res = await GenreApi.delete(selectedGenre._id);
    if (res.data == "Delete successful") {
      fetchGenres();
      Toast.show("Delete genre successfully!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          style={styles.input}
          onChangeText={(val) => setNewGenre(val)}
          value={newGenre}
          placeholder="New genre"
        />
        <TouchableOpacity
          onPress={createGenre}
          style={{ alignContent: "flex-end" }}
        >
          <Entypo name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginBottom: -20,
          marginTop: -20,
        }}
      >
        <Picker
          selectedValue={selectedGenre}
          style={{ height: 100, width: 150 }}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedGenre(itemValue);
          }}
        >
          {genres &&
            genres.map((item, index) => (
              <Picker.Item
                label={item.title}
                value={item.value}
                key={item.value._id}
              />
            ))}
        </Picker>

        <TouchableOpacity
          onPress={deleteGenreHandle}
          style={{ alignContent: "flex-end" }}
        >
          <MaterialIcons name="delete-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginBottom: -20,
          marginTop: -20,
        }}
      >
        <Picker
          selectedValue={selectedValue}
          style={{ height: 100, width: 150 }}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
          }}
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Admin" value="admin" />
          <Picker.Item label="Censor" value="censor" />
          <Picker.Item label="User" value="user" />
          <Picker.Item label="Blocked" value="blocked" />
        </Picker>

        <TouchableOpacity
          onPress={() => navigation.navigate("New Staff Screen")}
          style={{ alignContent: "flex-end" }}
        >
          <Entypo name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ backgroundColor: "white" }}
        data={selectedList}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Edit Staff Screen", { item })}
            >
              <View style={styles.flatlist}>
                <View style={{ flexDirection: "row" }}>
                  <Image style={styles.img} source={{ uri: item.avatar }} />
                  <View style={{ marginLeft: 10, justifyContent: "center" }}>
                    <Text style={styles.info}>{item.name}</Text>
                    <Text style={styles.title}>{item.email}</Text>
                  </View>
                </View>
                <View style={{ position: "absolute", alignSelf: "flex-end" }}>
                  {item.position == "0" && (
                    <Text
                      style={{ fontFamily: "nunitobold", color: "darkcyan" }}
                    >
                      Admin
                    </Text>
                  )}
                  {item.position == "1" && (
                    <Text style={{ fontFamily: "nunitobold", color: "black" }}>
                      Censor
                    </Text>
                  )}
                  {item.reportedNum == "3" && (
                    <Text
                      style={{ fontFamily: "nunitobold", color: "firebrick" }}
                    >
                      Blocked
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 5,
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
  title: {
    fontFamily: "nunitoregular",
  },
  info: {
    fontFamily: "nunitobold",
    fontSize: 15,
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  flatlist: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    margin: 10,
    borderRadius: 20,
  },
  input: {
    fontFamily: "nunitobold",
    borderBottomWidth: 1,
    borderBottomColor: "#CFCFCF",
    fontSize: 15,
    marginHorizontal: 10,
    flex: 1,
  },
});
export default StaffScreen;
