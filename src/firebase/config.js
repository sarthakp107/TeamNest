import firebase from "firebase/app";
import 'firestore/firestore';
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyA8C5-AfJryEETDeYW2TmLz_KZH2jSkzS0",
    authDomain: "teamnest-eb6ea.firebaseapp.com",
    projectId: "teamnest-eb6ea",
    storageBucket: "teamnest-eb6ea.firebasestorage.app",
    messagingSenderId: "237932081582",
    appId: "1:237932081582:web:756329ec1f087c84f8d83f"
  };

  //initialize firebase
  firebase.initializeApp(firebaseConfig);

  //initialize each services
  const projectFirestore = firebase.firestore();
  const projectAuth = firebase.auth();

  //timestamp
  const timestamp = firebase.firestore.Timestamp;

  export { projectAuth , projectFirestore , timestamp};