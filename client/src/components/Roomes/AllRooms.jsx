import { Button, Card, Col, DatePicker, Form, Image, Input, InputNumber, PageHeader, Row, Select, Slider } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Link,  useLocation } from 'react-router-dom';
import NavBar from '../common/NavBar';
import Header from '../Home/Header';
import Item from 'antd/lib/list/Item';
import './allRooms.css'
import { Pagination } from "easy-pagination-1"; 
import Footer from '../common/Footer/Footer';
import axios from 'axios';
import useFetch from './../../hooks/useFetch';
import { GET_ROOMS, GET_ROOMS_BY_ID } from '../../Api/ApiConstant';
import { getData } from '../../Api/commonServices';
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
const AllRooms = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const showPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const [inputRange, setInputRange] = useState(100);
  const [rooms, setRooms] = useState([]);

  const { state:hotelID } = useLocation();

  // // GET_ROOMS_BY_ID
  // useEffect(() => {
  //   const getPost = async () => {
  //     const filterData = {
  //       hotelId: hotelID,
  //       lowestPrice: inputRange,
  //       heightPrice: 500
  //     };
  //     try {
  //       const { data } = await getData(GET_ROOMS_BY_ID, filterData);
  //       setRooms(data.rooms);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getPost();
  // }, [hotelID,inputRange]);

  // GET_ROOMS
  useEffect(() => {
    const getPost = async () => {
      const filterData = {
        lowestPrice: inputRange,
        heightPrice: 500
      };
      try {
        const { data } = await getData(GET_ROOMS, filterData);
        setRooms(data.rooms);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [inputRange]);

  const { paginationList, paginationListView } = Pagination(
    rooms,
    currentPage,
    showPerPage
  );

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
        <Form onFinish={onFinish} layout="vertical">
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
                  <Select
                    labelInValue
                    defaultValue={{
                      value: "1room",
                      label: "1ROOM"
                    }}
                  >
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
                  <Select
                    labelInValue
                    defaultValue={{
                      value: "1adult",
                      label: "1ADULT"
                    }}
                  >
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
                  <Select
                    labelInValue
                    defaultValue={{
                      value: "1child",
                      label: "1CHILD"
                    }}
                  >
                    <Option value="1adult">1 CHILD</Option>
                    <Option value="2adult">2 CHILD</Option>
                    <Option value="3adult">3 CHILD</Option>
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
          <Row gutter={[14, 14]}>
            {rooms?.map(({ _id, photo, title, price }) => (
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
                      <Link to={`/room/${_id}`}>
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