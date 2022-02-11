import Modal from "react-modal";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import closeImg from "../../assets/close.svg";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import { useState, FormEvent } from "react";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  /**state para armazenar o botão que o usuário clicou */
  const [type, setType] = useState('deposit');
  /**começamos com deposit, pois é o tipo que defini la do index.tsx  */

  /**handle para criar uma nova transacao e salvar os dados da mesma */
  function handleCreateNewTransaction(e: FormEvent){
    e.preventDefault();
  }

  return (
    <Modal
      /**quando o usuario pedir p abrir o modal*/
      isOpen={isOpen}
      /**no modal informamos isOpen, com o state isNewTransactionModalOpen porque é ele que indica se o modal esta aberto ou fechado */

      /**quando o usuario pedir p fechar o modal, clicar no esc, clicar fora do quadrado etc*/
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay" //**classNames ja feitos no  */
      className="react-modal-content"
    >
      <button
        type="button"
        className="react-modal-close"
        onClick={onRequestClose} /**para fechar a tela */
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      {/**aqui usamos o onSubmit no container porque o forms está dentro do container*/}
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transacao</h2>

        <input placeholder="Título" />

        <input type="number" placeholder="Valor" />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => { setType('deposit'); }}
            isActive={type == 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox 
            type="button"
            onClick={() => { setType('withdraw'); }}
            isActive={type == 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input placeholder="Categoria" />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
