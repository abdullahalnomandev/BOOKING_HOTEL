import React from 'react';
import './someRooms.css';
import { Card, Col, Image, Row } from 'antd';
const SomeRooms = () => {
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

    return (
      <div
        className="some-rooms"
        style={{ margin: "0 5%", textAlign: "center" }}
      >
        <div className="head-content">
          <h1>WELCOME TO HOTEL</h1>
          <img
            src="https://premiumlayers.com/html/hotelbooking/img/nice-title.png"
            alt=""
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />{" "}
            Atque recusandae quidem aspernatua!
          </p>
        </div>
        <Row gutter={[12, 12]}>
          {rooms.map(({id, img, title }) => (
            <Col
            key={id}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              lg={{ span: 6 }}
              md={{ span: 8 }}
            >
              <Card>
                <Image
                  preview={false}
                  style={{ maxWidth: "100%" }}
                  src={img}
                  alt=""
                />
                <div className="car-footer align-center">
                  <div>
                    <h3>{title}</h3>
                    <h4>
                      $200/<span className="shift">night</span>
                    </h4>
                  </div>
                  <div>
                      <button
                        className="btn-secondary"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        Book
                      </button>
      
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
};

export default SomeRooms;