import express from 'express';
import { createHotel, getHotels, updateHotel } from "../controllers/hotelsController.js";

export const router = express.Router();


router.post('/',createHotel);
router.get('/',getHotels);
router.patch('/:id',updateHotel);

export default router;