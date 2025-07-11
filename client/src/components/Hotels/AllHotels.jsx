import { Card, Col, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GET_HOTELS } from "../../Api/ApiConstant";
import { getData } from "../../Api/commonServices";
import Footer from "../common/Footer/Footer";
import NavBar from "../common/NavBar/NavBar";

const AllHotels = () => {
  const [hotels, setHotels] = useState([]);
  const {
    state: { name },
  } = useLocation();

  // GET_ROOMS
  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await getData(GET_HOTELS, {
          city: name.toLowerCase(),
        });
        setHotels(data.hotels.allHotels);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [name]);

  const navigate = useNavigate();

  const handleClickRooms = (id) => {
    navigate("/rooms", { state: id });
  };

  return (
    <div>
      <div style={{ background: "white", padding: "0 5%" }}>
        <NavBar />
      </div>
      <div>
        <div className='head-content'>
          <h1>
            {" "}
            HOTELES BY{" "}
            <span style={{ color: "#fe5d5d" }}>{name.toUpperCase()}</span>
          </h1>
        </div>

        <div
          className='rooms'
          style={{ padding: "0 5%", paddingBottom: "2rem" }}>
          {hotels.length < 1 && (
            <Row gutter={[20, 20]}>
              {[1, 2, 3, 4].map((item) => (
                <Col key={item} xs={24} sm={12} md={8} lg={6}>
                  <Card loading style={{ width: "100%", height: "300px" }}>
                    <Skeleton active>
                      <Skeleton.Image
                        style={{ width: "100%", height: "200px" }}
                      />
                      <Skeleton.Input style={{ width: "60%" }} />
                      <Skeleton.Input style={{ width: "40%" }} />
                    </Skeleton>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          <Row gutter={[14, 14]}>
            {hotels?.map(({ _id, name, photo, city, desc, address }) => (
              <Col key={_id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  className='hotel-card'
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                    transition: "transform 0.3s ease",
                    height: "100%",
                  }}
                  cover={
                    <img
                      alt={name}
                      src={photo}
                      style={{
                        height: 200,
                        width: "100%",
                        objectFit: "cover",
                        transition: "0.3s",
                      }}
                    />
                  }
                  bodyStyle={{
                    padding: "20px 20px 16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "#fff",
                    height: 260,
                  }}>
                  <div>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        marginBottom: 6,
                        color: "#1f1f1f",
                        lineHeight: 1.3,
                      }}
                      title={name}>
                      {name.length > 30 ? `${name.slice(0, 25)}...` : name}
                    </h3>

                    <p
                      style={{
                        fontSize: 13.2,
                        color: "#888",
                        marginBottom: 4,
                        display: "flex",
                        alignItems: "center",
                      }}>
                      <i
                        className='fas fa-map-marker-alt'
                        style={{ color: "#fe5d5d", marginRight: 6 }}
                      />
                      {city.charAt(0).toUpperCase() + city.slice(1)} •{" "}
                      {address?.split("•")[0] || "Bangladesh"}
                    </p>

                    <p
                      style={{
                        fontSize: 13.5,
                        color: "#555",
                        lineHeight: 1.5,
                        marginBottom: 8,
                      }}>
                      {desc.length > 90 ? desc.slice(0, 87) + "..." : desc}
                    </p>

                    <div
                      style={{
                        fontSize: 13,
                        color: "#52c41a",
                        fontWeight: 500,
                        marginBottom: 12,
                      }}>
                      From <span style={{ fontWeight: 600 }}>৳4,500</span> /
                      night
                    </div>
                  </div>

                  <button
                    className='view-rooms-btn'
                    onClick={() => handleClickRooms(_id)}
                    style={{
                      backgroundColor: "#1890ff",
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: 600,
                      transition: "all 0.3s ease",
                      width: "100%",
                    }}>
                    View Available Rooms
                  </button>
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
