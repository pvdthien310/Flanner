import React, { useState } from "react";
import NewCommentAPI from "./../../API/NewCommentAPI";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import Toast from "react-native-root-toast";
import { useSelector, useDispatch } from "react-redux";

export default function EditCommentDialog({
  commentItem,
  editMode,
  reload,
  rating,
}) {
  const [modalVisible, setModalVisible] = useState(true);
  const { currentEditedId } = useSelector((state) => {
    return state.Comment;
  });
  const dispatch = useDispatch();
  const [body, setBody] = useState(commentItem.body);
  const onValueChange = (text) => {
    setBody(text);
  };
  const editComment = async () => {
    const newData = {
      ...commentItem,
      body: body,
    };
    await NewCommentAPI.update(newData)
      .then(async (res) => {
        if (res) {
          setModalVisible(!modalVisible);
          reload();
          Toast.show("Save successful!", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
          });
          dispatch({ type: "SET_EDITED_COMMENT", payload: commentItem._id });
          try {
            const sentiment = await axios.post(
              "https://comebuy-ai.onrender.com/sentiment",
              { sentence: newRootComment.body }
            );
            if (
              sentiment.data.result === "1" ||
              sentiment.data.result === "2" ||
              sentiment.data.result === "0"
            ) {
              if (sentiment.data.result === commentItem.isPositive) return;
              const updateRatingItem = () => {
                if (
                  sentiment.data.result === "1" ||
                  sentiment.data.result === "0"
                ) {
                  return {
                    ...rating,
                    positive: rating.positive + 1,
                    negative: rating.negative - 1,
                  };
                }
                if (sentiment.data.result === "2") {
                  return {
                    ...rating,
                    negative: rating.negative + 1,
                    positive: rating.positive - 1,
                  };
                }
                return rating;
              };
              await RatingAPI.update(updateRatingItem)
                .then(async (data) => {
                  setRating(data);
                  if (commentItem.isPositive !== sentiment.data.result) {
                    await NewCommentAPI.update({
                      ...newData,
                      isPositive: sentiment.data.result,
                    })
                      .then()
                      .catch((e) => console.log(e));
                  }
                })
                .catch((err) => console.log(err));
            }
          } catch (error) {
            console.log(error.message);
          }
          editMode(false);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Edit your comment</Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="dimgrey"
              multiline={true}
              showsVerticalScrollIndicator={false}
              value={body}
              onChangeText={onValueChange}
            ></TextInput>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => {
                  editComment();
                }}
              >
                <Text style={styles.textStyle}>OK</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button3]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  editMode(false);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// These are user defined styles
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  modalView: {
    margin: 20,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    minHeight: 40,
    fontSize: 15,
    fontFamily: "nunitobold",
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 1,
    margin: 10,
    width: "110%",
    alignSelf: "center",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  button2: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    borderRadius: 10,
    padding: 7,
    width: 60,
    backgroundColor: "black",
    marginRight: 5,
  },
  button3: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    borderRadius: 10,
    padding: 7,
    backgroundColor: "dimgrey",
    width: 60,
    marginLeft: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: "nunitobold",
    borderColor: "black",
  },
});
