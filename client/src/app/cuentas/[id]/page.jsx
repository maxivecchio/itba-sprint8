"use client";

import {useEffect, useState} from 'react';
import {notFound, useRouter} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button, buttonVariants} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";

export default function AccountDetails({params}) {
    const [account, setAccount] = useState(null);
    const [amount, setAmount] = useState('');
    const [targetAccountId, setTargetAccountId] = useState('');
    const [transferMessage, setTransferMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const storedAccounts = localStorage.getItem('bankAccounts');
        if (storedAccounts) {
            const accounts = JSON.parse(storedAccounts);
            const account = accounts.find(acc => acc.id === params.id);
            if (!account) {
                return notFound();
            }
            setAccount(account);
        }
    }, [params.id, router]);

    const handleTransfer = () => {
        const storedAccounts = localStorage.getItem('bankAccounts');
        if (storedAccounts) {
            const accounts = JSON.parse(storedAccounts);

            const fromAccount = accounts.find(acc => acc.id === params.id);
            const toAccount = accounts.find(acc => acc.id === targetAccountId);

            if (!toAccount) {
                setTransferMessage('La cuenta de destino no existe.');
                return;
            }

            const transferAmount = parseFloat(amount);

            if (isNaN(transferAmount) || transferAmount <= 0) {
                setTransferMessage('El monto de la transferencia no es válido.');
                return;
            }

            if (fromAccount.balance < transferAmount) {
                setTransferMessage('Fondos insuficientes.');
                return;
            }

            if (fromAccount.id === toAccount.id) {
                setTransferMessage('No puede transferir a la misma cuenta de origen.');
                return;
            }

            fromAccount.balance -= transferAmount;
            toAccount.balance += transferAmount;

            localStorage.setItem('bankAccounts', JSON.stringify(accounts));

            setTransferMessage(`Transferencia de $${transferAmount} realizada con éxito a la cuenta ${toAccount.id}.`);
            setAmount('');
            setTargetAccountId('');
        }
    };

    if (!account) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <Link href={"/cuentas"} className={`${buttonVariants({variant: "link"})} !p-0 `}>Volver a cuentas</Link>
            <Card className="shadow-lg max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>{account.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-semibold text-gray-700 mb-4">
                        Saldo: <span className="text-green-600">${account.balance}</span>
                    </p>

                    <h2 className="text-xl font-semibold mb-4">Realizar transferencia</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleTransfer();
                        }}
                        className="space-y-4"
                    >
                        <div>
                            <Label htmlFor="targetAccount">ID de la cuenta de destino:</Label>
                            <Input
                                id="targetAccount"
                                type="text"
                                value={targetAccountId}
                                onChange={(e) => setTargetAccountId(e.target.value)}
                                className="mt-2"
                                placeholder="Ingrese ID de la cuenta de destino"
                            />
                        </div>
                        <div>
                            <Label htmlFor="amount">Monto a transferir:</Label>
                            <Input
                                id="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="mt-2"
                                placeholder="Ingrese el monto"
                            />
                        </div>
                        <Button type="submit" className="w-full mt-4">
                            Transferir
                        </Button>
                    </form>

                    {transferMessage && (
                        <p className="mt-4 text-center text-sm font-semibold text-blue-600">
                            {transferMessage}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
