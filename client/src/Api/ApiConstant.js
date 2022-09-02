export const API_BASE_URL = process.env.REACT_APP_API_URL;

//BOOKING
 const GET_ROOMS = "/api/room/allRooms";
 const GET_ROOM = "/api/room/details";
 const GET_HOTELS = "/api/hotels";
 const GET_ROOMS_BY_Hotel_ID= "/api/room/getRoomsByHotel";
 const GET_SINGLE_HOTEL_DETAILS = "/api/hotels/singleHotel";
 const CHECK_ROOM_AVAILABILITY= "/api/room/availability";
 const GET_ALL_CITY_HOTELS = "/api/hotels/allCityHotels";
 const GET_BOOKING_BY_USER = "/api/booking/getBookingByUser";
 const GET_ALL_BOOKING = "/api/booking/allBookings";

// ADD
const ADD_NEW_HOTEL = "/api/hotels/post";
const ADD_NEW_ROOM = "/api/room/createRoom";
const CREATE_BOOKING = "/api/booking/addBooking";

//  USER  
 const SIGN_UP_USER = "/api/auth/signup";
 const SIGN_IN_USER = "/api/auth/login";
 const GET_USERS = "/api/users/allUsers";
 const GET_USER_PROFILE = "/api/users/profile";
 const UPDATE_PROFILE = "/api/users/updateProfile";
 const UPDATE_PASSWORD = "/api/users/updatePassword";

 // DELETE
 const DELETE_HOTEL = "/api/hotels/delete";

export {
  GET_ROOMS,
  GET_ROOM,
  GET_HOTELS,
  GET_ROOMS_BY_Hotel_ID,
  GET_SINGLE_HOTEL_DETAILS,
  SIGN_UP_USER,
  SIGN_IN_USER,
  CHECK_ROOM_AVAILABILITY,
  GET_ALL_CITY_HOTELS,
  ADD_NEW_HOTEL,
  ADD_NEW_ROOM,
  GET_USERS,
  UPDATE_PROFILE,
  GET_USER_PROFILE,
  CREATE_BOOKING,
  GET_BOOKING_BY_USER,
  GET_ALL_BOOKING,
  UPDATE_PASSWORD,
  DELETE_HOTEL
};