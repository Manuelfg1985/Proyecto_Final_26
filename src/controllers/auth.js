import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
dotenv.config();


export const login = async (req, res) => {
    const { email, password } = req.body;

      try {
        // 1. Validar que llegaron los campos
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        // 2. Comparar contra las credenciales del entorno
        const validEmail    = process.env.ADMIN_EMAIL;
        const validPassword = process.env.ADMIN_PASSWORD;

        const emailMatch    = email === validEmail;
        const passwordMatch = password === validPassword; 

        if (!emailMatch || !passwordMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // 3. Generar token
        const payload = { email };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        return res.json({
            message: 'Login exitoso',
            token
        });

    } catch (error) {
        console.error('Error en login:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}