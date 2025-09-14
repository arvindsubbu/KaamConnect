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
import { serviceCategories } from "../../utils/serviceCategories";
import debounce from 'lodash.debounce';

const { Title, Text } = Typography;
const { Option } = Select;

function Signup() {
  //use redux to store the role
  const [role, setRole] = useState("consumer"); // consumer or provider
  const [locationOptions, setLocationOptions] = useState([]);
  const [form] = Form.useForm();

  const onFinish = async (values) => {

   const selectedLocation = locationOptions.find((opt)=> opt.value === values.location);

    try {
      const payload = { ...values, role , location : selectedLocation ? {
            city: selectedLocation.city,
            state: selectedLocation.state,
            pincode: selectedLocation.pincode,
            coordinates: {
              type: "Point",
              coordinates: [
                parseFloat(selectedLocation.lon),
                parseFloat(selectedLocation.lat),
              ],
            },
          }
        : null,};
      const response = await signUpUser(payload);
      //  console.log(response);
      if (response.success) {
        toast.success(response.message);
        form.resetFields();
      } else {
        toast.error(response.message);
        console.log(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLocations = async (value) => {
    if (!value) {
      setLocationOptions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://us1.locationiq.com/v1/autocomplete.php?key=pk.9d58d41767692caa4dc79a7396b1fe6a&q=${encodeURIComponent(
          value
        )}&countrycodes=IN&limit=6&normalizecity=1`
      );
      const data = await res.json();
      // console.log(data);

      //console.log('lat',data[0].lat);
      //console.log('lon',data[0].lon);
      setLocationOptions(
        data.map((place) => ({
          value: place.place_id, //stored in form
          label: place.display_name, //user sees in dropdown
          lat: place.lat,
          lon: place.lon,
          city:
            place.address?.city ||
            place.address?.town ||
            place.address?.village,
          state: place.address?.state,
          pincode: place.address?.postcode,
        }))
      );
    } catch (err) {
      console.error("LocationIQ error:", err);
      setLocationOptions([]);
    }
  };

  const debouncedFetchLocation = debounce(fetchLocations,300);
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
        <Form.Item name="role">
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
              pattern: /^\d{10}$/,
              message: "Phone number must be exactly 10 digits",
            },
          ]}
        >
          <Input placeholder="Phone Number" type="number" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ type: "email", message: "Enter a valid Email" }]}
        >
          <Input placeholder="Email (optional)" />
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
                { required: true, message: "Please confirm your password" },
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
          <Select
            showSearch
            placeholder="Search for your city / area"
            filterOption={false}
            onSearch={debouncedFetchLocation}
            options={locationOptions.map((data,idx)=>({
              key : idx,
              value : data.value,
              label : data.label
            }))}
            notFoundContent={null}
          />
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
                  <Select showSearch placeholder="Select a service">
                    {serviceCategories.map((service) => (
                      <Option key={service.label} value={service.label}>
                        {service.icon} {service.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="yearsOfExperience"
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
          Already have an account? <Link to="/login">Log In</Link>
        </Text>
      </Form>
    </main>
  );
}

export default Signup;
