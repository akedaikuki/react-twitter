import React from "react";
import { TweetCardContainer } from "../common/tweet.styled";
import { Link } from "react-router-dom";
import relativeTime from "../../utilities/relativeTime";

// const handleSubmit = ({ onUserReply, onClose, text, tweet }) => {
//   if (text.trim().length > 0) {
//     onUserReply?.({ TweetId: tweet.TweetId, text });
//     onClose();
//     localStorage.setItem("TweetId", tweet.TweetId);
//   }
// };

function TweetReplyList({ tweet, id, reply, onAvatarClick }) {
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

  return (
    <>
      {/* reoly */}
      <TweetCardContainer className="tweetCardContainer">
        <Link className="userAvatar" to={`/api/otherusers/${id}/?id=${id}`}>
          <img
            src={Avatar}
            onClick={() => onAvatarClick?.(tweet.replyOwnerId)}
            alt="avatar"
            style={{ marginTop: "0" }}
          />
        </Link>
        <div className="right">
          <Link className="name_link" to={`/api/otherusers/${id}/?id=${id}`}>
            <span className="name">{ReplyerName}</span>
            <span className="account">@{ReplyerAccount}</span>

            <span className="time"> · {relativeTime(tweet.createdAt)}</span>
          </Link>

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

export default TweetReplyList;
