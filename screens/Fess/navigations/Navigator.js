import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GlobalPeople from "../../../components/Fess/GlobalPeople";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Fess from "./../FlannerChat";
import ChannelScreen from "./../ChannelScreen";
import CreateFessScreen from "./../CreateFessScreen";
import { BlurView } from "expo-blur";
import { StyleSheet, View, Text } from "react-native";
import { Chat, OverlayProvider } from "stream-chat-expo"; // Or stream-chat-expo
import { StreamChat } from "stream-chat";

const client = StreamChat.getInstance("kkxrmdu76hg7");

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          alignItems: "center",
          bottom: 15,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "black",
          borderRadius: 15,
          height: 60,

          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Chat"
        component={Fess}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Entypo
              style={{ marginTop: 10, alignSelf: "center" }}
              name="chat"
              color={color}
              size={25}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="People"
        component={GlobalPeople}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              style={{ marginTop: 10 }}
              name="ios-person"
              color={color}
              size={25}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

const ChatStackNavigator = () => {
  return (
    <OverlayProvider>
      <Chat client={client}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={screenOptionStyle}>
              <Stack.Screen
                name="Fess"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Channel"
                component={ChannelScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CreateFess"
                component={CreateFessScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </Chat>
    </OverlayProvider>
  );
};

export default ChatStackNavigator;
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#313149",
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
});
