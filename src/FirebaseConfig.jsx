import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBwarFkzSMyUzxJGpfP6yVPEKlcttzUy7I",
    authDomain: "minihackaton22.firebaseapp.com",
    projectId: "minihackaton22",
    storageBucket: "minihackaton22.firebasestorage.app",
    messagingSenderId: "375389105482",
    appId: "1:375389105482:web:ec3ab61c50a57cbb8065b3"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };