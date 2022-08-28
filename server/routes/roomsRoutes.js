import express from "express";
import {
  createRoom,
  getRooms,
  getRoomsByHotel,
  roomDetails,
  updateRoomAvailability
} from "../controllers/roomsController.js";

const router = express.Router();

//POST
router.post("/createRoom", createRoom);
//GET
router.post("/allRooms", getRooms);
//GET
router.post("/getRoomsByHotel", getRoomsByHotel);
//GET
router.post("/details", roomDetails);
//PATCH
router.patch("/availability", updateRoomAvailability);

// router.patch("/:id", updateRoom);

export default router;
