import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserStatus from "../../screens/InformationUser/userStatus";
import userStatusMember from "../../components/UserInformation/StatusUserInfo/userStatusMember";
import EditStatus from "../../screens/InformationUser/StatusUser/editStatus";
import ShowReactInfoForStatusUserInfo from "../../screens/FriendInformation/StatusUserInfo/showReactInfoforSUserInfo";
import FriendInfoForStatusUserInfo from "../../screens/FriendInformation/StatusUserInfo/friendProfileforSUserInfo";
import UserKnowledgeForSUSer from "../../screens/InformationUser/StatusUser/UserKnowledgeforSUser";
import UserStatusForSUser from "../../screens/InformationUser/StatusUser/UserStatusforSUser";
import StatusUserDetailKnowledge from "../../screens/InformationUser/StatusUser/StatusUserDetailKnowledge";
import CommentScreenForSUser from "../../screens/InformationUser/StatusUser/commentScreen";
import ShowReactInfo from "../../screens/FriendInformation/Knowledge/showReactInfo";
import FriendInfo from "../../screens/FriendInformation/Knowledge/friendProfile";
import UserKnowledgeForNF from "../../screens/Knowledge/UserKnowledgeforNF";
import UserStatusForNF from "../../screens/Knowledge/UserStatusforNF";
import DetailKnowledge from "../../screens/Knowledge/detailknowledge";
import CommentScreen from "../../screens/Knowledge/commentScreen";
import { StackRoutes } from "../../routes";
const Stack = createNativeStackNavigator();

export const UserStatusStack = (props) => {
  const { navigation } = props;
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
