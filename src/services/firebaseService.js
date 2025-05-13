import { auth, db, app } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  setDoc,
  getDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";


import { getFunctions, httpsCallable } from "firebase/functions";
const functions = getFunctions(app, "us-central1"); // ✅ explícitamente a tu región


// 🔐 Crea un nuevo agente usando una Cloud Function protegida
export async function registerAgent({ fullName, email, password }) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No hay usuario autenticado.");
  }

  const token = await currentUser.getIdToken(true);

  const response = await fetch("https://us-central1-medibook-60739.cloudfunctions.net/createAgentUserHttp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ fullName, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ Error desde el backend:", errorData);
    throw new Error("Error al crear agente");
  }

  const data = await response.json();
  return data;
}



// ✅ Registro del administrador directamente (sin función en la nube)
export async function registerAdmin({ fullName, email, password, companyName }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    name: fullName,
    email,
    companyName,
    role: "admin",
    createdAt: serverTimestamp(),
    companyId: `company-${user.uid}`
  });

  return user;
}

// 👤 Login
export async function loginUser({ email, password }) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// 🔍 Obtener datos del usuario actual
export async function getCurrentUserData() {
  const user = auth.currentUser;
  if (!user) return null;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
}

// 🔓 Logout
export async function logoutUser() {
  await signOut(auth);
}
