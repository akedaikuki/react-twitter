import { createContext, useState } from "react";

const FollowClickContext = createContext();

function FollowClickContextProvider({ children }) {
  //   const [isFollowed, setIsFollowed] = useState(false);
  const [activeTab, setActiveTab] = useState("followers");
  return (
    <FollowClickContext.Provider
      value={{
        // isFollowed,
        // setIsFollowed,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </FollowClickContext.Provider>
  );
}

export { FollowClickContext, FollowClickContextProvider };
