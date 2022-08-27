import styled from "styled-components";

export const TaskContainer = styled.div`
  background: ${(props) => props.theme["gray-500"]};
  display: flex;
  align-items: flex-start;
  border-radius: 8px;
  padding: 1rem 0.5rem;
  margin-bottom: 0.5rem;
  gap: 0.5rem;

  p {
    width: 100%;
    color: ${(props) => props.theme["gray-100"]};
  }

  span {
    width: 100%;
    color: ${(props) => props.theme["gray-300"]};
    text-decoration: line-through;
  }

  div {
    color: ${(props) => props.theme["gray-100"]};
    background-color: ${(props) => props.theme["purple-500"]};
    display: flex;
    align-items: center;
    border-radius: 2rem;
  }

  button {
    background-color: transparent;
    border: 0;
    color: ${(props) => props.theme["gray-300"]};
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 2px;

    :hover {
      color: ${(props) => props.theme["blue-500"]};
    }

    :nth-child(1) {
      color: ${(props) => props.theme["blue-500"]};
      border-radius: 50px;
    }

    :last-child {
      :hover {
        color: ${(props) => props.theme["red-500"]};
      }
    }
  }
`;

export const ContainerInput = styled.div`
  background: ${(props) => props.theme["gray-500"]};
  display: flex;
  align-items: flex-start;
  border-radius: 8px;
  padding: 1rem 0.5rem;
  margin-bottom: 0.5rem;
  gap: 0.5rem;

  input {
    width: 100%;
    border-radius: 8px;
    border: 0;
    background-color: ${(props) => props.theme["gray-500"]};
    color: ${(props) => props.theme["gray-100"]};
  }

  button {
    background-color: transparent;
    border: 0;
    color: ${(props) => props.theme["gray-300"]};
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 2px;

    :hover {
      color: ${(props) => props.theme["red-500"]};
    }

    :nth-child(1) {
      color: ${(props) => props.theme["blue-500"]};
    }

    :last-child {
      :hover:not(:disabled) {
        color: ${(props) => props.theme["blue-500"]};
      }
    }

    :disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;
