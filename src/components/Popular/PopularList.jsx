import React, { useState } from "react";
import PopularCard from "./PopularCard";
import { styled } from "styled-components";
import users from "../../API/users";

const Popularstyle = styled.div`
  border-radius: 14px;
  margin: 15px 82px 0 30px;
  background: #f5f8fa;

  .PopularTitle {
    height: 70px;
    top: 60px;
    left: 22px;
    position: relative;
    transform: translateY(-50%);
  }
  .line {
    background: #e6ecf0;
    height: 1px;
  }
  .popularList {
    margin-top: 10px;
    /* outline: 3px solid tomato; */
  }
`;
function PopularList() {
  const [usersInfo, setUsersInfo] = useState(users);

  return (
    <Popularstyle className="Popularstyle">
      <h4 className="PopularTitle">推薦跟隨</h4>
      <div className="line"></div>
      <ul className="popularList">
        {usersInfo.map((usersInfo) => (
          <PopularCard
            key={usersInfo.data.user[0].id}
            avatar={usersInfo.data.user[0].avatar}
            userId={usersInfo.data.user[0].id}
            name={usersInfo.data.user[0].name}
            account={usersInfo.data.user[0].account}
          />
        ))}
      </ul>
    </Popularstyle>
  );
}

export default PopularList;
