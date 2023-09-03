import React, { useState, useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import { CloseIcon, CameraIcon } from "../../assets/icons";
import { StyledButton } from "../common/button.styled";
import Swal from "sweetalert2";
// import user1 from "../../API/user1";
import { ShowModalContext } from "../../Context/ShowModalContext";
import { useNavigate } from "react-router-dom";
import { getAccountInfo, putPersonalInfo } from "../../API/usercopy";

const ModalContainer = styled.div`
  box-sizing: border-box;
  height: 610px;
  width: 634px;
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(calc(-50% - 37px));
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

function UserModal({ userInfo, setUserInfo }) {
  // const [userInfo, setUserInfo] = useState(user1);
  // const [avatar, setAvatar] = useState();
  // const [cover, setCover] = useState();
  // const [introduction, setIntroduction] = useState(
  //   userInfo[0].data.user[0].introduction
  // );
  // const [name, setName] = useState(userInfo[0].data.user[0].name);
  // const [deleteCover, setDeleteCover] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  // const [tmpImg, setTmpImg] = useState({
  //   avatar: userInfo[0].data.user[0].avatar,
  //   cover: userInfo[0].data.user[0].coverImage,
  // });

  // 編輯資料頭像狀態
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");
  const [inroduction, setIntorduction] = useState("");

  const [userAvatar, setUserAvatar] = useState("");
  const [userCover, setUserCover] = useState("");

  // 上傳照片
  const [coverStatus, setCoverStatus] = useState(false);
  const [avatarStatus, setAvatarStatus] = useState(false);

  const navigate = useNavigate();
  const formData = new FormData();

  // modal
  const { toggleShowEditModal } = useContext(ShowModalContext);
  const handleClose = () => {
    if (user.introduction === null) {
      setIntorduction("請輸入自我介紹");
    } else {
      setIntorduction(user.introduction);
    }
    setUserName(user.name);
  };

  function handleSave() {
    if (userName.length === 0) {
      setErrorMessage({ ...errorMessage, name: "名稱不能為空白" });
      return;
    } else if (userName.length > 50) {
      setErrorMessage({ ...errorMessage, name: "名稱不能超過50字" });
      return;
    } else if (inroduction?.length > 160) {
      setErrorMessage({ ...errorMessage, introduction: "自我介紹最多160字" });
      return;
    }
  }

  const handleSaveInfo = () => {
    if (
      userName.length > 0 &&
      inroduction.length > 0 &&
      userName.length <= 50 &&
      inroduction.length <= 160
    ) {
      handleSaveClick();
      handleClose();
      handleSave();
    }
  };

  // Cover
  const inputfileref = useRef(userCover);
  const handleOnClickUpload = () => {
    inputfileref.current.click();
  };
  const [imageSrc, setImageSrc] = useState("");
  const handleOnPreview = (event) => {
    const file = event.target.files[0];
    setUserCover(file);
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        // convert image file to base64 string
        setImageSrc(reader.result);
      },
      false
    );
    setCoverStatus(true);

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleDeletePreview = () => {
    setImageSrc("");
    setCoverStatus(false);
    handleRemoveFile();
    setUserCover(inputfileref.current);
  };
  const handleRemoveFile = () => {
    inputfileref.current.value = "";
  };

  // avatar
  const avatarRef = useRef(userAvatar);
  const handleOnAvatarUpload = () => {
    avatarRef.current.click();
  };
  const [modalAvatar, setModalAvatar] = useState("");
  const handleOnAvatar = (event) => {
    const file = event.target.files[0];
    setUserAvatar(file);
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        setModalAvatar(reader.result);
        localStorage.setItem("avatar", reader.result);
        setAvatarStatus(true);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // modal 更換名字與介紹
  const handleNameChange = (changeName) => {
    setUserName(changeName);
  };

  const handleIntrodrctionChange = (changeIntroduction) => {
    setIntorduction(changeIntroduction);
  };

  // modal 點擊儲存
  const handleSaveClick = () => {
    const id = localStorage.getItem("id");
    const userToken = localStorage.getItem("userToken");
    setUser({
      ...user,
      name: userName,
      introduction: inroduction,
      cover: imageSrc,
      avatar: modalAvatar,
    });
    formData.append("name", userName);
    formData.append("introduction", inroduction);
    formData.append("cover", userCover);
    formData.append("avatar", userAvatar);
    putPersonalInfoAsync(userToken, id, formData);
    setTimeout(function () {
      navigate("/");
    }, 1000);
  };

  const putPersonalInfoAsync = async (userToken, id, formData) => {
    try {
      await putPersonalInfo(userToken, id, formData);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getAccountInfoAsync = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const id = localStorage.getItem("id");
        const data = await getAccountInfo(userToken, id);
        setUser(data);
        setUserName(data.name);
        if (data.introduction === null) {
          setIntorduction("請輸入自我介紹");
        } else {
          setIntorduction(data.introduction);
        }

        setImageSrc(data.cover);
        setUserCover(data.cover);
        setModalAvatar(data.avatar);
        setUserAvatar(data.avatar);
        localStorage.setItem("tweetCount", data.tweetCount);
        localStorage.setItem("userName", data.name);
      } catch (error) {
        console.error(error);
      }
    };
    getAccountInfoAsync();
  }, [navigate]);

  return (
    <div className="modal">
      <div className="background">
        <ModalContainer className="ModalContainer">
          <div className="header">
            <CloseIcon
              className="close"
              onClose={handleClose}
              onClick={toggleShowEditModal}
            />
            <h5>編輯個人資料</h5>
            <StyledButton
              className="save active"
              onClick={handleSaveInfo}
              onSaveInfo={handleSaveClick}
            >
              儲存
            </StyledButton>
          </div>
          <div className="modalUserInfoContainer">
            <UserInfoPicture>
              <div className="modalCover">
                <img
                  width={640}
                  height={200}
                  // src={userCover}
                  src={user.cover}
                  alt=""
                  className="cover"
                  coverStatus={coverStatus}
                />
                <div className="changeCoverActions">
                  <div htmlFor="cover" className="cameraIcon">
                    <CameraIcon
                      onClick={handleOnClickUpload}
                      //
                    />
                    <input
                      type="file"
                      accept="image/*"
                      name="cover"
                      id="cover"
                      onChange={handleOnPreview}
                      // inputfileref={inputfileref}
                      ref={inputfileref}
                      //
                    />
                  </div>
                  <CloseIcon
                    className="removeIcon"
                    onClick={handleDeletePreview}
                  />
                </div>
              </div>
              <div className="modalAvatar">
                <div className="imgBox">
                  <div htmlFor="avatar" className="cameraIcon">
                    <CameraIcon onClick={handleOnAvatarUpload} />
                    <input
                      type="file"
                      accept="image/*"
                      name="avatar"
                      id="avatar"
                      ref={avatarRef}
                      onChange={handleOnAvatar}
                      // src={user.avatar}
                    />
                  </div>
                  <img
                    src={user.avatar}
                    avatarStatus={avatarStatus}
                    // src={userAvatar}
                    alt=""
                  />
                </div>
              </div>
            </UserInfoPicture>
            <UserInfoText>
              <input
                label="名稱"
                value={userName}
                errorMessage={errorMessage.name || null}
                onChange={(event) => {
                  handleNameChange?.(event.target.value);
                  setErrorMessage({ ...errorMessage, name: "" });
                }}
              />
              <div className="caption">{userName.length}/50</div>
              <textarea
                label="自我介紹"
                value={inroduction}
                errorMessage={errorMessage.introduction || null}
                onChange={(event) => {
                  handleIntrodrctionChange?.(event.target.value);
                  setErrorMessage({ ...errorMessage, introduction: "" });
                }}
              />
              <div className="caption">{inroduction.length}/160</div>
            </UserInfoText>
          </div>
        </ModalContainer>
      </div>
    </div>
  );
}

export default UserModal;
