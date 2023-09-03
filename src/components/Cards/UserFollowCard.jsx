import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { TweetCardContainer } from "../common/tweet.styled";
import { StyledButton } from "../common/button.styled";
import { styled } from "styled-components";
import { Toast } from "../../utilities/sweetalert";

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
  // const [followState, setFollowState] = useState(item.isFollowed);
  // console.log(followState);
  // 切換follow狀態
  function handleFollow() {
    if (item.isFollowed === true) {
      Toast.fire({
        title: "成功追蹤使用者",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });

      try {
      } catch (error) {
        console.error(error);
      }
    } else if (item.isFollowed === false) {
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
  // console.log(item);
  return (
    <>
      {/* follow1 */}
      <TweetCardContainer className="TweetCardContainer" id={item.followingId}>
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
                className={
                  "following_btn" +
                  clsx(" ", { active: item.isFollowed === false })
                }
                onClick={() => {
                  onClick?.(item.followerId);
                  handleFollow();
                }}
              >
                {item.isFollowed ? "跟隨" : "正在跟隨"}
              </StyledButton>
              {/* <StyledButton className={"follow_btn"}>跟隨</StyledButton> */}
            </FollowBtnBox>
          </NameLink>
          <p className="tweetP">{item.introduction}</p>
        </div>
      </TweetCardContainer>
    </>
  );
}

export default UserFollowCard;
