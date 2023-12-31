import styled from "styled-components";

export const StyledButton = styled.button`
  box-sizing: border-box;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  color: var(--main_orange);
  background-color: var(--main_white);
  border: 1px solid var(--main_orange);
  cursor: pointer;

  &:hover {
    color: var(--main_white);
    background-color: var(--main_orange);
  }
  &.active {
    color: var(--main_white);
    background-color: var(--main_orange);

    &:hover {
      background-color: var(--btn-hover-bg);
    }
  }
`;

export const StyledNavbarButton = styled.button`
  width: 100%;
  padding: 8px 0;
  border-radius: 50px;
  border: none;
  font-size: 20px;
  font-weight: 700;
  color: var(--main_white);
  background-color: var(--main_orange);
  cursor: pointer;

  &:hover {
    background-color: var(--btn-hover-bg);
  }
`;
