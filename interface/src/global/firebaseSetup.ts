import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1cRinaFKfTEKJDk7ZcQ43YtBpkcHCmJQ",
  authDomain: "notifier-sms-c0aee.firebaseapp.com",
  databaseURL: "https://notifier-sms-c0aee-default-rtdb.firebaseio.com",
  projectId: "notifier-sms-c0aee",
  storageBucket: "notifier-sms-c0aee.appspot.com",
  messagingSenderId: "498046030297",
  appId: "1:498046030297:web:7dfeb27ff1b8f8d2a589c8",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
