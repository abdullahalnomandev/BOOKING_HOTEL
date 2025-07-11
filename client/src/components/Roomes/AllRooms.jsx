import { Card, Col, Form, Rate, Row, Select, Skeleton, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GET_ROOMS_BY_Hotel_ID } from "../../Api/ApiConstant";
import { getData } from "../../Api/commonServices";
import { useBookingContext } from "../../context/BookingContext";
import Footer from "../common/Footer/Footer";
import NavBar from "../common/NavBar/NavBar";
import "./allRooms.css";
const { Option } = Select;

const AllRooms = () => {
  const { booking, setBooking } = useBookingContext();
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleChange = (value, key) => {
    console.log(booking);
    if (key === "room") {
      setBooking({ ...booking, room: value });
    }
    if (key === "adult") {
      setBooking({ ...booking, adult: value });
    }
    if (key === "child") {
      setBooking({ ...booking, child: value });
    }
  };

  const [inputRange, setInputRange] = useState(100);
  const [rooms, setRooms] = useState([]);
  const { state: hotelID } = useLocation();
  const [totalPage, setTotalPage] = useState(null);
  const paginationLimit = 4;
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(1);
  console.log("active", active);
  // GET_ROOMS_BY_ID
  useEffect(() => {
    const getPost = async () => {
      const filterData = {
        hotelId: hotelID,
        lowestPrice: inputRange,
        heightPrice: 500,
        page: page,
        limit: paginationLimit,
      };
      try {
        const { data } = await getData(GET_ROOMS_BY_Hotel_ID, filterData);
        setTotalPage(data.result);
        setRooms(data?.rooms);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [hotelID, inputRange, page]);

  // PAGINATION
  const navigate = useNavigate();

  const paginationCount = Math.ceil(totalPage / paginationLimit);
  return (
    <>
      <div style={{ background: "white", padding: "0 5%" }}>
        <NavBar />
      </div>
      <div style={{ padding: "0 5%" }}>
        <div className='head-content'>
          <h1>OTHER DECENT ROOM</h1>
          <img
            src='https://premiumlayers.com/html/hotelbooking/img/nice-title.png'
            alt=''
          />
        </div>
        <Form
          initialValues={{
            adult: booking.adult,
            room: booking.room,
            child: booking.child,
          }}
          onFinish={onFinish}
          layout='vertical'>
          <div className='book-form' style={{ padding: "10px" }}>
            <div className='title'>
              <h5>BOOK YOUR </h5>
              <h2>ROOMS</h2>
            </div>
            <div className='book-forms'>
              <div style={{ display: "flex", gap: "10px", maxWidth: "670px" }}>
                <Form.Item
                  style={{
                    width: "100%",
                    marginTop: "1%",
                    maxHeight: "100%",
                  }}
                  name='room'>
                  <Select onChange={(e) => handleChange(e, "room")}>
                    <Option value='1room'>1 ROOM</Option>
                    <Option value='2room'>2 ROOM</Option>
                    <Option value='3room'>3 ROOM</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  style={{
                    width: "100%",
                    marginTop: "1%",
                    maxHeight: "100%",
                  }}
                  name='adult'
                  className='adult-btn'>
                  <Select onChange={(e) => handleChange(e, "adult")}>
                    <Option value='1adult'>1 ADULT</Option>
                    <Option value='2adult'>2 ADULT</Option>
                    <Option value='3adult'>3 ADULT</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  style={{
                    width: "100%",
                    marginTop: "1%",
                    maxHeight: "100%",
                  }}
                  name='child'
                  className='child-btn'>
                  <Select onChange={(e) => handleChange(e, "child")}>
                    <Option value='0child'>0 CHILD</Option>
                    <Option value='1child'>1 CHILD</Option>
                    <Option value='2child'>2 CHILD</Option>
                  </Select>
                </Form.Item>
                <div className='input-range'>
                  <p>PRICE: RANGE:</p>
                  <div className='range'>
                    <h5>${inputRange}</h5>
                    <input
                      value={inputRange}
                      onChange={(e) => setInputRange(e.target.value)}
                      type='range'
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
                className='btn-primary-full filter-btn'
                type='primary'
                htmlType='submit'
                style={{ fontSize: "20px", padding: "3px 27px" }}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Filter
              </button>
            </div>
          </div>
        </Form>
        <div className='rooms' style={{ margin: "3% 0" }}>
          {rooms.length < 1 && (
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
          <Row gutter={[20, 20]}>
            {rooms.map(
              ({
                _id,
                photos,
                maxPeople,
                photo,
                title,
                price,
                availableRooms,
              }) => (
                <Col key={_id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    onClick={() => navigate(`/room/${_id}/${hotelID}`)}
                    hoverable
                    style={{
                      borderRadius: 16,
                      overflow: "hidden",
                      boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
                      transition: "transform 0.3s ease",
                      maxHeight: 450,
                      display: "flex",
                      flexDirection: "column",
                    }}
                    bodyStyle={{
                      padding: 0,
                      flex: "1 1 auto",
                      display: "flex",
                      flexDirection: "column",
                    }}>
                    {/* IMAGE */}
                    <img
                      src={photo}
                      alt={title}
                      style={{
                        height: 180,
                        width: "100%",
                        objectFit: "cover",
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                      }}
                    />

                    {/* CARD CONTENT */}
                    <div
                      style={{
                        padding: 16,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        flex: 1,
                        overflow: "hidden",
                      }}>
                      {/* Header */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}>
                        <h3
                          style={{
                            margin: 0,
                            fontSize: 18,
                            fontWeight: 600,
                            color: "#1f1f1f",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "80%",
                          }}
                          title={title}>
                          {title}
                        </h3>
                      </div>

                      {/* Rating */}
                      <Rate
                        allowHalf
                        disabled
                        defaultValue={4.5}
                        style={{ fontSize: 14, color: "#faad14" }}
                      />

                      {/* Amenities tags */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 6,
                        }}>
                        {["Free Wi-Fi", "Breakfast", "AC"].map((tag) => (
                          <Tag key={tag} color='blue'>
                            {tag}
                          </Tag>
                        ))}
                      </div>

                      {/* Max people */}
                      <p style={{ margin: 0, fontSize: 13.5, color: "#666" }}>
                        <i
                          className='fas fa-users'
                          style={{ marginRight: 6 }}
                        />
                        <strong>{maxPeople}</strong> guests
                      </p>

                      {/* Price */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 8,
                          marginTop: "auto",
                        }}>
                        {price < 150 && (
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "#999",
                              fontSize: 13,
                            }}>
                            ৳{price + 40}
                          </span>
                        )}
                        <span
                          style={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: "#1677ff",
                          }}>
                          ৳{price}
                        </span>
                        <span style={{ fontSize: 13, color: "#888" }}>
                          / night
                        </span>
                      </div>

                      {/* Button */}
                      <Link to={`/room/${_id}/${hotelID}`} style={{ flex: 1 }}>
                        <button
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #1677ff",
                            borderRadius: 8,
                            background: "#fff",
                            color: "#1677ff",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all .25s",
                            marginTop: 10,
                          }}>
                          See Details
                        </button>
                      </Link>
                    </div>
                  </Card>
                </Col>
              )
            )}
          </Row>
        </div>

        {/* PAGINATION  */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}>
            <button
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                  setActive(page - 1);
                }
              }}
              style={{
                padding: "8px 16px",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                background: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "14px",
                color: "#666",
                hover: {
                  background: "#f5f5f5",
                },
              }}>
              &laquo; Previous
            </button>
            {new Array(paginationCount).fill("").map((item, index) => (
              <button
                key={index}
                style={{
                  padding: "8px 16px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "4px",
                  background: index + 1 === active ? "#1890ff" : "white",
                  color: index + 1 === active ? "white" : "#666",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  minWidth: "40px",
                }}
                onClick={() => {
                  setPage(index + 1);
                  setActive(index + 1);
                }}>
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => {
                if (page < paginationCount) {
                  setPage(page + 1);
                  setActive(page + 1);
                }
              }}
              style={{
                padding: "8px 16px",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                background: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "14px",
                color: "#666",
                hover: {
                  background: "#f5f5f5",
                },
              }}>
              Next &raquo;
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllRooms;
