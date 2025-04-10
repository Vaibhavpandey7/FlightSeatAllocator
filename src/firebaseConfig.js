import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVTspmYB2iBfkxxQjQT3OSIVDGaw17qEI",
  authDomain: "flight-seat-allocating-system.firebaseapp.com",
  projectId: "flight-seat-allocating-system",
  storageBucket: "flight-seat-allocating-system.appspot.com",
  messagingSenderId: "610577932692",
  appId: "1:610577932692:web:f7206acb3bf45a6d8faf81",
  measurementId: "G-K0NHD08KBL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
