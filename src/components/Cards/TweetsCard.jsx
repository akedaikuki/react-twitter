import React, { useState } from "react";
import { ReplyIcon, LikedIcon, LikeIcon } from "../../assets/icons";
import { TweetCardContainer } from "../common/tweet.styled";
import { Link } from "react-router-dom";
import relativeTime from "../../utilities/relativeTime";
// import users from "../../API/users";
function TweetsCard({
  userId,
  key,
  account,
  createdAt,
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
        <Link
          className="userAvatar"
          to={`/api/otherusers/:UserId/?id=${userId}`}
        >
          <img
            src={avatar}
            alt="other User's avatar"
            style={{ marginTop: "0" }}
          />
        </Link>
        <div className="right">
          <Link
            className="name_link"
            to={`/api/otherusers/:UserId/?id=${userId}`}
          >
            <span className="name">{name}</span>
            <span className="account">@{account}</span>

            <span className="time">・{relativeTime(createdAt)}</span>
          </Link>

          <Link
            className="tweetContent_link"
            to={"/api/tweets/:tweet_id/replies"}
          >
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
