import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // 1. Importa o getAuth

const firebaseConfig = {
    apiKey: "AIzaSyAzqkC5kbKNKjDUkrDt5Gni8OqTPoVUQGQ",
    authDomain: "admin-page-diamond.firebaseapp.com",
    projectId: "admin-page-diamond",
    storageBucket: "admin-page-diamond.firebasestorage.app",
    messagingSenderId: "905320274522",
    appId: "1:905320274522:web:f6b28303e7f94d2217d663",
    measurementId: "G-8NPNZ3E4N1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); // 2. Exporta o serviço de autenticação
