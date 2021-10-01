import * as React from 'react';
import LoginStack from './routes/loginStack';
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    capricaScript: require('./assets/fonts/CAPRICA_SCRIPT.ttf'),
    nunitobold: require('./assets/fonts/Nunito-Bold.ttf'),
    nunitoregular: require('./assets/fonts/Nunito-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <LoginStack />
  );
}

