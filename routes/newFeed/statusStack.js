import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Status from "../../screens/Status/status";
import DetailStatus from "../../screens/Status/detailstatus";
import statusMember from "../../components/Status/statusMember";
import ShowReactInfoForStatus from "../../screens/FriendInformation/Status/showReactInfoforStatus";
import ReactMemberforStatus from "../../components/ShowReactUser/reactMemberforStatus";
import FriendInfoForStatus from "../../screens/FriendInformation/Status/friendProfileforStatus";
import UserKnowledgeForNFS from "../../screens/Status/UserKnowledgeforNFS";
import UserStatusForNFS from "../../screens/Status/UserStatusforNFS";
import StatusDetailKnowledge from "../../screens/Status/statusDetailKnowledge";
import CommentScreenForStatus from "../../screens/Status/commentScreen";
import FriendInfo from "../../screens/FriendInformation/Knowledge/friendProfile";
import ShowReactInfo from "../../screens/FriendInformation/Knowledge/showReactInfo";
import UserKnowledgeForNF from "../../screens/Knowledge/UserKnowledgeforNF";
import UserStatusForNF from "../../screens/Knowledge/UserStatusforNF";
import DetailKnowledge from "../../screens/Knowledge/detailknowledge";
import CommentScreen from "../../screens/Knowledge/commentScreen";
import { StackRoutes } from "../../routes";
const Stack = createNativeStackNavigator();

export const StatusStack = (props) => {
  const { navigation } = props;
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
