import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserStatus from "../../screens/InformationUser/userStatus";
import EditStatus from "../../screens/InformationUser/StatusUser/editStatus";
import ShowReactInfo from "../../screens/FriendInformation/showReactInfo";
import FriendInfo from "../../screens/FriendInformation/friendProfile";
import UserKnowledgeForNF from "../../screens/Knowledge/UserKnowledgeforNF";
import UserStatusForNF from "../../screens/Knowledge/UserStatusforNF";
import DetailKnowledge from "../../screens/Knowledge/detailknowledge";
import CommentScreen from "../../screens/Knowledge/commentScreen";
import { StackRoutes } from "../../routes";
const Stack = createNativeStackNavigator();

export const UserStatusStack = (props) => {
  const Routes = StackRoutes.userInformation.status;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Status User"
        component={UserStatus}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status User Info Edit Status"
        component={EditStatus}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status User Info Show React User"
        component={ShowReactInfo}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status User Info Friend Profile"
        component={FriendInfo}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status User Info Friend Knowledge"
        component={UserKnowledgeForNF}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status User Info Friend Status"
        component={UserStatusForNF}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status User Info Detail Knowledge"
        component={DetailKnowledge}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Status User Info Comment"
        component={CommentScreen}
        initialParams={{ routes: Routes }}
      />
    </Stack.Navigator>
  );
};
