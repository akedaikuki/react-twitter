import { styled } from "styled-components";

export const TweetCardContainer = styled.div`
  display: flex;
  /* height: 145px; */
  padding: 16px 0;
  outline: 1px solid #e6ecf0;

  .userAvatar {
    display: flex;
  }

  .right {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    .name_link {
      display: flex;
      width: 100%;
      align-items: baseline;
    }
    .tweetname {
      display: block;
      font-size: 16px;
      font-weight: 700;
      /* line-height: 26px; */
      margin-right: 5px;
      cursor: pointer;
    }
    .tweetaccount,
    .time {
      font-size: 15px;
      font-weight: 400;
      line-height: 22px;
      color: var(--account_text-in-main);
    }
    .tweetContent_link {
      width: 510px;
      margin: 6px 0;
    }
    .tweetP {
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      margin-right: 24px;
    }
    .user_action {
      width: 130px;
      display: flex;
      justify-content: space-between;
      color: var(--account_text-in-main);
    }
    .replyIcon svg,
    .likeIcon svg {
      font-size: 13px;
      width: 15px;
      height: 15px;
      margin-right: 10px;
      color: var(--account_text-in-main);
    }
    .replyIcon,
    .likeIcon {
      display: flex;
      align-items: center;
      font-size: 13px;
      cursor: pointer;
      color: var(--account_text-in-main);
    }

    .reply_to {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: var(--account_text-in-main);
    }
    .reply_to span {
      color: var(--main_orange);
    }
  }
`;
