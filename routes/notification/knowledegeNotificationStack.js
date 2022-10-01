import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import KnowledgeNotification from "../../screens/Notification/knowledgeNotification";
import { StackRoutes } from "../../routes";
import DetailKnowledge from "../../screens/Knowledge/detailknowledge";
import ShowReactInfo from "../../screens/FriendInformation/showReactInfo";
import FriendInfo from "../../screens/FriendInformation/friendProfile";
import UserKnowledgeForNF from "../../screens/Knowledge/UserKnowledgeforNF";
import UserStatusForNF from "../../screens/Knowledge/UserStatusforNF";
import CommentScreen from "../../screens/Knowledge/commentScreen";

const Stack = createNativeStackNavigator();

export const KnowledgeNotificationStack = (props) => {
  const Routes = StackRoutes.notification.knowledge;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Knowledge Notification"
        component={KnowledgeNotification}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge Notification Detail Knowledge"
        component={DetailKnowledge}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge Notification Show React User"
        component={ShowReactInfo}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge Notification Friend Profile"
        component={FriendInfo}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge Notification Friend Knowledge"
        component={UserKnowledgeForNF}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge Notification Friend Status"
        component={UserStatusForNF}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge Notification Comment"
        component={CommentScreen}
        initialParams={{ routes: Routes }}
      />
    </Stack.Navigator>
  );
};
