import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser } from "../api/userApi";
import { Spin, Layout, Menu } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { setRole,clearRole } from "../redux/roleSlice";
import { useDispatch, useSelector } from "react-redux";

const { Header, Content } = Layout;

function ProtectedRoute({children,role : requiredRole}) {
  const role = useSelector((state) => state.role.value);
  console.log(role);
  
  const [loading, setLoading] = useState(true);
  //const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
    const dispatch = useDispatch();

  useEffect(() => {
     console.log("ProtectedRoute useEffect triggered");
    const checkAuth = async () => {
      if (!localStorage.getItem("token")) {
        navigate("/login");
        return;
      }
      try {
        setLoading(true);
        const response = await getCurrentUser();

        if (response.success) {
          console.log("API returned role:", response.data.role);
          dispatch(setRole(response.data.role));
          setUser(response.data);
        } else {
          localStorage.removeItem("token");
          dispatch(clearRole());
          navigate("/login");
        }
      } catch (err) {
        localStorage.removeItem("token");
         dispatch(clearRole());
        setUser(null);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate,dispatch]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

   if (requiredRole && role !== requiredRole) {
    return <div>Unauthorized</div>;
  }
  // Setup nav menu
  const navItems = [
    {
      label: "Home",
      key: "home",
      icon: <HomeOutlined />,
      onClick: () => {
        if (role === "consumer") navigate("/consumer");
        else if (role === "provider") navigate("/provider");
        else if (role === "admin") navigate("/admin");
      },
    },
    {
      label: user ? user.name : "",
      key: "profile",
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                if (role === "consumer") navigate("/consumer/profile");
                else if (role === "provider") navigate("/provider/profile");
                else if (role === "admin") navigate("/admin/profile");
              }}
            >
              My Profile
            </span>
          ),
        },
        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
                dispatch(clearRole());
              }}
            >
              Logout
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  // Pick correct dashboard page
  // let Dashboard = null;
  // if (role === "consumer") Dashboard = <ConsumerHome />;
  // else if (role === "provider") Dashboard = <ProviderHome />;
  // else if (role === "admin") Dashboard = <Admin />;
  // else Dashboard = <div>Unauthorized</div>;

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h3
          className="text-white m-0"
          style={{ color: "white", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          KaamConnect
        </h3>
        <Menu theme="dark" mode="horizontal" items={navItems} />
      </Header>
      <Content style={{ padding: 24, minHeight: 380, background: "#fff" }}>
        {children}
      </Content>
    </Layout>
  );
}

export default ProtectedRoute;
