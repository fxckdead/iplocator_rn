import styled from "styled-components";

const Container = styled.input`
  background-color: ${({ theme }) => theme.mapInputBackground};
  color: ${({ theme }) => theme.text};
  border: none;

  &:focus {
    outline: none;
  }
`;

export default Container;