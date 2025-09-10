import React, { useState,useEffect } from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  Button,
  Typography,
  Input,
  Avatar,
  Modal,
  List,
} from "antd";
import {
  SearchOutlined,
  StarFilled,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

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
  {
    name: "Suresh Yadav",
    service: "Plumber",
    rating: 4.6,
    jobs: 80,
    price: "₹180",
    photo: "/uploads/workers/suresh.jpg",
  },
];

function Consumer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const navigate = useNavigate();

  useEffect(()=>{
    const handler = setTimeout(()=>{
      setDebouncedSearch(search);
    },300);
    return ()=>clearTimeout(handler);
  },[search]);
  return (
    <Layout className="bg-gray-50">
      <Content className="p-6 md:p-12">
        {/* Greeting */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <Title level={3}>
            Welcome back, <span>Arvind 👋</span>
          </Title>

          <Row gutter={[16, 16]} className="mt-3">
            <Col xs={24} sm={10}>
              <div
                className="w-full border border-gray-300 rounded-lg px-3 py-2 flex items-center cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <SearchOutlined className="mr-2 text-gray-400" />
                <span className="text-gray-400">Search for service!!</span>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <Input
                name="location"
                size="large"
                placeholder="Location"
                prefix={<EnvironmentOutlined />}
              />
            </Col>
          </Row>
        </div>

        {/* Modal */}
        <Modal
          title="Find a Service"
          open={isModalOpen}
          footer={null}
          onCancel={() => {
            setIsModalOpen(false);
            document.activeElement.blur();
          }}
          width={600} // fix modal width
          styles={{
            body: { maxHeight: "60vh", overflowY: "auto" },
          }}
        >
          {/* Search inside modal */}
          <Input
            autoFocus
            placeholder="Search for service!!"
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />

          {/* Category list */}
          <List
            dataSource={categories.filter((cat) =>
              cat.label.toLowerCase().includes(debouncedSearch.toLowerCase())
            )}
            renderItem={(cat) => (
              <List.Item
                onClick={() => {
                  setIsModalOpen(false);
                  navigate(`/consumer/${cat.label.toLowerCase()}`);
                }}
                className="cursor-pointer hover:bg-gray-50 rounded px-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <Text strong>{cat.label}</Text>
                </div>
              </List.Item>
            )}
          />
        </Modal>

        {/* Categories */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          {/* Scrollable container */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((cat, idx) => (
              <Card
                key={idx}
                hoverable
                className="min-w-[120px] text-center rounded-lg shadow-sm"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <Text strong>{cat.label}</Text>
              </Card>
            ))}
          </div>
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

        {/* My Bookings */}
        <div className="bg-white rounded-2xl shadow-sm p-6 pb-30">
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
