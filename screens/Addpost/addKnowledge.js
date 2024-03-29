import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Alert,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  Dimensions,
  Platform,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import KnowLedgeApi from "../../API/KnowledgeAPI";
import GenreApi from "../../API/Genres";
import Toast from "react-native-root-toast";
import GenresChip from "../../components/GenresChip";
import RNPickerSelect from "react-native-picker-select";

const { height } = Dimensions.get("screen");
export default function AddKnowledge({ route, navigation }) {
  const { user } = useSelector((state) => state.User);
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const [genres, setGenres] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGenres = async () => {
      const _genres = await GenreApi.getAll();
      const genresData = _genres.data.map((e) => ({
        label: e.title,
        value: e,
      }));
      setGenres(genresData);
    };

    fetchGenres();
  }, []);

  const fetchKnowledgeData = () => {
    KnowLedgeApi.getKnowledgeUser(user.userID)
      .then((res) => {
        dispatch({ type: "ADD_USER_KNOWLEDGE", payload: res });
      })
      .catch((err) => console.log("Error Load User Knowledge"));
  };

  const pressgobackHandler = () => {
    navigation.goBack();
  };

  const AddTitle = (val) => {
    setTitle(val);
  };
  const AddDescription = (val) => {
    setDescription(val);
  };
  const AddBody = (val) => {
    setBody(val);
  };
  const [picture, setPicture] = useState([]);
  const HandleUpImages = (photo) => {
    setLoading(true);
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "poster");
    data.append("folder", "Source/flaner");

    fetch("https://api.cloudinary.com/v1_1/flaner/image/upload", {
      method: "POST",
      body: data,
      header: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPicture((current) => {
          return [
            ...current,
            { url: data.url, key: Math.random().toString(), uri: photo.uri },
          ];
        });
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert("Error While Uploading Image");
      });
  };
  const SendNewpost = () => {
    // temp = Math.random();
    const d = new Date();
    const genresId = selectedGenres.map((e) => e._id);

    const newPost = {
      username: user.name,
      body: body,
      userID: user.userID,
      title: title,
      description: description,
      avatar: user.avatar,
      posttime: d.toUTCString(),
      listImage: picture,
      react: [],
      mode: "public",
      genres: genresId,
    };
    KnowLedgeApi.AddPost(newPost)
      .then((res) => {
        fetchKnowledgeData();
        Toast.show("Add post successful!", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
        fetchKnowledgeData();
        navigation.goBack();
        navigation.navigate("Knowledge");
      })
      .catch((err) => {
        console.log("Error Add New Knowledge");
        Toast.show(err, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      });
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [4, 10],
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.uri;
      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const type = `image/${fileType}`;
      const name = Math.random().toString();
      const source = { uri, type, name };
      HandleUpImages(source);
      setImage((current) => {
        return [
          ...current,
          { uri: result.uri, key: (result.key = Math.random().toString()) },
        ];
      });
    }
  };

  const DeleteImagelist = (key) => {
    setLoading(true);
    const deletedimg = image.filter((member) => member.key == key);
    setImage(() => {
      return image.filter((member) => member.key != key);
    });
    setPicture(() => {
      return picture.filter((member) => member.uri != deletedimg[0].uri);
    });
    setLoading(false);
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setImage((current) => {
        return [
          ...current,
          { uri: result.uri, key: (result.key = Math.random().toString()) },
        ];
      });
    }
  };

  const addGenres = (genre) => {
    if (genre) {
      setSelectedGenres([...selectedGenres, genre]);
      const newGenres = genres.filter((e) => e.value._id !== genre._id);
      setGenres(newGenres);
    }
  };

  const deleteChip = (genre) => {
    const newGenres = selectedGenres.filter((e) => e._id !== genre._id);
    setSelectedGenres(newGenres);

    setGenres([...genres, { label: genre.title, value: genre }]);
  };

  return (
    <SafeAreaView style={styles.post}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ width: 45 }} onPress={pressgobackHandler}>
          <View style={{ flexDirection: "row", margin: 10, width: 40 }}>
            <MaterialIcons name="keyboard-backspace" size={30} color="black" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.namepage}>Add Knowledge</Text>
        </View>
      </View>
      <View style={styles.userinfo}>
        <Image source={{ uri: user.avatar }} style={styles.imageavatar} />
        <View style={{ margin: 7 }}>
          <Text style={styles.username}> Hello {user.name} , </Text>
          <Text style={styles.title}>What do you want to share ?</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "column", flex: 1, marginTop: -5 }}>
          <TextInput
            multiline={true}
            style={styles.title_topic}
            onChangeText={AddTitle}
            placeholder="Write a title..."
          ></TextInput>
          <View style={styles.bodytitle}>
            <Text style={{ fontSize: 17, fontFamily: "nunitoregular" }}>
              What is your title?
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            flex: 1,
            marginTop: 5,
            borderRadius: 10,
            marginHorizontal: 10,
          }}
        >
          <RNPickerSelect
            placeholder={{
              label: "Genres",
              value: null,
            }}
            style={styles.genresPicker}
            onValueChange={(itemValue, itemIndex) => {
              addGenres(itemValue);
            }}
            items={genres}
          />
        </View>
        {selectedGenres && (
          <GenresChip selectedGenres={selectedGenres} deleteChip={deleteChip} />
        )}

        <View style={{ flexDirection: "column", flex: 1, marginTop: 5 }}>
          <TextInput
            multiline={true}
            style={styles.description}
            onChangeText={AddDescription}
            placeholder="Write a description..."
          ></TextInput>
          <View style={styles.bodytitle}>
            <Text style={{ fontSize: 17, fontFamily: "nunitoregular" }}>
              Descript your topic.
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "column", flex: 1, marginTop: 5 }}>
          <TextInput
            multiline={true}
            style={styles.body}
            onChangeText={AddBody}
            placeholder="Write your body..."
          ></TextInput>
          <View style={styles.bodytitle}>
            <Text style={{ fontSize: 17, fontFamily: "nunitoregular" }}>
              Topic body.
            </Text>
          </View>
        </View>
        <View style={styles.imageoptionsbar}>
          <TouchableOpacity onPress={openCamera}>
            <Ionicons name="ios-camera-sharp" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage}>
            <Ionicons name="image-sharp" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              let toast = Toast.show(
                "The feature will open in the near future!",
                {
                  duration: Toast.durations.SHORT,
                  position: Toast.positions.BOTTOM,
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                }
              );
            }}
          >
            <Ionicons name="pricetag" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
        <FlatList
          style={{ margin: 10 }}
          scrollEnabled={true}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={image}
          key={image.name}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "column" }}>
              <Image style={styles.image} source={{ uri: item.uri }} />
              <TouchableOpacity
                style={{ position: "absolute" }}
                onPress={() => {
                  DeleteImagelist(item.key);
                }}
              >
                <Ionicons
                  name="close-circle"
                  size={24}
                  color="black"
                  style={{ margin: 5 }}
                />
              </TouchableOpacity>
            </View>
          )}
        />
        {loading ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="small" color="black" />
            <TouchableOpacity activeOpacity={1}>
              <View style={styles.postbutton1}>
                <Text
                  style={{
                    fontFamily: "nunitobold",
                    fontSize: 15,
                    color: "white",
                  }}
                >
                  Post
                </Text>
                <Ionicons
                  name="ios-send"
                  size={24}
                  color="white"
                  style={{ marginStart: 10 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={SendNewpost}>
              <View style={styles.postbutton}>
                <Text
                  style={{
                    fontFamily: "nunitobold",
                    fontSize: 15,
                    color: "white",
                  }}
                >
                  Post
                </Text>
                <Ionicons
                  name="ios-send"
                  size={24}
                  color="white"
                  style={{ marginStart: 10 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  post: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 10,
    marginBottom: 110,
    padding: 12,
    flex: 1,
  },
  namepage: {
    fontSize: 20,
    fontFamily: "nunitobold",
  },
  headerImage: {
    width: 35,
    height: 35,
    resizeMode: "stretch",
  },
  imageavatar: {
    width: 45,
    height: 45,
    borderRadius: 15,
    alignItems: "center",
  },
  username: {
    fontSize: 15,
    fontFamily: "nunitobold",
  },
  title: {
    fontSize: 12,
    fontFamily: "nunitobold",
  },
  userinfo: {
    padding: 5,
    flexDirection: "row",
    margin: 5,
    marginBottom: 10,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 1 },
    borderRadius: 10,
    backgroundColor: "ghostwhite",
    justifyContent: "center",
    alignSelf: "center",
  },
  bodytitle: {
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 1 },
    borderRadius: 10,
    marginTop: 5,
    marginStart: 15,
    position: "absolute",
    backgroundColor: "lightgrey",
    paddingTop: 5,
    paddingBottom: 5,
    paddingStart: 10,
    paddingEnd: 10,
  },
  body: {
    backgroundColor: "ghostwhite",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 1 },
    borderRadius: 10,
    flex: 1,
    height: height * 0.2,
    marginTop: 30,
    marginStart: 10,
    marginEnd: 10,
    paddingTop: 20,
    paddingStart: 20,
    paddingEnd: 20,
    fontFamily: "nunitoregular",
    fontSize: 15,
    borderWidth: 0.3,
  },
  description: {
    backgroundColor: "ghostwhite",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 1 },
    borderRadius: 10,
    flex: 1,
    height: height * 0.1,
    marginTop: 30,
    marginStart: 10,
    marginEnd: 10,
    paddingTop: 20,
    paddingStart: 20,
    paddingEnd: 20,
    fontFamily: "nunitoregular",
    fontSize: 15,
    borderWidth: 0.3,
  },
  title_topic: {
    backgroundColor: "ghostwhite",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 1 },
    borderRadius: 10,
    flex: 1,
    height: height * 0.08,
    marginTop: 30,
    marginStart: 10,
    marginEnd: 10,
    paddingTop: 20,
    paddingStart: 20,
    paddingEnd: 20,
    fontFamily: "nunitoregular",
    fontSize: 15,
    borderWidth: 0.3,
  },
  imageoptionsbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    padding: 5,
    backgroundColor: "ghostwhite",
  },
  buttondelete: {
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    margin: 10,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    padding: 5,
    backgroundColor: "lightgrey",
    height: 30,
    width: 30,
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: "stretch",
    margin: 5,
    flex: 1,
  },
  postbutton: {
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginEnd: 10,
    marginStart: 10,
    marginBottom: 5,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    padding: 12,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  postbutton1: {
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginEnd: 10,
    marginStart: 10,
    marginBottom: 5,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    padding: 12,
    backgroundColor: "dimgrey",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  genresPicker: {
    inputIOS: {
      fontSize: 12,
      paddingTop: 5,
      paddingHorizontal: 10,
      paddingBottom: 5,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 4,
      color: "black",
      fontFamily: "nunitobold",
    },
    inputAndroid: {
      fontSize: 12,
      borderRadius: 4,
      marginLeft: 10,
      color: "black",
      fontFamily: "nunitobold",
    },
  },
});
