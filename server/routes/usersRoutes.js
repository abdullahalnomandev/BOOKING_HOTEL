import express from 'express';
import {
  getAllUsers,
  updateProfile,
  getUserProfile,
  updatePassword
} from "../controllers/usersController.js";
import { verifyToken, verifyUser } from '../middleware/VerifyToken.js';

const router = express.Router();

//GET USERS
router.post('/allUsers',verifyUser, getAllUsers)
router.post('/profile',verifyUser, getUserProfile)
router.patch('/updateProfile',verifyUser, updateProfile)
router.patch('/updatePassword',verifyUser, updatePassword)



export default router;