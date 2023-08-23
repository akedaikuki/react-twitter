import { createContext, useState } from "react";

const FollowClickContext = createContext();

function FollowClickContextProvider({ children }) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [followTab, setFollowTab] = useState("follower");
  return (
    <FollowClickContext.Provider
      value={{ isFollowed, setIsFollowed, followTab, setFollowTab }}
    >
      {children}
    </FollowClickContext.Provider>
  );
}

export { FollowClickContext, FollowClickContextProvider };
