import { Button, Card, Col, Input, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { GET_ALL_CITY_HOTELS } from "../../../Api/ApiConstant";
import { getData } from "../../../Api/commonServices";
import { BiSearch } from "react-icons/bi";
import AddHotelModal from "./AddHotelModal";
const { Search } = Input;

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [isAddHotelModalVisible, setIsAddHotelModalVisible] = useState(false);
  const [render, setRender] = useState(false)

  // GET_ALL_CITY_HOTELS
   const getPost = async () => {
     try {
       const { data } = await getData(GET_ALL_CITY_HOTELS, {});
       setHotels(data.hotels.allHotels);
     } catch (err) {
       console.log(err);
     }
   };
  useEffect(() => {
    getPost();
  }, []);

    useEffect(() => {
      getPost();
    }, [render]);
  const onSearch = (value) => console.log(value);
  

  return (
    <div>
      {/* MODAL  */}
      <AddHotelModal
        isAddHotelModalVisible={isAddHotelModalVisible}
        setIsAddHotelModalVisible={setIsAddHotelModalVisible}
        setRender={setRender}
      />
      <div
        className="d-flex justify-between align-center"
        style={{ marginBottom: "20px" }}
      >
        <Search
          placeholder="Search Hotel"
          onSearch={onSearch}
          style={{
            width: 500
          }}
        />

        <Button type="primary" onClick={() => setIsAddHotelModalVisible(true)}>
          + Add Hotel
        </Button>
      </div>
      <Row gutter={[14, 14]}>
        {hotels.reverse().map(({ name, photo, city, address, email }) => (
          <Col
            md={{ span: 8 }}
            lg={{ span: 6 }}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
          >
            <Card>
              <img
                style={{ width: "100%", height: "130px", objectFit: "cover" }}
                src={photo}
                alt=""
              />
              <h4>{name}</h4>
              <p>City: {city.toUpperCase()}</p>
              <p>{address}</p>
              {email}
              <Space>
                <button className="btn-primary-full">Delete</button>
                <button className="btn-secondary">Update</button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ManageHotels;