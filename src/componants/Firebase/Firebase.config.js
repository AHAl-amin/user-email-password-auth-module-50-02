// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz_PIZwQORgY5uiQWUmppk8bfzr_xvVAU",
  authDomain: "user-email-password-auth-5acbf.firebaseapp.com",
  projectId: "user-email-password-auth-5acbf",
  storageBucket: "user-email-password-auth-5acbf.appspot.com",
  messagingSenderId: "962177084503",
  appId: "1:962177084503:web:3215e6ab0b44c176dbc712"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export default app;
const auth = getAuth(app);
export default auth;