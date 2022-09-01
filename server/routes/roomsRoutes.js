import express from "express";
import {
  createRoom,
  getRooms,
  getRoomsByHotel,
  roomDetails,
  updateRoomAvailability
} from "../controllers/roomsController.js";
import { verifyAdmin, verifyUser } from "../middleware/VerifyToken.js";

const router = express.Router();

//POST
router.post("/createRoom",verifyAdmin, createRoom);
//GET
router.post("/allRooms",verifyAdmin, getRooms);
//GET
router.post("/getRoomsByHotel", getRoomsByHotel);
//GET
router.post("/details", roomDetails);
//PATCH
router.patch("/availability",verifyUser, updateRoomAvailability);

// router.patch("/:id", updateRoom);

export default router;
