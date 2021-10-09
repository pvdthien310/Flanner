import * as React from 'react';
import LoginStack from './routes/loginStack';
import { useFonts } from 'expo-font';
import { RootSiblingParent } from 'react-native-root-siblings';
import ConfirmEmail from './screens/Login/confirmEmail';
// import { useFonts } from "@expo-google-fonts/montserrat";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { Montserrat_800ExtraBold } from "@expo-google-fonts/montserrat";

export default function App() {
  let [fontsLoaded] = useFonts({
    capricaScript: require('./assets/fonts/CAPRICA_SCRIPT.ttf'),
    nunitobold: require('./assets/fonts/Nunito_Bold.ttf'),
    nunitoregular: require('./assets/fonts/Nunito_Regular.ttf'),
    // 'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
    // nunitoregular: require('./assets/fonts/Nunito-Regular.ttf'),
    // Montserrat_600SemiBold,
    // Montserrat_700Bold,
    // Montserrat_800ExtraBold
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <RootSiblingParent>
      <LoginStack />
    </RootSiblingParent>

  );
}

