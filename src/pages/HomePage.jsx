import React, { useState, useMemo } from "react";
import { styled } from "styled-components";
import TweetsCard from "../components/Cards/TweetsCard";
import { StyledButton } from "../components/common/button.styled";
import { PageStyle } from "../components/common/page.styled";
import user1 from "../API/user1";
import users from "../API/users";
import Popular from "../components/Popular";
import relativeTime from "../utilities/relativeTime";
import Modal from "../components/profile/Modal";

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
  // console.log(usersInfo[0].data.user[0].avatar);
  const handleChange = (e) => {
    setErrorMsg(null);
    setTweetText(e.target.value);
  };

  const handlePost = async () => {
    if (tweetText.length === 0) {
      setErrorMsg("內容不可空白");
      return;
    }
    const tweet = { description: tweetText };

    setTweetText("");
    // if (status === 200) {
    //   Swal.fire({
    //     position: "top",
    //     title: "推文發送成功！",
    //     timer: 1000,
    //     icon: "success",
    //     showConfirmButton: false,
    //   });
    // } else {
    //   Swal.fire({
    //     position: "top",
    //     title: "推文發送失敗！",
    //     timer: 1000,
    //     icon: "error",
    //     showConfirmButton: false,
    //   });
    // }
  };

  const isValid = useMemo(() => {
    if (!tweetText || tweetText.length > 140) {
      return false;
    }

    return true;
  }, [tweetText]);

  return (
    <>
      <div className="tweetsmodal">{/* <Modal /> */}</div>
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
            />
          ))}
        </PageStyle>
      </HomePageContainer>
      <Popular />
    </>
  );
}
export default HomePage;
