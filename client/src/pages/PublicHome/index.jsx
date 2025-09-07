import React,{useEffect} from "react";
import { Layout, Menu, Button, Input, Row, Col, Card, Typography } from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  ToolOutlined,
  ThunderboltOutlined,
  HomeOutlined,
  GiftOutlined,
  SmileOutlined,
  CarOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CustomerServiceOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Consumer from "../Consumer";
import { useSelector } from "react-redux";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const categories = [
  { icon: <ToolOutlined />, label: "Plumber" },
  { icon: <ThunderboltOutlined />, label: "Electrician" },
  { icon: <HomeOutlined />, label: "Maid" },
  { icon: <GiftOutlined />, label: "Decorator" },
  { icon: <SmileOutlined />, label: "Flowers" },
  { icon: <ToolOutlined />, label: "Carpenter" },
  { icon: <CarOutlined />, label: "Movers" },
  { icon: <PlusOutlined />, label: "More" },
];

const whyChoose = [
  { icon: <CheckCircleOutlined />, text: "Verified Workers" },
  { icon: <DollarOutlined />, text: "Affordable Rates" },
  { icon: <ClockCircleOutlined />, text: "Easy Booking" },
  { icon: <CustomerServiceOutlined />, text: "24/7 Support" },
];

const featuredWorkers = [
  { name: "Rajesh Kumar", service: "Plumber", rating: 4.8, jobs: 120, price: "₹200" },
  { name: "Anita Sharma", service: "Maid", rating: 4.9, jobs: 95, price: "₹150" },
  { name: "Sandeep Verma", service: "Electrician", rating: 4.7, jobs: 80, price: "₹250" },
];

function PublicHome(){
  const role = useSelector((state)=> state.role.role);
  //console.log(role);
  
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();
 useEffect(()=>{
   if(isLoggedIn){
    
   } 
 })
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // redirect to landing page
  };

  return (
    <Layout>
      {/* Header */}
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
  <div style={{ color: "#fff", fontSize: "20px", fontWeight: "bold" }}>
    KaamConnect
  </div>

  <Menu
    theme="dark"
    mode="horizontal"
    style={{ flex: 1, justifyContent: "flex-end" }}
    items={
      !isLoggedIn
        ? [
            {
              key: "login",
              label: <Link to="/login">Login</Link>,
            },
            {
              key: "signup",
              label: <Link to="/signup">Sign Up</Link>,
            },
          ]
        : [
            {
              key: "profile",
              label: <Link to="/profile">Profile</Link>,
            },
            {
              key: "logout",
              label: (
                <span
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/"); // redirect after logout
                  }}
                >
                  Logout
                </span>
              ),
            },
          ]
    }
  />
</Header>


      {/* Content */}
      <Content style={{ padding: "40px 80px" }}>
        {!isLoggedIn ? (
          <>
            {/* Hero */}
            <Row justify="center" style={{ textAlign: "center", marginBottom: 50 }}>
              <Col span={24}>
                <Title level={2}>Find trusted workers near you</Title>
                <Input
                  size="large"
                  placeholder="Search for a worker/service..."
                  prefix={<SearchOutlined />}
                  style={{ maxWidth: 400, margin: "10px" }}
                />
                <Button type="default" icon={<EnvironmentOutlined />} size="large">
                  Location
                </Button>
              </Col>
            </Row>

            {/* Categories */}
            <Row gutter={[16, 16]} justify="center" style={{ marginBottom: 50 }}>
              {categories.map((cat, idx) => (
                <Col xs={12} sm={8} md={6} lg={6} key={idx}>
                  <Card hoverable style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "28px", marginBottom: "10px" }}>
                      {cat.icon}
                    </div>
                    <Text strong>{cat.label}</Text>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Why Choose Us */}
            <Row justify="center" gutter={16} style={{ marginBottom: 50 }}>
              <Col span={24} style={{ textAlign: "center", marginBottom: 20 }}>
                <Title level={3}>Why Choose KaamConnect?</Title>
              </Col>
              {whyChoose.map((item, idx) => (
                <Col xs={12} sm={12} md={6} key={idx}>
                  <Card style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "28px", marginBottom: "10px" }}>
                      {item.icon}
                    </div>
                    <Text>{item.text}</Text>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Featured Workers */}
            <Row gutter={16} justify="center">
              <Col span={24} style={{ textAlign: "center", marginBottom: 20 }}>
                <Title level={3}>Featured Workers</Title>
              </Col>
              {featuredWorkers.map((worker, idx) => (
                <Col xs={24} sm={12} md={8} key={idx}>
                  <Card hoverable>
                    <Title level={4}>{worker.name}</Title>
                    <Text type="secondary">{worker.service}</Text>
                    <div style={{ margin: "10px 0" }}>
                      <StarFilled style={{ color: "#fadb14" }} /> {worker.rating} (
                      {worker.jobs} jobs)
                    </div>
                    <Text strong>From {worker.price}</Text>
                    <br />
                    <Button type="primary" style={{ marginTop: 10 }}>
                      Book Now
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        ) : (
            <Consumer/>
        )}
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center" }}>
        {!isLoggedIn ? (
          <Row gutter={16} justify="center">
            <Col><Text>About Us</Text></Col>
            <Col><Text>Contact</Text></Col>
            <Col><Text>Help</Text></Col>
            <Col><Text>Terms</Text></Col>
            <Col><Text>Privacy</Text></Col>
          </Row>
        ) : (
          <div>Quick Links: Dashboard | Support</div>
        )}
        <div style={{ marginTop: 20 }}>© {new Date().getFullYear()} KaamConnect</div>
      </Footer>
    </Layout>
  );
};

export default PublicHome;
