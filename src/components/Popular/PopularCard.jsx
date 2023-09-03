import React, { useState } from "react";

import { StyledButton } from "../common/button.styled";
import { styled } from "styled-components";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Toast } from "../../utilities/sweetalert";
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
  const id = item.FollowingId;
  // console.log(id);

  const followState = item.isFollowed;
  // console.log(followState);
  // 切換follow狀態
  function handleFollow() {
    if (followState === false) {
      Toast.fire({
        title: "成功追蹤使用者",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });

      console.log(followState);
      try {
      } catch (error) {
        console.error(error);
      }
    } else if (followState === true) {
      Toast.fire({
        title: "成功取消追蹤此使用者",
        icon: "info",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });
      try {
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <PopularCardstyled>
        <div className="userAvatar" to="">
          <img
            src={item.FollowingAvatar}
            alt="other User's avatar"
            onClick={() => {
              // onImgClick?.(id);
              onAvatarClick?.(id);
            }}
          />
        </div>
        <Link className="user_text" to="">
          <p className="username">{item.FollowingName}</p>
          <p className="useraccount">@{item.FollowingAccount}</p>
        </Link>
        <FollowBtnBox>
          <StyledButton
            className={"following_btn" + clsx(" ", { active: item.isFollowed })}
            onClick={() => {
              onClick?.({
                id,
                followState,
              });
              handleFollow();
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
