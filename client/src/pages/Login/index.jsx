import React from "react";
import { Form, Input, Button, Typography,message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/userApi";
const { Title, Text } = Typography;

function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await loginUser(values);
      

      if (response.success) {
        message.success(response.message);
        console.log(response.message);
        localStorage.setItem("token", response.data);
        navigate("/");
       }else{
       message.error(response.error);
       }
    } catch (err) {
      console.log( err);
    }
  };

  return (
    <main
      className="text-center"
      style={{ maxWidth: 400, margin: "0 auto", padding: "40px 20px" }}
    >
      {/* Logo & tagline */}
      <Title level={2}>KaamConnect</Title>
      <Text type="secondary">
        Connecting people with trusted local services.
      </Text>

      {/* Login Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: 30 }}
      >
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log In
          </Button>
        </Form.Item>

        <Text>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Text>
      </Form>
    </main>
  );
}

export default Login;
