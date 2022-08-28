import { Button, Card, Divider, Form, Input } from 'antd';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import './index.css';
const Settings = () => {
      const { name, photo, isAdmin, email } = useAuth();

      const onFinish = (values) => {
        console.log("Success:", values);
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
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!"
                }
              ]}
              hasFeedback
            >
              <Input.Password style={{ padding: "0 10px", margin: "0" }} />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
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
              <Input.Password style={{ padding: "7px 10px", margin: "0" }} />
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