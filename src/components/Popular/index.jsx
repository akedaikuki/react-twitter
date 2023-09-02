import React, { useEffect, useState } from "react";
import PopularList from "./PopularList";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  deleteUserFollow,
  getpopularData,
  postUserFollow,
} from "../../API/usercopy";

const PopularContainer = styled.div`
  width: 430px;
`;

const SideBar = () => {
  // const [sidebarData, setSidebarData] = useState([]);
  // const navigate = useNavigate();

  // const postUserFollowAsync = async (userToken, id) => {
  //   try {
  //     const data = await postUserFollow(userToken, id);
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const deleteUserFollowAsync = async (userToken, id) => {
  //   try {
  //     const data = await deleteUserFollow(userToken, id);
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleClick = (value) => {
  //   const userToken = localStorage.getItem("userToken");
  //   const { id, isFollowed } = value;
  //   if (isFollowed) {
  //     deleteUserFollowAsync(userToken, id);
  //     setSidebarData(
  //       sidebarData.map((item) => {
  //         if (item.FollowingId === id) {
  //           return {
  //             ...item,
  //             isFollowed: !item.isFollowed,
  //           };
  //         } else {
  //           return item;
  //         }
  //       })
  //     );
  //   } else if (!isFollowed) {
  //     postUserFollowAsync(userToken, id);
  //     setSidebarData(
  //       sidebarData.map((item) => {
  //         if (item.FollowingId === id) {
  //           return {
  //             ...item,
  //             isFollowed: !item.isFollowed,
  //           };
  //         } else {
  //           return item;
  //         }
  //       })
  //     );
  //   }
  // };

  // const handleImgClick = (id) => {
  //   localStorage.setItem("otherId", id);
  //   if (id === localStorage.getItem("id")) {
  //     navigate("/user/personalinfo/main");
  //   } else {
  //     navigate("/user/other/main");
  //   }
  // };

  // useEffect(() => {
  //   const getSidebarDataAsync = async () => {
  //     const userToken = localStorage.getItem("userToken");
  //     const data = await getpopularData(userToken);
  //     setSidebarData(data);
  //   };
  //   getSidebarDataAsync();
  // }, []);

  return (
    <PopularContainer className="popularContainer">
      <PopularList />
    </PopularContainer>
  );
};

export default SideBar;
