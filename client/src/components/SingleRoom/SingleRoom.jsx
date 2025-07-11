import { Col, Row, Skeleton } from "antd";
import { useCallback, useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import { GET_ROOM, GET_SINGLE_HOTEL_DETAILS } from "../../Api/ApiConstant";
import { getData } from "../../Api/commonServices";
import useAuth from "../../hooks/useAuth";
import BookingRoomModal from "./BookingRoomModal";
import "./singleRoom.css";

const SingleRoom = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);

  const { id, hotelId } = useParams();

  console.log(currentImage);
  const [room, setRoom] = useState({});
  const [hotel, setHotel] = useState({});
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const {
          data: { roomDetails },
        } = await getData(GET_ROOM, { id });
        console.log("singleRoom", roomDetails);
        setRoom(roomDetails);
      } catch (err) {
        console.log(err);
      }
    };
    getRoomDetails();

    const getHotelDetails = async () => {
      try {
        const {
          data: { hotel },
        } = await getData(GET_SINGLE_HOTEL_DETAILS, { hotelId });
        setHotel(hotel);
      } catch (err) {
        console.log(err);
      }
    };
    getHotelDetails();
  }, [hotelId, id]);

  const { isLogin } = useAuth();

  const navigate = useNavigate();
  const handleShowModal = () => {
    if (isLogin) {
      setIsBookingModalVisible(true);
    } else {
      navigate("/auth/register");
    }
  };

  return (
    <>
      <BookingRoomModal
        isBookingModalVisible={isBookingModalVisible}
        setIsBookingModalVisible={setIsBookingModalVisible}
        room={room}
        hotel={hotel}
      />
      <div className='singleRoom'>
        <Row className='room-wrapper'>
          <Col md={{ span: 18 }} xs={{ span: 24 }}>
            <div>
              <h1 style={{ fontFamily: "fantasy" }}>
                {hotel.name} ({room.title})
              </h1>
              <GoLocation />
              <p>{hotel.address}</p>
              <h5 style={{ color: "#627e89", fontFamily: "cursive" }}>
                Book a stay over $150 at this property and get a free airport
                taxi.
              </h5>
            </div>
          </Col>
          <Col md={{ span: 6 }} xs={{ span: 24 }}>
            <div>
              <button
                className='animated-button1 '
                style={{
                  padding: "20px 10px",
                  background: "#fe5d5d",
                }}
                onClick={handleShowModal}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Reserve or Book Now !
              </button>
            </div>
          </Col>
        </Row>
        <Row style={{ paddingBottom: "20px" }} gutter={[24, 24]}>
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <div className='left-bok-content'>
              {/* <h3>{hotel.title} </h3> */}
              {/* <p>{hotel.desc}</p> */}
            </div>
          </Col>
        </Row>
        <div>
          {isViewerOpen && (
            <ImageViewer
              src={room?.photos?.map((img) => img)}
              currentIndex={currentImage}
              onClose={closeImageViewer}
              disableScroll={false}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
                width: "100%",
                marginTop: "7%",
              }}
              closeOnClickOutside={true}
            />
          )}
        </div>
        <Row gutter={[12, 12]} style={{ marginBottom: "20px" }}>
          {!room?.photos?.length
            ? Array.from({ length: 8 }).map((_, index) => (
                <Col
                  md={{ span: 8 }}
                  xs={{ span: 24 }}
                  lg={{ span: 6 }}
                  sm={{ span: 12 }}
                  key={index}>
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "8px",
                      background: "#f0f0f0",
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}>
                    <Skeleton
                      active
                      paragraph={false}
                      title={{ width: "60%" }}
                    />
                  </div>
                </Col>
              ))
            : room?.photos?.slice(0, 8).map((img, index) => (
                <Col
                  md={{ span: 8 }}
                  xs={{ span: 24 }}
                  lg={{ span: 6 }}
                  sm={{ span: 12 }}
                  key={index}>
                  <img
                    onClick={() => openImageViewer(index)}
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    src={img}
                    alt={`Room ${index + 1}`}
                  />
                </Col>
              ))}
        </Row>
      </div>
    </>
  );
};

export default SingleRoom;
