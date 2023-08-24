import React from "react";

function SettingPage() {
  return (
    <div className="SettingStyle">
      <div className="SettingContainerStyle">
        <div className="step_back" active={"active"} setActive={"setActive"} />
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
          <button className="saveButton">儲存</button>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
