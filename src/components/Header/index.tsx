import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";

// criando o HeaderProps para tipar o header, para receber o onOpenNewTransactionModal que serve para abrir o modal.
interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

// desestruturamos o onOpenNewTransactionModal, porque é so ele que queremos
export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transacao
        </button>
      </Content>
    </Container>
  );
}
