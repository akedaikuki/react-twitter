import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { TweetCardContainer } from "../common/tweet.styled";
import { StyledButton } from "../common/button.styled";
import { styled } from "styled-components";

const FollowBtnBox = styled.div`
  flex-basis: calc(100% * (1 / 3));
  display: flex;
  margin-right: 30px;
  justify-content: flex-end;
`;

const NameLink = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

function UserFollowCard({ item, onClick, name, introduction, onAvatarClick }) {
  const [followState, setFollowState] = useState(item.isFollowed);
  // console.log(followState);
  // 切換follow狀態
  // function handleFollow(e) {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   if (followState === 0) {
  //     setFollowState(1);
  //     try {
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else if (followState === 1) {
  //     setFollowState(0);
  //     try {
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }

  return (
    <>
      {/* follow1 */}
      <TweetCardContainer className="TweetCardContainer" id={item.UserId}>
        <div
          className="userAvatar"
          onClick={() => onAvatarClick?.(item.UserId)}
        >
          <img src={item.avatar} alt="avatar" style={{ marginTop: "0" }} />
        </div>
        <div className="right">
          <NameLink className="name_link">
            <div>
              <span className="name">{item.name}</span>
            </div>
            <FollowBtnBox>
              <StyledButton
                className={"following_btn" + clsx(" ", { active: followState })}
                onClick={() => {
                  onClick?.(item.UserId);
                }}
              >
                {followState ? "正在跟隨" : "跟隨"}
              </StyledButton>
              {/* <StyledButton className={"follow_btn"}>跟隨</StyledButton> */}
            </FollowBtnBox>
          </NameLink>
          <p className="tweetP">{introduction}</p>
        </div>
      </TweetCardContainer>
    </>
  );
}

export default UserFollowCard;
