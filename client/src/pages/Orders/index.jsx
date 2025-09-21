import React, { useEffect, useState } from "react";
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
  Rate
} from "antd";
import { useSelector } from "react-redux";
import { getOrder } from "../../api/workApi";

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
// const OrderCard = ({ role, order }) => (
//   <Card style={{ marginBottom: "15px" }}>
//     <Row justify="space-between" align="middle">
//       <Col>
//         <h3>{order.service}</h3>
//         <Tag
//           color={
//             order.status === "Completed"
//               ? "green"
//               : order.status === "Pending"
//               ? "orange"
//               : "red"
//           }
//         >
//           {order.status}
//         </Tag>
//         <p>{order.date}</p>
//       </Col>
//       <Col>
//         {role === "provider" ? (
//           <Row align='middle' gutter={8}>
//            <Col>
//             <p style={{margin : 0}}>
//               <b>₹{order.amount}</b>
//             </p>
//             </Col>
//             <Col>
//             <Tag color={order.paymentStatus === "Paid" ? "green" : "orange"}>
//               {order.paymentStatus}
//             </Tag>
//           </Col>
//           </Row>
//         ) : (
//           <>
//             <p style={{margin : 0}}>
//               <b>{order.providerName}</b>
//             </p>
//           </>
//         )}
//       </Col>
//     </Row>
//   </Card>
// );
const OrderCard = ({ role, order }) => (
  <Card style={{ marginBottom: "15px" }}>
    <Row justify="space-between" align="middle">
      {/* Left side */}
      <Col>
        <h3><b>{order.service}</b></h3>
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

      {/* Right side */}
      <Col>
        {role === "provider" ? (
          // Provider view
          <Row align="middle" gutter={8}>
            <Col>
              <p style={{ margin: 0 }}>
                <b>₹{order.amount}</b>
              </p>
            </Col>
            <Col>
              <Tag color={order.paymentStatus === "Paid" ? "green" : "orange"}>
                {order.paymentStatus}
              </Tag>
            </Col>
          </Row>
        ) : (
          // Consumer view
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0 }}>
              <b>{order.providerName}</b>
            </p>
            {/* If already rated, show stars */}
            {order.rating ? (
              <Rate disabled defaultValue={order.rating} style={{ fontSize: 14 }} />
            ) : (
              <Button type="link" size="small">
                Leave a Review
              </Button>
            )}
            <div>
              <Tag color={order.paymentStatus === "Paid" ? "green" : "orange"}>
                {order.paymentStatus}
              </Tag>
            </div>
          </div>
        )}
      </Col>
    </Row>
  </Card>
);

function Orders() {
 // const [role, setRole] = useState("provider"); // try switching to "consumer"
  const user = useSelector((state)=>state.role.value);
  const role = user?.role;
  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(false);

  const stats = {
    totalOrders: 40,
    pending: 3,
    completed: 37,
    earnings: 12500,
    moneySaved: 2500,
  };
  
//   dummy data
//   const orders = [
//   {
//     id: 1,
//     service: "Plumbing",
//     status: "Completed",
//     date: "Sept 20, 2025",
//     amount: 750,
//     paymentStatus: "Paid",
//     providerName: "John Smith",
//     rating: 4 // already rated
//   },
//   {
//     id: 2,
//     service: "Electrical",
//     status: "Completed",
//     date: "Sept 18, 2025",
//     amount: 1200,
//     paymentStatus: "Payment Pending",
//     providerName: "Alice Johnson",
//     rating: null // not rated
//   }
// ];

const fetchOrders = async (status)=>{
  setLoading(true);
  try{
    const res = await getOrder(status);
    console.log(res);
    
    const data = await res?.json();
    setOrders(data);
  }catch(err){
    console.error('failed to fetch orders',err);
  }
}

useEffect(()=>{
  //fetchOrders('completed'); uncomment this when backend data is ready
},[role]);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>My Orders</h2>

      {/* Summary cards */}
      <StatusCards role={role} stats={stats} /> 
      {/* have to fetch from the backend */}

      {/* Tabs + Filters */}
      <Row justify="space-between" style={{ marginBottom: "20px" }}>
        <Col>
          <Tabs
            defaultActiveKey="1"
            onChange={(key)=>{
              if(key == '1'){
                fetchOrders('completed');
              }else if(key === '2'){
                fetchOrders('pending');
              }else{
                fetchOrders('failed');
              }
            }}
            items={[
              {
                key: "1",
                label: "Completed",
                children: (
                  <List
                   loading = {loading}
                   dataSource={orders}
                   renderItem={(order)=>{
                    <OrderCard key={order.id} role={role} order={order}/>
                   }}
                  />
                ),
              },
              {
                key: "2",
                label: "Pending",
                children: (
                  <List
                   loading = {loading}
                   dataSource={orders}
                   renderItem={(order)=>{
                    <OrderCard key={order.id} role={role} order={order}/>
                   }}
                  />
                ),
              },
              {
                key: "3",
                label: "Failed",
                children: (
                  <List
                   loading = {loading}
                   dataSource={orders}
                   renderItem={(order)=>{
                    <OrderCard key={order.id} role={role} order={order}/>
                   }}
                  />
                ),
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
      {/* <List
        dataSource={orders}
        renderItem={(order) => (
          <OrderCard key={order.id} role={role} order={order} />
        )}
      /> */}

      {/* Pagination*/}
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
