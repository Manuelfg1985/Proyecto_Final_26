import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import auth from "./src/routes/auth.js"
import {login} from "./src/controllers/auth.js"
import dotenv from "dotenv";
import db from "./src/config/db.js";
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.get("/api/postulantes", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "postulantes"));
    

    const documentos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(documentos);

  } catch (error) {
    res.status(500).json({
      mensaje: "❌ Error de conexión",
      error: error.message
    });
  }
});
app.use("/api/postulantes", userRoutes);

app.use ("/api/auth", auth)



app.get("/up", (req, res) => {
  res.json({
    status: "ok",
    message: "Servidor activo",

  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});


