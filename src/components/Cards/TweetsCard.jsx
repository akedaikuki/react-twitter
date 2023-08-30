import React, { useState, useContext } from "react";
import { ReplyIcon, LikedIcon, LikeIcon } from "../../assets/icons";
import { TweetCardContainer } from "../common/tweet.styled";
import { Link } from "react-router-dom";
import relativeTime from "../../utilities/relativeTime";
import { ShowModalContext } from "../../Context/ShowModalContext";
import TweetReplyModal from "../profile/TweetReplyModal";
import { styled } from "styled-components";

const ReplyIconStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--main_secondary);
  cursor: pointer;
  .reply {
    width: 1rem;
    height: 1rem;
  }
`;

const LikeIconStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--main_secondary);
  cursor: pointer;
  .like {
    width: 1rem;
    height: 1rem;
    fill: var(--main_white);

    stroke-width: 2px;
    &.active {
      fill: var(--main_error);
      stroke: var(--main_error);
    }
  }
`;

// import users from "../../API/users";
function TweetsCard({
  TweetId,
  tweet,
  id,
  onPostList,
  onUserLikeList,
  onAvatarClick,
  // userId,
  // tweetOwnerId,
  // account,
  // createdAt,
  // name,
  // avatar,
  // tweets,
  // isLiked,
  // repliedTotal,
  // likesTotal,
}) {
  const { showReplyModal, toggleShowReplyModal } = useContext(ShowModalContext);
  const [showLike, setShowLike] = useState(tweet.isLiked);
  const [countLike, setCountLike] = useState(tweet.likeCount);
  const userId = id;
  async function handleLikeClick(type) {
    if (type === "increment") {
      setCountLike(countLike + 1);
      try {
      } catch (error) {
        console.error(error);
      }
    } else if (type === "decrement") {
      setCountLike(countLike - 1);
      try {
      } catch (error) {
        console.error(error);
      }
    }
  }

  // 愛心狀態
  async function handleShowLike() {
    if (showLike === true) {
      setShowLike(false);
    } else if (showLike === false) {
      setShowLike(true);
    }
  }

  return (
    <>
      <TweetCardContainer
        className="tweetCardContainer"
        id={tweet.tweetOwnerId}
      >
        <Link
          className="userAvatar"
          to={`/api/otherusers/:UserId/?id=${userId}`}
        >
          <img
            src={tweet.tweetOwnerAvatar}
            alt="other User's avatar"
            style={{ marginTop: "0" }}
            onClick={() => onAvatarClick?.(tweet.tweetOwnerId)}
          />
        </Link>
        <div className="right">
          <Link
            className="name_link"
            to={`/api/otherusers/:UserId/?id=${userId}`}
          >
            <span className="name">{tweet.tweetOwnerName}</span>
            <span className="account">@{tweet.tweetOwnerAccount}</span>

            <span className="time">・{relativeTime(tweet.createdAt)}</span>
          </Link>

          <Link
            className="tweetContent_link"
            to={"/api/tweets/:tweet_id/replies"}
          >
            <p className="tweetP">{tweet.description}</p>
          </Link>
          <div className="card-footer" style={{ display: "flex" }}>
            <ReplyIconStyle>
              <ReplyIcon className="reply" onClick={toggleShowReplyModal} />
              <span className="en-font-family">{tweet.replyCount}</span>
            </ReplyIconStyle>
            {showLike ? (
              <LikeIconStyle
                style={{ marginLeft: "15px" }}
                onClick={() => {
                  handleShowLike();
                  handleLikeClick("decrement");
                }}
              >
                <LikeIcon className="like active" />
                <span className="en-font-family">{countLike}</span>
              </LikeIconStyle>
            ) : (
              <LikeIconStyle
                style={{ marginLeft: "15px" }}
                onClick={() => {
                  handleShowLike();
                  handleLikeClick("increment");
                }}
              >
                <LikeIcon className="like" />
                <span className="en-font-family">{countLike}</span>
              </LikeIconStyle>
            )}
          </div>
          {/*  */}
        </div>
      </TweetCardContainer>
    </>
  );
}

export default TweetsCard;
