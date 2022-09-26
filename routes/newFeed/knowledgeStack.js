import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Knowledge from "../../screens/Knowledge/knowledge";
import DetailKnowledge from "../../screens/Knowledge/detailknowledge";
import KnowledgeMember from "../../components/Knowledge/knowledgeMember";
// import KnowledgeStatusMember from "../../components/Knowledge/statusMember";
import ShowReactInfo from "../../screens/FriendInformation/Knowledge/showReactInfo";
import ReactMember from "../../components/ShowReactUser/reactMember";
import FriendInfo from "../../screens/FriendInformation/Knowledge/friendProfile";
import UserKnowledgeForNF from "../../screens/Knowledge/UserKnowledgeforNF";
import UserStatusForNF from "../../screens/Knowledge/UserStatusforNF";
import DetailStatus from "../../screens/Status/detailstatus";
import CommentScreen from "../../screens/Knowledge/commentScreen";
import statusMember from "../../components/Status/statusMember";

const Stack = createNativeStackNavigator();

export const KnowledgeStack = (props) => {
  const { navigation } = props;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Knowledge" component={Knowledge} />
      <Stack.Screen name="Knowledge Detail" component={DetailKnowledge} />
      <Stack.Screen name="Knowledge Member" component={KnowledgeMember} />
      <Stack.Screen
        name="Knowledge Show React User"
        component={ShowReactInfo}
      />
      <Stack.Screen name="Knowledge UI React User" component={ReactMember} />
      <Stack.Screen name="Knowledge Friend Profile" component={FriendInfo} />
      <Stack.Screen
        name="Knowledge Friend Knowledge"
        component={UserKnowledgeForNF}
      />
      <Stack.Screen
        name="Knowledge Friend Status"
        component={UserStatusForNF}
      />
      <Stack.Screen name="Knowledge Status Member" component={statusMember} />
      <Stack.Screen name="Knowledge Comment" component={CommentScreen} />
    </Stack.Navigator>
  );
};
