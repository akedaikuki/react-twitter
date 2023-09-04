import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from "../components/common/auth.styled";
import { BrandLogo } from "../assets/icons";
import AuthInput from "../components/AuthInput";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../API/auth";
import Swal from "sweetalert2";

import { useErrorContext } from "../components/contexts/ErrorContext";

import { Toast } from "../utilities/sweetalert";


const SignUpPage = () => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();

  const {
    accountError,
    nameError,
    emailError,
    passwordError,
    checkPasswordError,
    useResetErrorsEffect,
  } = useErrorContext();
  useResetErrorsEffect();


  const isValid = useMemo(() => {
    if (!account || account.length > 50) {
      Toast.fire({
        toast: true,
        position: "top",
        title: "帳號不能為空白!",
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
      return false;
    }
    if (!name || name.length > 50) {
      Toast.fire({
        toast: true,
        position: "top",
        title: "姓名不能為空白!",
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
      return false;
    }
    if (!email || !email.includes("@")) {
      Toast.fire({
        toast: true,
        position: "top",
        title: "信箱不能為空白!不能沒有＠",
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
      return false;
    }
    if (password.length < 4) {
      Toast.fire({
        toast: true,
        position: "top",
        title: "密碼長度至少4位!",
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
      return false;
    }
    if (!checkPassword) {
      return false;
    }

    return true;
  }, [account, name, email, password, checkPassword]);

  const handleClick = async () => {
    if (!isValid) {
      Toast.fire({
        toast: true,
        position: "top",
        title: "請填入正確資料!",
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    }
    const data = await register({
      account,
      name,
      email,
      password,
      checkPassword,
    });

    if (data.status === "success") {
      Toast.fire({
        toast: true,
        position: "top",
        title: "註冊成功!進入登入畫面",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });

      navigate("/login");
      return;
    }
  };


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
          error={accountError}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="名稱"
          placeholder="請輸入名稱"
          value={name}
          error={nameError}
          onChange={(nameInputValue) => setName(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="Email"
          placeholder="請輸入Email"
          value={email}
          error={emailError}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="password"
          label="密碼"
          placeholder="請輸入密碼"
          value={password}
          error={passwordError}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="password"
          label="密碼確認"
          placeholder="請再次輸入密碼"
          value={checkPassword}
          error={checkPasswordError}
          onChange={(checkPasswordInputValue) => setCheckPassword(checkPasswordInputValue)}
        />
      </AuthInputContainer>

      <AuthButton onClick={handleClick}>註冊</AuthButton>

      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
