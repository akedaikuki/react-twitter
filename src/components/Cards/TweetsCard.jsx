import React, { useState } from "react";

import { ReplyIcon, LikedIcon, LikeIcon } from "../../assets/icons";
import { TweetCardContainer } from "../common/tweet.styled";
import { Link } from "react-router-dom";
// import users from "../../API/users";
function TweetsCard({
  userId,
  key,
  account,
  name,
  avatar,
  tweets,
  repliedTotal,
  likesTotal,
}) {
  return (
    <>
      {/* users */}
      <TweetCardContainer className="tweetCardContainer" id={userId}>
        <Link className="userAvatar" to={`/otheruser/:id/?id=${userId}`}>
          <img
            src={avatar}
            alt="other User's avatar"
            style={{ marginTop: "0" }}
          />
        </Link>
        <div className="right">
          <Link className="name_link" to={`/otheruser/:id/?id=${userId}`}>
            <span className="tweetname">{name}</span>
            <span className="tweetaccount">@{account}</span>

            <span className="time">・3小時</span>
          </Link>

          <Link className="tweetContent_link" to={`/user/:id/tweets`}>
            <p className="tweetP">{tweets}</p>
          </Link>
          <div className="user_action">
            <span className="replyIcon">
              <ReplyIcon />
              {repliedTotal}
            </span>
            <span className="likeIcon">
              <LikedIcon />
              {/* <LikeIcon /> */}
              {likesTotal}
            </span>
          </div>
          {/*  */}
        </div>
      </TweetCardContainer>
    </>
  );
}

export default TweetsCard;
