import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Agregar "export" aquí adelante:
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = { email: "user@gmail.com", password: "$2a$10$" }; // Tu ejemplo

        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = true; // Simulado para el ejemplo
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const payload = { email: user.email };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '3 h'
        });

        res.json({
            message: 'Login exitoso',
            token
        });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
