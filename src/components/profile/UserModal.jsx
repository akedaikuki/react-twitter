import React from "react";
import styled from "styled-components";
// import { Input, Textarea } from "../AuthInput";
import { useState, useContext } from "react";
// import { uploadUserInfo } from "../../api/getUserTweets";
// import { getUserInfo } from "../../api/getUserTweets";
import { CloseIcon, CameraIcon } from "../../assets/icons";
import { StyledButton } from "../common/button.styled";
import Swal from "sweetalert2";
import { ShowModalContext } from "../../Context/ShowModalContext";
import { useNavigate } from "react-router-dom";
import user1 from "../../API/user1";

const ModalStyle = styled.div`
  box-sizing: border-box;
  height: 610px;
  width: 638px;
  position: fixed;
  top: 56px;
  border-radius: 14px;
  overflow: hidden;
  /* background-color: red; */
  z-index: 200;
  background-color: var(--main_white);

  .header {
    display: flex;
    align-items: center;
    height: unset;
    padding: unset;
    .close {
      margin: 20px;
      cursor: pointer;
    }
    .save {
      position: absolute;
      right: 16px;
    }
  }
`;

const UserInfoPicture = styled.div`
  position: relative;
  height: 200px;
  .modal-avatar {
    position: relative;
    .img-box {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 16px;
      bottom: 0;
      transform: translateY(50%);

      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 5px solid white;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        filter: brightness(0.5);
      }
      .camera-icon {
        position: absolute;
        z-index: 5;
      }
    }
  }
  .modal-cover {
    position: relative;
    img {
      background-color: #888;
      box-sizing: border-box;
      height: 200px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: -1;

      background-color: var(--main_secondary);
      filter: brightness(0.5);
    }
    .change-cover-actions {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 15%;
      z-index: 2;
      .remove-icon {
        cursor: pointer;
        path {
          fill: var(--main_white);
        }
      }
    }
  }

  .camera-icon {
    cursor: pointer;
    input {
      display: none;
    }
  }
`;

const UserInfoText = styled.div`
  margin-top: 82px;
  padding: 0 16px 0 16px;
`;

function UserModal() {
  const { setShowModal } = useContext(ShowModalContext);
  const [user1Info, setUser1Info] = useState(user1);
  const navigate = useNavigate();
  return (
    <ModalStyle>
      <div className="header">
        <CloseIcon
          className="close"
          onClick={() => {
            setShowModal(false);
            // navigate("/user/self");
          }}
        />
        <h5>編輯個人資料</h5>
        <StyledButton
          className="save active"
          // onClick={handleSave}
        >
          儲存
        </StyledButton>
      </div>
      <div className="modal-user-info-container">
        <UserInfoPicture>
          <div className="modal-cover">
            <img
              width={640}
              height={200}
              src={user1Info[0].data.user[0].coverImage}
              alt=""
              className="cover"
            />
            <div className="change-cover-actions">
              <label htmlFor="cover" className="camera-icon">
                <CameraIcon />
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  // onChange={handleUploadCover}
                />
              </label>
              <CloseIcon
                className="remove-icon"
                // onClick={handleDeletCover}
              />
            </div>
          </div>
          <div className="modal-avatar">
            <div className="img-box">
              <label htmlFor="avatar" className="camera-icon">
                <CameraIcon />
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  // onChange={handleUploadAvatar}
                />
              </label>
              <img src={user1Info[0].data.user[0].avatar} alt="" />
            </div>
          </div>
        </UserInfoPicture>
        <UserInfoText>
          <input
            label={"名稱"}
            value={user1Info[0].data.user[0].name}
            // errorMessage={errorMessage.name || null}
            // onChange={(name) => {
            //   setName(name);
            //   setErrorMessage({ ...errorMessage, name: "" });
            // }}
          />
          <textarea
            label={"自我介紹"}
            value={user1Info[0].data.user[0].introduction}
            // errorMessage={errorMessage.introduction || null}
            // onChange={(introduction) => {
            //   setIntroduction(introduction);
            //   setErrorMessage({ ...errorMessage, introduction: "" });
            // }}
          />
        </UserInfoText>
      </div>
    </ModalStyle>
  );
}
export default UserModal;
