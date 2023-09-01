import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RaectPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("api/login");
    if (localStorage.getItem("userToken")) {
      navigate("/");
    } else if (localStorage.getItem("authToken")) {
      navigate("/admin/main");
    }
  }, [navigate]);
};

export default RaectPage;
