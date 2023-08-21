import React, {useState} from "react"
import clsx from "clsx";
import TweetReplyCard from "../Cards/TweetReplyCard"
import TweetsCard from "../Cards/TweetsCard"
import { StyledTabbar } from "../../components/common/tab.styled";
import user1 from "../../API/user1";
import users from "../../API/users";


function UserControl() {
  const [activeTab, setActiveTab] = useState("tweet");
  const [panelData, setPanelData] = useState([]);
  const [userInfo, setUserInfo] = useState(user1);
  const [usersInfo, setUsersInfo] = useState(users);
  return (
    <div className="user-panel">
      <div active={"active"}>
        <div
        />
      </div>
      <StyledTabbar>
        <button
          className={
            "userTab" + clsx(" ", { active: activeTab === "tweet" })
          }
          onClick={() => {
            if (activeTab !== "tweet") {
              setPanelData([]);
            }
            setActiveTab("tweet");
          }}
        >
          推文
        </button>
        <button
          className={
            "userTab" + clsx(" ", { active: activeTab === "reply" })
          }
          onClick={() => {
            if (activeTab !== "reply") {
              setPanelData([]);
            }
            setActiveTab("reply");
          }}
        >
          回覆
        </button>
        <button
          className={
            "userTab" + clsx(" ", { active: activeTab === "like" })
          }
          onClick={() => {
            if (activeTab !== "like") {
              setPanelData([]);
            }
            setActiveTab("like");
          }}
        >
          喜歡的內容
        </button>
      </StyledTabbar>
      <div className="tweet-list">
        {usersInfo.map((usersInfo) => {
          if (activeTab === "reply") {
            return (
              <TweetReplyCard
              key={usersInfo.data.user[0].id}
              account={usersInfo.data.user[0].account}
              name={usersInfo.data.user[0].name}
              avatar={usersInfo.data.user[0].avatar}
              tweets={usersInfo.data.Tweets[0].description}
              repliedTweets={usersInfo.data.repliedTweets[0].description}
              repliedTotal={usersInfo.data.repliedTweets[0].repliedTotal}
              likesTotal={usersInfo.data.likes[0].likesTotal}
              userId={usersInfo.data.user[0].id}
              
              user1account={userInfo[0].data.user[0].account}
              />
            );
          } else if (activeTab === "tweet") {
            return (
              <TweetsCard
              key={usersInfo.data.user[0].id}
              account={usersInfo.data.user[0].account}
              name={usersInfo.data.user[0].name}
              avatar={usersInfo.data.user[0].avatar}
              tweets={usersInfo.data.Tweets[0].description}
              repliedTotal={usersInfo.data.repliedTweets[0].repliedTotal}
              likesTotal={usersInfo.data.likes[0].likesTotal}
              userId={usersInfo.data.user[0].id}
              />
            );
          } else {
            //使用者喜歡的內容
            return (
              <TweetsCard
              key={usersInfo.data.user[0].id}
              account={usersInfo.data.user[0].account}
              name={usersInfo.data.user[0].name}
              avatar={usersInfo.data.user[0].avatar}
              tweets={usersInfo.data.Tweets[0].description}
              repliedTotal={usersInfo.data.repliedTweets[0].repliedTotal}
              likesTotal={usersInfo.data.likes[0].likesTotal}
              userId={usersInfo.data.user[0].id}
                activeTab={activeTab}
              />
            );
          }
        })}
      </div>
     
    </div>
  );
}

export default UserControl