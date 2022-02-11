import { GlobalStyle } from "./styles.global";
import { useState } from 'react'
import { Header } from "./components/Header";
import Modal from 'react-modal'
import { Dashboard } from "./components/Dashboard";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from './TransactionsContext'

Modal.setAppElement('#root');

export function App() {

  // criando o state do modal de nova transacao. ele comeca com false pq por padrao um modal comeca fechado
  const [ isNewTransactionModalOpen, setIsNewTransactionModalOpen ] = useState(false);

  // acao para que o usuario clique no modal para abrir
  function handleOpenNewTransactionModal() {
      setIsNewTransactionModalOpen(true);
      // passo para o state um true, pois aqui ele vai abrir o modal.
  }

  // acao para que o usuario clique no modal para fechar
  function handleCloseNewTransactionModal() {
      setIsNewTransactionModalOpen(false);
      // passo para o state um false, pois aqui ele vai fechar o modal.
  }
  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      {/**colocando o modal em tela */}
      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}

export default App;
