import express from 'express';
import {  createHotel, getHotels, updateHotel } from "../controllers/hotelsController.js";

 const router = express.Router();

router.post('/post',createHotel);
router.post('/',getHotels);
router.patch('/',updateHotel);

export default router;