import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCYfnkPktR_QzHa14PgLD7Gqtxtuj-MAJw",
    authDomain: "random-5e192.firebaseapp.com",
    databaseURL: "https://random-5e192-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "random-5e192",
    storageBucket: "random-5e192.firebasestorage.app",
    messagingSenderId: "348310291943",
    appId: "1:348310291943:web:d3be7bec5797b3ac5b6942",
    measurementId: "G-RY70FMJ06D"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 