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
import { login } from "../API/auth";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleClick = async () => {
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    const data = await login({ account, password })
    if (data.success) {
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('id', data.id)
      localStorage.setItem('avatar', data.avatar)
      Swal.fire({
        title: "登入成功",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });
      navigate("/");
      return;
    }
    Swal.fire({
      title: "登入失敗",
      icon: "error",
      showConfirmButton: false,
      timer: 1000,
      position: "top",
    });
    return;
  };

  return (
    <AuthContainer>
      <div>
        <BrandLogo />
      </div>
      <h1>登入 Alphitter</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          value={account}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="password"
          label="密碼"
          placeholder="請輸入密碼"
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>

      <Link to="/api/users">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
      {"．"}
      <Link to="/api/admin/users">
        <AuthLinkText>後台登入</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
