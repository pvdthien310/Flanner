import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Knowledge from "../../screens/Knowledge/knowledge";
import DetailKnowledge from "../../screens/Knowledge/detailknowledge";
import KnowledgeMember from "../../components/Knowledge/knowledgeMember";
import ShowReactInfo from "../../screens/FriendInformation/Knowledge/showReactInfo";
import ReactMember from "../../components/ShowReactUser/reactMember";
import FriendInfo from "../../screens/FriendInformation/Knowledge/friendProfile";
import UserKnowledgeForNF from "../../screens/Knowledge/UserKnowledgeforNF";
import UserStatusForNF from "../../screens/Knowledge/UserStatusforNF";
import DetailStatus from "../../screens/Status/detailstatus";
import CommentScreen from "../../screens/Knowledge/commentScreen";
import statusMember from "../../components/Status/statusMember";
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
