import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RaectPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate("home");
    } else if (localStorage.getItem("authToken")) {
      navigate("/admin/main");
    } else {
      navigate("login");
    }
  }, []);
};

export default RaectPage;
