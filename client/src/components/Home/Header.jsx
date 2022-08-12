import React, { useState } from "react";
import {
  Button,
  Carousel,
  Col,
  DatePicker,
  Descriptions,
  Dropdown,
  Form,
  Image,
  Input,
  Menu,
  PageHeader,
  Row,
  Select,
  Space,
  Typography
} from "antd";
import "./Header.css";
import slider1 from "../../assets/slider-one.jpg";
import { BiHotel } from "react-icons/bi";
import { IoIosWoman } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import NavBar from "../common/NavBar";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Header = () => {
  const [memberAndHotelCount, setMemberAndHotelCount] = useState({
    adult: 2,
    children: 0,
    room: 1
  });
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/rooms");
  };

  const handleIncrease = (type) => {
    console.log(type);
    if (type === "adult") {
      setMemberAndHotelCount({
        ...memberAndHotelCount,
        adult: memberAndHotelCount.adult + 1
      });
    }
    if (type === "children") {
      setMemberAndHotelCount({
        ...memberAndHotelCount,
        children: memberAndHotelCount.children + 1
      });
    }
    if (type === "room") {
      setMemberAndHotelCount({
        ...memberAndHotelCount,
        room: memberAndHotelCount.room + 1
      });
    }
  };
  const handleDecrease = (type) => {
    if (memberAndHotelCount.adult > 1) {
      if (type === "adult") {
        setMemberAndHotelCount({
          ...memberAndHotelCount,
          adult: memberAndHotelCount.adult - 1
        });
      }
    }
    if (memberAndHotelCount.room > 1) {
      if (type === "room") {
        setMemberAndHotelCount({
          ...memberAndHotelCount,
          room: memberAndHotelCount.room - 1
        });
      }
    }
    if (memberAndHotelCount.children > 0) {
      if (type === "children") {
        setMemberAndHotelCount({
          ...memberAndHotelCount,
          children: memberAndHotelCount.children - 1
        });
      }
    }
  };


  return (
    <div className="booking">
      <div className="booking-container" style={{ margin: "0 5%" }}>
        <div className="top-header">
          <NavBar />
        </div>
      </div>

      <Form onFinish={onFinish} layout="vertical">
        <div
          className="book-form"
          style={{
            zIndex: 100,
            position: "absolute",
            margin: "0 5%",
            width: "90%"
          }}
        >
          <div className="title">
            <h5>BOOK YOUR </h5>
            <h2>ROOMS</h2>
          </div>

          <Form.Item
            name="city"
            rules={[
              {
                required: true,
                message: "Please input a hotel name!"
              }
            ]}
          >
            <Input size="large" placeholder="Search hotel" />
          </Form.Item>
          <Form.Item name="arrival">
            <DatePicker size="large" placeholder="ARRIVAL" />
          </Form.Item>

    

          <Form.Item
            style={{ width: "20%", marginTop: "1%", maxHeight: "100%" }}
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
            style={{ width: "20%", marginTop: "1%", maxHeight: "100%" }}
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
          <div>
            {" "}
            <button
              className="animated-button1 "
              type="primary"
              htmlType="submit"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Search
            </button>
          </div>
        </div>
      </Form>
      {/* <Form onFinish={onFinish} layout="vertical">
        <div
          className="book-form"
          style={{
            zIndex: 100,
            position: "absolute",
            margin: "0 5%",
            width: "90%"
          }}
        >
          <div className="title">
            <h5>BOOK YOUR </h5>
            <h2>ROOMS</h2>
          </div>
          <div className="book-forms">
            <div style={{ display: "flex", gap: "10px" }}>
              <Form.Item
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Please input a hotel name!"
                  }
                ]}
              >
                <Input size="large" placeholder="Search hotel" />
              </Form.Item>
              <Form.Item
                name="arrival"  >
                <DatePicker size="large" placeholder="ARRIVAL" />
              </Form.Item>
              <Form.Item
                name="departure"
                rules={[
                  {
                    required: true,
                    message: "Please input a hotel name!"
                  }
                ]}
              >
                <DatePicker size="large" placeholder="DEPARTURE" />
              </Form.Item>
              <Form.Item
                style={{ width: "20%", marginTop: "1%", maxHeight: "100%" }}
                name="room"  >
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
                style={{ width: "20%", marginTop: "1%", maxHeight: "100%" }}
                name="adult"   >
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
                style={{ width: "20%", marginTop: "1%", maxHeight: "100%" }}
                name="child" >
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
            </div>
          </div>
          <div>
            {" "}
            <button
              className="animated-button1 "
              type="primary"
              htmlType="submit"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Search
            </button>
          </div>
        </div>
      </Form> */}

      <div className="carousel" style={{ zIndex: 5, position: "relative" }}>
        <Carousel autoplay>
          <div className="carousel-content">
            <Row>
              <Col span={18} style={{ marginTop: "10%" }}>
                <h1>
                  BOOK YOUR SUMMER HOLIDAYS <br /> WITH HOTEL BOOKING TEMPLATE
                </h1>
                <div className="carousel-button">
                  <button>EXPLORE IT</button>
                </div>
              </Col>
              <Col span={6}>
                <div className="image-logo">
                  <img
                    src="https://premiumlayers.com/html/hotelbooking/img/special-offer-main.png"
                    alt=""
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="carousel-content">
            <Row>
              <Col span={18} style={{ marginTop: "10%" }}>
                <h1>
                  A BRAND NEW HOTEL <br /> BEYOND ORDINARY
                </h1>
                <div className="carousel-button">
                  <button>EXPLORE IT</button>
                </div>
              </Col>
              <Col span={6}>
                <div className="image-logo">
                  <img
                    src="https://premiumlayers.com/html/hotelbooking/img/special-offer-main.png"
                    alt=""
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Header;
