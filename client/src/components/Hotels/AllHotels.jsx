import {
  Card,
  Col,
  Row,
} from "antd";
import React, {  useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import NavBar from "../common/NavBar/NavBar";
import Footer from "../common/Footer/Footer";
import { GET_HOTELS } from "../../Api/ApiConstant";
import { getData } from "../../Api/commonServices";
import loaderZif from '../../assets/project-idea.gif';

const AllHotels = () => {

  const [hotels, setHotels] = useState([]);
  const {state:{name}} = useLocation()

  // GET_ROOMS
  useEffect(() => {
    const getPost = async () => {

      try {
        const { data } = await getData(GET_HOTELS, {city:name.toLowerCase()});
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
              <div style={{ width: "400px", margin: "auto" }}>
                <img src={loaderZif} alt="" style={{ maxWidth: "100%" }} />
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
                      <button
                        className="btn-secondary"
                        onClick={() => handleClickRooms(_id)}
                      >
                        See Rooms
                      </button>
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
