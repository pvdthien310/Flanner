import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StatusNotification from "../../screens/Notification/statusNotification";
import { StackRoutes } from "../../routes";
import DetailStatus from "../../screens/Status/detailstatus";
import DetailKnowledge from "../../screens/Knowledge/detailknowledge";
import ShowReactInfo from "../../screens/FriendInformation/showReactInfo";
import FriendInfo from "../../screens/FriendInformation/friendProfile";
import UserKnowledgeForNF from "../../screens/Knowledge/UserKnowledgeforNF";
import UserStatusForNF from "../../screens/Knowledge/UserStatusforNF";
import CommentScreen from "../../screens/Knowledge/commentScreen";

const Stack = createNativeStackNavigator();

export const StatusNotificationStack = (props) => {
  const Routes = StackRoutes.notification.status;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Status Notification"
        component={StatusNotification}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status Notification Detail Status"
        component={DetailStatus}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status Notification Detail Knowledge"
        component={DetailKnowledge}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status Notification Show React User"
        component={ShowReactInfo}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status Notification Friend Profile"
        component={FriendInfo}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status Notification Friend Knowledge"
        component={UserKnowledgeForNF}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status Notification Friend Status"
        component={UserStatusForNF}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status Notification Comment"
        component={CommentScreen}
        initialParams={{ routes: Routes }}
      />
    </Stack.Navigator>
  );
};
