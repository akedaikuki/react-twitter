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

function UserFollowCard({ userId, avatar, name, introduction }) {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <>
      {/* follow1 */}
      <TweetCardContainer className="TweetCardContainer" id={userId}>
        <Link
          className="userAvatar"
          to={`/api/otherusers/:UserId/?id=${userId}`}
        >
          <img src={avatar} alt="avatar" style={{ marginTop: "0" }} />
        </Link>
        <div className="right">
          <NameLink className="name_link">
            <Link to={`/api/otherusers/:UserId/?id=${userId}`}>
              <span className="tweetname">{name}</span>
            </Link>
            <FollowBtnBox>
              <StyledButton
                className={"following_btn" + clsx(" ", { active: isFollowed })}
                // onClick={onBtnClicked}
                onClick={() => setIsFollowed(!isFollowed)}
              >
                {isFollowed ? "正在跟隨" : "跟隨"}
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
