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

interface TransactioProviderProps {
    children: ReactNode;
}

 export const TransactionsContext = createContext<Transaction[]>([]);

 export function TransactionsProvider({children}: TransactioProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    return (
        <TransactionsContext.Provider value={transactions}>
           {children}
        </TransactionsContext.Provider>
    );
 }