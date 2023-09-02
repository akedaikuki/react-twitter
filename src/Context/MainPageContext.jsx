import { createContext, useState, useContext } from "react";
import { userAddTweets, userReplyTweets } from "../API/tweets";
import { useNavigate } from "react-router-dom";
const MainContext = createContext();
export const useUserPostModal = () => useContext(MainContext);

function MainContextProvider({ children }) {
  const [homeList, setHomeList] = useState([]);
  const handleHomeList = (data) => {
    setHomeList(data);
  };
  // 點擊愛心+1
  const handleLike = (TweetId) => {
    setHomeList((pre) => {
      return pre.map((item) => {
        if (item.TweetId === TweetId) {
          return { ...item, isLiked: true, likeCount: item.likeCount + 1 };
        } else {
          return item;
        }
      });
    });
  };
  // 點擊愛心-1
  const handleUnLike = (TweetId) => {
    setHomeList((pre) => {
      return pre.map((item) => {
        if (item.TweetId === TweetId) {
          return { ...item, isLiked: false, likeCount: item.likeCount - 1 };
        } else {
          return item;
        }
      });
    });
  };

  const handleAddHomeList = async (text) => {
    if (text.length === 0) {
      return;
    }
    const data = await userAddTweets({ description: text });
    setHomeList((preHomeList) => {
      return [
        {
          TweetId: data.TweetId,
          description: data.description,
          isLiked: data.isLiked,
          likeCount: data.likeCount,
          replyCount: data.replyCount,
          tweetOwnerAccount: data.tweetOwnerAccount,
          tweetOwnerAvatar: data.tweetOwnerAvatar,
          tweetOwnerId: data.tweetOwnerId,
          tweetOwnerName: data.tweetOwnerName,
          createdAt: data.createdAt,
        },
        ...preHomeList,
      ];
    });
  };
  const navigate = useNavigate();
  const handleUserReply = async ({ TweetId, text }) => {
    try {
      await userReplyTweets({ TweetId, comment: text });
      navigate(`/tweets/${TweetId}`);
      localStorage.removeItem("replyListLength");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainContext.Provider
      value={{
        homeList,
        onHomeList: handleHomeList,
        onAddHomeList: handleAddHomeList,
        onLike: handleLike,
        onUnLike: handleUnLike,
        onUserReply: handleUserReply,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export { MainContext, MainContextProvider };
