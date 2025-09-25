import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  Button,
  Typography,
  Avatar,
  Select,
  List,
} from "antd";
import {
  SearchOutlined,
  StarOutlined,
  StarFilled,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import LocationModal from "../../Components/LocationModal";
import ServiceSearchModal from "../../Components/serviceSearchModal";
import useLocationSearch from "../../hooks/useLocationSearch";
import BookServiceModal from "../../Components/BookServiceModal";
import { slugify } from "../../utils/slugify";
import { getCurrentLocation } from "../../hooks/getCurrentLocation";
import { useParams } from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

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

function ServiceResults() {
  const { location, service } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [sort, setSort] = useState("relevance");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState("");

  useEffect(() => {
    let actualLocation = location;
    let actualService = service;

    if (!service) {
      actualService = location;
      actualLocation = null;
    }

    setSelectedService(actualService || "");
    setSelectedLocation(actualLocation || "");
  }, [location, service]);

  //setSelectedService(actualService)

  const { locationSearch, setLocationSearch, suggestions } =
    useLocationSearch();
  const navigate = useNavigate();

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <Layout className="bg-gray-50 min-h-screen">
      <Content className="p-6 md:p-12">
        {/* Search Controls */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <Row gutter={[16, 16]}>
            {/* Location Picker */}
            <Col xs={24} sm={8}>
              <div
                className="w-full border border-gray-300 rounded-lg px-3 py-2 flex items-center cursor-pointer"
                onClick={() => setIsLocationModalOpen(true)}
              >
                <EnvironmentOutlined className="mr-2 text-gray-500"/>
                <span
                  className={selectedLocation ? "text-black" : "text-gray-400"}
                >
                  {selectedLocation || "Select Location"}
                </span>
              </div>
            </Col>

            {/* Service Search */}
            <Col xs={24} sm={10}>
              <div
                className="w-full border border-gray-300 rounded-lg px-3 py-2 flex items-center cursor-pointer"
                onClick={() => setIsServiceModalOpen(true)}
              >
                <SearchOutlined className="mr-2 text-gray-400" />
                <span
                  className={selectedService ? "text-black" : "text-gray-400"}
                >
                  {selectedService || "Search for service!!"}
                </span>
              </div>
            </Col>
          </Row>
        </div>

        {/* Sort */}
        <div className="flex justify-between items-center mb-6">
          <Title level={3} className="m-0">
            Available Workers
          </Title>
          <Select
            value={sort}
            style={{ width: 200 }}
            onChange={(value) => setSort(value)}
          >
            <Option value="relevance">Best Match</Option>
            <Option value="rating">Rating: High to Low</Option>
            <Option value="priceLow">Price: Low to High</Option>
            <Option value="priceHigh">Price: High to Low</Option>
          </Select>
        </div>

        {/* Workers List */}
        <Row gutter={[16, 16]}>
          {/* applied temp filter for the dummy data */}
          {workers
            .filter((w) => w.service.toLowerCase() === selectedService)
            .map((w) => (
              <Col xs={24} md={12} key={w.id}>
                <Card className="rounded-xl shadow-sm relative">
                  {/* Favorite Star */}
                  <div
                    className="absolute top-3 right-3 cursor-pointer"
                    onClick={() => toggleFavorite(w.id)}
                  >
                    {favorites.includes(w.id) ? (
                      <StarFilled
                        style={{ color: "#fadb14", fontSize: "20px" }}
                      />
                    ) : (
                      <StarOutlined
                        style={{ color: "#999", fontSize: "20px" }}
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
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
                          ⭐ {w.rating} ({w.jobs} jobs)
                        </div>
                        <Text strong>{w.price}</Text>
                        <div className="text-gray-500 text-sm flex items-center">
                          <EnvironmentOutlined className="mr-1" /> {w.location}
                        </div>
                      </div>
                    </div>
                    <Button
                      type="primary"
                      onClick={() => {
                        setIsBookModalOpen(true);
                        setSelectedWorker(w);
                      }}
                    >
                      Book
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
        </Row>

        {/* Location Modal */}
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

        {/*Service Modal */}
        <ServiceSearchModal
          open={isServiceModalOpen}
          onCancel={() => setIsServiceModalOpen(false)}
          setSelectedService={setSelectedService}
          selectedLocation={selectedLocation}
        />

        {/* Book modal */}
        <BookServiceModal
          open={isBookModalOpen}
          onCancel={() => setIsBookModalOpen(false)}
          selectedWorker={selectedWorker}
          onConfirm={(data) => console.log("booking confirmed", data)}
        />
      </Content>
    </Layout>
  );
}

export default ServiceResults;
