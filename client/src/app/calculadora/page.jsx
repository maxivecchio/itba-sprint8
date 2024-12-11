"use client";
import { useState } from 'react';

const LoanCalculator = () => {
    const [amount, setAmount] = useState('');
    const [interestRate, setInterestRate] = useState('20');
    const [months, setMonths] = useState('12');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [error, setError] = useState(null);

    const calculatePayment = (e) => {
        e.preventDefault();

        const principal = parseFloat(amount);
        const calculatedInterest = parseFloat(interestRate) / 100 / 12;
        const totalPayments = parseFloat(months);

        if (!principal || principal <= 0) {
            setError("Por favor, ingresa un monto válido.");
            setMonthlyPayment(null);
            return;
        }

        if (!calculatedInterest || calculatedInterest < 0) {
            setError("La tasa de interés debe ser un valor positivo.");
            setMonthlyPayment(null);
            return;
        }

        if (!totalPayments || totalPayments <= 0) {
            setError("El número de meses debe ser mayor a 0.");
            setMonthlyPayment(null);
            return;
        }

        try {
            const x = Math.pow(1 + calculatedInterest, totalPayments);
            const monthly = (principal * x * calculatedInterest) / (x - 1);

            if (isNaN(monthly) || !isFinite(monthly)) {
                throw new Error("Cálculo inválido. Verifica los valores ingresados.");
            }

            setMonthlyPayment(monthly.toFixed(2));
            setError(null);
        } catch (err) {
            setError("Hubo un error al realizar el cálculo. Por favor, verifica los valores ingresados.");
            setMonthlyPayment(null);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Calculadora de Préstamos</h2>
            <form onSubmit={calculatePayment}>
                <div className="mb-4">
                    <label className="block mb-2">Monto del Préstamo:</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Tasa de Interés:</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                    >
                        <option value="20">20%</option>
                        <option value="30">30%</option>
                        <option value="45">45%</option>
                        <option value="60">60%</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Meses:</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={months}
                        onChange={(e) => setMonths(e.target.value)}
                    >
                        <option value="12">12 meses</option>
                        <option value="24">24 meses</option>
                        <option value="36">36 meses</option>
                        <option value="48">48 meses</option>
                        <option value="60">60 meses</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Calcular
                </button>
            </form>
            {error && (
                <div className="mt-4 text-red-500">
                    <p>{error}</p>
                </div>
            )}
            {monthlyPayment && (
                <div className="mt-4">
                    <h3 className="font-bold">Pago Mensual: ${monthlyPayment}</h3>
                </div>
            )}
        </div>
    );
};

export default LoanCalculator;
