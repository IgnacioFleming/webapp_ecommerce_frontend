// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC732NjckS0YvW-dtKbO1c_caOVlLHXjp4",
  authDomain: "the-office-store-98214.firebaseapp.com",
  projectId: "the-office-store-98214",
  storageBucket: "the-office-store-98214.appspot.com",
  messagingSenderId: "768756242839",
  appId: "1:768756242839:web:08dccaf7cbcf04594d4cd2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
