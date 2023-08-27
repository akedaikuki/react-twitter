import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #f5f8fa;
  width: 100%;
  height: 54px;
`;
const StyledLabel = styled.label`
  font-size: 14;
  color: "#696974";
  text-align: start;
`;

const StyledInput = styled.input`
  outline: none;
  border: none;
  background-color: #f5f8fa;
  border-radius: 0px;
  border-bottom: 2px solid black;
  &:hover,
  &:focus {
    outline: 0;
    border-bottom-color: var(--main_newtweet);
  }
  &.error {
    border-bottom-color: var(--main_error);
  }
`;

const AuthInput = ({ type, label, value, placeholder, onChange }) => {
  return (
    <StyledContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        type={type || "text"}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </StyledContainer>
  );
};

export default AuthInput;
