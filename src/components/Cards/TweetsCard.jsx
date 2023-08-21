import React, { useState } from "react";

import { ReplyIcon, LikedIcon, LikeIcon } from "../../assets/icons";
import { TweetCardContainer } from "../common/tweet.styled";
// import users from "../../API/users";
function TweetsCard({
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
      <TweetCardContainer className="tweetCardContainer">
        <div className="userAvatar" id={key}>
          <img src={avatar} alt="other User's avatar" />
        </div>
        <div className="right">
          <div className="name_link">
            <span className="tweetname">{name}</span>
            <span className="tweetaccount">@{account}</span>

            <span className="time">・3小時</span>
          </div>

          <div className="tweetContent_link">
            <p className="tweetP">{tweets}</p>
          </div>
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
