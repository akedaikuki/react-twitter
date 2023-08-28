import React, { useState, useMemo, useContext } from "react";
import { styled } from "styled-components";
import TweetsCard from "../components/Cards/TweetsCard";
import { StyledButton } from "../components/common/button.styled";
import { PageStyle } from "../components/common/page.styled";
import user1 from "../API/user1";
import users from "../API/users";
import Popular from "../components/Popular";
import relativeTime from "../utilities/relativeTime";
import SideBarModal from "../components/profile/SideBarModal";
import TweetReplyModal from "../components/profile/TweetReplyModal";
import { ShowModalContext } from "../Context/ShowModalContext";

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

function HomePage() {
  const [userInfo, setUserInfo] = useState(user1);
  const [usersInfo, setUsersInfo] = useState(users);
  const [tweetText, setTweetText] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const { showPostModal, toggleShowPostModal } = useContext(ShowModalContext);
  const { showReplyModal, toggleShowReplyModal } = useContext(ShowModalContext);
  // console.log(usersInfo[0].data.user[0].avatar);
  const handleChange = (e) => {
    setErrorMsg(null);
    setTweetText(e.target.value);
  };

  const handlePost = async () => {
    if (tweetText.length === 0) {
      return;
    }
    // const tweet = { description: tweetText };

    setTweetText("");
  };

  const isValid = useMemo(() => {
    if (!tweetText || tweetText.length > 140) {
      return false;
    }

    return true;
  }, [tweetText]);

  return (
    <>
      <HomePageContainer className="homePageContainer">
        <PageStyle>
          <div className="HomePage">
            <header>
              <h4 className="home">首頁</h4>
            </header>

            <Tweettextbox className="tweettextbox">
              <img src={userInfo[0].data.user[0].avatar} alt="user avatar" />

              <textarea
                className="tweettext"
                id="tweettext"
                rows="5"
                placeholder="有什麼新鮮事?"
                value={tweetText}
                onChange={handleChange}
                // onClick={toggleShowPostModal}
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

            <div className="divider"></div>
          </div>
          {usersInfo.map((usersInfo) => (
            <TweetsCard
              key={usersInfo.data.user[0].id}
              account={usersInfo.data.user[0].account}
              name={usersInfo.data.user[0].name}
              avatar={usersInfo.data.user[0].avatar}
              tweets={usersInfo.data.Tweets[0].description}
              repliedTotal={usersInfo.data.repliedTweets[0].repliedTotal}
              likesTotal={usersInfo.data.likes[0].likesTotal}
              userId={usersInfo.data.user[0].id}
              createdAt={usersInfo.data.Tweets[0].createdAt}
              onClick={toggleShowReplyModal}
            />
          ))}
        </PageStyle>
      </HomePageContainer>
      <Popular />

      {showPostModal && <SideBarModal />}
      {showReplyModal && <TweetReplyModal />}
    </>
  );
}
export default HomePage;
