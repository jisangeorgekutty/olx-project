import { initializeApp } from 'firebase/app'; 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCvwYFK7Br1KVS0TrRygFhPwD-8w7sDeU8",
    authDomain: "olx-project-8072e.firebaseapp.com",
    projectId: "olx-project-8072e",
    storageBucket: "olx-project-8072e.firebasestorage.app",
    messagingSenderId: "397054832623",
    appId: "1:397054832623:web:c745b4bc3c866a557a901a",
    measurementId: "G-QVYQENL5QC"
};

const firebase=initializeApp(firebaseConfig);
const auth=getAuth(firebase)

export default firebase
export  {auth};