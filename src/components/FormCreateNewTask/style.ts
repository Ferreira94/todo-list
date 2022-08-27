import styled from "styled-components";

export const FormContainer = styled.form`
  width: 46rem;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  input {
    flex: 1;
    max-width: 100%;
    height: 3.375rem;
    padding: 0 1rem;
    border-radius: 8px;
    border: 0;
    background-color: ${(props) => props.theme["gray-500"]};
    color: ${(props) => props.theme["gray-100"]};
  }

  button {
    width: 5.625rem;
    min-width: 5.625rem;
    height: 3.375rem;
    font-size: 0.875rem;
    background-color: ${(props) => props.theme["blue-500"]};
    color: ${(props) => props.theme["gray-100"]};
    border-radius: 8px;
    border: 0;
    cursor: pointer;
    font-weight: 700;
    margin: 0 auto;

    :hover:not(:disabled) {
      background-color: ${(props) => props.theme["blue-300"]};
      transition: background-color 0.2s;
    }

    :disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.375rem;
    }
  }
`;
