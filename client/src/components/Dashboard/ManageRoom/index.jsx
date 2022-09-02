import { Button, Card, Col, Input, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import {  GET_ROOMS } from "../../../Api/ApiConstant";
import { getData } from "../../../Api/commonServices";
import AddHotelModal from "./AddRoomModal";
import loaderZif from '../../../assets/project-idea.gif';
const { Search } = Input;

const ManageRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [isRoomModalVisible, setIsRoomModalVisible] = useState(false);
  const [render, setRender] = useState(false);

  // GET_ALL_CITY_HOTELS
  const getPost = async () => {
    try {
      const { data } = await getData(GET_ROOMS, {
        lowestPrice: 0,
        heightPrice: 500
      });
      setRooms(data.rooms);
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

  console.log('rooms',rooms);
  return (
    <div>
      {/* MODAL  */}
      <AddHotelModal
        isRoomModalVisible={isRoomModalVisible}
        setIsRoomModalVisible={setIsRoomModalVisible}
        setRender={setRender}
      />
      <div
        className="d-flex justify-between align-center"
        style={{ marginBottom: "20px" }}
      >
        <Search
          placeholder="Search Room"
          onSearch={onSearch}
          style={{
            width: 500
          }}
        />

        <Button type="primary" onClick={() => setIsRoomModalVisible(true)}>
          + Add New Room
        </Button>
      </div>
      {rooms?.length < 1 && (
        <div style={{ width: "400px", margin: "auto" }}>
          <img src={loaderZif} alt="" />
        </div>
      )}
      <Row gutter={[14, 14]}>
        {rooms.reverse()?.map(({ title, photo, price },index) => (
          <Col
          key={index +1}
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
              <h4>{title}</h4>
              <p>Price: ${price}</p>
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

export default ManageRoom;
