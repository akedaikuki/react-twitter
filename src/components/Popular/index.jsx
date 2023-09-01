import React from "react";
import PopularList from "./PopularList";
import styled from "styled-components";
const PopularContainer = styled.div`
  width: 430px;
`;
function index({ onAvatarClick, onFollowClick }) {
  return (
    <PopularContainer className="popularContainer">
      <PopularList
        onAvatarClick={onAvatarClick}
        onFollowClick={onFollowClick}
      />
    </PopularContainer>
  );
}

export default index;
