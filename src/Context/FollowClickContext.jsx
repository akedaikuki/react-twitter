import { createContext, useState, useEffect } from "react";

const FollowClickContext = createContext();

function FollowClickContextProvider({ children }) {
  //   const [isFollowed, setIsFollowed] = useState(false);
  const [activeTab, setActiveTab] = useState("followers");
  // const [followState, setFollowState] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  async function handleFollow(e) {
    e.stopPropagation();
    e.preventDefault();
    if (isFollowed === false) {
      setIsFollowed(true);
      try {
        // await followUser(UserId.UserId);
      } catch (error) {
        console.error(error);
      }
    } else if (isFollowed === true) {
      setIsFollowed(false);
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
