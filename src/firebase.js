import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDPGZeHySUe5yd8T-V4vHgQESeKU2sISog",
  authDomain: "bar-db.firebaseapp.com",
  projectId: "bar-db",
  storageBucket: "bar-db.appspot.com",
  messagingSenderId: "52506451695",
  appId: "1:52506451695:web:5b2448195286e8296cc51a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;

