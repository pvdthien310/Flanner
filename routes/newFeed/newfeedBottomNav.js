import * as React from "react";
import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  useState,
  Dimensions,
} from "react-native";
import { HeaderNews } from "../../shared/header";

import { KnowledgeStack } from "./knowledgeStack";
import { StatusStack } from "./statusStack";
import Addpost from "../../screens/Addpost/addKnowledge";
import AddStatus from "../../screens/Addpost/addStatus";

import { Ionicons } from "@expo/vector-icons";
import { AddPostStack } from "./addPostStack";

const Tab = createBottomTabNavigator();
const user = { name: "Thien Pham", age: "20", avatar: "1" };

const { height } = Dimensions.get("screen");
const logoHeight = height * 0.5;
const CustomAddPostButton = ({ children, onPress }) => (
  <TouchableOpacity
    onPress={() => {
      console.log(user);
      navigation.navigate("Add Post");
    }}
    style={{
      top: -10,
      justifyContent: "center",
      alignItems: "center",

      ...styles.shadow,
    }}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "lightgrey",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export const BottomNavigator = (props) => {
  console.log(height);
  const { navigation } = props;

  useEffect(() => {
    () => {
      console.log("re render bottom navigation");
    };
  });

  const CustomAddPostButton = ({ children, onPress }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Add", user);
      }}
      style={{
        top: height < 800 ? -20 : -10,
        justifyContent: "center",
        alignItems: "center",

        ...styles.shadow,
      }}
    >
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 35,
          backgroundColor: "whitesmoke",
          position: "relative",
        }}
      >
        <View
          style={{
            width: 65,
            height: 65,
            borderRadius: 35,
            backgroundColor: "lightslategrey",
            marginTop: 3,
            marginStart: 3.5,
          }}
        >
          {children}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 15,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "black",
          borderRadius: 15,
          height: height > 880 ? 60 : "7%",
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Knowledge Stack"
        component={KnowledgeStack}
        options={{
          headerTitle: () => (
            <HeaderNews navigation={navigation} title="Knowledge" />
          ),
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: height > 880 ? 10 : "0%",
                marginTop: 5,
              }}
            >
              <Image
                source={require("../../assets/icon/knowledge.png")}
                resizeMode="contain"
                style={{
                  width: focused ? 30 : 25,
                  height: focused ? 30 : 25,
                  tintColor: focused ? "#ffffff" : "#748c94",
                  marginBottom: 2,
                }}
              />
              <Text
                style={{
                  color: focused ? "#ffffff" : "#748c94",
                  fontSize: focused ? 12 : 10,
                }}
              >
                {" "}
                Knowledge
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddPostStack}
        options={{
          headerTitle: () => (
            <HeaderNews navigation={navigation} title="Add Post" />
          ),

          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/icon/addpost.png")}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: "black",
              }}
            />
          ),
          tabBarButton: (props) => <CustomAddPostButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Status Stack"
        component={StatusStack}
        options={{
          headerTitle: () => (
            <HeaderNews navigation={navigation} title="Status" />
          ),

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: height > 880 ? 10 : "0%",
                marginTop: 5,
              }}
            >
              <Image
                source={require("../../assets/icon/status.png")}
                resizeMode="contain"
                style={{
                  width: focused ? 30 : 25,
                  height: focused ? 30 : 25,
                  tintColor: focused ? "#ffffff" : "#748c94",
                }}
              />

              <Text
                style={{
                  color: focused ? "#ffffff" : "#748c94",
                  fontSize: focused ? 12 : 10,
                }}
              >
                {" "}
                Status
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 0,
  },
});
