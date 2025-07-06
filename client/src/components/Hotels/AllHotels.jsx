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
          <img
            src='https://premiumlayers.com/html/hotelbooking/img/nice-title.png'
            alt=''
          />
        </div>

        <div className='rooms' style={{ padding: " 0 5%" }}>
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
            {hotels?.map(({ _id, name, photo, city }) => (
              <Col
                key={_id}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                lg={{ span: 6 }}
                md={{ span: 8 }}>
                <Card
                  hoverable
                  cover={
                    <img
                      src={photo}
                      alt={name}
                      style={{
                        height: 200,
                        objectFit: "cover",
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                  }
                  bodyStyle={{ padding: 16 }}>
                  <h3
                    style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                    {name.slice(0, 14)} {name.length > 14 ? "..." : ""}
                  </h3>
                  <p style={{ fontSize: 14, color: "#555", marginBottom: 12 }}>
                    City: <span style={{ color: "#888" }}>{city}</span>
                  </p>
                  <button
                    className='btn-secondary'
                    onClick={() => handleClickRooms(_id)}
                    style={{
                      background: "#1890ff",
                      color: "#fff",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: 6,
                      cursor: "pointer",
                      width: "100%",
                      fontWeight: 500,
                      transition: "0.3s",
                    }}>
                    See Available Rooms
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
