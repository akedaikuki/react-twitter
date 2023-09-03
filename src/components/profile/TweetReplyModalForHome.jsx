import React, { useState, useMemo, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { CloseIcon } from "../../assets/icons";
import { StyledButton } from "../common/button.styled";
// import user1 from "../../API/user1";
import { TweetCardContainer } from "../common/tweet.styled";
// import users from "../../API/users";
import { Link, useNavigate } from "react-router-dom";
import userImg from "../../assets/images/img.png";
import relativeTime from "../../utilities/relativeTime";
import { ShowModalContext } from "../../Context/ShowModalContext";
// import Swal from "sweetalert2";
import {
  userAddTweets,
  userLikeTweet,
  userUnLikeTweet,
} from "../../API/tweets";
import { useUserPostModal } from "../../Context/MainPageContext";
import { TweetIdContext } from "../contexts/DataContext";
import Swal from "sweetalert2";
import { Toast } from "../../utilities/sweetalert";
import { getSingleTweetInfo } from "../../API/usercopy";

const ModalContainer = styled.div`
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(calc(-50% - 37px));
  margin: 0;
  width: 634px;
  height: 450px;
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
    }
  }
`;
const StyledConnectLine = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;

  &:before {
    content: "";
    position: absolute;
    top: 58px;
    left: -34px;
    width: 2px;
    height: calc(100% - 31px);
    background-color: var(--reply-connect-line);
  }
`;

const handleSubmit = ({
  onUserReply,
  text,
  tweet,
  replyTweet,
  // tweetId,
  toggleShowReplyModal,
}) => {
  if (text.trim().length > 0) {
    // const TweetId = localStorage.getItem("TweetId");
    onUserReply?.({ TweetId: replyTweet.TweetId, text });
    localStorage.setItem("TweetId", replyTweet.TweetId);

    toggleShowReplyModal();
    setTimeout(() => {
      Toast.fire({
        position: "top",
        title: "推文發送成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
    });
  }
};

function TweetReplyModal({
  tweetId,
  personalInfo,
  onReply,
  onPages,
  avatar,
  name,
  account,
  createdAt,
  description,
  // setReplyTweetId,
  // onUserReply,
  text,
  setText,
  // tweet,
  // onAddHomeList,
  onTheTweetId,
  onChange,
}) {
  // const [userInfo, setUserInfo] = useState(user1);
  // const [usersInfo, setUsersInfo] = useState(users);
  // const [text, setText] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [replyTweet, setReplyTweet] = useState([]);
  // const userToken = localStorage.getItem("userToken");
  const { toggleShowReplyModal } = useContext(ShowModalContext);
  // const [text, setText] = useState("");
  const tweetRef = useRef(null);
  const navigate = useNavigate();
  // const { toggleShowReplyModal } = useContext(ShowModalContext);

  const { onUserReply } = useUserPostModal();

  // console.log(usersInfo[0].data.user[0].avatar);
  const isValid = useMemo(() => {
    if (!text) {
      setErrorMsg("內容不可空白");
      return false;
    } else if (text.length > 140) {
      return false;
    }

    return true;
  }, [text]);
  const handleChange = (e) => {
    setErrorMsg(null);
    setText(e.target.value);
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const TweetId = localStorage.getItem("TweetId");
    const getDataAsync = async ({ userToken, TweetId }) => {
      try {
        const data = await getSingleTweetInfo({ userToken, TweetId });

        setReplyTweet(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (userToken) {
      getDataAsync({ userToken, TweetId });
    }
  }, [localStorage.getItem("replyListLength")]);
  // const handlePost = async () => {
  //   if (text.length === 0) {
  //     return;
  //   }
  //   setText("");
  //   onAddHomeList(text);
  // };

  // const avatar = localStorage.getItem("avatar");

  return (
    <div className="modal">
      <div className="background">
        <ModalContainer className="ModalContainer">
          <div className="modalHeader">
            <CloseIcon className="close" onClick={toggleShowReplyModal} />
            <div className="line"></div>
            <TweetCardContainer
              className="tweetCardContainer"
              style={{ outline: "0" }}
              // id={tweet.TweetId}
            >
              <div className="userAvatar">
                <img
                  src={replyTweet.tweetOwnerAvatar}
                  alt="other User's avatar"
                  style={{ marginTop: "0" }}
                />
              </div>
              <StyledConnectLine />
              <div className="right">
                <div className="name_link">
                  <span className="name">{replyTweet.tweetOwnerName}</span>
                  <span className="account">
                    @{replyTweet.tweetOwnerAccount}
                  </span>

                  <span className="time">
                    ・{relativeTime(replyTweet.createdAt)}
                  </span>
                </div>
                <div className="tweetContent_link">
                  <p className="tweetP">{replyTweet.description}</p>
                </div>

                {/*  */}
                <p className="reply_to">
                  回覆 <span>@{replyTweet.tweetOwnerName}</span>
                </p>
              </div>
            </TweetCardContainer>
            <Tweettextbox className="Tweettextbox">
              <img src={personalInfo.avatar} alt="user avatar" />

              <textarea
                className="tweettext"
                id="tweettext"
                rows="5"
                placeholder="推你的回覆"
                ref={tweetRef}
                value={text}
                onChange={handleChange}
              ></textarea>

              <div className="panel">
                <p className="error_msg">
                  {text.length > 140 ? "字數不可超過 140 字" : ""}
                  {errorMsg !== null && errorMsg}
                </p>

                <StyledButton
                  className="tweet_post_btn"
                  onClick={() =>
                    handleSubmit({
                      // tweet,
                      replyTweet,
                      text,
                      onUserReply,
                      toggleShowReplyModal,
                    })
                  }
                  // onAddHomeList={onAddHomeList}
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

export default TweetReplyModal;
