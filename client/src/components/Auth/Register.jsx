import { Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../common/NavBar/NavBar";
import "./Register.css";
import axios from "axios";
import { FiCamera } from "react-icons/fi";
import { getData } from "../../Api/commonServices";
import { SIGN_IN_USER, SIGN_UP_USER } from "../../Api/ApiConstant";

const Register = () => {
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();
  const handleCloseModal = () => {
    navigate("/");
  };

  const signUpUser = async (userInfo) => {

    try {
      const { data } = await getData(
        isLogin ? SIGN_IN_USER : SIGN_UP_USER,
        userInfo
      );
      const userData = { token: data.token, userInfo: data.data.user };
      localStorage.setItem("user", JSON.stringify(userData));
      message.success(`${isLogin ? "Sign In " : "Sign up"} successful...`, 5);
      navigate(-1);
      navigate("");
    } catch (errors) {
      message.error(errors?.response?.data?.message);
    }
  };

  const onFinish = (values) => {
    const newUserData = {
      ...values,
      photo:
        imageUrl ||
        "https://banner2.cleanpng.com/20180329/zue/kisspng-computer-icons-user-profile-person-5abd85306ff7f7.0592226715223698404586.jpg"
    };
    signUpUser(newUserData);
  };

  // Upload Cover Room Image
  const handleImageUpload = async (e) => {
    setLoading(true);
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
    <div style={{ padding: "0 5%" }}>
      <NavBar />

      <Modal
        visible={isRegisterModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={400}
      >
        <div className="auth">
          <h1>{isLogin ? "Login Form " : "Sign Up Form"}</h1>

          <div className="login-and-sign-up">
            <button
              className={isLogin ? "btn-primary-full" : "btn-primary"}
              style={{ width: "50%", height: "50px" }}
              onClick={() => setIsLogin(!isLogin)}
            >
              Login{" "}
            </button>
            <button
              className={isLogin ? "btn-primary" : "btn-primary-full"}
              style={{ width: "50%", height: "50px" }}
              onClick={() => setIsLogin(!isLogin)}
            >
              Sign Up{" "}
            </button>
          </div>
          <Form onFinish={onFinish} layout="vertical">
            {!isLogin && (
              <div className="avatar-profile">
                <img
                  src={
                    imageUrl ||
                    "https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png"
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
            )}
            {loading && <p style={{ color: "red" }}>Uploading....</p>}
            {!isLogin && (
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "name is required!"
                  }
                ]}
              >
                <Input placeholder="Your Name" />
              </Form.Item>
            )}
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email"
                }
              ]}
            >
              <Input placeholder="Email Address" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "'password' is required!"
                }
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            {!isLogin && (
              <Form.Item
                name="passwordConfirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    }
                  })
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
            )}

            <Form.Item>
              <button
                style={{ width: "100%", marginTop: "3%" }}
                htmlType="submit"
                className="btn-primary-full"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </Form.Item>

            <p>
              {isLogin ? (
                <span>Not a member ? </span>
              ) : (
                <span>Already a member ? </span>
              )}
              {isLogin ? (
                <Link
                  className="sign-up-text"
                  onClick={() => setIsLogin(!isLogin)}
                  to="/auth/register"
                >
                  Sign Up now !
                </Link>
              ) : (
                <Link
                  className="sign-up-text"
                  onClick={() => setIsLogin(!isLogin)}
                  to="/auth/register"
                >
                  Log In !
                </Link>
              )}
            </p>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Register;
