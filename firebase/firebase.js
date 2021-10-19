import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyBdMDAs_6Hw1ednL-ojAtlIri3dixkcpZg",
  authDomain: "flaner-chat.firebaseapp.com",
  databaseURL: "https://flaner-chat-default-rtdb.firebaseio.com",
  projectId: "flaner-chat",
  storageBucket: "flaner-chat.appspot.com",
  messagingSenderId: "1067876081635",
  appId: "1:1067876081635:web:f705992b6567e100610ad6"
};

const fess = initializeApp(firebaseConfig);
const db = getFirestore(fess);
const store = getStorage(fess)
// const auth = getAuth();
export  {db, store};