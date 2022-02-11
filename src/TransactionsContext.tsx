import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from './services/api'

// tipamos o Transaction para usar no state
interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; // aqui diz pra criar um type com as mesmas informacoes do transaction, mas omitir o  id e o createdAt porque nao vai ser usado.

interface TransactionsProviderProps {
    children: ReactNode; // aceita qlq tipo de conteudo, uma tag, etc
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData // estamos dando um tipo para o TransactionsContext para o ts nao reclamar
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    /**criando um state para mostrar as novas transactions na tela*/
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
      // esse api.get substitui o fetch
      api
        .get("transactions")
        .then((response) =>
          setTransactions(response.data.transactions)
        ); /**para retornar os dados da transação */
    }, []);

    async function createTransaction(transactionInput: TransactionInput){ // recebe a transactionInput que é do tipo Transaction
      //**usamos a api, usamos o post para inserir(post) a rota transactions e data */
     const response = await api.post('/transactions',{
         ...transactionInput,
         createdAt: new Date()
     }); // a response vai receber esse await.
     const { transaction } = response.data; // coloco dentro de transaction essa response

    // para fazermos a transacao aparecer la, usamos o conceito de imutabilidade, pois pegamos o estado final dele, copiamos as transacoes anteriores com ...transactions e pego a nova transacao que é o transaction
     setTransactions([
         ...transactions,
         transaction, 
     ]);
    }

    return(
                                            // aqui temos um objeto retornando
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}