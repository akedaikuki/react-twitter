import { createContext, useState, useEffect } from "react";
import users from "../API/users";
const FollowClickContext = createContext();

function FollowClickContextProvider({ children }) {
  //   const [isFollowed, setIsFollowed] = useState(false);
  const [activeTab, setActiveTab] = useState("followers");
  // const [followState, setFollowState] = useState(false);
  const [isFollowed, setIsFollowed] = useState(
    users[0].data.user[0].isFollowed
  );
  function handleFollow(e) {
    e.stopPropagation();
    e.preventDefault();
    if (isFollowed === 0) {
      setIsFollowed(1);
      try {
        // await followUser(UserId.UserId);
      } catch (error) {
        console.error(error);
      }
    } else if (isFollowed === 1) {
      setIsFollowed(0);
      try {
        // await unfollowUser(UserId.UserId);
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
    document.body.className = activeTab;
  }, [activeTab]);
  useEffect(() => {}, [activeTab]);
  return (
    <FollowClickContext.Provider
      value={{
        isFollowed,
        setIsFollowed,
        activeTab,
        setActiveTab,
        handleFollow,
      }}
    >
      {children}
    </FollowClickContext.Provider>
  );
}

export { FollowClickContext, FollowClickContextProvider };
