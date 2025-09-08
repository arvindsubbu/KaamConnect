import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
  Upload,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { signUpUser } from "../../api/userApi";
import { toast } from "react-hot-toast";

const { Title, Text } = Typography;
const { Option } = Select;

function Signup() {
  //use redux to store the role
  const [role, setRole] = useState("consumer"); // consumer or provider
  const [form] = Form.useForm();

  const onFinish = async (values) => {
  console.log(values);
  
      try{
        const payload = {...values,role};
         const response = await signUpUser(payload);
      //  console.log(response);
        if(response.success){
          toast.success(response.message);
          form.resetFields();
        }else{
          toast.error(response.message);
          console.log(response.message);
        }
      }catch(err){
               console.log(err);
      }  
      
      
  };

  return (
    <main className="text-center" style={{ maxWidth: 450, margin: "0 auto" }}>
      <Title level={2}>KaamConnect</Title>
      <Text type="secondary">
        Connecting people with trusted local services.
      </Text>

      {/* Role Selection */}
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        style={{ marginTop: 20 }}
      >
        <Form.Item name='role'>
          <Radio.Group
            value={role}
            onChange={(e) => setRole(e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value="consumer">
              <i className="fa-solid fa-user"></i> I want to book services
            </Radio.Button>
            <Radio.Button value="provider">
              <i className="fa-solid fa-screwdriver-wrench"></i> I want to
              provide services
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        {/* Common Fields */}
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
            {
              pattern : /^\d{10}$/,
              message : 'Phone number must be exactly 10 digits'
            }
          ]}
        >
          <Input placeholder="Phone Number" type="number" />
        </Form.Item>

        <Form.Item name="email" rules={[{type : 'email',message : 'Enter a valid Email'}]}>
          <Input placeholder="Email (optional)"/>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password"},
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="location"
          rules={[{ required: true, message: "Please select your location" }]}
        >
          <Select placeholder="Location">
            <Option value="chennai">Chennai</Option>
            <Option value="bangalore">Bangalore</Option>
            <Option value="mumbai">Mumbai</Option>
          </Select>
        </Form.Item>

        {/* Extra Fields for Providers */}
        {role === "provider" && (
          <>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="serviceCategory"
                  rules={[
                    { required: true, message: "Please select a category" },
                  ]}
                >
                  <Select placeholder="Service Category">
                    <Option value="plumber">Plumber</Option>
                    <Option value="electrician">Electrician</Option>
                    <Option value="carpenter">Carpenter</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="experience"
                  rules={[
                    { required: true, message: "Enter experience in years" },
                  ]}
                >
                  <Input type="number" placeholder="Years of Experience" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="idProof" valuePropName="fileList">
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Upload ID</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="profilePic" valuePropName="fileList">
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Profile Picture</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </Form.Item>

        <Text>
          Already have an account? <Link to='/login'>Log In</Link>
        </Text>
      </Form>
    </main>
  );
}

export default Signup;
