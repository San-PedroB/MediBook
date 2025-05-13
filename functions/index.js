const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

admin.initializeApp();

const app = express();

// ✅ Permite solicitudes desde cualquier origen (ajusta si quieres más seguridad)
app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  console.log("📥 Solicitud recibida:", req.body);

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ Sin token de autenticación");
    return res.status(401).json({ error: "No autorizado" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  let decodedToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("✅ Token verificado:", decodedToken.uid);
  } catch (error) {
    console.error("❌ Token inválido:", error);
    return res.status(401).json({ error: "Token inválido" });
  }

  const requesterUid = decodedToken.uid;
  const requesterDoc = await admin.firestore().collection("users").doc(requesterUid).get();

  if (!requesterDoc.exists || requesterDoc.data().role !== "admin") {
    console.log("❌ Usuario no autorizado o no es admin");
    return res.status(403).json({ error: "No tienes permiso para realizar esta acción" });
  }

  const { fullName, email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({ email, password });
    await admin.firestore().collection("users").doc(userRecord.uid).set({
      name: fullName,
      email,
      role: "agent",
      companyId: requesterDoc.data().companyId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("✅ Agente creado:", userRecord.uid);
    return res.status(201).json({ success: true, uid: userRecord.uid });
  } catch (error) {
    console.error("❌ Error al crear usuario:", error);
    return res.status(500).json({ error: "Error al crear agente" });
  }
});

// 📤 Exportar como función HTTP (🔥 versión clásica que evita tu error)
exports.createAgentUserHttp = functions.https.onRequest(app);
