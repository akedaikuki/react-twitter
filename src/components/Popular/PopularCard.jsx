import React, { useState } from "react";

import { StyledButton } from "../common/button.styled";
import { styled } from "styled-components";
import clsx from "clsx";
import { Link } from "react-router-dom";
// import users from "../../API/users";

const PopularCardstyled = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .userAvatar {
    /* display: flex; */
    cursor: pointer;
  }

  .user_text {
    width: 32%;
    margin-left: 6px;
    /* outline: 3px solid tomato; */
    display: flex;
    justify-content: center;
    flex-direction: column;
    /* flex-basis: calc(100% * (1 / 3)); */
  }
  .username {
    font-weight: 700;
    line-height: 26px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--main_text);
    cursor: pointer;
  }
  .useraccount {
    font-size: 14px;
    font-weight: 500;
    /* line-height: 22px; */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--account_text-in-main);
  }
`;

const FollowBtnBox = styled.div`
  flex-basis: calc(100% * (1 / 3));
  display: flex;
  justify-content: flex-end;
`;

function PopularCard({
  item,
  onClick,
  onImgClick,
  onAvatarClick,
  onFollowClick,
  // setIsFollowed,
  // handleFollow,
  // onBtnClicked,
}) {
  // const [isFollowed, setIsFollowed] = useState(false);
  // const [followState, setFollowState] = useState(item.isFollowed);
  const id = item.FollowerId;
  const followState = item.isFollowed;
  // console.log(followState);
  // 切換follow狀態
  // function handleFollow(e) {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   if (followState === false) {
  //     setFollowState(true);
  //     try {
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else if (followState === true) {
  //     setFollowState(false);
  //     try {
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }

  return (
    <>
      <PopularCardstyled>
        <div className="userAvatar" to="">
          <img
            src={item.FollowerAvatar}
            alt="other User's avatar"
            onClick={() => {
              // onImgClick?.(id);
              onAvatarClick?.(id);
            }}
          />
        </div>
        <Link className="user_text" to="">
          <p className="username">{item.FollowerName}</p>
          <p className="useraccount">@{item.FollowerAccount}</p>
        </Link>
        <FollowBtnBox>
          <StyledButton
            className={"following_btn" + clsx(" ", { active: item.isFollowed })}
            onClick={() => {
              onFollowClick?.({
                id,
                followState,
                // handleFollow,
              });
            }}
          >
            {item.isFollowed ? "正在跟隨" : "跟隨"}
          </StyledButton>
        </FollowBtnBox>
      </PopularCardstyled>
    </>
  );
}

export default PopularCard;
