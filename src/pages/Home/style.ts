import styled from "styled-components";

export const HomeContainer = styled.main`
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -1.687rem;
  padding: 0 1rem;

  form {
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
  }

  main {
    width: 46rem;
    max-width: 100%;
    margin-top: 4rem;
  }

  @media ${(props) => props.theme.mobile} {
    main {
      margin-top: 2rem;
    }
  }
`;

export const EmptyContainer = styled.section`
  border-radius: 8px;
  border-top: 1px solid ${(props) => props.theme["gray-400"]};
  text-align: center;

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

export const CountTaskContainer = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.12rem;

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

export const TasksContainer = styled.section`
  margin: 1.5rem 0;
`;
