import * as React from 'react';
import LoginStack from './routes/loginStack';
import { useFonts } from 'expo-font';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './reducer/knowledgeReducer'
import  RootReducer from './reducer/rootReducer'
// import { useFonts } from "@expo-google-fonts/montserrat";
// import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
// import { Montserrat_700Bold } from "@expo-google-fonts/montserrat";
// import { Montserrat_800ExtraBold } from "@expo-google-fonts/montserrat";
const store = createStore(RootReducer);
export default function App() {
 let [fontsLoaded] = useFonts({
    capricaScript: require('./assets/fonts/CAPRICA_SCRIPT.ttf'),
    'nunitobold': require('./assets/fonts/Nunito-Bold.ttf'),
    nunitoregular: require('./assets/fonts/Nunito-Regular.ttf'),
    // Montserrat_600SemiBold,
    // Montserrat_700Bold,
    // Montserrat_800ExtraBold
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <LoginStack />
    </Provider>

  );
}

