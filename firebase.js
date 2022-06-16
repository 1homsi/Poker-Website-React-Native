import firebase from 'firebase';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDhCyNbJPuVLfgxSc_FiPttGCqPp1eX7ig",
  authDomain: "pokertexas-27373.firebaseapp.com",
  databaseURL: "https://pokertexas-27373-default-rtdb.firebaseio.com",
  projectId: "pokertexas-27373",
  storageBucket: "pokertexas-27373.appspot.com",
  messagingSenderId: "27555496780",
  appId: "1:27555496780:web:0b7e75b75b22474d5cc5e9"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}







