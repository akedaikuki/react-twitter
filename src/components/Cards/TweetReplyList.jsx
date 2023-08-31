import React, { useEffect, useState } from "react";
import { TweetCardContainer } from "../common/tweet.styled";
import { Link } from "react-router-dom";
import relativeTime from "../../utilities/relativeTime";
import { getSingleTweet } from "../../API/usercopy";
import TweetReplyCard from "./TweetReplyCard";

function TweetReplyList({ onAvatarClick }) {
  const [replyList, setReplyList] = useState([]);

  // const { onLike, onUnLike, onUserReply } = useUserPostModal();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const TweetId = localStorage.getItem("TweetId");
    const getUserDataAsync = async ({ userToken, TweetId }) => {
      try {
        const data = await getSingleTweet({ userToken, TweetId });
        if (data.length > 0) {
          setReplyList(data);
          // console.log(data);
        }
        localStorage.setItem("replyListLength", data.length);
      } catch (error) {
        console.error(error);
      }
    };
    if (userToken) {
      getUserDataAsync({ userToken, TweetId });
    }
  }, [localStorage.getItem("replyListLength")]);
  console.log(replyList);
  if (replyList.length > 0) {
    return replyList.map((item) => (
      <TweetReplyCard
        key={item.replyId}
        tweet={item}
        reply="true"
        onAvatarClick={(clickId) => onAvatarClick?.(clickId)}
      />
    ));
  }
}
export default TweetReplyList;
