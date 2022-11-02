import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKSkJioSWQVHM0F3AQ0cKa79bg3KvrJLo",
  authDomain: "linkedin-clone-41ffd.firebaseapp.com",
  projectId: "linkedin-clone-41ffd",
  storageBucket: "linkedin-clone-41ffd.appspot.com",
  messagingSenderId: "849447147551",
  appId: "1:849447147551:web:d17c11d19e02f235245d2a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
