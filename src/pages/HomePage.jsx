import React, { useState, useMemo, useContext, useEffect } from "react";
import { styled } from "styled-components";
import HomeTweetsCard from "../components/Cards/HomeTweetsCard";
import { StyledButton } from "../components/common/button.styled";
import { PageStyle } from "../components/common/page.styled";
// import user1 from "../API/user1";
// import users from "../API/users";
import Popular from "../components/Popular";
import relativeTime from "../utilities/relativeTime";
import SideBarModal from "../components/profile/SideBarModal";
import TweetReplyModal from "../components/profile/TweetReplyModal";
import TweetReplyModalForHome from "../components/profile/TweetReplyModalForHome";
import {
  ShowModalContext,
  toggleShowReplyModal,
  ShowModalContextProvider,
} from "../Context/ShowModalContext";
// import { useAuth } from "../components/contexts/AuthContext";
import { useTweetData } from "../components/contexts/DataContext";
import { getTweets } from "../API/tweets";
import { getUserInfo } from "../API/user";
import { useNavigate } from "react-router-dom";
import { useUserPostModal } from "../Context/MainPageContext";
import { getAccountInfo } from "../API/usercopy";
import { Toast } from "../utilities/sweetalert";

const HomePageContainer = styled.div`
  width: 640px;

  .HomePage {
    position: sticky;
    background-color: var(--main_white);
  }

  .divider {
    width: 100%;
    height: 10px;
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
      &:hover {
        background-color: var(--btn-hover-bg);
      }
      &[disabled] {
        opacity: 65%;
      }
    }
  }
`;

