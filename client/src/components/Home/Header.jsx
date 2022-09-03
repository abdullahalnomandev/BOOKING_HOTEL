import React from "react";
import { Carousel, Col, DatePicker, Form, Row, Select } from "antd";
import "./Header.css";
import NavBar from "../common/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
const { Option } = Select;

const Header = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { booking, setBooking } = useBookingContext();

  const onFinish = (values) => {
    console.log("Success:", values);
    const cityInfo = {
      name: values.city
    };
    setBooking(values);
    navigate("/hoteles", { state: cityInfo });
  };

  return (
    <div className="booking">
      <div className="booking-container" style={{ margin: "0 5%" }}>
        <div className="top-header">
          <NavBar />
        </div>
      </div>
      {/* SMALL DEVICE  */}
      <Form
        className="small-form"
        initialValues={{
          adult: booking.adult,
          room: booking.room,
          child: booking.child
        }}
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <div
          className="book-form-small"
          style={{
            zIndex: 100,
            position: "absolute",
            margin: "0% 5%",
            width: "90%"
          }}
        >
          <div className="title" style={{ margin: "-15px 0" }}>
            <h5>BOOK YOUR </h5>
            <h2>ROOMS</h2>
          </div>
          <div className="book-forms">
            <Form.Item
              style={{ width: "100%", maxHeight: "100%" }}
              name="city"
              rules={[
                {
                  required: true,
                  message: "Select your city!"
                }
              ]}
            >
              <Select
                showSearch
                placeholder="Search city"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="dhaka">Dhaka</Option>
                <Option value="chittagong">Chittagong</Option>
                <Option value="rajshahi">Rajshahi</Option>
                <Option value="khulna">Khulna</Option>
                <Option value="sylhet">Sylhet</Option>
                <Option value="rangpur">Rangpur</Option>
                <Option value="mymensingh">Mymensingh</Option>
                <Option value="barisal">Barisal</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="arrival"
              rules={[
                {
                  required: true,
                  message: "Please input a hotel name!"
                }
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                size="large"
                placeholder="ARRIVAL"
              />
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
              <DatePicker
                style={{ width: "100%" }}
                size="large"
                placeholder="DEPARTURE"
              />
            </Form.Item>
            <Form.Item style={{ width: "100%", maxHeight: "100%" }} name="room">
              <Select>
                <Option value="1room">1 ROOM</Option>
                <Option value="2room">2 ROOM</Option>
                <Option value="3room">3 ROOM</Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ width: "100%", maxHeight: "100%" }}
              name="adult"
            >
              <Select>
                <Option value="1adult">1 ADULT</Option>
                <Option value="2adult">2 ADULT</Option>
                <Option value="3adult">3 ADULT</Option>
              </Select>
            </Form.Item>

            <Form.Item
              style={{ width: "100%", maxHeight: "100%" }}
              name="child"
            >
              <Select>
                <Option value="0child">0 CHILD</Option>
                <Option value="1child">1 CHILD</Option>
                <Option value="2child">2 CHILD</Option>
              </Select>
            </Form.Item>
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
      </Form>

      <Form
        className="large-form"
        initialValues={{
          adult: booking.adult,
          room: booking.room,
          child: booking.child
        }}
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <div
          className="book-form"
          style={{
            zIndex: 100,
            position: "absolute",
            margin: "0 5%",
            width: "90%",
            padding: "10px"
          }}
        >
          <div className="title">
            <h5>BOOK YOUR </h5>
            <h2>ROOMS</h2>
          </div>
          <div className="book-forms">
            <div style={{ display: "flex", gap: "10px" }}>
              <Form.Item
                style={{ width: "20%", marginTop: "1%", maxHeight: "100%" }}
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Select your city!"
                  }
                ]}
              >
                <Select
                  showSearch
                  placeholder="Search city"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  <Option value="dhaka">Dhaka</Option>
                  <Option value="chittagong">Chittagong</Option>
                  <Option value="rajshahi">Rajshahi</Option>
                  <Option value="khulna">Khulna</Option>
                  <Option value="sylhet">Sylhet</Option>
                  <Option value="rangpur">Rangpur</Option>
                  <Option value="mymensingh">Mymensingh</Option>
                  <Option value="barisal">Barisal</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="arrival"
                rules={[
                  {
                    required: true,
                    message: "Please input a hotel name!"
                  }
                ]}
              >
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
                name="room"
              >
                <Select>
                  <Option value="1room">1 ROOM</Option>
                  <Option value="2room">2 ROOM</Option>
                  <Option value="3room">3 ROOM</Option>
                </Select>
              </Form.Item>

              <Form.Item
                style={{ width: "20%", marginTop: "1%", maxHeight: "100%" }}
                name="adult"
              >
                <Select>
                  <Option value="1adult">1 ADULT</Option>
                  <Option value="2adult">2 ADULT</Option>
                  <Option value="3adult">3 ADULT</Option>
                </Select>
              </Form.Item>

              <Form.Item
                style={{ width: "20%", marginTop: "1%", maxHeight: "100%" }}
                name="child"
              >
                <Select>
                  <Option value="0child">0 CHILD</Option>
                  <Option value="1child">1 CHILD</Option>
                  <Option value="2child">2 CHILD</Option>
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
      </Form>

      <div className="carousel" style={{ zIndex: 5, position: "relative" }}>
        <Carousel autoplay>
          <div className="carousel-content">
            <Row>
              <Col span={18} style={{ marginTop: "10%" }}>
                <h1>
                  BOOK YOUR SUMMER HOLIDAYS <br /> WITH HOTEL BOOKING TEMPLATE
                </h1>
                {/* <div className="carousel-button">
                  <button>EXPLORE IT</button>
                </div> */}
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
                {/* <div className="carousel-button">
                  <button>EXPLORE IT</button>
                </div> */}
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
