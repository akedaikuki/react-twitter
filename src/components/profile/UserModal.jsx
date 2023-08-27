import React, { useState, useContext } from "react";
import styled from "styled-components";
import { CloseIcon, CameraIcon } from "../../assets/icons";
import { StyledButton } from "../common/button.styled";
import Swal from "sweetalert2";
import user1 from "../../API/user1";
import { ShowModalContext } from "../../Context/ShowModalContext";

const ModalStyle = styled.div`
  box-sizing: border-box;
  height: 610px;
  width: 634px;
  position: fixed;
  top: 56px;
  border-radius: 14px;
  overflow: hidden;
  /* background-color: red; */
  z-index: 200;
  background-color: var(--main_white);
  /* outline: 1px solid tomato; */

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
  .modalAvatar {
    position: relative;
    .imgBox {
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
        margin: 0;
        filter: brightness(0.5);
      }
      .cameraIcon {
        position: absolute;
        z-index: 5;
      }
    }
  }
  .modalCover {
    position: relative;
    img {
      border-radius: 0;
      margin: 0;
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
    .changeCoverActions {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 15%;
      z-index: 2;
      .removeIcon {
        cursor: pointer;
        path {
          fill: var(--main_white);
        }
      }
    }
  }

  .cameraIcon {
    cursor: pointer;
    input {
      display: none;
    }
  }
`;

const UserInfoText = styled.div`
  margin-top: 82px;
  padding: 0 16px 0 16px;

  input,
  textarea {
    box-sizing: border-box;
    height: 54px;
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: var(--main_text);
    border: none;
    resize: none;
    border-bottom: 2px solid var(--input-border_gray);
    background-color: var(--input-scale_light-gray);
    transition: 0.3s;

    &[placeholder] {
      padding-left: 10px;
      padding-top: 24px;
    }
    &:hover,
    &:focus {
      outline: 0;
      border-bottom-color: var(--main_newtweet);
    }
    &.error {
      border-bottom-color: var(--main_error);
    }
  }
  textarea {
    margin-top: 26px;
    height: 147px;
  }
  .caption {
    display: flex;
    justify-content: flex-end;
    font-size: 0.75rem;
    color: var(--input-border_gray);
    text-align: end;
  }
`;

function UserModal() {
  const [userInfo, setUserInfo] = useState(user1);
  const [avatar, setAvatar] = useState();
  const [cover, setCover] = useState();
  const [introduction, setIntroduction] = useState(
    userInfo[0].data.user[0].introduction
  );
  const [name, setName] = useState(userInfo[0].data.user[0].name);
  const [deleteCover, setDeleteCover] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [tmpImg, setTmpImg] = useState({
    avatar: userInfo[0].data.user[0].avatar,
    cover: userInfo[0].data.user[0].coverImage,
  });
  const { toggleShowEditModal } = useContext(ShowModalContext);
  function handleSave() {
    if (name.length === 0) {
      setErrorMessage({ ...errorMessage, name: "名稱不能為空白" });
      return;
    } else if (name.length > 50) {
      setErrorMessage({ ...errorMessage, name: "名稱不能超過50字" });
      return;
    } else if (introduction?.length > 160) {
      setErrorMessage({ ...errorMessage, introduction: "自我介紹最多160字" });
      return;
    }
  }
  return (
    <ModalStyle>
      <div className="header">
        <CloseIcon className="close" onClick={toggleShowEditModal} />
        <h5>編輯個人資料</h5>
        <StyledButton className="save active">儲存</StyledButton>
      </div>
      <div className="modalUserInfoContainer">
        <UserInfoPicture>
          <div className="modalCover">
            <img
              width={640}
              height={200}
              src={tmpImg.cover}
              alt=""
              className="cover"
            />
            <div className="changeCoverActions">
              <label htmlFor="cover" className="cameraIcon">
                <CameraIcon />
                <input type="file" name="cover" id="cover" />
              </label>
              <CloseIcon className="removeIcon" />
            </div>
          </div>
          <div className="modalAvatar">
            <div className="imgBox">
              <label htmlFor="avatar" className="cameraIcon">
                <CameraIcon />
                <input type="file" name="avatar" id="avatar" />
              </label>
              <img src={tmpImg.avatar} alt="" />
            </div>
          </div>
        </UserInfoPicture>
        <UserInfoText>
          <input
            label={"名稱"}
            value={name}
            errorMessage={errorMessage.name || null}
            onChange={(name) => {
              setName(name);
              setErrorMessage({ ...errorMessage, name: "" });
            }}
          />
          <div className="caption">{name.length}/50</div>
          <textarea
            label={"自我介紹"}
            value={introduction}
            errorMessage={errorMessage.introduction || null}
            onChange={(introduction) => {
              setIntroduction(introduction);
              setErrorMessage({ ...errorMessage, introduction: "" });
            }}
          />
          <div className="caption">{introduction.length}/160</div>
        </UserInfoText>
      </div>
    </ModalStyle>
  );
}

export default UserModal;
