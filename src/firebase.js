// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCndY9EqqwyxxQUgH5NtpAGkPimAV41txM",
  authDomain: "todoapp-f7e3d.firebaseapp.com",
  projectId: "todoapp-f7e3d",
  storageBucket: "todoapp-f7e3d.appspot.com",
  messagingSenderId: "30249673445",
  appId: "1:30249673445:web:eec1fa064cb8b6a2042a0c",
  measurementId: "G-CZK1FDTJ52"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };

