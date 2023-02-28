import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

//PUT Credential Details here
const CredDetails = {
  APIKEY: 'AIzaSyCfi-3ISbK82ZI4jk5keCHg7hnxCRU1rGs',
  AUTHDOMAIN: 'designer-aca93.firebaseapp.com',
  DATABASEURL:'https://designer-aca93-default-rtdb.firebaseio.com',
  PROJECTID: 'designer-aca93',
  STORAGEBUCKET: 'designer-aca93.appspot.com',
  MESSAGESENDERID: '210938589225',
  APPID: '1:210938589225:web:446a73ddd3997c19deec38'
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