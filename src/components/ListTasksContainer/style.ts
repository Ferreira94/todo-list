import styled from "styled-components";

export const TasksContainer = styled.section`
  margin: 0.5rem 0;
`;

export const EmptyContainer = styled.section`
  border-radius: 8px;
  border-top: 1px solid ${(props) => props.theme["gray-400"]};
  text-align: center;
  margin-top: 1.5rem;

  svg {
    font-size: 3.5rem;
    color: ${(props) => props.theme["gray-400"]};
    margin-bottom: 1rem;
    margin-top: 3rem;
  }

  p {
    color: var(--gray-300);
    font-weight: 700;
  }

  p + p {
    font-weight: 400;
  }
`;

export const ButtonContainer = styled.section`
  display: flex;
  justify-content: center;

  button {
    padding: 0 0.5rem;
    height: 3.375rem;
    font-size: 0.875rem;
    background-color: ${(props) => props.theme["purple-500"]};
    color: ${(props) => props.theme["gray-100"]};
    border-radius: 8px;
    border: 0;
    cursor: pointer;
    font-weight: 700;
    margin: 0 auto;

    :hover:not(:disabled) {
      background-color: ${(props) => props.theme["purple-300"]};
      transition: background-color 0.2s;
    }
  }
`;
