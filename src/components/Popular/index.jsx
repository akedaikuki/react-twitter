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

const Popular = () => {
  return (
    <PopularContainer className="popularContainer">
      <PopularList />
    </PopularContainer>
  );
};

export default Popular;
