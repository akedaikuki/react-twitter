import React, { useEffect, useState } from "react";
import clsx from "clsx";
import TweetReplyCard from "../Cards/TweetReplyCard";
import TweetsCard from "../Cards/TweetsCard";
import { StyledTabbar } from "../../components/common/tab.styled";
// import user1 from "../../API/user1";
// import users from "../../API/users";
import { useNavigate, redirect, Link } from "react-router-dom";
// import { getUserTweets } from "../../API/user";
import { getAccountInfo } from "../../API/usercopy";

const ContentItem = ({
  activeTab,
  // render,
  postList,
  replyList,
  userLikeList,
  onPostList,
  onUserLikeList,
  onAvatarClick,
}) => {
  if (activeTab === "tweets") {
    return postList.map((item) => (
      <TweetsCard
        tweet={item}
        key={item.TweetId}
        TweetId={item.TweetId}
        onPostList={onPostList}
        onUserLikeList={onUserLikeList}
        userLikeList={userLikeList}
        postList={postList}
        onAvatarClick={(clickId) => onAvatarClick?.(clickId)}
      />
    ));
  } else if (activeTab === "replied_tweets") {
    return replyList.map((item) => (
      <TweetReplyCard tweet={item} key={item.reaplyId} />
    ));
  } else if (activeTab === "likes") {
    return userLikeList.map((item) => (
      <TweetsCard
        tweet={item}
        key={item.TweetId}
        TweetId={item.TweetId}
        onPostList={onPostList}
        onUserLikeList={onUserLikeList}
        userLikeList={userLikeList}
        postList={postList}
        onAvatarClick={(clickId) => onAvatarClick?.(clickId)}
      />
    ));
  }
};

function UserControl({
  // render,
  postList,
  replyList,
  userLikeList,
  onPostList,
  onUserLikeList,
  onAvatarClick,
}) {
  const [activeTab, setActiveTab] = useState("tweets");
  // const [userInfo, setUserInfo] = useState(user1);
  // const [usersInfo, setUsersInfo] = useState(users);

  const [otherUser, setOtherUser] = useState([]);
  const otherId = localStorage.getItem("otherId");
  // console.log(postList);
  // const formData = new FormData();

  useEffect(() => {
    const getAccountInfoAsync = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const data = await getAccountInfo(userToken, otherId);
        setOtherUser(data);
        localStorage.setItem("tweetCount", data.tweetCount);
        localStorage.setItem("userName", data.name);
        return data;
      } catch (error) {
        console.error(error);
      }
    };
    getAccountInfoAsync();
  }, [localStorage.getItem("otherId")]);

  // const id = localStorage.getItem("id");
  return (
    <div className="userControl">
      <div active={"active"}>
        <div />
      </div>
      <StyledTabbar>
        <Link
          // to={`/api/users/${id}/tweets`}
          className={"userTab" + clsx(" ", { active: activeTab === "tweets" })}
          onClick={() => {
            if (activeTab !== "tweets") {
            }
            setActiveTab("tweets");
            // navigate("tweets");
          }}
        >
          推文
        </Link>
        <Link
          // to={`/api/users/${id}/replied_tweets`}
          className={
            "userTab" + clsx(" ", { active: activeTab === "replied_tweets" })
          }
          onClick={() => {
            if (activeTab !== "replied_tweets") {
            }
            setActiveTab("replied_tweets");
            // navigate("replied_tweets");
          }}
        >
          回覆
        </Link>
        <Link
          // to={`/api/users/${id}/likes`}
          className={"userTab" + clsx(" ", { active: activeTab === "likes" })}
          onClick={() => {
            if (activeTab !== "likes") {
            }
            setActiveTab("likes");
            // navigate("");
          }}
        >
          喜歡的內容
        </Link>
      </StyledTabbar>
      <div className="tweetList">
        <ContentItem
          activeTab={activeTab}
          // render={render}
          postList={postList}
          replyList={replyList}
          userLikeList={userLikeList}
          onPostList={onPostList}
          onUserLikeList={onUserLikeList}
          onAvatarClick={onAvatarClick}
        />

        {/* {usersInfo.map((usersInfo) => {
          if (activeTab === "replied_tweets") {
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
                user1account={userInfo[0].data.user[0].account}
              />
            );
          } else if (activeTab === "tweets") {
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
                activeTab={activeTab}
              />
            );
          }
        })} */}
      </div>
    </div>
  );
}

export default UserControl;
