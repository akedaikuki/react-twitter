import { createContext, useState, useContext } from "react";
const replyListContext = createContext("");

export const useReplyList = () => useContext(replyListContext);
export const ReplyListContextProvider = ({ children }) => {
  const [theTweetId, setTheTweetId] = useState("");
  const handleTheTweetId = (TweetId) => {
    setTheTweetId(TweetId);
    localStorage.setItem("TweetId", TweetId);
    console.log(theTweetId);
  };

  return (
    <replyListContext.Provider
      value={{ theTweetId, onTheTweetId: handleTheTweetId }}
    >
      {children}
    </replyListContext.Provider>
  );
};
