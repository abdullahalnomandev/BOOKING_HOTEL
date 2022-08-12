export const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

//usersInfo
 const GET_USERS = "/api/users";
 const GET_ROOMS = "/api/room/allRooms";
 const GET_ROOM = "/api/room/details";
 const GET_HOTELS = "/api/hotels";
 const GET_ROOMS_BY_ID= "/api/room/getRoomsByHotel";



export { GET_USERS, GET_ROOMS, GET_ROOM, GET_HOTELS, GET_ROOMS_BY_ID };