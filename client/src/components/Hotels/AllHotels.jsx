import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  PageHeader,
  Row,
  Select,
  Slider
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../common/NavBar";
import Header from "../Home/Header";
import Item from "antd/lib/list/Item";
import { Pagination } from "easy-pagination-1";
import Footer from "../common/Footer/Footer";
import axios from "axios";
import useFetch from "./../../hooks/useFetch";
import { GET_HOTELS, GET_ROOMS } from "../../Api/ApiConstant";
import { getData } from "../../Api/commonServices";
const { Option } = Select;
const rooms = [
  {
    id: 1,
    title: "Deluxe Rom",
    price: 200,
    img: "https://premiumlayers.com/html/hotelbooking/img/room-image-five.png"
  },
  {
    id: 2,
    title: "Double Room",
    price: 200,
    img: "https://premiumlayers.com/html/hotelbooking/img/room-image-nine.png"
  },
  {
    id: 3,
    title: "Single Room",
    price: 200,
    img: "https://premiumlayers.com/html/hotelbooking/img/room-image-thirteen.jpg"
  },
  {
    id: 4,
    title: "Kids  Room",
    price: 200,
    img: "https://premiumlayers.com/html/hotelbooking/img/room-image-eight.png"
  },
  {
    id: 5,
    title: "Deluxe Rom",
    price: 200,
    img: "https://premiumlayers.com/html/hotelbooking/img/room-image-five.png"
  },
  {
    id: 6,
    title: "Double Room",
    price: 200,
    img: "https://premiumlayers.com/html/hotelbooking/img/room-image-nine.png"
  },
  {
    id: 7,
    title: "Single Room",
    price: 200,
    img: "https://premiumlayers.com/html/hotelbooking/img/room-image-thirteen.jpg"
  },
  {
    id: 8,
    title: "Kids  Room",
    price: 200,
    img: "https://premiumlayers.com/html/hotelbooking/img/room-image-eight.png"
  }
];
const AllHotels = () => {

  const [hotels, setHotels] = useState([]);

  const {state:{name}} = useLocation()
  // GET_ROOMS
  useEffect(() => {
    const getPost = async () => {

      try {
        const { data } = await getData(GET_HOTELS, {city:name.toLowerCase()});
        console.log('hotel',data.hotels.allHotels);
        setHotels(data.hotels.allHotels);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);

  const navigate= useNavigate();
  const handleClickRooms =(id)=>{

    navigate('/rooms',{state:id})

  }

  return (
    <div>
      <div style={{ background: "white", padding: "0 5%" }}>
        <NavBar />
      </div>
      <div>
        <div className="head-content">
          <h1>
            {" "}
            HOTELES BY{" "}
            <span style={{ color: "#fe5d5d" }}>{name.toUpperCase()}</span>
          </h1>
          <img
            src="https://premiumlayers.com/html/hotelbooking/img/nice-title.png"
            alt=""
          />
        </div>

        <div className="rooms" style={{ padding: " 0 5%" }}>
          <Row gutter={[14, 14]}>
            {hotels.length < 1 && (
              <div style={{width:'400px',margin:'auto'}}>
                <h1 style={{  color: "red" }}>
                Sorry,  No Hotels Available ! &#127979;
                </h1>
              </div>
            )}
            {hotels?.map(({ _id, name, photo, city }) => (
              <Col
                key={_id}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                lg={{ span: 6 }}
                md={{ span: 8 }}
              >
                <Card>
                  <img
                    // preview={false}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover"
                    }}
                    src={photo}
                    alt=""
                  />
                  <div className="car-hotel-footer d-flex align-center justify-between">
                    <div>
                      <h3>
                        {name.slice(0, 14)} {name.length > 14 ? "..." : ""}
                      </h3>
                      <h4>
                        city: <span className="shift">{city}</span>
                      </h4>
                    </div>
                    <div>

                        <button className="btn-secondary" onClick={()=>handleClickRooms(_id)}>See Rooms</button>
  
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllHotels;
