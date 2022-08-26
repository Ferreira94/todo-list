import styled from "styled-components";

export const HeaderContainer = styled.header`
  max-width: 100vw;
  height: 12.5rem;
  background: ${(props) => props.theme["gray-700"]};
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${(props) => props.theme.mobile} {
    height: 8.5rem;
  }
`;
