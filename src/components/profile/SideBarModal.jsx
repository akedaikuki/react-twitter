import React, { useState, useMemo, useContext, useRef } from "react";
import styled from "styled-components";
import { CloseIcon } from "../../assets/icons";
import { StyledButton } from "../common/button.styled";
import { ShowModalContext } from "../../Context/ShowModalContext";
import Swal from "sweetalert2";

// API
import user1 from "../../API/user1";

const ModalContainer = styled.div`
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(calc(-50% - 37px));
  margin: 0;
  width: 634px;
  height: 300px;
  opacity: initial;
  overflow: hidden;
  border-radius: 14px;
  background-color: var(--main_white);
  z-index: 200;
  /* outline: 1px solid tomato; */
  .modalHeader {
    height: unset;
    padding: unset;
    .close {
      margin: 20px;
      cursor: pointer;
    }
  }

  .line {
    height: 1px;
    background-color: var(--border_gray);
  }
`;
const Tweettextbox = styled.div`
  display: flex;
  width: 100%;
  height: 136px;
  /* outline: 3px solid tomato; */

  textarea {
    width: 70%;
    resize: none;
    border: none;
    outline: 0;
    &[placeholder] {
      margin-top: 28px;
      margin-left: 8px;
      font-size: 18px;
      font-weight: 700;
      line-height: 15px;
      /* color: var(--textarea-placeholder); */
    }
    :focus {
      border: none;
    }
  }
  .panel {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 16px;
    right: 24px;
    .error_msg {
      margin-right: 20px;
      font-weight: 500;
      font-size: 15px;
      line-height: 15px;
      color: var(--main_error);
    }
    .tweet_post_btn {
      display: inline-flex;
      align-items: flex-start;
      color: var(--main_white);
      background-color: var(--main_orange);

      &[disabled] {
        opacity: 65%;
      }
      &:hover {
        background-color: var(--btn-hover-bg);
      }
    }
  }
`;
function SideBarModal() {
  const [userInfo, setUserInfo] = useState(user1);
  const [tweetText, setTweetText] = useState("");
  const tweetRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { toggleShowPostModal } = useContext(ShowModalContext);
  // console.log(usersInfo[0].data.user[0].avatar);

  //Swal 彈窗提示
  const successedAlert = () => {
    Swal.fire({
      position: "top",
      title: "推文發送成功！",
      timer: 1000,
      icon: "success",
      showConfirmButton: false,
    });
  };
  const failedAlert = () => {
    Swal.fire({
      position: "top",
      title: "推文發送失敗！",
      timer: 1000,
      icon: "error",
      showConfirmButton: false,
    });
  };

  const handleChange = (e) => {
    setErrorMsg(null);
    setTweetText(e.target.value);
  };

  const handlePost = async () => {
    if (tweetRef.current.value.length === 0) {
      return;
    }
    setTweetText("");

    const tweet = { description: tweetRef.current.value };
    // const status = await postTweet({ token, tweet });
    tweetRef.current.value = "";

    // if (status === 200) {
    //   successedAlert();
    // } else {
    //   failedAlert();
    // }
  };
  const isValid = useMemo(() => {
    if (!tweetText) {
      setErrorMsg("內容不可空白");
      return false;
    } else if (tweetText.length > 140) {
      return false;
    }

    return true;
  }, [tweetText]);

  return (
    <div className="modal">
      <div className="background">
        <ModalContainer className="ModalContainer">
          <div className="modalHeader">
            <CloseIcon className="close" onClick={toggleShowPostModal} />
            <div className="line"></div>
            <Tweettextbox className="Tweettextbox">
              <img src={userInfo[0].data.user[0].avatar} alt="user avatar" />

              <textarea
                className="tweettext"
                id="tweettext"
                rows="5"
                placeholder="有什麼新鮮事?"
                ref={tweetRef}
                value={tweetText}
                onChange={handleChange}
              ></textarea>

              <div className="panel">
                <p className="error_msg">
                  {tweetText.length > 140 ? "字數不可超過 140 字" : ""}
                  {errorMsg !== null && errorMsg}
                </p>

                <StyledButton
                  className="tweet_post_btn"
                  onClick={handlePost}
                  disabled={!isValid}
                >
                  推文
                </StyledButton>
              </div>
            </Tweettextbox>
          </div>
        </ModalContainer>
      </div>
    </div>
  );
}

export default SideBarModal;
