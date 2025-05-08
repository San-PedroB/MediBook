import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBRocpOEk2ILpt7_BoMXNR_tzoymtm8DSE",
    authDomain: "medibook-60739.firebaseapp.com",
    projectId: "medibook-60739",
    storageBucket: "medibook-60739.firebasestorage.app",
    messagingSenderId: "742702166786",
    appId: "1:742702166786:web:07bccaff206f1cbd99881b",
    measurementId: "G-E7772F09TQ"
};

const app = initializeApp(firebaseConfig);

// Exportamos auth y db para usarlos en toda la app
export const auth = getAuth(app);
export const db = getFirestore(app);
