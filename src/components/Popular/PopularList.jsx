import React, { useContext, useEffect, useState } from "react";
import PopularCard from "./PopularCard";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  deleteUserFollow,
  getAccountInfo,
  getUserFollowing,
  getpopularData,
  postUserFollow,
} from "../../API/usercopy";
import { ClickingContext } from "../../App";
// import users from "../../API/users";

const Popularstyle = styled.div`
  border-radius: 14px;
  margin: 15px 82px 0 30px;
  background: #f5f8fa;

  .PopularTitle {
    height: 70px;
    top: 60px;
    left: 22px;
    position: relative;
    transform: translateY(-50%);
  }
  .line {
    background: #e6ecf0;
    height: 1px;
  }
  .popularList {
    margin-top: 10px;
    /* outline: 3px solid tomato; */
  }
`;

function PopularList() {
  // const [usersInfo, setUsersInfo] = useState(users);
  const [followerData, setFollowerData] = useState([]);
  // const [followingData, setFollowingData] = useState([]);
  // const [followingData, setfollowingData] = useState([]);
  // const [otherUser, setOtherUser] = useState({});
  const { clicking, setClicking } = useContext(ClickingContext);
  const navigate = useNavigate();
  const otherId = localStorage.getItem("otherId");
  const userToken = localStorage.getItem("userToken");
  const tweetCount = localStorage.getItem("tweetCount");
  const userName = localStorage.getItem("userName");

  const handleClick = (value) => {
    const userToken = localStorage.getItem("userToken");
    const { id, isFollowed } = value;
    if (isFollowed) {
      deleteUserFollowAsync(userToken, id);
      setFollowerData(
        followerData.map((item) => {
          if (item.FollowingId === id) {
            // console.log(item.FollowingId);
            return {
              ...item,
              isFollowed: !item.isFollowed,
            };
          } else {
            return item;
          }
        })
      );
    } else if (!isFollowed) {
      postUserFollowAsync(userToken, id);
      setFollowerData(
        followerData.map((item) => {
          if (item.FollowingId === id) {
            return {
              ...item,
              isFollowed: !item.isFollowed,
            };
          } else {
            return item;
          }
        })
      );
    }
  };

  // useEffect(() => {
  //   const getAccountInfoAsync = async () => {
  //     try {
  //       const userToken = localStorage.getItem("userToken");
  //       const data = await getAccountInfo(userToken, otherId);

  //       setFollowerData(data);
  //       console.log(otherId);
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

  // const handleFollowClick = async () => {
  //   const userToken = localStorage.getItem("userToken");
  //   if (otherUser.isFollowed) {
  //     setOtherUser({
  //       ...otherUser,
  //       isFollowed: !otherUser.isFollowed,
  //     });
  //     // setFollowState();
  //     deleteUserFollowAsync(userToken, otherUser.id);
  //   } else {
  //     postUserFollowAsync(userToken, otherUser.id);
  //     setOtherUser({
  //       ...otherUser,
  //       isFollowed: !otherUser.isFollowed,
  //     });
  //     // setFollowState("true");
  //   }
  // };

  const postUserFollowAsync = async (userToken, id) => {
    try {
      const data = await postUserFollow(userToken, id);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const deleteUserFollowAsync = async (userToken, id) => {
    try {
      const data = await deleteUserFollow(userToken, id);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getpopularDataAsync = async () => {
      const userToken = localStorage.getItem("userToken");
      const data = await getpopularData(userToken);
      // console.log(data);
      // setfollowingData(data);
      setFollowerData(data);
    };
    getpopularDataAsync();
  }, []);
  const handleImgClick = (id) => {
    localStorage.setItem("otherId", id);
    if (id === localStorage.getItem("id")) {
      navigate("/users");
    } else {
      navigate("/other");
    }
  };

  return (
    <Popularstyle className="Popularstyle">
      <h4 className="PopularTitle">推薦跟隨</h4>
      <div className="line"></div>
      <div className="popularList">
        {/* followingData.map((item) => (
              <PopularCard
                item={item}
                key={item.followingId}
                onClick={handleClick}
                onAvatarClick={handleImgClick}
                onFollowClick={handleFollowClick}
              />
            ))
          :  */}
        {followerData.map((item) => (
          <PopularCard
            item={item}
            // key={item.followerId}
            onClick={handleClick}
            onAvatarClick={handleImgClick}
            // onFollowClick={handleFollowClick}
            // handleFollowBtnClick={handleFollowBtnClick}
          />
        ))}
      </div>
    </Popularstyle>
  );
}

export default PopularList;
