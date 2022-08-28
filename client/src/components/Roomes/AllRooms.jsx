import {  Card, Col, Form, Image, Row, Select } from 'antd';
import React, {  useEffect, useState } from 'react';
import { Link,  useLocation } from 'react-router-dom';
import NavBar from '../common/NavBar/NavBar';
import './allRooms.css'
import { Pagination } from "easy-pagination-1"; 
import Footer from '../common/Footer/Footer';
import {  GET_ROOMS_BY_Hotel_ID } from '../../Api/ApiConstant';
import { getData } from '../../Api/commonServices';
import { useBookingContext } from '../../context/BookingContext';
const { Option } = Select;

const AllRooms = () => {
  const { booking, setBooking } = useBookingContext();
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleChange = (value,key) => {
    console.log(booking);
    if(key==='room'){
      setBooking({...booking,room:value});
    }
     if (key === "adult") {
       setBooking({ ...booking, adult: value });
     }
      if (key === "child") {
        setBooking({ ...booking, child: value });
      }
  };

  const showPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const [inputRange, setInputRange] = useState(100);
  const [rooms, setRooms] = useState([]);

  const { state:hotelID } = useLocation();

  // GET_ROOMS_BY_ID
  useEffect(() => {
    const getPost = async () => {
      const filterData = {
        hotelId: hotelID,
        lowestPrice: inputRange,
        heightPrice: 500
      };
      try {
        const { data } = await getData(GET_ROOMS_BY_Hotel_ID, filterData);
        setRooms(data?.rooms);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [hotelID,inputRange]);


  return (
    <>
      <div style={{ background: "white", padding: "0 5%" }}>
        <NavBar />
      </div>
      <div style={{ padding: "0 5%" }}>
        <div className="head-content">
          <h1>OTHER DECENT ROOM</h1>
          <img
            src="https://premiumlayers.com/html/hotelbooking/img/nice-title.png"
            alt=""
          />
        </div>
        <Form
          initialValues={{
            adult: booking.adult,
            room: booking.room,
            child: booking.child
          }}
          onFinish={onFinish}
          layout="vertical"
        >
          <div className="book-form">
            <div className="title">
              <h5>BOOK YOUR </h5>
              <h2>ROOMS</h2>
            </div>
            <div className="book-forms">
              <div style={{ display: "flex", gap: "10px", maxWidth: "670px" }}>
                <Form.Item
                  style={{
                    width: "100%",
                    marginTop: "1%",
                    maxHeight: "100%"
                  }}
                  name="room"
                >
                  <Select onChange={(e) => handleChange(e, "room")}>
                    <Option value="1room">1 ROOM</Option>
                    <Option value="2room">2 ROOM</Option>
                    <Option value="3room">3 ROOM</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  style={{
                    width: "100%",
                    marginTop: "1%",
                    maxHeight: "100%"
                  }}
                  name="adult"
                >
                  <Select onChange={(e) => handleChange(e, "adult")}>
                    <Option value="1adult">1 ADULT</Option>
                    <Option value="2adult">2 ADULT</Option>
                    <Option value="3adult">3 ADULT</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  style={{
                    width: "100%",
                    marginTop: "1%",
                    maxHeight: "100%"
                  }}
                  name="child"
                >
                  <Select onChange={(e) => handleChange(e, "child")}>
                    <Option value="0child">0 CHILD</Option>
                    <Option value="1child">1 CHILD</Option>
                    <Option value="2child">2 CHILD</Option>
                  </Select>
                </Form.Item>
                <div className="input-range">
                  <p>PRICE: RANGE:</p>
                  <div className="range">
                    <h5>${inputRange}</h5>
                    <input
                      value={inputRange}
                      onChange={(e) => setInputRange(e.target.value)}
                      type="range"
                      min={50}
                      max={500}
                    />
                    <h5>$500</h5>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {" "}
              <button
                className="btn-primary-full"
                type="primary"
                htmlType="submit"
                style={{ fontSize: "20px", padding: "3px 27px" }}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Filter
              </button>
            </div>
          </div>
        </Form>
        <div className="rooms" style={{ margin: "3% 0" }}>
          {rooms.length < 1 && (
            <div style={{ width: "400px", margin: "auto" }}>
              <h1 style={{ color: "red" }}>
                Sorry, No Rooms Available ! &#127979;
              </h1>
            </div>
          )}
          <Row gutter={[14, 14]}>
            {rooms?.map(({ _id, photo, title, price, hotelId }) => (
              <Col
                key={_id}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                lg={{ span: 6 }}
                md={{ span: 8 }}
              >
                <Card style={{ textAlign: "center" }}>
                  <Image
                    preview={false}
                    style={{ maxWidth: "100%" }}
                    src={photo}
                    alt=""
                  />
                  <div className="car-footer align-center">
                    <div>
                      <h3>{title}</h3>
                      <h4>
                        ${price}/<span className="shift">night</span>
                      </h4>
                    </div>
                    <div>
                      <Link to={`/room/${_id}/${hotelID}`}>
                        <button className="btn-secondary">
                          See Availability
                        </button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        {/* <div className="pagination" style={{ margin: "10% 0" }}>

          <ul className="ulStyle">
            {currentPage > 1 && (
              <li
                onClick={() => setCurrentPage(currentPage - 1)}
                className="prevNextBtn"
              >
                <a>Prev</a>
              </li>
            )}
            {paginationListView.map((paginateData, index) => (
              <li
                key={index + 1}
                onClick={() =>
                  typeof paginateData == "number" &&
                  setCurrentPage(paginateData)
                }
                className={
                  paginateData == currentPage
                    ? "activeListCssStyle"
                    : "listStyle"
                }
              >
                <a>{paginateData}</a>
              </li>
            ))}

            {paginationList.length !== currentPage && (
              <li
                onClick={() => setCurrentPage(currentPage + 1)}
                className="prevNextBtn"
              >
                <a>Next</a>
              </li>
            )}
          </ul>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default AllRooms;