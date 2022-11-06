import * as React from "react";
import LoginStack from "./routes/loginStack";
import { useFonts } from "expo-font";
import { RootSiblingParent } from "react-native-root-siblings";
import { createStore } from "redux";
import { Provider } from "react-redux";

import RootReducer from "./reducer/rootReducer";

import { Chat } from "stream-chat-expo";
import { StreamChat } from "stream-chat";

const store = createStore(RootReducer);

// const API_KEY = "ypa7vxd248v5";
// const client = StreamChat.getInstance(API_KEY);

export default function App() {
  let [fontsLoaded] = useFonts({
    capricaScript: require("./assets/fonts/CAPRICA_SCRIPT.ttf"),
    nunitobold: require("./assets/fonts/Nunito_Bold.ttf"),
    nunitoregular: require("./assets/fonts/Nunito_Regular.ttf"),
    robotobold: require("./assets/fonts/RobotoSlabBold.ttf"),
    robotoregular: require("./assets/fonts/RobotoSlabRegular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    // <RootSiblingParent>
    //   <Chat client={client}>
    //     <Provider store={store}>
    //       <LoginStack />
    //     </Provider>
    //   </Chat>
    // </RootSiblingParent>
    <RootSiblingParent>
      {/* <Chat client={client}> */}
      <Provider store={store}>
        <LoginStack />
      </Provider>
      {/* </Chat> */}
    </RootSiblingParent>
  );
}
