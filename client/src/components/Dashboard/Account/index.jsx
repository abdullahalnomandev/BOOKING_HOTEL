import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Progress,
  Row
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GET_USER_PROFILE, UPDATE_PROFILE } from "../../../Api/ApiConstant";
import { getData, patchData } from "../../../Api/commonServices";
import useAuth from "./../../../hooks/useAuth";

const Account = () => {
  const { phone, name, photo, email, id, address } = useAuth();
  const [userProfile, setuserProfile] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(imageUrl);
  const getUserProfile = async () => {
    try {
      const { data } = await getData(GET_USER_PROFILE, {
        userId: id
      });
      setuserProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  console.log("userProfile", userProfile);
  const handleUpdateProfile = async (userData) => {
    console.log(userData);
    const { phone, name, address } = userData;

    try {
      const { data } = await patchData(UPDATE_PROFILE, {
        userId: id,
        name: name,
        address: address,
        phone: phone,
        photo: imageUrl || photo
      });
      if (data) {
        getUserProfile();
        window.localStorage.clear();
        const userProfileData = {
          token: userProfile.token,
          userInfo: {
            ...userProfile.profile,
            phone: userData.phone,
            name: userData.name,
            address: userData.address,
            photo: imageUrl || photo
          }
        };
        console.log(userData);
        localStorage.setItem("user", JSON.stringify(userProfileData));
        message.success(data.message, 5);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = (values) => {
    handleUpdateProfile(values);
  };

  const percent =
    (!userProfile?.profile?.phone && !userProfile?.profile?.address && 75) ||
    (userProfile?.profile?.phone && !userProfile?.profile?.address && 85) ||
    (!userProfile?.profile?.phone && userProfile?.profile?.address && 85) ||
    (userProfile?.profile?.phone && !userProfile?.profile?.address && 85) ||
    (userProfile?.profile?.phone && userProfile?.profile?.address && 100);

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
      <Row gutter={[18, 18]}>
        <Col xs={{ md: 24 }} md={{ span: 8 }}>
          <Card>
            <div className="d-flex justify-between align-center">
              <div>
                <h1>{userProfile?.profile?.name}</h1>
                <p> {userProfile?.profile?.email || email}</p>
                {userProfile?.profile?.phone && (
                  <p>Mobile:{userProfile?.profile?.phone && phone}</p>
                )}
              </div>
              <img
                src={imageUrl || photo}
                alt=""
                style={{
                  height: "100px",
                  width: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #2395ff"
                }}
              />
            </div>
            <h4 style={{ marginTop: "10px", marginBottom: "-5px" }}>
              Profile Completeness: {percent}%
            </h4>
            <Progress percent={percent} status="active" />
            <Divider />
            {loading && <p style={{ color: "red" }}>Uploading....</p>}

            <label for="myfile">
              <h3 style={{ color: "#2395ff", cursor: "pointer" }}>
                Upload Picture
              </h3>
            </label>
            <input
              onChange={handleImageUpload}
              style={{ height: "0px", width: "0px" }}
              type="file"
              id="myfile"
              name="myfile"
            ></input>
          </Card>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 16 }}>
          <Card>
            <h3>
              Profile:{" "}
              <span style={{ color: "gray" }}>
                The information can be edited
              </span>
            </h3>
            <Divider />
            <Form
              initialValues={{
                name: name,
                email: email,
                phone: phone,
                address: address
              }}
              onFinish={onFinish}
              layout="vertical"
              style={{ width: "100%" }}
            >
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="E-mail" name="email">
                <Input disabled />
              </Form.Item>
              <Form.Item name="phone" label="Phone Number">
                <Input addonBefore="+88" placeholder="Phone Number" />
              </Form.Item>
              <Form.Item label="Home Address" name="address">
                <Input.TextArea placeholder="ex: House 123,Mirpur-1, Dhaka 1216" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Profile
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Account;
