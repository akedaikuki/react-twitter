import { AuthContainer, AuthInputContainer, AuthButton, AuthLinkText } from "../components/common/auth.styled"; 
import { BrandLogo } from "../assets/icons";
import AuthInput from "../components/AuthInput";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate('');

    const handleClick = async () => {
        if (account.length === 0) {
            return
        }
        if (password.length === 0) {
            return
        }
    }

      
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
                onChange={(accountInputValue) => setAccount 
                (accountInputValue)}
              />
             </AuthInputContainer>

            <AuthInputContainer>
              <AuthInput 
                type="password"
                label="密碼"
                placeholder="請輸入密碼"
                value={password}
                onChange={(passwordInputValue) => setPassword
                (passwordInputValue)}
              />
            </AuthInputContainer>
            <AuthButton onClick={handleClick}>登入</AuthButton>

            <AuthLinkText>註冊</AuthLinkText>
        </AuthContainer>
    )
  };

export default LoginPage