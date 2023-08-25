import React from "react";
import { styled } from "styled-components";
import { StyledButton } from "../components/common/button.styled";

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
  .saveButton {
    /* position: absolute; */
    /* top: 600px; */
    /* right: 650px; */
    padding: 10px 40px;
    color: var(--main_white);
    background-color: var(--main_orange);
  }
`;

const EmptyContainer = styled.div`
  width: 430px;
`;

function SettingPage() {
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
                // value={"account"}
                placeholder={"請輸入帳號"}
                errorMessage={null}
              />
              名稱
              <input
                type={"text"}
                label={"名稱"}
                // value={"name"}
                placeholder={"請輸入名稱"}
                errorMessage={null}
              />
              Email
              <input
                type={"email"}
                label={"Email"}
                // value={"email"}
                placeholder={"請輸入Email"}
                errorMessage={null}
              />
              密碼
              <input
                type={"password"}
                label={"密碼"}
                // value={"password"}
                placeholder={"請設定密碼"}
                errorMessage={null}
              />
              密碼確認
              <input
                type={"password"}
                label={"密碼確認"}
                // value={"checkPassword"}
                placeholder={"請再次輸入密碼"}
                errorMessage={null}
              />
              <StyledButton className="saveButton">儲存</StyledButton>
            </div>
          </div>
        </SettingStyle>
      </SettingPageConainer>
      <EmptyContainer />
    </>
  );
}
export default SettingPage;
