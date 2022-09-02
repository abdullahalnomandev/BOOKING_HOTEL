import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";
import {
  ADD_NEW_ROOM,
  GET_HOTELS
} from "../../../Api/ApiConstant";
import { getData, postData } from "../../../Api/commonServices";
import { Row } from "antd";

const { Option } = Select;
const AddRoomHotelModal = ({
  isRoomModalVisible,
  setIsRoomModalVisible,
  setRender
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState(null);
  const [hotelSelectId, setHotelSelectId] = useState(null);
  const [allRoomImage, setAllRoomImage] = useState([ ]);
  const [rooms, setRooms] = useState([]);

  console.log("city", city, hotels);
  const addNewRoom = async (newHotel) => {
    console.log("newData", newHotel);

    try {
      const { data } = await postData(ADD_NEW_ROOM, newHotel);
      console.log(data);
      if (data) {
        message.success(`New Room added successful...`, 5);
      }
      setIsRoomModalVisible();
      setRender(true);
    } catch (errors) {
      message.error(errors?.response?.data?.message);
      console.log(errors);
    }
  };

  // HOTEL

  // GET_ROOMS
  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await getData(GET_HOTELS, {
          city: city
        });
        setHotels(data.hotels.allHotels);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [city]);
  console.log("hotelId", hotelSelectId);
  // GET_CITY
  const handleCHangeCIty = (value) => {
    setCity(value);
  };

  const handleCHangeHotelName = (value) => {
    setHotelSelectId(value);
  };

  const onFinish = (values) => {
    console.log(values);
    const newRoom = {
      hotelId: hotelSelectId,
      title: values.title,
      maxPeople: values.maxPeople,
      price: values.price,
      photo: imageUrl,
      photos: allRoomImage,
      roomNumbers: rooms
    }
    addNewRoom(newRoom);
  };

  //ALL Image Upload
    const handleAllImageUpload = async (e) => {
      setLoading(true);
      console.log(e.target.files[0]);
      const imageFile = e.target.files[0];
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "booking_hotel");

      try {
        const result = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`,
          data
        );
        setAllRoomImage([...allRoomImage, result.data.secure_url]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    // Upload Cover Room Image
  const handleImageUpload = async (e) => {
    setLoading(true);
    console.log(e.target.files[0]);
    const imageFile = e.target.files[0];
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "booking_hotel");

    try {
      const result = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`,
        data
      );
      setImageUrl(result.data.secure_url);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
console.log('ROOMS',rooms);
  const handleChangeRoom = (value) => {
    value.map((room)=> 
        setRooms([...rooms, { number: room, unavailableDates: []}])

    )
  };

  return (
    <div>
      <Modal
        title="Add Room"
        visible={isRoomModalVisible}
        onCancel={() => setIsRoomModalVisible(false)}
        footer={null}
      >
        <Form onFinish={onFinish} layout="vertical">
          <div className="avatar-profile">
            <img
              src={
                imageUrl ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoHwEKgp5KrMKgSKdnyn_3T0-kCjrv-ls0zA&usqp=CAU"
              }
              style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              alt=""
            />
            <input
              type="file"
              id="img"
              name="fav_language"
              onChange={handleImageUpload}
            />
            <div className="svg-avatar">
              <label for="img">
                <FiCamera style={{ fontSize: "40px", cursor: "pointer" }} />
              </label>
            </div>
          </div>
          <Row>
            {allRoomImage.map((image) => (
              <Col span={4} key={image}>
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={image}
                  alt=""
                />
              </Col>
            ))}
          </Row>
          {loading && <p style={{ color: "red" }}>Uploading....</p>}

          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                style={{ width: "50%", marginTop: "1%", maxHeight: "100%" }}
                name="maxPeople"
                rules={[
                  {
                    required: true,
                    message: "Select Max People!"
                  }
                ]}
              >
                <Select
                  placeholder="Select MaxPeople"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                  <Option value={4}>4</Option>
                  <Option value={6}>5</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price "
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Enter Room Price"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            style={{ width: "100%", marginTop: "1%", maxHeight: "100%" }}
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
              placeholder="Search City"
              optionFilterProp="children"
              onChange={handleCHangeCIty}
              filterOption={(input, option) => option.children.includes(input)}
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
            style={{ width: "100%", marginTop: "1%", maxHeight: "100%" }}
            name="hotelName"
            rules={[
              {
                required: true,
                message: "Select Max People!"
              }
            ]}
          >
            <Select
              placeholder="Select Hotel"
              showSearch
              onChange={handleCHangeHotelName}
            >
              {hotels?.map(({ name, _id }) => (
                <Option style={{ width: "100%" }} value={_id} key={_id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            style={{ width: "100%", marginTop: "1%", maxHeight: "100%" }}
            name="RoomNumber"
            rules={[
              {
                required: true,
                message: "Select Room Numbers!"
              }
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%"
              }}
              onChange={handleChangeRoom}
              tokenSeparators={[","]}
            >
              <Option value={101}>101</Option>
              <Option value={102}>102</Option>
              <Option value={103}>103</Option>
              <Option value={104}>104</Option>
              <Option value={201}>201</Option>
              <Option value={202}>202</Option>
              <Option value={203}>203</Option>
              <Option value={204}>204</Option>
              <Option value={301}>301</Option>
              <Option value={302}>302</Option>
              <Option value={303}>303</Option>
              <Option value={304}>304</Option>
              <Option value={401}>401</Option>
              <Option value={402}>402</Option>
              <Option value={403}>403</Option>
              <Option value={404}>404</Option>
              <Option value={501}>501</Option>
              <Option value={502}>502</Option>
              <Option value={503}>503</Option>
              <Option value={504}>504</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Upload Rooms">
            <input
              type="file"
              style={{ width: "100%", height: "100%" }}
              id="img"
              name="fav_language"
              onChange={handleAllImageUpload}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddRoomHotelModal;
