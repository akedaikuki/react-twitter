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
}) {
  const { showReplyModal, toggleShowReplyModal } = useContext(ShowModalContext);
  // const [showLike, setShowLike] = useState(tweet.isLiked);
  // const [countLike, setCountLike] = useState(tweet.likeCount);
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
  };

  const handlePost = async () => {
    if (text.length === 0) {
      return;
    }
    setText("");
    onAddHomeList(text);
  };

  const isValid = useMemo(() => {
    if (!text || text.length > 140) {
      return false;
    }
    return true;
  }, [text]);

  const handleLikeIcon = async (TweetId) => {
    const userToken = localStorage.getItem("userToken");
    try {
      if (tweet.isLiked === true) {
        await userUnLikeTweet({ userToken, TweetId });
        onUnLike(TweetId);
        // console.log(TweetId);
        onPostList?.({ TweetId, likeCount: -1 });
        onUserLikeList?.({ TweetId, likeCount: -1 });
      } else {
        await userLikeTweet({ userToken, TweetId });
        onLike(TweetId);
        onPostList?.({ TweetId, likeCount: 1 });
        onUserLikeList?.({ TweetId, likeCount: 1 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TweetCardContainer className="tweetCardContainer" id={tweet.id}>
        <Link className="userAvatar" to={`/api/users/${id}/tweets`}>
          <img
            src={tweet.tweetOwnerAvatar}
            alt="other User's avatar"
            style={{ marginTop: "0" }}
            onClick={() => onAvatarClick?.(tweet.tweetOwnerId)}
          />
        </Link>
        <div className="right">
          <Link className="name_link" to={`/api/users/${id}/tweets`}>
            <span className="name">{tweet.tweetOwnerName}</span>
            <span className="account">@{tweet.tweetOwnerAccount}</span>

            <span className="time">・{relativeTime(tweet.createdAt)}</span>
          </Link>

          <Link
            className="tweetContent_link"
            onClick={() => {
              onTheTweetId(TweetId);
            }}
            to={`/api/tweets/${TweetId}`}
          >
            <p className="tweetP">{tweet.description}</p>
          </Link>
          <div className="card-footer" style={{ display: "flex" }}>
            <ReplyIconStyle>
              <ReplyIcon className="reply" onClick={toggleShowReplyModal} />
              <span className="en-font-family">{tweet.replyCount}</span>
            </ReplyIconStyle>
            {tweet.isLiked ? (
              <LikeIconStyle
                style={{ marginLeft: "15px" }}
                onClick={() => {
                  handleLikeIcon();
                  onTheTweetId(TweetId);
                }}
              >
                <LikedIcon className="like active" />
                <span className="en-font-family">{tweet.likeCount}</span>
              </LikeIconStyle>
            ) : (
              <LikeIconStyle
                style={{ marginLeft: "15px" }}
                onClick={() => {
                  handleLikeIcon();
                  onTheTweetId(TweetId);
                }}
              >
                <LikeIcon className="like" />
                <span className="en-font-family">{tweet.likeCount}</span>
              </LikeIconStyle>
            )}
          </div>
          {/*  */}
        </div>
      </TweetCardContainer>
      {showReplyModal && (
        <TweetReplyModal
          text={text}
          tweet={tweet}
          onUserReply={onUserReply}
          errorMsg={errorMsg}
        />
      )}
    </>
  );
}

export default TweetsCard;
