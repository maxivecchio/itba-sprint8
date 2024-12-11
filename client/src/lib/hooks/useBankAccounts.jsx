"use client"
import { useEffect, useState } from 'react';

const defaultAccounts = [
    { id: '1', name: 'Cuenta Corriente 1', balance: 500000 },
    { id: '2', name: 'Cuenta Corriente 2', balance: 30000 },
    { id: '3', name: 'Cuenta Corriente 3', balance: 80000 },
];

export function useBankAccounts() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const storedAccounts = localStorage.getItem('bankAccounts');
        if (storedAccounts) {
            setAccounts(JSON.parse(storedAccounts));
        } else {
            localStorage.setItem('bankAccounts', JSON.stringify(defaultAccounts));
            setAccounts(defaultAccounts);
        }
    }, []);

    const updateAccounts = (newAccounts) => {
        localStorage.setItem('bankAccounts', JSON.stringify(newAccounts));
        setAccounts(newAccounts);
    };

    return [accounts, updateAccounts];
}
