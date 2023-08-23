import styled from "styled-components";

export const PageStyle = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  width: 600px;
  border: 1px solid var(--border_gray);
  overflow-y: scroll;
  overflow-x: hidden;
  /* outline: 1px solid tomato; */
  header {
    display: flex;
    align-items: center;
    height: 55px;
    padding-left: 24px;
    border-bottom: 1px solid var(--border_gray);
    position: sticky;
    background-color: var(--main_white);
    z-index: 5;

    .returnIcon {
      cursor: pointer;
    }
    .header_info {
      padding-left: 35px;
    }
    .tweet_amount {
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: 19px;
      color: var(--main_secondary);
    }
  }
`;

export const UserPageConainer = styled.div`
  width: 600px;
  /* flex: 1 1 0; */
  border: 1px solid var(--border_gray);
  overflow-y: auto;
  overflow-x: hidden;
  /* margin-right: 10px; */
  /* margin-left: 10px; */
`;
export const UserInfoPicture = styled.div`
  .coverImg {
    position: absolute;
    margin: 0;
    margin-right: 0;
    /* outline: 3px solid green; */
    width: 100%;
    height: 200px;
    border-radius: 0;
  }
  .avatarImg {
    box-sizing: border-box;
    position: absolute;
    transform: translateY(80%);
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 5px solid white;
  }
  .btnBox {
    display: flex;
    justify-content: space-between;
    width: 180px;
    transform: translate(400px, 570%);

    .msgIcon,
    .notiIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      height: 35px;
      width: 35px;
      border-radius: 50px;
      border: 1px solid var(--main_orange);
      cursor: pointer;
    }
  }
`;

export const UserInfoText = styled.div`
  margin-top: 225px;
  padding: 16px;
  .useraccount {
    color: var(--account_text-in-pop);
  }
  .intro {
    margin: 10px 0;
    line-height: 22px;
  }
  .followInfo {
    display: flex;
    line-height: normal;
  }
  .followingText,
  .followerText {
    font-size: 14px;
    color: var(--main_secondary);
    cursor: pointer;
  }
  .followerText {
    margin-left: 20px;
  }
  .followInfo span {
    margin-left: 0;
    font-weight: 700;
    color: var(--main_text);
  }
`;
