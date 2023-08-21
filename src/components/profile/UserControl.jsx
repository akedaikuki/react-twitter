import React, {useState} from "react"
import clsx from "clsx";
import TweetReplyCard from "../Cards/TweetReplyCard"
import TweetsCard from "../Cards/TweetsCard"
import { StyledTabbar } from "../../components/common/tab.styled";

function UserControl() {
  const [activeTab, setActiveTab] = useState("tweet");
  const [panelData, setPanelData] = useState([]);
  return (
    <div className="user-panel">
      <div active={"active"}>
        <div
        />
      </div>
      <StyledTabbar>
        <button
          className={
            "user-action-tab" + clsx(" ", { active: activeTab === "tweet" })
          }
          onClick={() => {
            if (activeTab !== "tweet") {
              setPanelData([]);
            }
            setActiveTab("tweet");
          }}
        >
          推文
        </button>
        <button
          className={
            "user-action-tab" + clsx(" ", { active: activeTab === "reply" })
          }
          onClick={() => {
            if (activeTab !== "reply") {
              setPanelData([]);
            }
            setActiveTab("reply");
          }}
        >
          回覆
        </button>
        <button
          className={
            "user-action-tab" + clsx(" ", { active: activeTab === "like" })
          }
          onClick={() => {
            if (activeTab !== "like") {
              setPanelData([]);
            }
            setActiveTab("like");
          }}
        >
          喜歡的內容
        </button>
      </StyledTabbar>
      <div className="tweet-list">
        {panelData.map((item) => {
          if (activeTab === "reply") {
            return (
              <TweetReplyCard
                key={item.id}
                userId={item.UserId}
                avatar={item.User.avatar}
                name={item.User.name}
                account={item.User.account}
                createdAt={item.createdAt}
                replyTo={item.Tweet.User.account}
                comment={item.comment}
              />
            );
          } else if (activeTab === "tweet") {
            return (
              <TweetsCard
                key={item.id}
                userId={item.User.id}
                tweetId={item.id}
                personalInfo={personalInfo}
                avatar={item.User.avatar}
                name={item.User.name}
                account={item.User.account}
                createdAt={item.createdAt}
                description={item.description}
                replyCount={item.replyCount}
                likeCount={item.likeCount}
                isLiked={item.isLiked}
                setActive={setActive}
                setReplyToData={setReplyToData}
                replyTweetId={replyTweetId}
                setReplyTweetId={setReplyTweetId}
              />
            );
          } else {
            //使用者喜歡的內容
            return (
              <TweetsCard
                key={item.id}
                tweetId={item.TweetId}
                userId={item.Tweet.User.id}
                personalInfo={personalInfo}
                avatar={item.Tweet.User.avatar}
                name={item.Tweet.User.name}
                account={item.Tweet.User.account}
                createdAt={item.Tweet.createdAt}
                description={item.Tweet.description}
                replyCount={item.Tweet.replyCount}
                likeCount={item.Tweet.likeCount}
                isLiked={item.Tweet.isLiked}
                setActive={setActive}
                setReplyToData={setReplyToData}
                setPanelData={setPanelData}
                replyTweetId={replyTweetId}
                setReplyTweetId={setReplyTweetId}
                activeTab={activeTab}
              />
            );
          }
        })}
      </div>
      {/* <PostTweets arr={tweetsData} /> */}
    </div>
  );
}

export default UserControl