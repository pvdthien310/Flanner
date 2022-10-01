import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Knowledge from "../../screens/Knowledge/knowledge";
import DetailKnowledge from "../../screens/Knowledge/detailknowledge";
import ShowReactInfo from "../../screens/FriendInformation/showReactInfo";
import FriendInfo from "../../screens/FriendInformation/friendProfile";
import UserKnowledgeForNF from "../../screens/Knowledge/UserKnowledgeforNF";
import UserStatusForNF from "../../screens/Knowledge/UserStatusforNF";
import CommentScreen from "../../screens/Knowledge/commentScreen";
import { StackRoutes } from "../../routes";

const Stack = createNativeStackNavigator();

export const KnowledgeStack = (props) => {
  const { navigation } = props;
  const Routes = StackRoutes.knowledge;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Knowledge"
        component={Knowledge}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge Detail"
        component={DetailKnowledge}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge Show React User"
        component={ShowReactInfo}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge Friend Profile"
        component={FriendInfo}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge Friend Knowledge"
        component={UserKnowledgeForNF}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge Friend Status"
        component={UserStatusForNF}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Knowledge Comment"
        component={CommentScreen}
        initialParams={{ routes: Routes }}
      />
    </Stack.Navigator>
  );
};
