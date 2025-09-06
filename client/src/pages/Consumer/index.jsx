import React from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  Button,
  Typography,
  Input,
  Avatar,
  Carousel,
} from "antd";
import {
  SearchOutlined,
  StarFilled,
  ToolOutlined,
  ThunderboltOutlined,
  HomeOutlined,
  GiftOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const categories = [
  { icon: "🔧", label: "Plumber" },
  { icon: "⚡", label: "Electrician" },
  { icon: "🏠", label: "Maid" },
  { icon: "🎁", label: "Decorator" },
  { icon: "🌸", label: "Flowers" },
  { icon: "🪚", label: "Carpenter" },
  { icon: "🚚", label: "Movers" },
  { icon: "🖥️", label: "Computer Repair" },
  { icon: "📱", label: "Mobile Repair" },
  { icon: "🧹", label: "Cleaning" },
  { icon: "🍴", label: "Cook" },
  { icon: "🚗", label: "Driver" },
  { icon: "🎶", label: "DJ / Music" },
  { icon: "📦", label: "Packers & Movers" },
  { icon: "🛠️", label: "Mechanic" },
  { icon: "👶", label: "Babysitter" },
  { icon: "👵", label: "Elder Care" },
  { icon: "🐶", label: "Pet Care" },
  { icon: "🛋️", label: "Furniture Assembly" },
  { icon: "💇", label: "Salon at Home" },
];


const workers = [
  {
    name: "Rajesh Kumar",
    service: "Plumber",
    rating: 4.8,
    jobs: 120,
    price: "₹200",
    photo: "/uploads/workers/rajesh.jpg",
  },
  {
    name: "Anita Sharma",
    service: "Maid",
    rating: 4.9,
    jobs: 95,
    price: "₹150",
    photo: "/uploads/workers/anita.jpg",
  },
];

function Consumer() {

   const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: true,
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Content className="p-6 md:p-12">
        {/* Greeting */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <Title level={3}>
            Welcome back,<span>Arvind 👋</span>
          </Title>
          <Input
            size="large"
            placeholder="Let's detect your location"
            prefix={<SearchOutlined />}
            className="max-w-md mt-3"
          ></Input>
        </div>
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <Title level={4}>Quick Actions</Title>
          <Row gutter={[16, 16]} className="mt-4">
            {[
              "Book a Service",
              "Track My Booking",
              "View Past Orders",
              "Favorite Workers",
            ].map((action, idx) => (
              <Col xs={12} md={6} key={idx}>
                <Card hoverable className="text-center rounded-xl shadow-sm">
                  <Text>{action}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        {/* Recommended Workers */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <Title level={4}>Recommended Workers</Title>
          <Row gutter={[16, 16]} className="mt-4">
            {workers.map((w, idx) => (
              <Col xs={24} md={12} key={idx}>
                <Card hoverable className="rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Worker photo */}
                      <Avatar
                        src={w.photo}
                        size={64}
                        shape="circle"
                        className="border border-gray-200"
                      />
                      <div>
                        <Text strong>{w.name}</Text>
                        <br />
                        <Text type="secondary">{w.service}</Text>
                        <div className="text-yellow-500">
                          <StarFilled /> {w.rating} ({w.jobs} jobs)
                        </div>
                        <Text strong>{w.price}</Text>
                      </div>
                    </div>
                    <Button type="primary">Book Now</Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Categories */}
        {/* <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <Title level={4}>Categories</Title>
            <Button type="link">View All Categories</Button>
          </div> */}
          {/* <Row gutter={[16, 16]} className="mt-4">
            {categories.map((c, idx) => (
              <Col xs={8} sm={6} md={4} key={idx}>
                <Card hoverable className="text-center rounded-xl shadow-sm">
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <Text>{c.label}</Text>
                </Card>
              </Col>
            ))}
          </Row> */}
          {/* <div className="overflow-x-auto whitespace-nowrap mt-4">
            <div className="flex gap-4">
              {categories.map((c, idx) => (
                <Card
                  key={idx}
                  hoverable
                  className="inline-block min-w-[120px] text-center rounded-xl shadow-sm"
                >
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <Text className="text-wrap">{c.label}</Text>
                </Card>
              ))}
            </div> */}
          {/* </div>
        </div> */}
         <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <Slider {...settings}>
        {categories.map((cat, idx) => (
          <Card key={idx} hoverable className="text-center mx-2">
            <div className="text-3xl mb-2">{cat.icon}</div>
            <Text strong>{cat.label}</Text>
          </Card>
        ))}
      </Slider>
    </div>

        {/* My Bookings */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <Title level={4}>My Bookings</Title>
          <Row gutter={[16, 16]} className="mt-4">
            <Col xs={24} md={8}>
              <Card className="rounded-xl shadow-sm">
                <Text strong>Upcoming Booking</Text>
                <p>Rajesh Kumar - Plumbing</p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="rounded-xl shadow-sm">
                <Text strong>Ongoing</Text>
                <p>Anita Sharma - Painting</p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="rounded-xl shadow-sm">
                <Text strong>Completed</Text>
                <p>3 Orders</p>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

export default Consumer;
