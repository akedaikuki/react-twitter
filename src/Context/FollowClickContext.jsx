import { createContext, useState, useEffect } from "react";
import {
  deleteUserFollow,
  getAccountInfo,
  postUserFollow,
} from "../API/usercopy";
// import users from "../API/users";

const FollowClickContext = createContext();

function FollowClickContextProvider({ children }) {
  //   const [isFollowed, setIsFollowed] = useState(false);
  const [activeTab, setActiveTab] = useState("followers");
  // const [followState, setFollowState] = useState(false);
  // const [otherUser, setOtherUser] = useState({});
  // const [isFollowed, setIsFollowed] = useState(otherUser.isFollowed);
  const otherId = localStorage.getItem("otherId");

  // useEffect(() => {
  //   const getAccountInfoAsync = async () => {
  //     try {
  //       const userToken = localStorage.getItem("userToken");
  //       const data = await getAccountInfo(userToken, otherId);

  //       setOtherUser(data);
  //       localStorage.setItem("tweetCount", data.tweetCount);
  //       localStorage.setItem("userName", data.name);

  //       // console.log(data);

  //       return data;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getAccountInfoAsync();
  // }, [localStorage.getItem("otherId")]);

  // function handleFollow(e) {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   if (isFollowed === false) {
  //     setIsFollowed(true);
  //     try {
  //       // await followUser(UserId.UserId);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else if (isFollowed === true) {
  //     setIsFollowed(false);
  //     try {
  //       // await unfollowUser(UserId.UserId);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
    document.body.className = activeTab;
  }, [activeTab]);
  useEffect(() => {}, [activeTab]);
  return (
    <FollowClickContext.Provider
      value={{
        // isFollowed,
        // setIsFollowed,
        activeTab,
        setActiveTab,
        // onFollowClick: handleFollowClick,
      }}
    >
      {children}
    </FollowClickContext.Provider>
  );
}

export { FollowClickContext, FollowClickContextProvider };
