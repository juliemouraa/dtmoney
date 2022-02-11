import { useContext } from "react";
import { TransactionsContext } from "../../TransactionsContext";
import { Container } from "./styles";

export function TransactionTable() {
  const { transactions }  = useContext(TransactionsContext);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {/**criando esse map para mostrar a transação em tela */}
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {/**para resolver a questão do tipo de moeda do local*/}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency" /**para dar o style de valor de moeda*/,
                  currency: "BRL" /**o tipo de moeda*/,
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {/**para resolver a questão da datal*/}
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(
                    transaction.createdAt
                  ) /**convertendo string para date */
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
