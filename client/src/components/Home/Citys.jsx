import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import borisal from "../../assets/borisal.jpg";
import Chittagong from "../../assets/chatagong.jpg";
import dhaka from "../../assets/dhaka.jpg";
import Khulna from "../../assets/khulna.jpg";
import maymnsing from "../../assets/moymang.jpg";
import Rajshahi from "../../assets/rajshi.jpg";
import rangpur from "../../assets/rangpur.jpg";
import sylhet from "../../assets/sylet.jpg";
import "./City.css";
const Citys = () => {
  const citys = [
    { id: 1, image: dhaka, name: "Dhaka", properties: 4 },
    { id: 2, image: Chittagong, name: "Chittagong", properties: 3 },
    { id: 3, image: Rajshahi, name: "Rajshahi", properties: 4 },
    { id: 4, image: Khulna, name: "Khulna", properties: 2 },
    { id: 5, image: sylhet, name: "Sylhet", properties: 2 },
    { id: 6, image: rangpur, name: "Rangpur", properties: 4 },
    { id: 7, image: maymnsing, name: "Mymensingh", properties: 4 },
    { id: 8, image: borisal, name: "Barisal", properties: 7 },
  ];

  const navigate = useNavigate();

  const handleMoveCity = (id, name, city) => {
    const cityInfo = {
      id,
      name,
    };
    navigate("/hoteles", { state: cityInfo });
  };
  return (
    <div
      style={{
        width: "95%",
        margin: "auto",
        marginTop: "30px",
        zIndex: "-5 !important",
      }}>
      <div className='head-content'>
        <h1>
          BOOK HOTEL <span style={{ color: "#fe5d5d" }}> BY CITY</span>
        </h1>

        <p>
          Discover comfortable and luxurious hotels in every major city. <br />
          Find the perfect accommodation for your stay!
        </p>
      </div>
      <Row gutter={[14, 14]}>
        {citys.map(({ id, name, image, properties }) => (
          <Col
            key={id}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            lg={{ span: 6 }}>
            <div className='city-card' onClick={() => handleMoveCity(id, name)}>
              <div
                style={{
                  backgroundImage: ` linear-gradient(to bottom, rgba(245, 246, 252, 0.52), #00000070),     url(${image})`,
                  height: "200px",
                  width: "100%",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "10px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}></div>
              <div className='city-content'>
                <h2>{name}</h2>
                <h4>{properties} hotels</h4>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Citys;
