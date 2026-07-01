import {User} from '../models/Users.js';
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import db from '../config/db.js';

// 1. Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "postulantes"));
    const users = snapshot.docs.map(doc => doc.data());
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// 2. Obtener un usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const snapshot = await getDocs(collection(db, "postulantes"));
    const userDoc = snapshot.docs.find(doc => doc.id === id);
    if (!userDoc) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ id: userDoc.id, ...userDoc.data() });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// 3. Crear un nuevo usuario

export const createUser = async (req, res) => {
  
  try {
    const newUser = new User(req.body);

  
    await addDoc(collection(db, "postulantes"), newUser.toFirestore());
    res.status(201).json({ message: 'User created successfully',
      data: {
        ...newUser.toFirestore()
      }
     });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });

  }
};

// 4. Actualizar un usuario existente
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    const userRef = doc(db, "postulantes", id);
    await updateDoc(userRef, userData);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// 5. Eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;
   if (!id) {
    return res.status(400).json({ message: 'El ID es requerido' });
  }
  try {
    const userRef = doc(db, "postulantes", id);
    await deleteDoc(userRef);
    res.json({ message: 'User deleted successfully',});
  }
    catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};












