"use client";
import { useEffect, useState } from 'react';

const defaultTarjetas = [
    { id: '1', nombre: 'Visa', limite: 2000000, deuda: 500000 },
    { id: '2', nombre: 'MasterCard', limite: 500000, deuda: 45000 },
    { id: '3', nombre: 'American Express', limite: 3000000, deuda: 1500000 },
];

export function useTarjetas() {
    const [tarjetas, setTarjetas] = useState([]);

    useEffect(() => {
        const storedTarjetas = localStorage.getItem('creditCards');
        if (storedTarjetas) {
            setTarjetas(JSON.parse(storedTarjetas));
        } else {
            localStorage.setItem('creditCards', JSON.stringify(defaultTarjetas));
            setTarjetas(defaultTarjetas);
        }
    }, []);

    const updateTarjetas = (newTarjetas) => {
        localStorage.setItem('creditCards', JSON.stringify(newTarjetas));
        setTarjetas(newTarjetas);
    };

    return [tarjetas, updateTarjetas];
}
