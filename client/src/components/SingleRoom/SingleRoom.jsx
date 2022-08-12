import React, { useState } from 'react';
import {GoLocation} from 'react-icons/go';
import './singleRoom.css';
import { Card, Col, Row } from 'antd';
import { useCallback } from 'react';
import ImageViewer from "react-simple-image-viewer";
import BookingRoomModal from './BookingRoomModal';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getData } from '../../Api/commonServices';
import { GET_ROOM } from '../../Api/ApiConstant';

const SingleRoom = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);

  const{id}= useParams()

  console.log(currentImage);
  const images = [
    {
      id: 1,
      img: "https://premiumlayers.com/html/hotelbooking/img/room-image-five.png"
    },
    {
      id: 2,
      img: "https://premiumlayers.com/html/hotelbooking/img/room-image-nine.png"
    },
    {
      id: 3,
      img: "https://premiumlayers.com/html/hotelbooking/img/room-image-thirteen.jpg"
    },
    {
      id: 4,
      img: "https://premiumlayers.com/html/hotelbooking/img/room-image-eight.png"
    },
    {
      id: 5,
      img: "https://premiumlayers.com/html/hotelbooking/img/room-image-five.png"
    },
    {
      id: 6,
      img: "https://premiumlayers.com/html/hotelbooking/img/room-image-nine.png"
    },
  ];
const [room, setRoom] = useState({})
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

 console.log('ROOM',room)
    useEffect(() => {
      const getRoomDetails = async () => {
        try {
          const { data } = await getData(GET_ROOM, {id:id});
          setRoom(data.roomDetails[0]);
        } catch (err) {
          console.log(err);
        }
      };
      getRoomDetails();
    }, [id]);
  return (
    <>
      <BookingRoomModal
        isBookingModalVisible={isBookingModalVisible}
        setIsBookingModalVisible={setIsBookingModalVisible}
      />
      <div className="singleRoom">
        <Row className="room-wrapper">
          <Col md={{ span: 18 }} xs={{ span: 24 }}>
            <div>
              {id}
              <h4>Austin David Hotel ({room.title})</h4>
              <GoLocation />
              <p>Dhaka Bangladesh</p>
              <h5>
                Book a stay over $150 at this property and get a free airport
                taxi.
              </h5>
            </div>
          </Col>
          <Col md={{ span: 6 }} xs={{ span: 24 }}>
            <div>
              <button
                className="animated-button1 "
                style={{ padding: "10px 10px" }}
                onClick={() => setIsBookingModalVisible(true)}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Reserve or Book Now !
              </button>
            </div>
          </Col>
        </Row>
        <div>
          {isViewerOpen && (
            <ImageViewer
              src={images.map(({ img }) => img)}
              currentIndex={currentImage}
              onClose={closeImageViewer}
              disableScroll={false}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
                width: "100%",
                marginTop: "7%"
              }}
              closeOnClickOutside={true}
            />
          )}
        </div>
        <Row gutter={[12, 12]} style={{ marginBottom: "20px" }}>
          {images.map(({ img }, index) => (
            <Col
              md={{ span: 8 }}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              key={index + 1}
            >
              <img
                onClick={() => openImageViewer(index)}
                style={{ width: "100%", cursor: "pointer" }}
                src={img}
                alt=""
              />
            </Col>
          ))}
        </Row>
        <Row style={{ paddingBottom: "20px" }} gutter={[24, 24]}>
          <Col xs={{ span: 24 }} md={{ span: 18 }}>
            <div className="left-bok-content">
              <h3>Experience world-class service </h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
                ipsam nesciunt itaque in recusandae aspernatur voluptate dolores
                quam beatae, debitis cupiditate, sapiente laborum sint, pariatur
                soluta aut eveniet adipisci reprehenderit.
              </p>
            </div>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 6 }}>
            <Card className="book-card">
              <h3>Perfect for 2 night stay !</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias voluptates blanditiis labore neque earum praesentium
                dolore temporibus possimus excepturi eius! Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. At, sit?
              </p>
              <h1>
                $300 <span className="book-amount">(2 night)</span>
              </h1>
              <button
                className="animated-button1 "
                style={{ padding: "10px 10px" }}
                onClick={() => setIsBookingModalVisible(true)}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Reserve or Book Now !
              </button>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SingleRoom;