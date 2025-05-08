// src/services/firebaseService.js

import { auth, db } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  setDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";

/**
 * Registra un nuevo administrador
 */
export async function registerAdmin({ fullName, email, password, companyName }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    name: fullName,
    email: email,
    companyName,
    role: "admin",
    createdAt: serverTimestamp(),
    companyId: `company-${user.uid}`
  });

  return user;
}

/**
 * Inicia sesión con email y contraseña
 */
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Cierra sesión del usuario actual
 */
export async function logoutUser() {
  await signOut(auth);
}
