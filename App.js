import * as React from 'react';
import LoginStack from './routes/loginStack';
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    capricaScript: require('./assets/fonts/SVN-CAPRICA_SCRIPT.TTF'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <LoginStack />
  );
}

