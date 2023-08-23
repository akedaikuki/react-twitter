import React from "react";
import { TweetCardContainer } from "../common/tweet.styled";
import { Link } from "react-router-dom";

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
      <TweetCardContainer className="tweetCardContainer" id={userId}>
        <Link className="userAvatar" to={`/api/otherusers/:id/?id=${userId}`}>
          <img src={avatar} alt="avatar" style={{ marginTop: "0" }} />
        </Link>
        <div className="right">
          <Link className="name_link" to={`/api/otherusers/:id/?id=${userId}`}>
            <span className="tweetname">{name}</span>
            <span className="tweetaccount">@{account}</span>

            <span className="time"> · 13 小時</span>
          </Link>

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
