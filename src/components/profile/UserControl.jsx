import React, { useState, useContext } from "react";
import clsx from "clsx";
import TweetReplyCard from "../Cards/TweetReplyCard";
import TweetsCard from "../Cards/TweetsCard";
import { StyledTabbar } from "../../components/common/tab.styled";
import user1 from "../../API/user1";
import users from "../../API/users";
import { useNavigate } from "react-router-dom";
import { UserControlContext } from "../../Context/UserControlClickContext";

function UserControl() {
  const { userActiveTab, setUserActiveTab } = useContext(UserControlContext);
  const [userInfo, setUserInfo] = useState(user1);
  const [usersInfo, setUsersInfo] = useState(users);
  const navigate = useNavigate();
  return (
    <div className="userControl">
      <div active={"active"}>
        <div />
      </div>
      <StyledTabbar>
        <button
          className={
            "userTab" + clsx(" ", { active: userActiveTab === "tweets" })
          }
          onClick={() => {
            if (userActiveTab !== "tweets") {
            }
            setUserActiveTab("tweets");
            // navigate("tweets");
          }}
        >
          推文
        </button>
        <button
          className={
            "userTab" +
            clsx(" ", { active: userActiveTab === "replied_tweets" })
          }
          onClick={() => {
            if (userActiveTab !== "replied_tweets") {
            }
            setUserActiveTab("replied_tweets");
            // navigate("replied_tweets");
          }}
        >
          回覆
        </button>
        <button
          className={
            "userTab" + clsx(" ", { active: userActiveTab === "likes" })
          }
          onClick={() => {
            if (userActiveTab !== "likes") {
            }
            setUserActiveTab("likes");
            // navigate("likes");
          }}
        >
          喜歡的內容
        </button>
      </StyledTabbar>
      <div className="tweetList">
        {usersInfo.map((usersInfo) => {
          if (userActiveTab === "replied_tweets") {
            return (
              <TweetReplyCard
                key={usersInfo.data.user[0].id}
                account={usersInfo.data.user[0].account}
                name={usersInfo.data.user[0].name}
                avatar={usersInfo.data.user[0].avatar}
                tweets={usersInfo.data.Tweets[0].description}
                repliedTweets={usersInfo.data.repliedTweets[0].description}
                repliedTotal={usersInfo.data.repliedTweets[0].repliedTotal}
                likesTotal={usersInfo.data.likes[0].likesTotal}
                userId={usersInfo.data.user[0].id}
                createdAt={usersInfo.data.repliedTweets[0].createdAt}
                user1account={userInfo[0].data.user[0].account}
              />
            );
          } else if (userActiveTab === "tweets") {
            return (
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
            );
          } else {
            //使用者喜歡的內容
            return (
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
                userActiveTab={userActiveTab}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default UserControl;
