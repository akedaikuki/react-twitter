import React from "react";
import PopularList from "./PopularList";
import styled from "styled-components";
const PopularContainer = styled.div`
  width: 430px;
`;
function index() {
  return (
    <PopularContainer className="popularContainer">
      <PopularList />
    </PopularContainer>
  );
}

export default index;
