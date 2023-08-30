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
import { register, checkPermission } from "../API/auth";

const SignUpPage = () => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate("");
  const [error, setError] = useState({
    account: false,
    name: false,
    email: false,
    password: false,
    checkPassword: false,
  });
  const resetError = (inputname) => {
    setError({ ...error, [inputname]: false });
  };

  const handleClick = async () => {
    resetError();
    if (
      account.length === 0 ||
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      checkPassword.length === 0
    ) {
      return;
    }

    const { success } = await register({
      account,
      name,
      email,
      password,
      checkPassword,
    });

    if (success) {
      console.log("註冊成功");
      navigate("/api/users/signin");
      // localStorage.setItem("userToken");
      Swal.fire({
        title: "註冊成功",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });

      return;
    } else {
      Swal.fire({
        title: "註冊失敗",
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
  //     const result = await checkPermission(userToken);

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
      <h1>建立您的帳號</h1>

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
          label="名稱"
          placeholder="請輸入使用者名稱"
          value={name}
          onChange={(nameInputValue) => setName(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="Email"
          placeholder="請輸入 email"
          value={email}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="密碼"
          placeholder="請輸入密碼"
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthInputContainer>
        <AuthInput
          label="密碼確認"
          placeholder="請再次確認密碼"
          value={checkPassword}
          onChange={(checkPasswordInputValue) =>
            setCheckPassword(checkPasswordInputValue)
          }
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>註冊</AuthButton>

      <Link to="/api/users/signin">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
