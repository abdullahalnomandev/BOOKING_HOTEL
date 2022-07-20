import express from 'express';
import {  createHotel, getHotels, updateHotel } from "../controllers/hotelsController.js";

 const router = express.Router();


router.post('/post',createHotel);
router.get('/',getHotels);
router.patch('/:id',updateHotel);

export default router;