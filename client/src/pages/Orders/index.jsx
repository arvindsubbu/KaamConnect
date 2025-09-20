import React, { useState } from "react";
import {
  Card,
  Tabs,
  Row,
  Col,
  Statistic,
  Select,
  Button,
  List,
  Tag,
} from "antd";

const { TabPane } = Tabs;
const { Option } = Select;

// Reusable StatusCards
const StatusCards = ({ role, stats }) => (
  <Row gutter={16} style={{ marginBottom: "20px" }}>
    <Col span={6}>
      <Card>
        <Statistic title="Total Orders" value={stats.totalOrders} />
      </Card>
    </Col>
    <Col span={6}>
      <Card>
        <Statistic title="Pending" value={stats.pending} />
      </Card>
    </Col>
    <Col span={6}>
      <Card>
        <Statistic title="Completed" value={stats.completed} />
      </Card>
    </Col>
    <Col span={6}>
      <Card>
        <Statistic
          title={role === "provider" ? "Earnings" : "Money Saved"}
          value={role === "provider" ? stats.earnings : stats.moneySaved}
          prefix="₹"
        />
      </Card>
    </Col>
  </Row>
);

// Reusable OrderCard
const OrderCard = ({ role, order }) => (
  <Card style={{ marginBottom: "15px" }}>
    <Row justify="space-between" align="middle">
      <Col>
        <h3>{order.service}</h3>
        <Tag
          color={
            order.status === "Completed"
              ? "green"
              : order.status === "Pending"
              ? "orange"
              : "red"
          }
        >
          {order.status}
        </Tag>
        <p>{order.date}</p>
      </Col>
      <Col>
        {role === "provider" ? (
          <>
            <p>
              <b>₹{order.amount}</b>
            </p>
            <Tag color={order.paymentStatus === "Paid" ? "green" : "orange"}>
              {order.paymentStatus}
            </Tag>
          </>
        ) : (
          <>
            <p>
              <b>{order.providerName}</b>
            </p>
          </>
        )}
      </Col>
    </Row>
  </Card>
);

function Orders() {
  const [role, setRole] = useState("consumer"); // try switching to "consumer"

  const stats = {
    totalOrders: 40,
    pending: 3,
    completed: 37,
    earnings: 12500,
    moneySaved: 2500,
  };

  const orders = [
    {
      id: 1,
      service: "Plumbing",
      status: "Completed",
      date: "Sept 20, 2025",
      amount: 750,
      paymentStatus: "Paid",
      providerName: "John Smith",
    },
    {
      id: 2,
      service: "Electrical",
      status: "Completed",
      date: "Sept 18, 2025",
      amount: 1200,
      paymentStatus: "Payment Pending",
      providerName: "Alice Johnson",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>My Orders</h2>

      {/* Summary cards */}
      <StatusCards role={role} stats={stats} />

      {/* Tabs + Filters */}
      <Row justify="space-between" style={{ marginBottom: "20px" }}>
        <Col>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: "Completed",
                children: <div>Content 1</div>,
              },
              {
                key: "2",
                label: "Pending",
                children: <div>Content 2</div>,
              },
              {
                key: "3",
                label: "Failed",
                children: <div>Content 3</div>,
              },
            ]}
          />
        </Col>
        <Col>
          <Row gutter={8}>
            <Col>
              <Select defaultValue="Date Range"  style={{ width: 150 }}>
                <Option>Date Range</Option>
              </Select>
            </Col>
            <Col>
              <Select defaultValue="Newest First" style={{ width: 150 }}>
                <Option>Newest First</Option>
                <Option>Oldest First</Option>
                <Option>Highest Earning</Option>
                <Option>Lowest Earning</Option>
              </Select>
            </Col>
            {role === "provider" && (
              <Col>
                <Button type="primary">Export</Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      {/* Orders List */}
      <List
        dataSource={orders}
        renderItem={(order) => (
          <OrderCard key={order.id} role={role} order={order} />
        )}
      />

      {/* Pagination (simple example) */}
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Button>Previous</Button>
        <Button type="primary" style={{ margin: "0 5px" }}>
          1
        </Button>
        <Button>2</Button>
        <Button>Next</Button>
      </Row>
    </div>
  );
}

export default Orders;
