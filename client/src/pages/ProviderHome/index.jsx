import React from "react";
import { Layout, Table, Button, Card, Row, Col, Tag, Rate, List } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const { Content } = Layout;

function ProviderHome() {
  const requests = [
    {
      key: "1",
      client: "John Doe",
      service: "Plumbing",
      date: "Sept 12, 2025",
      location: "MG Road",
      urgency: "High",
    },
    {
      key: "2",
      client: "Jane Smith",
      service: "Electrician",
      date: "Sept 13, 2025",
      location: "Indiranagar",
      urgency: "Medium",
    },
  ];

  const requestColumns = [
    { title: "Client", dataIndex: "client", key: "client" },
    { title: "Service", dataIndex: "service", key: "service" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Urgency", dataIndex: "urgency", key: "urgency" },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex gap-2 flex-wrap">
          <Button
            type="primary"
            className="bg-green-500 w-full sm:w-auto text-sm sm:text-base"
          >
            Accept
          </Button>
          <Button danger className="w-full sm:w-auto text-sm sm:text-base">
            Reject
          </Button>
        </div>
      ),
    },
  ];

  const kpis = {
    activeJobs: 12,
    pendingRequests: 8,
    completedJobs: 30,
    averageRating: 4.6,
    monthlyEarnings: 25000,
  };

  const earningsData = [
    { month: "Jan", earnings: 10000 },
    { month: "Feb", earnings: 15000 },
    { month: "Mar", earnings: 12000 },
    { month: "Apr", earnings: 20000 },
    { month: "May", earnings: 25000 },
  ];

  const payouts = [
    { id: 1, amount: "₹5,000", date: "Sept 5, 2025" },
    { id: 2, amount: "₹10,000", date: "Sept 1, 2025" },
  ];

  const reviews = [
    {
      id: 1,
      client: "Ravi Kumar",
      rating: 5,
      text: "Great service! Fixed everything quickly.",
    },
    {
      id: 2,
      client: "Anita Sharma",
      rating: 4,
      text: "Good experience, but came 10 minutes late.",
    },
  ];

  const activeJobs = [
    { id: 1, title: "Fix Sink - John Doe", status: "In Progress" },
    { id: 2, title: "Wiring Check - Jane Smith", status: "Scheduled" },
  ];

  return (
    <div>
      <div className="w-full max-w-full sm:max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-24">
        {/* KPI Cards */}
        <Row gutter={[12, 12]} className="mb-4 sm:mb-6">
          <Col xs={12} sm={12} md={8}>
            <Card className="rounded-2xl shadow text-center p-3 sm:p-6">
              <div className="text-gray-500 text-sm sm:text-base">
                Active Jobs
              </div>
              <div className="text-lg sm:text-2xl font-bold">
                {kpis.activeJobs}
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={8}>
            <Card className="rounded-2xl shadow text-center p-3 sm:p-6">
              <div className="text-gray-500 text-sm sm:text-base">
                Pending Requests
              </div>
              <div className="text-lg sm:text-2xl font-bold">
                {kpis.pendingRequests}
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={8}>
            <Card className="rounded-2xl shadow text-center p-3 sm:p-6">
              <div className="text-gray-500 text-sm sm:text-base">
                Completed Jobs
              </div>
              <div className="text-lg sm:text-2xl font-bold">
                {kpis.completedJobs}
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={8}>
            <Card className="rounded-2xl shadow text-center p-3 sm:p-6">
              <div className="text-gray-500 text-sm sm:text-base">
                Average Rating
              </div>
              <div className="flex items-center justify-center gap-1 sm:gap-2 text-lg sm:text-2xl font-bold">
                <span>{kpis.averageRating}</span>
                <Rate disabled defaultValue={Math.round(kpis.averageRating)} />
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={8}>
            <Card className="rounded-2xl shadow text-center p-3 sm:p-6">
              <div className="text-gray-500 text-sm sm:text-base">
                Monthly Earnings
              </div>
              <div className="text-lg sm:text-2xl font-bold">
                ₹{kpis.monthlyEarnings}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Incoming Requests */}
        <section className="mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold mb-3">
            Incoming Requests
          </h2>
          <Card className="rounded-2xl shadow p-2 sm:p-4">
            {/* Desktop / Tablet Table */}
            <div className="hidden sm:block">
              <Table
                columns={requestColumns.map((col) => ({
                  ...col,
                  ellipsis: true, // optional for clean look
                  onHeaderCell: () => ({ style: { textAlign: "center" } }),
                  onCell: () => ({ style: { textAlign: "center" } }),
                  width: 150, // 👈 fixed width per column
                }))}
                dataSource={requests}
                pagination={false}
              />
            </div>

            {/* Mobile Scrollable Table */}
            <div className="sm:hidden w-full overflow-x-auto text-sm">
              <Table
                columns={requestColumns}
                dataSource={requests}
                pagination={false}
                scroll={{ x: 600 }}
              />
            </div>
          </Card>
        </section>

        {/* Active Jobs */}
        <section className="mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold mb-3">
            Active Jobs
          </h2>
          <Row gutter={[12, 12]}>
            {activeJobs.map((job) => (
              <Col key={job.id} xs={24} sm={12}>
                <Card className="rounded-2xl shadow p-3 sm:p-5 cursor-pointer hover:shadow-lg transition">
                  <div className="font-semibold text-sm sm:text-base">
                    {job.title}
                  </div>
                  <Tag
                    color={job.status === "In Progress" ? "blue" : "orange"}
                    className="my-2"
                  >
                    {job.status}
                  </Tag>
                  <Button
                    type="primary"
                    className="bg-blue-600 w-full sm:w-auto text-sm sm:text-base"
                  >
                    View Details
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Earnings + Payouts */}
        <Row gutter={[12, 12]} className="mb-4 sm:mb-6">
          <Col xs={24} md={16}>
            <Card className="rounded-2xl shadow p-3 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold mb-3">
                Earnings Overview
              </h2>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="earnings" stroke="#2563eb" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="rounded-2xl shadow p-3 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold mb-3">
                Recent Payouts
              </h2>
              <List
                dataSource={payouts}
                renderItem={(item) => (
                  <List.Item>
                    <div className="flex justify-between w-full text-sm sm:text-base">
                      <span>{item.date}</span>
                      <span className="font-bold">{item.amount}</span>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        {/* Reviews */}
        <section className="mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold mb-3">
            Client Reviews
          </h2>
          <Row gutter={[12, 12]}>
            {reviews.map((review) => (
              <Col key={review.id} xs={24} sm={12}>
                <Card className="rounded-2xl shadow p-3 sm:p-5">
                  <div className="font-semibold text-sm sm:text-base">
                    {review.client}
                  </div>
                  <Rate disabled defaultValue={review.rating} />
                  <div className="text-gray-600 text-xs sm:text-sm mt-2">
                    {review.text}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Services & Availability */}
        <section className="pb-9">
          <h2 className="text-base sm:text-lg font-semibold mb-3">
            Services & Availability
          </h2>
          <Card className="rounded-2xl shadow p-3 sm:p-5">
            <div className="mb-2 text-sm sm:text-base">
              You offer:{" "}
              <span className="font-semibold">Plumbing, Electrician</span>
            </div>
            <div className="mb-4 text-sm sm:text-base">
              Availability:{" "}
              <span className="font-semibold">Mon - Sat, 9 AM - 6 PM</span>
            </div>
            <Button
              type="primary"
              className="bg-blue-600 w-full sm:w-auto text-sm sm:text-base"
            >
              Edit Services
            </Button>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default ProviderHome;
