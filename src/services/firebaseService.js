import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";

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
export async function loginUser({ email, password }) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Registra un nuevo agente vinculado a una empresa
 */
export async function registerAgent({ fullName, email, password, companyId }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    name: fullName,
    email,
    role: "agent",
    companyId,
    createdAt: serverTimestamp()
  });

  return user;
}


/**
 * Obtiene los datos del usuario autenticado actual desde Firestore
 */
export async function getCurrentUserData() {
  const user = auth.currentUser;
  if (!user) return null;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
}


/**
 * Cierra sesión del usuario actual
 */
export async function logoutUser() {
  await signOut(auth);
}
