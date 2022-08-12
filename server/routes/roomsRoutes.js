import express from "express";
import {
  createRoom,
  getRooms,
  getRoomsByHotel,
  roomDetails
} from "../controllers/roomsController.js";

const router = express.Router();

router.post("/createRoom", createRoom);
router.post("/allRooms", getRooms);
router.post("/getRoomsByHotel", getRoomsByHotel);
router.post("/details", roomDetails);

// router.patch("/:id", updateRoom);

export default router;
