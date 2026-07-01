import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {

    // 1. Obtener el token del header 'Authorization'
    // El formato estándar es: "Bearer <TOKEN>"
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token válido.' });
    }

    const token = authHeader.split(' ')[1]; // Separamos "Bearer" del token real

    try {
        // 2. Verificar el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Inyectar los datos del usuario decodificados en la petición (req)
        req.user = decoded;
        
        // 4. Continuar a la siguiente función/ruta
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
};

