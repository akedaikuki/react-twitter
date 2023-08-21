import React from "react";

import { StyledButton } from "../common/button.styled";
import { styled } from "styled-components";
import clsx from "clsx";

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

const PopularCard = ({
  avatar,
  name,
  account,
  isFollowed,
  onBtnClicked,
  userId,
}) => {
  return (
    <>
      <PopularCardstyled>
        <img src={avatar} alt="other User's avatar" id={userId} />
        <div className="user_text">
          <p className="username">{name}</p>
          <p className="useraccount">@{account}</p>
        </div>
        <FollowBtnBox>
          <StyledButton
            className={"following_btn" + clsx(" ", { active: isFollowed })}
            onClick={onBtnClicked}
          >
            {isFollowed ? "正在跟隨" : "跟隨"}
          </StyledButton>
        </FollowBtnBox>
      </PopularCardstyled>
      <div className="line"></div>
    </>
  );
};

export default PopularCard;
