import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/userApi";
import {toast} from 'react-hot-toast'
const { Title, Text } = Typography;
import { useDispatch } from "react-redux";
import { setRole } from "../../redux/roleSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await loginUser(values);
      if (response.success) {
        toast.success(response.message);
        console.log(response);
        localStorage.setItem("token", response.data);
        const role = response.role;
        dispatch(setRole(role));
        if (role === "consumer") navigate("/service");
        else if (role === "provider") navigate("/provider");
        else if (role === "admin") navigate("/admin");
        else navigate("/");
       }else{
       toast.error(response.message);
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
