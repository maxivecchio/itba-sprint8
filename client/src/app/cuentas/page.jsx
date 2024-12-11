"use client";

import {useBankAccounts} from '@/lib/hooks/useBankAccounts';
import Link from 'next/link';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";

export default function AccountsPage() {
    const [accounts] = useBankAccounts();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Lista de Cuentas Bancarias</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts?.length > 0 ? accounts.map((account) => (
                    <Card key={account.id} className="shadow-lg">
                        <CardHeader>
                            <CardTitle>{account.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-semibold text-gray-700">
                                Saldo: <span className="text-green-600">${account.balance}</span>
                            </p>
                            <Link href={`/cuentas/${account.id}`}>
                                <Button className="mt-4 w-full" variant="default">
                                    Ver Detalles
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )) :
                [...Array(3)].map((_, index) => (
                    <Skeleton className={"h-44"} key={index} />
                ))
                }
            </div>
        </div>
    );
}
