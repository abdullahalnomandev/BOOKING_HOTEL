import express from 'express';
import { getAllUsers, updateProfile,getUserProfile } from "../controllers/usersController.js";

const router = express.Router();

//GET USERS
router.post('/allUsers',getAllUsers)
router.post('/profile',getUserProfile)
router.patch('/updateProfile',updateProfile)



export default router;