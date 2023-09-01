import React from "react";
import { TweetCardContainer } from "../common/tweet.styled";
// import { Link } from "react-router-dom";
import relativeTime from "../../utilities/relativeTime";

// const handleSubmit = ({ onUserReply, onClose, text, tweet }) => {
//   if (text.trim().length > 0) {
//     onUserReply?.({ TweetId: tweet.TweetId, text });
//     onClose();
//     localStorage.setItem("TweetId", tweet.TweetId);
//   }
// };

function TweetReplyCard({ tweet, id, reply, onAvatarClick }) {
  let Avatar;
  let ReplyerName;
  let ReplyerAccount;

  if (reply) {
    Avatar = tweet.replyOwnerAvatar;
    ReplyerName = tweet.replyOwnerName;
    ReplyerAccount = tweet.replyOwnerAccount;
  } else {
    Avatar = tweet.replyerAvatar;
    ReplyerName = tweet.replyerName;
    ReplyerAccount = tweet.replyerAccount;
  }
  console.log(tweet.tweetOwnerId);
  return (
    <>
      {/* reoly */}
      <TweetCardContainer className="tweetCardContainer">
        <div className="userAvatar">
          <img
            src={Avatar}
            onClick={() => onAvatarClick?.(tweet.tweetOwnerId)}
            alt="avatar"
            style={{ marginTop: "0" }}
          />
        </div>
        <div className="right">
          <div className="name_link">
            <span className="name">{ReplyerName}</span>
            <span className="account">@{ReplyerAccount}</span>

            <span className="time"> · {relativeTime(tweet.createdAt)}</span>
          </div>

          <p className="reply_to">
            回覆 <span>@{tweet.tweetOwnerAccount}</span>
          </p>
          <p className="tweetP">{tweet.comment}</p>
          {/*  */}
        </div>
      </TweetCardContainer>
    </>
  );
}

export default TweetReplyCard;
