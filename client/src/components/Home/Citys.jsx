import { Col, Row } from "antd";
import React from "react";
import dhaka from "../../assets/dhaka.jpg";
import Chittagong from "../../assets/chatagong.jpg";
import Rajshahi from "../../assets/rajshi.jpg";
import Khulna from "../../assets/khulna.jpg";
import sylhet from "../../assets/sylet.jpg";
import rangpur from "../../assets/rangpur.jpg";
import maymnsing from "../../assets/moymang.jpg";
import borisal from "../../assets/borisal.jpg";
import './City.css'
import { useNavigate } from "react-router-dom";
const Citys = () => {
  const citys = [
    { id: 1, image: dhaka, name: "Dhaka", properties: 10 },
    { id: 2, image: Chittagong, name: "Chittagong", properties: 90 },
    { id: 3, image: Rajshahi, name: "Rajshahi", properties: 70 },
    { id: 4, image: Khulna, name: "Khulna", properties: 10 },
    { id: 5, image: sylhet, name: "Sylhet", properties: 60 },
    { id: 6, image: rangpur, name: "Rangpur", properties: 70 },
    { id: 7, image: maymnsing, name: "Mymensingh", properties: 10 },
    { id: 8, image: borisal, name: "Barisal", properties: 20 }
  ];

    const navigate= useNavigate()

  const handleMoveCity=(id,name,city)=>{
    const cityInfo={
      id,name
    }
    navigate("/hoteles",{state:cityInfo});
  }
  return (
    <div
      style={{
        width: "95%",
        margin: "auto",
        marginTop: "30px",
        zIndex: "-5 !important"
      }}
    >
      <div className="head-content">
        <h1>BOOK HOTEL BY CITY </h1>
        <img
          src="https://premiumlayers.com/html/hotelbooking/img/nice-title.png"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Atque
          recusandae quidem aspernatua!
        </p>
      </div>
      <Row gutter={[14, 14]}>
        {citys.map(({id, name, image, properties }) => (
          <Col
          key={id}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            lg={{ span: 6 }}
          >
            <div className="city-card" onClick={()=>handleMoveCity(id,name)}>
              <div
                style={{
                  backgroundImage: ` linear-gradient(to bottom, rgba(245, 246, 252, 0.52), #00000070),     url(${image})`,
                  height: "200px",
                  width: "100%",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "10px",
                  backgroundPosition: "center",
                  backgroundSize: "cover"
                }}
              ></div>
              <div className="city-content">
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
