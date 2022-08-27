import styled, { css } from "styled-components";
import { ISelectTextProps } from "../../interfaces";

export const HomeContainer = styled.main`
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -1.687rem;
  padding: 0 1rem;

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

export const SelectContainer = styled.section`
  margin-top: 1rem;
  display: flex;
  gap: 0.25rem;
`;

export const SelectText = styled.p<ISelectTextProps>`
  cursor: pointer;
  color: ${(props) => props.theme["gray-300"]};

  :hover {
    opacity: 0.7;
  }

  ${(props) =>
    props.isActive &&
    css`
      font-weight: 700;
      color: ${(props) => props.theme["gray-100"]};
    `}
`;
