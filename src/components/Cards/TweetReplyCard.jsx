import React from "react";
import { TweetCardContainer } from "../common/tweet.styled";

function TweetReplyList({
  key,
  account,
  name,
  avatar,
  tweets,
  repliedTweets,
  repliedTotal,
  likesTotal,
  userId,
  user1account,
}) {
  return (
    <>
      {/* reoly */}
      <TweetCardContainer className="tweetCardContainer" id={key}>
        <div className="userAvatar" id={key}>
          <img src={avatar} alt="avatar" />
        </div>
        <div className="right">
          <div className="name_link">
            <span className="tweetname">{name}</span>
            <span className="tweetaccount">@{account}</span>

            <span className="time"> · 13 小時</span>
          </div>

          <p className="reply_to">
            回覆 <span>@{user1account}</span>
          </p>
          <p className="tweetP">{repliedTweets}</p>
          {/*  */}
        </div>
      </TweetCardContainer>
    </>
  );
}

export default TweetReplyList;
