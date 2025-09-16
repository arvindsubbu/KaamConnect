import React, { useState, useEffect } from "react";
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
import LocationModal from "../../Components/LocationModal";
import BookServiceModal from "../../Components/BookServiceModal";
import useLocationSearch from "../../hooks/useLocationSearch";
import { slugify } from "../../utils/slugify";
import { getCurrentLocation } from "../../hooks/getCurrentLocation";
import ServiceSearchModal from "../../Components/serviceSearchModal";
import { serviceCategories } from "../../utils/serviceCategories";
import { useSelector } from "react-redux";

const { Content } = Layout;
const { Title, Text } = Typography;

const workers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    service: "Plumber",
    rating: 4.8,
    jobs: 120,
    price: "₹200 onwards",
    location: "Andheri East, Mumbai",
    photo: "/uploads/workers/rajesh.jpg",
  },
  {
    id: 2,
    name: "Anita Sharma",
    service: "Maid",
    rating: 4.9,
    jobs: 95,
    price: "₹150 onwards",
    location: "Bandra West, Mumbai",
    photo: "/uploads/workers/anita.jpg",
  },
  {
    id: 3,
    name: "Suresh Yadav",
    service: "Plumber",
    rating: 4.6,
    jobs: 80,
    price: "₹180 onwards",
    location: "Dadar, Mumbai",
    photo: "/uploads/workers/suresh.jpg",
  },
];

function Consumer({username}) {
  const user = useSelector((state)=> state.role.user);
  const { locationSearch, setLocationSearch, suggestions } = useLocationSearch(); // not using setSuggestions
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isBookServiceModalOpen, setIsBookServiceModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const navigate = useNavigate();
  return (
    <Layout className="bg-gray-50">
      <Content className="p-6 md:p-12">
        {/* Greeting */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <Title level={3}>
            Welcome back, <span>{username} 👋</span>
          </Title>

          <Row gutter={[16, 16]} className="mt-3">
            <Col xs={24} sm={8}>
              {selectedLocation ? (
                <div
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 flex items-center cursor-pointer"
                  onClick={() => setIsLocationModalOpen(true)}
                >
                  <EnvironmentOutlined className="mr-2 text-gray-500" />
                  <span className="text-gray-800">{selectedLocation}</span>
                </div>
              ) : (
                <div
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 flex items-center cursor-pointer"
                  onClick={() => setIsLocationModalOpen(true)}
                >
                  <EnvironmentOutlined className="mr-2 text-gray-400" />
                  <span className="text-gray-400">Select Location</span>
                </div>
              )}
            </Col>
            <Col xs={24} sm={10}>
              <div
                className="w-full border border-gray-300 rounded-lg px-3 py-2 flex items-center cursor-pointer"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <SearchOutlined className="mr-2 text-gray-400" />
                <span className="text-gray-400">Search for service!!</span>
              </div>
            </Col>
          </Row>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          {/* Scrollable container */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {serviceCategories.map((cat, idx) => (
              <Card
                key={idx}
                hoverable
                className="min-w-[120px] text-center rounded-lg shadow-sm"
                onClick={() => {
                  navigate(`/service/${cat.label.toLowerCase()}`);
                  //setSearch(cat.label);
                }}
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
                    <Button
                      type="primary"
                      onClick={() => {
                         setSelectedWorker(w);
                        setIsBookServiceModalOpen(true);
                       
                      }}
                    >
                      Book Now
                    </Button>
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

        {/* service search modal */}
        <ServiceSearchModal
          open={isSearchModalOpen}
          onCancel={() => setIsSearchModalOpen(false)}
          setSelectedService={setSelectedService}
          selectedService={selectedService}
          selectedLocation={selectedLocation}
        />

        {/* location modal */}
        <LocationModal
          open={isLocationModalOpen}
          onCancel={() => setIsLocationModalOpen(false)}
          suggestions={suggestions}
          locationSearch={locationSearch}
          setLocationSearch={setLocationSearch}
          onUseCurrentLocation={() =>
            getCurrentLocation(
              setSelectedLocation,
              setIsLocationModalOpen,
              navigate
            )
          }
          onSelectLocation={(item) => {
            setSelectedLocation(slugify(item.name));
            setIsLocationModalOpen(false);
          }}
        />

        {/* Book service modal */}
        <BookServiceModal
          open={isBookServiceModalOpen}
          onCancel={() => setIsBookServiceModalOpen(false)}
          selectedWorker={selectedWorker}
          onConfirm={(data) => console.log("book from comsumer home", data)}
        />
      </Content>
    </Layout>
  );
}

export default Consumer;
