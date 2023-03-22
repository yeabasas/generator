import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from '@firebase/database';
import { getFirestore } from '@firebase/firestore'
import { getStorage } from "firebase/storage";
//PUT Credential Details here
const CredDetails = {
  APIKEY: 'AIzaSyC6YT7XJ2xgOAznaP7XSpB0Qm5CiNxrnok',
  AUTHDOMAIN: 'generator-424d9.firebaseapp.com',
  DATABASEURL:'https://generator-424d9-default-rtdb.asia-southeast1.firebasedatabase.app',
  PROJECTID: 'generator-424d9',
  STORAGEBUCKET: 'generator-424d9.appspot.com',
  MESSAGESENDERID: '366432278564',
  APPID: '1:366432278564:web:f8fcdfcc1eee13f959a0b1'
}

const firebaseConfig = {
  apiKey: CredDetails.APIKEY,
  authDomain: CredDetails.AUTHDOMAIN,
  databaseurl: CredDetails.DATABASEURL,
  projectId: CredDetails.PROJECTID,
  storageBucket: CredDetails.STORAGEBUCKET,
  messagingSenderId: CredDetails.MESSAGESENDERID,
  appId: CredDetails.APPID
};

const initialize = initializeApp(firebaseConfig);
export const app = getAuth(initialize);
export const database = getDatabase();
export const dbfire = getFirestore();
export const storage = getStorage();
