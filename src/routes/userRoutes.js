import {Router} from 'express';
import { authMiddleware } from "../middlewares/authMiddleware.js";

import  {getAllUsers, createUser, getUserById, updateUser, deleteUser}  from '../controllers/userController.js';


// routes api/users

const router = Router();

router.get('/', getAllUsers);

router.post('/', authMiddleware, createUser);



// routes for specific user
router.get('/:id', getUserById);

router.put('/:id', authMiddleware, updateUser);

router.delete('/:id', authMiddleware, deleteUser);


export default router;