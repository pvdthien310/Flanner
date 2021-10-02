import * as React from 'react';
import LoginStack from './routes/loginStack';
import { useFonts } from "@expo-google-fonts/montserrat";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { Montserrat_800ExtraBold } from "@expo-google-fonts/montserrat";

import {io} from 'socket.io-client/dist/socket.io';


export default class App extends React.Component {
  
  constructor(props){
    super(props)

    // let [fontsLoaded] = useFonts({
    //   capricaScript: require('./assets/fonts/CAPRICA_SCRIPT.ttf'),
    //   Montserrat_700Bold,
    //   Montserrat_600SemiBold,
    //   Montserrat_800ExtraBold
    // });
  
    // if (!fontsLoaded) {
    //   return null;
    // }

    this.socket = io("http://192.168.1.107:3000", {jsonp: false})
    
  }
  
  render(){
    return (
      <LoginStack />
    );
  }
  
}

