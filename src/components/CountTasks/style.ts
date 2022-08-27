import styled from "styled-components";

export const CountTaskContainer = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.125rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${(props) => props.theme["blue-300"]};
    font-weight: 700;

    :nth-child(2) {
      color: ${(props) => props.theme["purple-300"]};
    }

    span {
      padding: 0.1rem 0.5rem;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      background-color: ${(props) => props.theme["gray-400"]};
      color: ${(props) => props.theme["gray-200"]};
    }
  }

  @media ${(props) => props.theme.mobile} {
    justify-content: center;
    flex-direction: column;
  }
`;
