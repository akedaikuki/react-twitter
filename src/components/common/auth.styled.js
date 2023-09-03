import styled from "styled-components";

const StyedContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const StyledAuthInputContainer = styled.div`
  width: 356px;
  height: 54px;
  margin-bottom: 24px;
  border-bottom: 2px solid rgb(101, 119, 134);
  &:hover,
  &:active {
    border-bottom: 2px solid #50b5ff;
  }

  &.redLine {
    border-bottom: 2px solid #fc5a5a;
  }
`;

const StyledButton = styled.button`
   border-radius: 30px;
  background-color: #ff6600;
  border: none;
  color: white;
  width: 356px;
  font-family: "Noto Sans TC", sans-serif;
  font-weight: bold;
  padding: 6px 0;
  margin: 1rem 0;
  cursor: pointer;
  &:active{
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) inset
  }

`;

const StyledTittle = styled.h3`
  margin: 24px 0 30px 0;
  font-weight: 700;
`;

const StyledLinkText = styled.div`
  color: #0062ff;
  font-size: 16px;
  font-weight: 400;
  display: flex;
`;

const StyledLinkWrapper = styled.div`
  width: 356px;
  display: flex;
  justify-content: flex-end;
  margin: rem 0;
`;

export {
  StyedContainer as AuthContainer,
  StyledAuthInputContainer as AuthInputContainer,
  StyledButton as AuthButton,
  StyledLinkText as AuthLinkText,
  StyledTittle as AuthTittle,
  StyledLinkWrapper as AuthLinkWrapper,
};
