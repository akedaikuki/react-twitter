import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from "../components/common/auth.styled";
import { BrandLogo } from "../assets/icons";
import AuthInput from "../components/AuthInput";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { adminLogin } from "../API/admin";
// import { checkPermission } from "../API/auth";

const AdminLoginPase = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  const [error, setError] = useState({
    account: false,
    password: false,
  });

  const resetError = (inputName) => {
    setError({ ...error, [inputName]: false });
  };
  const handleClick = async () => {
    if (account.length === 0 || password.length === 0) {
      return;
    }
    const { success, userToken } = await adminLogin({
      account,
      password,
    });
    if (success) {
      localStorage.setItem("userToken", userToken);
      Swal.fire({
        title: "登入成功",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });
      navigate("/api/users/:id/tweets");
      return;
    } else {
      Swal.fire({
        title: "登入失敗",
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });
      return;
    }
  };
  // useEffect(() => {
  //   const checkTokenIsValid = async () => {
  //     const userToken = localStorage.getItem("userToken");

  //     if (!userToken) {
  //       return;
  //     }
  //     // const result = await checkPermission(userToken);

  //     if (result) {
  //       navigate("api/users/:id/tweets");
  //     }
  //   };
  //   checkTokenIsValid();
  // }, [navigate]);

  return (
    <AuthContainer>
      <div>
        <BrandLogo />
      </div>
      <h1>後台</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          value={account}
          onChange={(accountInputValue, value) => {
            resetError(value);
            setAccount(accountInputValue);
          }}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="密碼"
          placeholder="請輸入密碼"
          value={password}
          onChange={(passwordInputValue, value) => {
            resetError(value);
            setPassword(passwordInputValue);
          }}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>

      <Link to="/api/users/signin">
        <AuthLinkText>前台登入</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default AdminLoginPase;
