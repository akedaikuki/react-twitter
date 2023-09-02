import React, { useState, useContext, useMemo } from "react";
import { ReplyIcon, LikedIcon, LikeIcon } from "../../assets/icons";
import { TweetCardContainer } from "../common/tweet.styled";
import { Link } from "react-router-dom";
import relativeTime from "../../utilities/relativeTime";
import { ShowModalContext } from "../../Context/ShowModalContext";
import TweetReplyModal from "../profile/TweetReplyModal";
import { styled } from "styled-components";
import { userLikeTweet, userUnLikeTweet } from "../../API/usercopy";
import { useUserPostModal } from "../../Context/MainPageContext";
import { TweetIdContext } from "../contexts/DataContext";
import { Toast } from "../../utilities/sweetalert";

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
  isLiked,
  likeCount,
  onPostList,
  onUserLikeList,
  onAvatarClick,
  onClickShowLike,
  onLikeClick,
  showLike,
}) {
  const { showReplyModal, toggleShowReplyModal } = useContext(ShowModalContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const { onLike, onUnLike } = useUserPostModal();
  const { onTheTweetId } = TweetIdContext();
  const { onUserReply } = useUserPostModal();
  const { onAddHomeList } = useUserPostModal();
  // const userId = TweetId;
  // const tweet_id = Number(TweetId);
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setErrorMsg(null);
    setText(e.target.value);
    // onAddHomeList(text);
  };

  // console.log(tweet);

  return (
    <>
      <TweetCardContainer className="tweetCardContainer" id={tweet.id}>
        <div className="userAvatar">
          <img
            src={tweet.tweetOwnerAvatar}
            alt="other User's avatar"
            style={{ marginTop: "0" }}
            onClick={() => onAvatarClick?.(tweet.tweetOwnerId)}
          />
        </div>
        <div className="right">
          <div className="name_link">
            <span className="name">{tweet.tweetOwnerName}</span>
            <span className="account">@{tweet.tweetOwnerAccount}</span>

            <span className="time">・{relativeTime(tweet.createdAt)}</span>
          </div>

          <Link
            className="tweetContent_link"
            onClick={() => {
              onTheTweetId(TweetId);
            }}
            to={`/tweets/${TweetId}`}
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
                onClickShowLike={onClickShowLike}
                onLikeClick={onLikeClick}
              >
                <LikedIcon className="like active" />
                <span className="en-font-family">{tweet.likeCount}</span>
              </LikeIconStyle>
            ) : (
              <LikeIconStyle
                style={{ marginLeft: "15px" }}
                onClickShowLike={onClickShowLike}
                onLikeClick={onLikeClick}
              >
                <LikeIcon className="like" />
                <span className="en-font-family">{tweet.likeCount}</span>
              </LikeIconStyle>
            )}
          </div>
          {/*  */}
        </div>
      </TweetCardContainer>
      {showReplyModal ? (
        <TweetReplyModal
          TweetId={TweetId}
          text={text}
          tweet={tweet}
          onUserReply={onUserReply}
          errorMsg={errorMsg}
          onChange={handleChange}
        />
      ) : null}
    </>
  );
}

export default TweetsCard;
