import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConsumerHome from "../pages/Home";
import ProviderHome from "../pages/ProviderHome";
import Admin from "../pages/Admin";
import { getCurrentUser } from "../api/userApi";
import { Spin } from "antd";

function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!localStorage.getItem("token")) {
        navigate("/login");
        return;
      }
      try {
        setLoading(true);
        const response = await getCurrentUser();
        //console.log(response);
        
        if (response.success) {
          setRole(response.data.role);
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (role === "consumer") {
    return <ConsumerHome />;
  } else if (role === "provider") {
    return <ProviderHome />;
  } else if (role === "admin") {
    return <Admin />;
  } else {
    // fallback if role is missing or unknown
    return <div>Unauthorized</div>;
  }
}

export default ProtectedRoute;