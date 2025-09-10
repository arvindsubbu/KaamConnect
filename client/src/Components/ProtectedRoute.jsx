import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { getCurrentUser } from "../api/userApi";
import { Spin, Layout, Menu } from "antd";
import { HomeOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { setRole, clearRole } from "../redux/roleSlice";
import { useDispatch, useSelector } from "react-redux";
import PublicHome from "../pages/PublicHome";

const { Header, Content ,Footer} = Layout;

function ProtectedRoute({ children, role: requiredRole }) {
  const role = useSelector((state) => state.role.value);
  //  console.log(role);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log("ProtectedRoute useEffect triggered");
    const checkAuth = async () => {
      if (!localStorage.getItem("token")) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await getCurrentUser();

        if (response.success) {
          // console.log("API returned role:", response.data.role);
          dispatch(setRole(response.data.role));
          console.log(response.data);
          setUser(response.data);
          if (location.pathname === "/") {
            if (response.data.role === "consumer")
              navigate("/consumer", { replace: true });
            else if (response.data.role === "provider")
              navigate("/provider", { replace: true });
            else if (response.data.role === "admin")
              navigate("/admin", { replace: true });
          }
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
  }, [navigate, dispatch, location.pathname]);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: 100 }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (requiredRole && role !== requiredRole) {
    return navigate("/login");
  }
  // Setup nav menu
  const navItems = [
    {
      label: "Home",
      key: "home",
      icon: <HomeOutlined />,
      onClick: () => {
        console.log("home button clicked");
        if (role === "consumer") navigate("/consumer");
        else if (role === "provider") navigate("/provider");
        else if (role === "admin") navigate("/admin");
      },
    },
    {
      label: user ? user.name : "User",
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

  if (!localStorage.getItem("token") && location.pathname === "/") {
    return <PublicHome />;
  }

  return (
    <Layout >
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          backgroundColor: "black",
        }}
      >
        <h3
          className="text-white m-0"
          style={{ color: "white", cursor: "pointer" }}
          onClick={() => {
            if (role === "consumer") navigate("/consumer");
            else if (role === "provider") navigate("/provider");
            else if (role === "admin") navigate("/admin");
            else navigate("/");
          }}
        >
          KaamConnect
        </h3>
        <Menu theme="dark" mode="horizontal" items={navItems} />
      </Header>
      {/* <div className="min-h-screen overflow-y-auto bg-gray-50">
        {children}
      </div> */}
      <Content style={{ background: "#f9fafb", padding: "0" }}>
        <div style={{ paddingBottom: "4rem" }}>{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        {!role ? (
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
}

export default ProtectedRoute;
