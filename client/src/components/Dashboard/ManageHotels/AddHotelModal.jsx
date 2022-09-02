import { Button, Form, Input, message, Modal, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { FiCamera } from "react-icons/fi";
import { ADD_NEW_HOTEL } from "../../../Api/ApiConstant";
import { postData } from "../../../Api/commonServices";

const { Option } = Select;
const AddHotelModal = ({
  isAddHotelModalVisible,
  setIsAddHotelModalVisible,
  setRender
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const addNewHotel = async (newHotel) => {
    console.log("newData", newHotel);

    try {
      const { data } = await postData(ADD_NEW_HOTEL, newHotel);
      console.log(data);
      if (data) {
        message.success(`New Hotel added successful...`, 5);
      }
      setIsAddHotelModalVisible();
      setRender(true);
    } catch (errors) {
      message.error(errors?.response?.data?.message);
      console.log(errors);
    }
  };
  const onFinish = (values) => {
    const newHotel = {
      name: values.name,
      type: "hotel",
      photo: imageUrl,
      city: values.city,
      address: values.address,
      title: values.title,
      desc: values.desc
    };
    addNewHotel(newHotel);
  };

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
  return (
    <div>
      <Modal
        title="Add Hotel"
        visible={isAddHotelModalVisible}
        onCancel={() => setIsAddHotelModalVisible(false)}
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
          {loading && <p style={{ color: "red" }}>Uploading....</p>}

          <Form.Item
            name="name"
            label="Hotel Name"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: "50%", marginTop: "1%", maxHeight: "100%" }}
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
            name="address"
            label="Address "
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title "
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="desc"
            label="Description"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input.TextArea />
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

export default AddHotelModal;
