import React, { useState } from "react";

import { StyledButton } from "../common/button.styled";
import { styled } from "styled-components";
import clsx from "clsx";
import { Link } from "react-router-dom";
import users from "../../API/users";

const PopularCardstyled = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;

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
  userId,
  account,
  name,
  avatar,
  isFollowed,
  // setIsFollowed,
  // handleFollow,
  // onBtnClicked,
}) {
  // const [isFollowed, setIsFollowed] = useState(false);
  const [followState, setFollowState] = useState(isFollowed);
  // console.log(followState);
  // 切換follow狀態
  function handleFollow(e) {
    e.stopPropagation();
    e.preventDefault();
    if (followState === 0) {
      setFollowState(1);
      try {
      } catch (error) {
        console.error(error);
      }
    } else if (followState === 1) {
      setFollowState(0);
      try {
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <PopularCardstyled>
        <Link to={`/api/otherusers/:id/?id=${userId}`}>
          <img src={avatar} alt="other User's avatar" />
        </Link>
        <Link className="user_text" to={`/api/otherusers/:id/?id=${userId}`}>
          <p className="username">{name}</p>
          <p className="useraccount">@{account}</p>
        </Link>
        <FollowBtnBox>
          <StyledButton
            className={"following_btn" + clsx(" ", { active: followState })}
            onClick={handleFollow}
          >
            {followState === 1 ? "正在跟隨" : "跟隨"}
          </StyledButton>
        </FollowBtnBox>
      </PopularCardstyled>
    </>
  );
}

export default PopularCard;
