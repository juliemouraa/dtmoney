import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import closeImg from "../../assets/close.svg";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

import Modal from "react-modal";

import { useState, FormEvent, useContext } from "react";
import { TransactionsContext } from "../../TransactionsContext";
import { api } from "../../services/api";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useContext(TransactionsContext);

  /**criamos cada estado para armazenar cada uma das informacoes que queremos salvar da nova transacao */
  const [title, setTitle] = useState(" ");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(" ");
  
  /**state para armazenar o botão que o usuário clicou */
  const [type, setType] = useState('deposit');
  /**começamos com deposit, pois é o tipo que defini la do index.tsx  */

  /**handle para criar uma nova transacao e salvar os dados da mesma */
  async function handleCreateNewTransaction(e: FormEvent){
    e.preventDefault();

    // precisamos aguardar que a transaction seja concluida
    await createTransaction({
      title,
      amount,
      category,
      type,
    })

    setTitle(''); //estamos limpando os campos, pq quando ele enviar os dados, e clicar no modal novamente os campos virao vazios
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
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

        <input 
          placeholder="Título" 
          value={title} /**para salvar no estado que criammos. */
          onChange={event => setTitle(event.target.value)} /**para salvar no novo state setTitle, o valor que foi digitado no input */
        /> 

        <input 
          type="number" 
          placeholder="Valor" 
          value={amount} /**para salvar no estado que criammos. */
          onChange={event => setAmount(Number(event.target.value))} /**para salvar no novo state setTitle, o valor que foi digitado no input */
                                                                  /**aqui utilizamos o Number para converter o valor para numérico */
        />

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

        <input 
          placeholder="Categoria" 
          value={category} /**para salvar no estado que criammos. */
          onChange={event => setCategory(event.target.value)} /**para salvar no novo state setTitle, o valor que foi digitado no input */
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
