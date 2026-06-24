import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
// 1. Importamos el controlador del login
import { login } from '../controllers/auth.js'; 

const router = Router();

// 2. CREAR LA RUTA DE LOGIN (Faltaba esto)
router.post('/login', login);

// Ruta pública
router.get('/public', (req, res) => {
    res.json({ message: "Contenido público disponible para todos" });
});

// Ruta protegida
router.get('/private', authMiddleware, (req, res) => {
    res.json({
        message: `Contenido privado. Bienvenido`,
        data: req.user
    });
});

export default router;