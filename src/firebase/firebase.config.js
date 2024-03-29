// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8xaW7OprS4y6xBoVdynLEI0oHjqZ4DQI",
  authDomain: "user-authentication-2d39e.firebaseapp.com",
  projectId: "user-authentication-2d39e",
  storageBucket: "user-authentication-2d39e.appspot.com",
  messagingSenderId: "541619852463",
  appId: "1:541619852463:web:fe0bcd3649617af59cb05a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;