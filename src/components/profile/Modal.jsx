import React, { useRef, useState } from "react";
import styled from "styled-components";
import { CloseIcon } from "../../assets/icons";
import { StyledButton } from "../common/button.styled";
// import { StyledCardContainer } from "../Cards/TweetsCard";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(calc(-50% - 37px));
  margin: 0;
  width: 634px;
  opacity: initial;
  overflow: hidden;
  border-radius: 14px;
  background-color: var(--main_white);
  z-index: 200;
  outline: 1px solid tomato;

  .modalHeader {
    border-bottom: 1px solid var(--border_gray);
    height: unset;
    padding: unset;
    .close {
      margin: 20px;
      cursor: pointer;
    }
  }
`;
const StyledCardContainer = styled.div`
  display: flex;
  padding: 16px 0;
  /* border: 1px solid ${(props) =>
    props.modal ? "transparent" : "#E6ECF0"}; */
  /* cursor: ${(props) => (props.comment ? "default" : "pointer")}; */

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 24px;
    margin-right: 8px;
  }
  .left {
    position: relative;
    display: flex;
    flex-direction: column;
    /* border: 2px solid; */
  }

  .right {
    width: 100%;
    .name-link {
      display: block;
      width: 30%;
      .name {
        display: block;
        font-size: 16px;
        font-weight: 700;
        line-height: 26px;
        margin-right: 8px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .account,
    .created-time,
    .reply-to {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: var(--account_text-in-main);
    }
    .reply-to {
      span {
        color: var(--main_orange);
      }
    }
    a.description-link {
      display: block;
      width: 100%;
      p {
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        margin-right: 24px;
      }
    }

    .user-actions {
      margin-top: 9px;
      z-index: 3;
      span {
        margin-right: 41.3px;
        font-family: "Montserrat", sans-serif;
        font-size: 14px;
        font-weight: 600;
        line-height: 14px;
        color: var(--account_text-in-main);
      }
    }
  }
`;
const StyledConnectLine = styled.div`
  position: absolute;
  width: 2px;
  margin-left: 49px;
  margin-top: 16px;
  top: 50px;
  bottom: -10px;
  background-color: var(--reply-connect-line);
`;
const StyledTextareaContainer = styled.div`
  /* position: relative; */
  display: flex;
  width: 100%;
  height: ${(props) => (props.modal ? "243px" : "136px")};
  img {
    margin: 16px 25px;
    margin-right: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--border_gray);
  }
  textarea {
    width: 85%;
    resize: none;
    border: none;
    &[placeholder] {
      margin-top: 28px;
      margin-left: 8px;
      font-size: 18px;
      font-weight: ${(props) => (props.modal ? "400" : "700")};
      line-height: 26px;
      color: var(--textarea-placeholder);
    }
    outline: 0;
    :focus {
      border: none;
    }
  }
  .action-panel {
    display: flex;
    justify-content: end;
    align-items: center;
    position: absolute;
    bottom: 16px;
    right: 24px;
    .error-msg {
      margin-right: 20px;
      font-weight: 500;
      font-size: 15px;
      line-height: 15px;
      color: var(--main_error);
    }
  }
`;

function Modal({
  tweetId,
  active,
  showModal,
  setShowModal,
  personalInfo,
  onReply,
  onPages,
  avatar,
  name,
  account,
  createdAt,
  description,
  setReplyTweetId,
}) {
  const navigate = useNavigate();
  // const [showModal, setShowModal] = useState(false);
  // const tweetRef = useRef(null);
  // const [draft, setDraft] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  // const handleShow = () => setShowModal(true);

  return showModal ? (
    <StyledModalContainer>
      <div className="modalHeader">
        <CloseIcon
          className="close"
          onClick={() => {
            setShowModal(false);
            if (onPages) {
              navigate(-1);
            }
          }}
        />
      </div>
      {/* reply */}
      {/* {onReply && (
        <StyledCardContainer modal={showModal}>
          <div className="left">
            <img src="{avatar}" alt="{name}" />
            <StyledConnectLine />
          </div>
          <div className="right">
            <span className="name">name</span>
            <span className="account">@account</span>
            <span className="created-time">
              {" "}
              ·{" "}
              {Array.isArray(createdAt)
                ? `${createdAt[0]} ${createdAt[1]}`
                : createdAt}
            </span>
            <p>description</p>
          </div>
        </StyledCardContainer>
      )} */}
      {/* Tweettextbox */}
      <StyledTextareaContainer>
        <img src="" alt="你的頭像" />
        <textarea
          name=""
          id=""
          cols="50"
          rows="5"
          placeholder={onReply ? "推你的回覆" : "有什麼新鮮事?"}
          ref={null}
          // value={""}
          // onChange={(e) => {
          //   setErrorMsg(null);
          //   setDraft(e.target.value);
          // }}
        ></textarea>
        <div className="action-panel">
          <p className="error-msg">
            {"".length > 140 ? "字數不可超過 140 字!" : ""}
            {errorMsg !== null && errorMsg}
          </p>
          <StyledButton
            className="post-tweet active"
            // onClick={onReply ? handleReply : handleTweet}
          >
            {onReply ? "回覆" : "推文"}
          </StyledButton>
        </div>
      </StyledTextareaContainer>
    </StyledModalContainer>
  ) : null;
}

export default Modal;
