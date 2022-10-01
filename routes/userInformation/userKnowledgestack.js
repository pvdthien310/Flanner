import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserKnowledge from "../../screens/InformationUser/userKnowledge";
import EditKnowledge from "../../screens/InformationUser/KnowledgeUser/editKnowledge";
import { StackRoutes } from "../../routes";
import ShowReactInfo from "../../screens/FriendInformation/showReactInfo";
import FriendInfo from "../../screens/FriendInformation/friendProfile";
import DetailKnowledge from "../../screens/Knowledge/detailknowledge";
import UserKnowledgeForNF from "../../screens/Knowledge/UserKnowledgeforNF";
import CommentScreen from "../../screens/Knowledge/commentScreen";
const Stack = createNativeStackNavigator();

export const UserKnowledgeStack = (props) => {
  const Routes = StackRoutes.userInformation.knowledge;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Knowledge User"
        component={UserKnowledge}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge User Info Show React User"
        component={ShowReactInfo}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge User Info Friend Profile"
        component={FriendInfo}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge User Info Detail Knowledge"
        component={DetailKnowledge}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge User Info Edit Knowledge"
        component={EditKnowledge}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge User Info Friend Knowledge"
        component={UserKnowledgeForNF}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge User Info Friend Status"
        component={UserKnowledgeForNF}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge User Info Comment"
        component={CommentScreen}
        initialParams={{ routes: Routes }}
      />
    </Stack.Navigator>
  );
};
