import * as React from "react";
import { StyleSheet, Text } from "react-native-web";
import { View } from "react-native-animatable";
import { Chip } from "react-native-paper";

const GenresChip = ({ selectedGenres, deleteChip }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {selectedGenres.map((item, index) => (
        <Chip
          mode="outlined"
          key={index}
          style={{ margin: 3 }}
          closeIcon="close"
          onClose={() => deleteChip(item)}
        >
          {item.title}
        </Chip>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default GenresChip;
