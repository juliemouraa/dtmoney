import styled from "styled-components";

export const Container = styled.div`
  display: grid; /**colocando em colunas*/
  grid-template-columns: repeat(3, 1fr); /**aqui, queremos 3 colunas com 1fr */
  gap: 2rem;
  margin-top: -10rem;

  div {
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-title);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }
    /**adicionando cor ao fundo do total. aqui diz q ele pega a div que tem a classe highlight-background */
    &.highlight-background {
      background: var(--green);
      color: #fff;
    }
  }
`;
