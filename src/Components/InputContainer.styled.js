import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  margin: 12px;
  padding: 12px;
  background-color: ${({ theme }) => theme.mapInputBackground};
  color: ${({ theme }) => theme.text};
  z-index: 99;
  box-shadow: ${({theme}) => theme.inputShadow};
  border-radius: 15px;

  svg {
    margin-right: 15px;
  }
`;

export default Container;