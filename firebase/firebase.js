// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADFZWhwytDCfIWvV1K05HpG-cOLN0TjLQ",
  authDomain: "flaner-b142b.firebaseapp.com",
  databaseURL: "https://flaner-b142b-default-rtdb.firebaseio.com",
  projectId: "flaner-b142b",
  storageBucket: "flaner-b142b.appspot.com",
  messagingSenderId: "1002203190771",
  appId: "1:1002203190771:web:8c837ce5ea99c6c9d82e86",
  measurementId: "G-FH5T00PZJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const store = getStorage(app);

const db = getDatabase()

export {database, store, db}