function HomeList({
  onUserReply,
  text,
  setText,
  // showReplyModal,
  // toggleShowReplyModal,
  onAvatarClick,
}) {
  const { homeList, onHomeList } = useUserPostModal();
  // const [replyToData, setReplyToData] = useState({});
  const [personalInfo, setPersonalInfo] = useState({});
  // const [replyTweetId, setReplyTweetId] = useState();
  const { showReplyModal, toggleShowReplyModal } = useContext(ShowModalContext);
  useEffect(() => {
    const getUserDataAsync = async (userToken) => {
      try {
        const data = await getTweets(userToken);
        onHomeList(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (localStorage.getItem("userToken")) {
      getUserDataAsync(localStorage.getItem("userToken"));
    }
  }, []);

  useEffect(() => {
    const getAccountInfoAsync = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const id = localStorage.getItem("id");
        const data = await getAccountInfo(userToken, id);
        setPersonalInfo(data);
        // console.log(data);
        localStorage.setItem("tweetCount", data.tweetCount);
        localStorage.setItem("userName", data.name);
      } catch (error) {
        console.error(error);
      }
    };
    getAccountInfoAsync();
  }, []);

  return (
    <>
      {showReplyModal ? (
        <TweetReplyModalForHome
          // tweetId={replyToData.tweetId}
          // avatar={replyToData.avatar}
          // name={replyToData.name}
          // account={replyToData.account}
          // createdAt={replyToData.createdAt}
          // description={replyToData.description}
          personalInfo={personalInfo}
          // TweetId={TweetId}
          text={text}
          setText={setText}
          // tweet={homeList}
          onUserReply={onUserReply}
          // errorMsg={errorMsg}
          // onChange={handleChange}
        />
      ) : null}
      {homeList.map((item) => (
        <HomeTweetsCard
          tweet={item}
          TweetId={item.TweetId}
          key={item.TweetId}
          id={item.tweetOwnerId}
          isLiked={item.isLiked}
          likeCount={item.likeCount}
          // setReplyToData={setReplyToData}
          // replyTweetId={replyTweetId}
          // setReplyTweetId={setReplyTweetId}
          // tweetOwnerId={item.data.tweetOwnerId}
          // account={item.data.tweetOwnerAccount}
          // name={item.data.tweetOwnerName}
          // avatar={item.data.tweetOwnerAvatar}
          // tweets={item.data.description}
          // repliedTotal={item.data.replyCount}
          // likesTotal={item.data.likeCount}
          // userId={item.data.id}
          // createdAt={item.data.createdAt}
          // isLiked={item.data.isLiked}
          // personalInfo={personalInfo}
          onAvatarClick={onAvatarClick}
        />
      ))}
    </>
  );
}

function HomePage() {
  // const [userInfo, setUserInfo] = useState(user1);
  // const [usersInfo, setUsersInfo] = useState(users);
  const [text, setText] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const { showPostModal, toggleShowPostModal } = useContext(ShowModalContext);
  const { showReplyModal, toggleShowReplyModal } = useContext(ShowModalContext);
  // console.log(usersInfo[0].data.user[0].avatar);
  // 串接
  // const [tweets, setTweets] = useState([]);
  // const [personalInfo, setPersonalInfo] = useState({});
  // const [replyToData, setReplyToData] = useState({});
  // const { isAuthenticated, currentMember } = useAuth();
  // const [avatar, setAvatar] = useState("");
  // const [userTextNothing, setUserTextNoting] = useState(false);
  const navigate = useNavigate();
  const { homeList, onHomeList, onAddHomeList } = useUserPostModal();
  const { onUserReply } = useUserPostModal();
  const avatar = localStorage.getItem("avatar");
  // const [avatar, setAvatar] = useState("");
  useEffect(() => {
    const getUserDataAsync = async (userToken) => {
      try {
        const data = await getTweets(userToken);
        onHomeList(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (localStorage.getItem("userToken")) {
      getUserDataAsync(localStorage.getItem("userToken"));
    }
  }, []);

  // 點擊 avatar 後移至 other
  const handleAvatarClick = (clickId) => {
    const id = localStorage.getItem("id");
    // const otherId = localStorage.getItem("otherId");
    if (Number(clickId) === Number(id)) {
      navigate(`/users`);
    } else {
      localStorage.setItem("otherId", clickId);
      // localStorage.setItem("TweetId", TweetId);
      navigate(`/other`);
    }
  };
  const handleChange = (e) => {
    setErrorMsg(null);
    setText(e.target.value);
  };

  const handlePost = async () => {
    if (text.length === 0) {
      return;
    } else {
      Toast.fire({
        title: "推文發送成功",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        position: "top",
      });
      setText("");
      onAddHomeList(text);
    }
  };

  const isValid = useMemo(() => {
    if (!text || text.length > 140) {
      return false;
    }
    return true;
  }, [text]);

  return (
    <>
      <HomePageContainer className="homePageContainer">
        <PageStyle>
          <div className="HomePage">
            <header>
              <h4 className="home">首頁</h4>
            </header>

            <Tweettextbox className="tweettextbox">
              <img src={avatar} alt="user avatar" />

              <textarea
                className="tweettext"
                id="tweettext"
                rows="3"
                placeholder="有什麼新鮮事?"
                value={text}
                onAddHomeList={onAddHomeList}
                onChange={handleChange}

                // onClick={toggleShowPostModal}
              ></textarea>

              <div className="panel">
                <p className="error_msg">
                  {text.length > 140 ? "字數不可超過 140 字" : ""}
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

            <div className="divider"></div>
          </div>
          <HomeList
            text={text}
            setText={setText}
            onClick={toggleShowReplyModal}
            onAddHomeList={onAddHomeList}
            onAvatarClick={handleAvatarClick}
          />
        </PageStyle>
      </HomePageContainer>
      <Popular onAvatarClick={handleAvatarClick} />

      {showPostModal && <SideBarModal onAddHomeList={onAddHomeList} />}
      {/* {showReplyModal ? (
        <TweetReplyModal
          TweetId={TweetId}
          text={text}
          tweet={homeList}
          onUserReply={onUserReply}
          errorMsg={errorMsg}
          onChange={handleChange}
        />
      ) : null} */}
    </>
  );
}
export default HomePage;
