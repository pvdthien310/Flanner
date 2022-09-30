import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserKnowledge from "../../screens/InformationUser/userKnowledge";
import userKnowledgeMember from "../../components/UserInformation/KnowledgeUserInfo/userKnowledgeMember";
import UserDetailKnowledge from "../../screens/InformationUser/KnowledgeUser/userDetailKnowledge";
import EditKnowledge from "../../screens/InformationUser/KnowledgeUser/editKnowledge";
import ShowReactInfoForKnowledgeUserInfo from "../../screens/FriendInformation/KnowledgeUserInfo/showReactInfoforKUserInfo";
import FriendInfoForKnowledgeUserInfo from "../../screens/FriendInformation/KnowledgeUserInfo/friendProfileforKUserInfo";
import UserKnowledgeForKUSer from "../../screens/InformationUser/KnowledgeUser/UserKnowledgeforKUser";
import UserStatusForKUser from "../../screens/InformationUser/KnowledgeUser/UserStatusforKUser";
import CommentScreenForKUser from "../../screens/InformationUser/KnowledgeUser/commentScreen";
import { StackRoutes } from "../../routes";
import ShowReactInfo from "../../screens/FriendInformation/Knowledge/showReactInfo";
import FriendInfo from "../../screens/FriendInformation/Knowledge/friendProfile";
import DetailKnowledge from "../../screens/Knowledge/detailknowledge";
import UserKnowledgeForNF from "../../screens/Knowledge/UserKnowledgeforNF";
import CommentScreen from "../../screens/Knowledge/commentScreen";
const Stack = createNativeStackNavigator();

export const UserKnowledgeStack = (props) => {
  const { navigation } = props;
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
