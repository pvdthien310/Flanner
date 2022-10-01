import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import ChatStackNavigator from "../screens/Fess/navigations/Navigator";
import { CustomDrawer } from "../custom/customDrawer";
import { BottomNavigator } from "./newFeed/newfeedBottomNav";
import MainInfor from "../screens/InformationUser/mainInfo";
import NotificationTab from "./notification/NotificationStack";
import Header, { HeaderDrawer, HeaderNews } from "../shared/header";
import { UserInformationStack } from "./userInformation/userInformationStack";
import { SearchStack } from "./search/searchStack";
import { StaffManagerStack } from "./manager/staffManagerStack";
import { CensorManagerStack } from "./manager/censorManagerStack";
import { AboutStack } from "./about/aboutStack";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
      <Button
        onPress={() => navigation.navigate("Drawer")}
        title="Go back home"
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export const DrawerStack = (props) => {
  const { navigation } = props;

  return (
    <Drawer.Navigator
      initialRouteName="User Information"
      screenOptions={{
        headerTintColor: "black",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="NewsFeed"
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Notification"
        component={NotificationTab}
        options={{
          headerTitle: () => (
            <HeaderDrawer navigation={navigation} title="Notification" />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Flâner Chat"
        component={ChatStackNavigator}
        options={{ headerShown: false }}
      /> */}
      <Drawer.Screen
        name="User Information"
        component={UserInformationStack}
        options={
          ({
            headerTitle: () => (
              <HeaderDrawer navigation={navigation} title="User Information" />
            ),
          },
          { drawerLabel: () => null })
        }
      />
      <Drawer.Screen
        name="Search"
        component={SearchStack}
        options={{
          headerTitle: () => (
            <HeaderDrawer navigation={navigation} title="Search" />
          ),
        }}
      />
      <Drawer.Screen
        name="Staff"
        component={StaffManagerStack}
        options={{
          headerTitle: () => (
            <HeaderDrawer navigation={navigation} title="Staff" />
          ),
        }}
      />
      <Drawer.Screen
        name="Censor"
        component={CensorManagerStack}
        options={{
          headerTitle: () => (
            <HeaderDrawer navigation={navigation} title="Censor" />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutStack}
        options={{
          headerTitle: () => (
            <HeaderDrawer navigation={navigation} title="About Us" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
