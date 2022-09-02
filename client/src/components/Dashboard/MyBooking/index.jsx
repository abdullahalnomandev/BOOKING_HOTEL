import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_BOOKING_BY_USER } from "../../../Api/ApiConstant";
import { getData } from "../../../Api/commonServices";
import useAuth from "../../../hooks/useAuth";
import "./index.css";
const MyBooking = () => {
  const [booking, setBooking] = useState([]);

  const { id } = useAuth();
  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const { data } = await getData(GET_BOOKING_BY_USER, { userId: id });
        console.log("singleRoom", data);
        setBooking(data.booking);
      } catch (err) {
        console.log(err);
      }
    };
    getRoomDetails();
  }, []);

  return (
    <div className="my-booking">
      <div className="head-content" style={{ marginTop: "-3%" }}>
        <h1>
          MY <span style={{ color: "#fe5d5d" }}>BOOKING </span>
        </h1>
        <img
          src="https://premiumlayers.com/html/hotelbooking/img/nice-title.png"
          alt=""
        />
      </div>
      <table>
        <tr>
          <th>Hotel Name</th>
          <th>Room Name</th>
          <th>Booking Date</th>
          <th>Phone</th>
          <th>Booking ID</th>
          <th>Price</th>
          <th>Room Numbers</th>
        </tr>
        {booking.length < 1 && (
          <div className="null">
            <h3 style={{ color: "red" }}>
              Sorry, You hve no booking ! &#127979;
            </h3>
            <Link to="/">
              <button className="btn-secondary">Let's Book a Room</button>
            </Link>
          </div>
        )}

        {booking?.map(
          ({ hotel, phone, date, _id, price, roomName, roomNumbers }) => (
            <tr key={_id}>
              <td>{hotel}</td>
              <td>{roomName}</td>
              <td>{new Date(date).toLocaleDateString()}</td>
              <td>{phone}</td>
              <td>{_id.slice(0, 10)}</td>
              <td>${price}</td>
              <td>
                {roomNumbers.map((room, index) => (
                  <Button
                    type="default"
                    style={{ marginRight: "3px" }}
                    key={index + 1}
                  >
                    {" "}
                    {room}
                  </Button>
                ))}
              </td>
            </tr>
          )
        )}
      </table>
    </div>
  );
};

export default MyBooking;
