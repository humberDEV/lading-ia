import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// ====== TU CONFIGURACIÓN DE FIREBASE ======
// Pega aquí el objeto de configuración que te da Firebase al crear tu App Web
// Import the functions you need from the SDKs you need
const firebaseConfig = {
  apiKey: "AIzaSyAmwFrdChusx_t3rdG6AqwtpYfGVGuUBqA",
  authDomain: "lading-ia.firebaseapp.com",
  projectId: "lading-ia",
  storageBucket: "lading-ia.firebasestorage.app",
  messagingSenderId: "822599374614",
  appId: "1:822599374614:web:200a900d68011ea5ede237",
  measurementId: "G-Y9X9YZ732N"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, serverTimestamp };
