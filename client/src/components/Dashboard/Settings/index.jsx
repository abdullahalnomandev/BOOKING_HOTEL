import { Button, Card, Form, Input, message, Typography } from "antd";
import { UPDATE_PASSWORD } from "../../../Api/ApiConstant";
import { patchData } from "../../../Api/commonServices";
import useAuth from "../../../hooks/useAuth";

const { Title } = Typography;

const Settings = () => {
  const { id } = useAuth();

  const handleSubmitNewPassword = async (info) => {
    try {
      const res = await patchData(UPDATE_PASSWORD, info);
      if (res) {
        message.success("✅ Password updated successfully", 4);
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  const onFinish = (values) => {
    const { oldPassword, password, passwordConfirm } = values;
    handleSubmitNewPassword({
      userId: id,
      oldPassword,
      password,
      passwordConfirm,
    });
  };

  const formItemStyle = {
    marginBottom: 24,
  };

  const inputStyle = {
    height: 42,
    padding: "8px 12px",
    fontSize: 16,
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <Title level={2} style={{ marginBottom: 0 }}>
          Account <span style={{ color: "#fe5d5d" }}>Settings</span>
        </Title>
      </div>

      {/* Form Card */}
      <Card
        bordered={false}
        style={{ boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)" }}>
        <Form
          layout='vertical'
          onFinish={onFinish}
          requiredMark={false}
          style={{ marginTop: 16 }}>
          <Form.Item
            name='oldPassword'
            label='Current Password'
            rules={[
              { required: true, message: "Please enter your old password" },
            ]}
            style={formItemStyle}>
            <Input.Password
              placeholder='Enter old password'
              style={inputStyle}
              size='middle'
            />
          </Form.Item>

          <Form.Item
            name='password'
            label='New Password'
            rules={[{ required: true, message: "Please enter a new password" }]}
            hasFeedback
            style={formItemStyle}>
            <Input.Password
              placeholder='Enter new password'
              style={inputStyle}
              size='middle'
            />
          </Form.Item>

          <Form.Item
            name='passwordConfirm'
            label='Confirm New Password'
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
            style={formItemStyle}>
            <Input.Password
              placeholder='Confirm new password'
              style={inputStyle}
              size='middle'
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 32 }}>
            <Button type='primary' htmlType='submit' block size='large'>
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Settings;
