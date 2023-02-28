import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "@firebase/firestore"
export const firebaseConfig = {
    apiKey: "AIzaSyCfi-3ISbK82ZI4jk5keCHg7hnxCRU1rGs",
    authDomain: "designer-aca93.firebaseapp.com",
    databaseURL: "https://designer-aca93-default-rtdb.firebaseio.com",
    projectId: "designer-aca93",
    storageBucket: "designer-aca93.appspot.com",
    messagingSenderId: "210938589225",
    appId: "1:210938589225:web:446a73ddd3997c19deec38"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore =getFirestore(app)