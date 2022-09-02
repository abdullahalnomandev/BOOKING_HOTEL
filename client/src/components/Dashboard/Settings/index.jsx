import { Button, Card, Divider, Form, Input, InputNumber, message } from "antd";
import React from "react";
import { UPDATE_PASSWORD } from "../../../Api/ApiConstant";
import { patchData } from "../../../Api/commonServices";
import useAuth from "../../../hooks/useAuth";
import "./index.css";
const Settings = () => {
  const { id } = useAuth();

  const handleSubmitNewPassword = async (info) => {
    try {
      const res = await patchData(UPDATE_PASSWORD, info);
      console.log(res);
      if (res) {
        message.success(`Password updated successfully...`, 5);
      }
      console.log(res);
    } catch (errors) {
      console.log(errors);
      message.error(errors?.response?.data?.message);
    }
  };

  const onFinish = (values) => {
    const { oldPassword, password, passwordConfirm } = values;

    const updatePasswordInfo = {
      oldPassword,
      password,
      passwordConfirm,
      userId: id
    };

    handleSubmitNewPassword(updatePasswordInfo);
  };

  return (
    <div>
      <h1>SETTINGS</h1>
      <Card>
        <h3>
          Profile:{" "}
          <span style={{ color: "gray" }}>The information can be edited</span>
        </h3>
        <Divider />
        <Form
          initialValues={{}}
          onFinish={onFinish}
          layout="vertical"
          className="update_password"
        >
          <Form.Item
            name="oldPassword"
            label="Old password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
          >
            <Input.Password style={{ padding: "7px 10px", margin: "0" }} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Create new password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
            hasFeedback
          >
            <Input.Password style={{ padding: "0px 10px", margin: "0" }} />
          </Form.Item>

          <Form.Item
            name="passwordConfirm"
            label="Confirm new password"
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
                    new Error("Please confirm your password!")
                  );
                }
              })
            ]}
          >
            <Input.Password style={{ padding: "0px 10px", margin: "0" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Settings;
