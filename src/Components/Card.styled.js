import styled from "styled-components";

const CardContainer = styled.div`
  background: ${({ theme }) => theme.mainCardBackground};
  border-radius: 15px;
  padding: 1.25rem;
`;

export default CardContainer;