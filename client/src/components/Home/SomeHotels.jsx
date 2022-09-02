import { Card, Col, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_HOTELS } from "../../Api/ApiConstant";
import { getData } from "../../Api/commonServices";
import  gofLoader  from "../../assets/project-idea.gif";
const { Option } = Select;
const SomeHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [citys, setCitys] = useState("dhaka");

  // GET_ROOMS
  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await getData(GET_HOTELS, {
          city: citys
        });
        setHotels(data.hotels.allHotels);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [citys]);

  const navigate = useNavigate();
  const handleClickRooms = (id) => {
    navigate("/rooms", { state: id });
  };

  const handleCHange = (value) => {
    setCitys(value);
  };

  return (
    <div>
      <div>
        <div className="head-content">
          <h1>
            {" "}
            SOME TOP <span style={{ color: "#fe5d5d" }}>HOTELS</span>
          </h1>
          <img
            src="https://premiumlayers.com/html/hotelbooking/img/nice-title.png"
            alt=""
          />
        </div>
        <div
          className="filter"
          style={{
            textAlign: "center",
            paddingBottom: "15px",
            marginTop: "-15px",
            color: "black",
            border: "1px solid #7f8082",
            width: "100px",
            borderBottom: "none",
            height: "33px",
            margin: "auto"
          }}
        >
          <Select
            showSearch
            placeholder="Search city"
            optionFilterProp="children"
            onChange={handleCHange}
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            defaultValue="FILTER"
            style={{ border: "none", width: "100px", cursor: "pointer" }}
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
        </div>

        <div className="rooms" style={{ padding: " 0 5%" }}>
          <Row gutter={[14, 14]}>
            {hotels.length < 1 && (
              <div style={{ width: "400px", margin: "auto" }}>
                <img src={gofLoader} alt="" style={{maxWidth:"100%"}}/>
              </div>
            )}
            {hotels.slice(0, 4)?.map(({ _id, name, photo, city }) => (
              <Col
                key={_id}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                lg={{ span: 6 }}
                md={{ span: 8 }}
              >
                <Card>
                  <img
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover"
                    }}
                    src={photo}
                    alt=""
                  />
                  <div className="car-hotel-footer d-flex align-center justify-between">
                    <div>
                      <h3>
                        {name.slice(0, 14)} {name.length > 14 ? "..." : ""}
                      </h3>
                      <h4>
                        city: <span className="shift">{city}</span>
                      </h4>
                    </div>
                    <div>
                      <button
                        className="btn-secondary"
                        onClick={() => handleClickRooms(_id)}
                      >
                        See Rooms
                      </button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default SomeHotels;
