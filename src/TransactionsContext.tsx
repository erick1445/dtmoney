import { createContext, useEffect, useState, ReactNode} from 'react'
import { api } from './components/services/api';

interface Transaction {
    id: number;
    tittle: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactioProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

 export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
    );

 export function TransactionsProvider({children}: TransactioProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response =  await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        })
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction,
        ]);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
           {children}
        </TransactionsContext.Provider>
    );
 }