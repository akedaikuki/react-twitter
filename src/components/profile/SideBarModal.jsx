import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { CloseIcon } from "../../assets/icons";
import { StyledButton } from "../common/button.styled";
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
  outline: 1px solid tomato;
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
    }
  }
`;
function SideBarModal() {
  const [userInfo, setUserInfo] = useState(user1);
  const [tweetText, setTweetText] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  // console.log(usersInfo[0].data.user[0].avatar);
  const handleChange = (e) => {
    setErrorMsg(null);
    setTweetText(e.target.value);
  };

  const handlePost = async () => {
    if (tweetText.length === 0) {
      return;
    }
    setTweetText("");
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
    <ModalContainer className="ModalContainer">
      <div className="modalHeader">
        <CloseIcon
          className="close"
          // onClick={}
        />
        <div className="line"></div>
        <Tweettextbox className="Tweettextbox">
          <img src={userInfo[0].data.user[0].avatar} alt="user avatar" />

          <textarea
            className="tweettext"
            id="tweettext"
            rows="5"
            placeholder="有什麼新鮮事?"
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
  );
}

export default SideBarModal;
