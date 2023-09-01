import React, { useEffect, useState } from "react";
import PopularCard from "./PopularCard";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  deleteUserFollow,
  getpopularData,
  postUserFollow,
} from "../../API/usercopy";
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
function PopularList({ onAvatarClick, onFollowClick }) {
  // const [usersInfo, setUsersInfo] = useState(users);
  const [popularData, setPopularData] = useState([]);
  const navigate = useNavigate();

  const handleClick = (value) => {
    const userToken = localStorage.getItem("userToken");
    const { id, isFollowed } = value;
    if (isFollowed) {
      deleteUserFollowAsync(userToken, id);
      setPopularData(
        popularData.map((item) => {
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
    } else if (!isFollowed) {
      postUserFollowAsync(userToken, id);
      setPopularData(
        popularData.map((item) => {
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
  // const handleFollowClick = async () => {
  //   const userToken = localStorage.getItem("userToken");
  //   if (popularData.isFollowed) {
  //     setPopularData({
  //       ...popularData,
  //       isFollowed: !popularData.isFollowed,
  //     });
  //     // setFollowState();
  //     deleteUserFollowAsync(userToken, popularData.id);
  //   } else {
  //     postUserFollowAsync(userToken, popularData.id);
  //     setPopularData({
  //       ...popularData,
  //       isFollowed: !popularData.isFollowed,
  //     });
  //     // setFollowState("true");
  //   }
  // };

  useEffect(() => {
    const getpopularDataAsync = async () => {
      const userToken = localStorage.getItem("userToken");
      const data = await getpopularData(userToken);
      setPopularData(data);
    };
    getpopularDataAsync();
  }, []);

  return (
    <Popularstyle className="Popularstyle">
      <h4 className="PopularTitle">推薦跟隨</h4>
      <div className="line"></div>
      <ul className="popularList">
        {popularData.map((item) => (
          <PopularCard
            item={item}
            key={item.FollowingId}
            onClick={handleClick}
            onAvatarClick={onAvatarClick}
            onFollowClick={onFollowClick}
          />
        ))}
        {/* {usersInfo.map((usersInfo) => (
          <PopularCard
            useId={usersInfo.data.user[0].id}
            key={usersInfo.data.user[0].id}
            avatar={usersInfo.data.user[0].avatar}
            userId={usersInfo.data.user[0].id}
            name={usersInfo.data.user[0].name}
            account={usersInfo.data.user[0].account}
            isFollowed={usersInfo.data.user[0].isFollowed}
            // handleFollowBtnClick={handleFollowBtnClick}
          />
        ))} */}
      </ul>
    </Popularstyle>
  );
}

export default PopularList;
