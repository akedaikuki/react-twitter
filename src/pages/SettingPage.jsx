import React from "react";
import { styled } from "styled-components";
import { StyledButton } from "../components/common/button.styled";
import { useState, useEffect } from "react";
import { getUser, putUser } from "../API/setting";
import { useNavigate } from 'react-router-dom'

const SettingPageConainer = styled.div`
  width: 640px;
`;

const SettingStyle = styled.div`
  width: 640px;
  height: 100vh;
  margin: 0 auto;
  header {
    display: flex;
    align-items: center;
    height: 55px;
    padding-left: 24px;
    border-bottom: 1px solid var(--border_gray);
    position: sticky;
    background-color: var(--main_white);
    z-index: 5;
  }
  .SettingContainerStyle {
    width: 100%;
    height: 100vh;
    border-left: 1px solid var(--border_gray);
    border-right: 1px solid var(--border_gray);
  }
  .input_collection {
    width: 100%;
    display: flex;
    padding: 24px;
    flex-direction: column;
    align-items: flex-start;
  }
  .input_collection input {
    margin-bottom: 32px;
    box-sizing: border-box;
    height: 54px;
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: var(--main_text);
    border: none;
    border-bottom: 2px solid var(--input-border_gray);
    background-color: var(--input-scale_light-gray);
    transition: 0.3s;
  }
  .buttonBox {
    display: flex;
    justify-content: flex-end;
    width: 100%;

    .saveButton {
      /* position: absolute; */
      /* top: 600px; */
      /* right: 650px; */
      padding: 10px 40px;
      color: var(--main_white);
      background-color: var(--main_orange);

      &:hover {
        background-color: var(--btn-hover-bg);
      }
    }
  }
`;

const EmptyContainer = styled.div`
  width: 430px;
`;

const SettingPage = () => {
  // 儲存onChange值
  const [account, setAccount] = useState("");
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        setAccount(userData.account);
        setName(userData.name);
        setEmail(userData.email);
      } catch (error) {
        console.error("Get User Failed:", error);
      }
    };
    fetchUser();
  }, []);

  const handleClick = async () => {
    if (
      account.length === 0 || name.length === 0 || email.length === 0 ||password.length === 0 || checkPassword.length === 0
    ) {
      return;
    }
    try {
      if (password !== checkPassword) {
        console.error("Passwords do not match");
        return;
      }
      await putUser({ name, account, email, password, checkPassword });
      console.log("Editing User Successful!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SettingPageConainer className="SettingPageConainer">
        <SettingStyle className="SettingStyle">
          <div className="SettingContainerStyle">
            <div
              className="step_back"
              active={"active"}
              setActive={"setActive"}
            />
            <div className="Modal" active={"active"} setActive={"setActive"} />
            <header>
              <h4>帳戶設定</h4>
            </header>
            <div className="input_collection">
              帳號
              <input
                type={"text"}
                label={"帳號"}
                maxlength="30"
                name={account}
                placeholder={"請輸入帳號"}
                onChange={(accountInputValue) => setAccount(accountInputValue)}
              />
              名稱
              <input
                type={"text"}
                label={"名稱"}
                name={name}
                maxlength="50"
                defaultValue={user.name}
                placeholder={"請輸入名稱"}
                onChange={(nameInputValue) => setName(nameInputValue)}
              />
              Email
              <input
                type={"email"}
                label={"Email"}
                name={email}
                defaultValue={user.email}
                placeholder={"請輸入Email"}
                onChange={(emailInputValue) => setEmail(emailInputValue)}
              />
              密碼
              <input
                type={"password"}
                label={"密碼"}
                minlength="5"
                maxlength="20"
                name={password}
                value={user.password}
                placeholder={"請設定密碼"}
                onChange={(passwordInputValue) => setPassword(passwordInputValue)}
                required
              />
              密碼確認
              <input
                type={"password"}
                label={"密碼再確認"}
                minlength="5"
                maxlength="20"
                name={checkPassword}
                value={checkPassword}
                placeholder={"請再次輸入密碼"}
                onChange={(checkPasswordInputValue) =>
                  setCheckPassword(checkPasswordInputValue)
                }
                required
              />
              <div className="buttonBox">
                <StyledButton className="saveButton" onClick={handleClick}>儲存</StyledButton>
              </div>
            </div>
          </div>
        </SettingStyle>
      </SettingPageConainer>
      <EmptyContainer />
    </>
  );
}

export default SettingPage;
