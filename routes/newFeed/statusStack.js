import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Status from "../../screens/Status/status";
import FriendInfo from "../../screens/FriendInformation/friendProfile";
import ShowReactInfo from "../../screens/FriendInformation/showReactInfo";
import UserKnowledgeForNF from "../../screens/Knowledge/UserKnowledgeforNF";
import UserStatusForNF from "../../screens/Knowledge/UserStatusforNF";
import DetailKnowledge from "../../screens/Knowledge/detailknowledge";
import CommentScreen from "../../screens/Knowledge/commentScreen";
import { StackRoutes } from "../../routes";
const Stack = createNativeStackNavigator();

export const StatusStack = (props) => {
  const Routes = StackRoutes.status;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Status"
        component={Status}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status Friend Profile"
        component={FriendInfo}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status Show React User"
        component={ShowReactInfo}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status Friend Knowledge"
        component={UserKnowledgeForNF}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status Friend Status"
        component={UserStatusForNF}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status Knowledge Detail"
        component={DetailKnowledge}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status Comment"
        component={CommentScreen}
        initialParams={{ routes: Routes }}
      />
    </Stack.Navigator>
  );
};
