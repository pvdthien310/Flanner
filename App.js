import * as React from 'react';
import LoginStack from './routes/loginStack';
import { useFonts } from 'expo-font';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './reducer/knowledgeReducer'
import  RootReducer from './reducer/rootReducer'


const store = createStore(RootReducer);

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
    <Provider store={store}>
      <LoginStack />
    </Provider>

  );
}

