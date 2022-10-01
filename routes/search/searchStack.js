import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../../screens/search/searchScreen";
import { StackRoutes } from "../../routes";
import FriendInfo from "../../screens/FriendInformation/friendProfile";
import ShowReactInfo from "../../screens/FriendInformation/showReactInfo";
import UserKnowledgeForNF from "../../screens/Knowledge/UserKnowledgeforNF";
import UserStatusForNF from "../../screens/Knowledge/UserStatusforNF";
import DetailKnowledge from "../../screens/Knowledge/detailknowledge";
import CommentScreen from "../../screens/Knowledge/commentScreen";

const Stack = createNativeStackNavigator();

export const SearchStack = (props) => {
  const { navigation } = props;
  const Routes = StackRoutes.search;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Search Screen"
        component={SearchScreen}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Search Friend Profile"
        component={FriendInfo}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Search Show React User"
        component={ShowReactInfo}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Search Friend Knowledge"
        component={UserKnowledgeForNF}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Search Friend Status"
        component={UserStatusForNF}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Search Detail Knowledge"
        component={DetailKnowledge}
        initialParams={{ routes: Routes }}
      />
      <Stack.Screen
        name="Search Comment"
        component={CommentScreen}
        initialParams={{ routes: Routes }}
      />
    </Stack.Navigator>
  );
};
