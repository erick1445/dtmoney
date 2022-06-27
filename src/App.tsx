import { Dashboard } from "./components/dashboard";
import Modal from 'react-modal';
import { Header } from "./components/header";
import { GlobalStyle } from "./styles/global";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";

Modal.setAppElement('#root');

export function App() {
  const [ isNewTransactionModalOpen, setIsNewTransactionModalOpen ] = useState(false);

    function handleOpenNewTransactionModal() {
      setIsNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal() {
      setIsNewTransactionModalOpen(false);     
    }


  return (
    <>
      <Header onOpenNewTransactionModal={ handleOpenNewTransactionModal }/>

      <Dashboard />

      <NewTransactionModal
      isOpen={isNewTransactionModalOpen}
      onRequestClose={handleCloseNewTransactionModal}
      />

      <GlobalStyle />

    </>
  );
}

export default App;
