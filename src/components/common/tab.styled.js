import { styled } from "styled-components";

export const StyledTabbar = styled.div`
  margin-top: 4px;
  display: flex;

  .tweetList {
    width: 600px;
  }

  .userTab {
    width: 130px;
    padding: 15px 0;
    border: none;
    border-bottom: 2px solid var(--border_gray);
    font-size: 15px;
    font-weight: 700;
    border-radius: 0;
    color: var(--tab-unactive_gray);
    background-color: transparent;
    cursor: pointer;

    &:hover {
      border-bottom-color: #ff8c40;
    }
    &.active {
      border-bottom-color: var(--main_orange);
      color: var(--main_orange);
    }
  }
`;
